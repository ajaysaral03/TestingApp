import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import Voice, {
  type SpeechErrorEvent,
  type SpeechResultsEvent,
} from '@react-native-voice/voice';
import Tts from 'react-native-tts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ArrowLeft,
  ArrowUp,
  Bot,
  Mic,
  MicOff,
  Sparkles,
  Volume2,
  VolumeX,
} from 'lucide-react-native';

import type { Transaction } from '../../types/transaction';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { getCurrentUser } from '../../storage/authStorage';
import { getProfile } from '../../storage/profileStorage';
import { getTransactions } from '../../storage/transactionStorage';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import { styles } from './AssistantScreen.styles';

const GEMINI_MODEL = 'gemini-3.5-flash-lite';
const GEMINI_API_KEY_STORAGE = '@expense_tracker/gemini_api_key';
const DEFAULT_MONTHLY_BUDGET = 30000;

type AssistantScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Assistant'
>;

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isError?: boolean;
}

interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>;
    };
  }>;
  error?: {
    message?: string;
  };
}

const suggestions = [
  'How am I doing this month?',
  'Where can I save money?',
  'Summarize my spending',
];

const formatMoney = (amount: number) =>
  `₹${amount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;

const createId = () => `${Date.now()}-${Math.random().toString(36).slice(2)}`;

const getTransactionMonth = (dateValue: string): string => {
  const value = String(dateValue || '').trim();
  if (/^\d{4}-\d{2}-\d{2}/.test(value)) {
    return value.slice(0, 7);
  }
  const indianDate = value.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);
  if (indianDate) {
    return `${indianDate[3]}-${indianDate[2].padStart(2, '0')}`;
  }
  const dashDate = value.match(/^(\d{2})-(\d{2})-(\d{4})$/);
  if (dashDate) {
    return `${dashDate[3]}-${dashDate[2]}`;
  }
  return '';
};

const AssistantScreen = ({ navigation }: AssistantScreenProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [loadingContext, setLoadingContext] = useState(true);
  const [contextError, setContextError] = useState('');
  const [voiceError, setVoiceError] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [voiceMode, setVoiceMode] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [monthlyBudget, setMonthlyBudget] = useState(DEFAULT_MONTHLY_BUDGET);
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [geminiApiKeyInput, setGeminiApiKeyInput] = useState('');
  const [showGeminiConfig, setShowGeminiConfig] = useState(false);
  const [monthLabel, setMonthLabel] = useState(() =>
    new Date().toLocaleDateString('en-IN', {
      month: 'long',
      year: 'numeric',
    }),
  );
  const messageListRef = useRef<React.ComponentRef<typeof ScrollView>>(null);
  const voiceModeRef = useRef(false);
  const speechResultHandledRef = useRef(false);
  const voiceStateRef = useRef({ loadingContext, sending });
  const startListeningRef = useRef<() => Promise<void>>(async () => {});
  const sendMessageRef = useRef<(prompt?: string) => Promise<void>>(
    async () => {},
  );
  voiceStateRef.current = { loadingContext, sending };

  useEffect(() => {
    let active = true;
    const loadFinanceContext = async () => {
      try {
        const savedGeminiApiKey = await AsyncStorage.getItem(
          GEMINI_API_KEY_STORAGE,
        );
        if (savedGeminiApiKey?.trim()) {
          setGeminiApiKey(savedGeminiApiKey.trim());
        }
        const mobile = await getCurrentUser();
        if (!mobile) {
          navigation.replace('Login');
          return;
        }

        const now = new Date();
        const selectedMonth = `${now.getFullYear()}-${String(
          now.getMonth() + 1,
        ).padStart(2, '0')}`;
        const [savedTransactions, savedProfile] = await Promise.all([
          getTransactions(mobile),
          getProfile(mobile),
        ]);
        if (!active) {
          return;
        }
        setTransactions(
          savedTransactions.filter(
            item => getTransactionMonth(item.date) === selectedMonth,
          ),
        );
        setMonthlyBudget(
          Number.isFinite(Number(savedProfile?.monthlyBudget)) &&
            Number(savedProfile?.monthlyBudget) > 0
            ? Number(savedProfile?.monthlyBudget)
            : DEFAULT_MONTHLY_BUDGET,
        );
        setMonthLabel(
          now.toLocaleDateString('en-IN', {
            month: 'long',
            year: 'numeric',
          }),
        );
      } catch (error) {
        console.error('AI assistant finance context failed to load:', error);
        if (active) {
          setContextError(
            'Your transaction summary could not be loaded. You can still ask a general question.',
          );
        }
      } finally {
        if (active) {
          setLoadingContext(false);
        }
      }
    };

    loadFinanceContext();
    return () => {
      active = false;
    };
  }, [navigation]);

  const saveGeminiApiKey = async () => {
    const apiKey = geminiApiKeyInput.trim();
    if (apiKey.length < 20) {
      setVoiceError('Enter a valid Gemini API key to continue.');
      return;
    }
    try {
      await AsyncStorage.setItem(GEMINI_API_KEY_STORAGE, apiKey);
      setGeminiApiKey(apiKey);
      setGeminiApiKeyInput('');
      setShowGeminiConfig(false);
      setVoiceError('');
    } catch (error) {
      console.error('Could not save Gemini API key:', error);
      setVoiceError('Could not save the API key on this device. Please retry.');
    }
  };

  const handleSend = async (suggestion?: string) => {
    const prompt = (suggestion ?? input).trim();
    if (!prompt || sending || loadingContext) {
      return;
    }
    if (!geminiApiKey) {
      setShowGeminiConfig(true);
      setVoiceError(
        'Add a Gemini API key to use the cloud assistant. Create one at aistudio.google.com/apikey.',
      );
      return;
    }

    const userMessage: ChatMessage = {
      id: createId(),
      role: 'user',
      content: prompt,
    };
    const conversation = [...messages, userMessage];
    setMessages(conversation);
    setInput('');
    setSending(true);

    const income = transactions
      .filter(item => item.type === 'income')
      .reduce((total, item) => total + Number(item.amount || 0), 0);
    const expenses = transactions
      .filter(item => item.type === 'expense')
      .reduce((total, item) => total + Number(item.amount || 0), 0);
    const categoryTotals = transactions.reduce<Record<string, number>>(
      (totals, item) => {
        if (item.type === 'expense') {
          const category = item.category?.trim() || 'Other';
          totals[category] = (totals[category] || 0) + Number(item.amount || 0);
        }
        return totals;
      },
      {},
    );
    const topCategories = Object.entries(categoryTotals)
      .sort((first, second) => second[1] - first[1])
      .slice(0, 5)
      .map(([category, amount]) => `${category}: ${formatMoney(amount)}`)
      .join(', ');
    const financeSnapshot = [
      `Month: ${monthLabel}`,
      `Income: ${formatMoney(income)}`,
      `Expenses: ${formatMoney(expenses)}`,
      `Balance: ${formatMoney(income - expenses)}`,
      `Monthly budget: ${formatMoney(monthlyBudget)}`,
      `Top expense categories: ${topCategories || 'No expenses recorded.'}`,
    ].join('\n');

    try {
      const response = await axios.post<GeminiResponse>(
        `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
        {
          systemInstruction: {
            parts: [
              {
                text: [
                  'You are a friendly, concise personal finance assistant.',
                  'Use the financial snapshot below when answering questions.',
                  'Do not invent transactions or financial details that are not provided.',
                  'Give practical budgeting guidance, not professional financial advice.',
                  'Reply in the same language as the user.',
                  '',
                  financeSnapshot,
                ].join('\n'),
              },
            ],
          },
          contents: conversation
            .filter(message => !message.isError)
            .map(({ role, content }) => ({
              role: role === 'assistant' ? 'model' : 'user',
              parts: [{ text: content }],
            })),
          generationConfig: { temperature: 0.6, maxOutputTokens: 1024 },
        },
        {
          headers: { 'x-goog-api-key': geminiApiKey },
          timeout: 60000,
        },
      );
      const answer = response.data.candidates?.[0]?.content?.parts
        ?.map(part => part.text ?? '')
        .join('')
        .trim();
      if (!answer) {
        throw new Error('The assistant returned an empty response.');
      }
      setMessages(current => [
        ...current,
        { id: createId(), role: 'assistant', content: answer },
      ]);
      if (voiceModeRef.current) {
        speakAnswer(answer).catch(error =>
          console.error('Could not read the voice agent response:', error),
        );
      }
    } catch (error) {
      console.error('AI assistant request failed:', error);
      let errorMessage =
        'Could not reach Gemini. Check your internet connection and try again.';
      if (axios.isAxiosError<GeminiResponse>(error)) {
        if (error.code === 'ECONNABORTED') {
          errorMessage = 'Gemini took too long to respond. Please try again.';
        } else if (
          error.response?.status === 400 ||
          error.response?.status === 403
        ) {
          errorMessage =
            'Gemini rejected the API key. Check it in the assistant settings.';
        } else if (error.response?.status === 429) {
          errorMessage =
            'Gemini API quota is currently unavailable. Try again later or check your Google AI Studio limits.';
        } else if (error.response?.data?.error?.message) {
          errorMessage = `Gemini error: ${error.response.data.error.message}`;
        }
      }
      setMessages(current => [
        ...current,
        {
          id: createId(),
          role: 'assistant',
          content: errorMessage,
          isError: true,
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  const speakAnswer = async (text: string) => {
    try {
      const language = /[\u0900-\u097F]/.test(text) ? 'hi-IN' : 'en-IN';
      try {
        await Tts.setDefaultLanguage(language);
      } catch (languageError) {
        if (language !== 'hi-IN') {
          throw languageError;
        }
        await Tts.setDefaultLanguage('en-IN');
      }
      Tts.speak(text);
    } catch (error) {
      console.error('AI assistant speech playback failed:', error);
      setVoiceError(
        'Speech playback is unavailable. Check that text-to-speech is enabled on your device.',
      );
    }
  };

  const startListening = async () => {
    if (voiceStateRef.current.loadingContext || voiceStateRef.current.sending) {
      return;
    }
    speechResultHandledRef.current = false;
    setVoiceError('');
    try {
      await Voice.start('hi-IN');
      setIsListening(true);
    } catch (error) {
      console.error('Voice recognition could not start:', error);
      setIsListening(false);
      setVoiceError(
        'Voice input could not start. Allow microphone access and check that speech recognition is available on your device.',
      );
      if (voiceModeRef.current) {
        voiceModeRef.current = false;
        setVoiceMode(false);
      }
    }
  };
  startListeningRef.current = startListening;

  const stopListening = async () => {
    try {
      await Voice.stop();
    } catch (error) {
      console.error('Voice recognition could not stop:', error);
      setVoiceError('Voice input could not stop cleanly. Please try again.');
    } finally {
      setIsListening(false);
    }
  };

  const toggleVoiceAgent = async () => {
    if (voiceModeRef.current) {
      voiceModeRef.current = false;
      setVoiceMode(false);
      if (isListening) {
        await stopListening();
      }
      try {
        await Tts.stop();
      } catch (error) {
        console.error('Voice assistant playback could not stop:', error);
      }
      return;
    }
    if (sending) {
      return;
    }
    voiceModeRef.current = true;
    setVoiceMode(true);
    await startListeningRef.current();
  };

  const toggleDictation = async () => {
    if (voiceModeRef.current) {
      return;
    }
    if (isListening) {
      await stopListening();
      return;
    }
    await startListeningRef.current();
  };

  const stopSpeaking = async () => {
    try {
      await Tts.stop();
    } catch (error) {
      console.error('Speech playback could not stop:', error);
      setVoiceError('Speech playback could not stop. Please try again.');
    }
  };

  sendMessageRef.current = handleSend;

  useEffect(() => {
    const handleSpeechResults = (event: SpeechResultsEvent) => {
      const recognizedText = event.value?.[0]?.trim();
      if (!recognizedText) {
        return;
      }
      setInput(recognizedText);
      setIsListening(false);
      if (voiceModeRef.current && !speechResultHandledRef.current) {
        speechResultHandledRef.current = true;
        sendMessageRef
          .current(recognizedText)
          .catch(error =>
            console.error(
              'Voice agent could not send the recognized message:',
              error,
            ),
          );
      }
    };

    const handleSpeechError = (event: SpeechErrorEvent) => {
      const message = event.error?.message;
      console.error('Voice recognition error:', event.error);
      setIsListening(false);
      setVoiceError(
        message ||
          'Voice recognition failed. Check microphone permission and speech services.',
      );
      if (voiceModeRef.current) {
        voiceModeRef.current = false;
        setVoiceMode(false);
      }
    };

    const handleSpeechEnd = () => setIsListening(false);
    const handleSpeechStart = () => setIsListening(true);
    const handleTtsStart = () => setIsSpeaking(true);
    const handleTtsFinish = () => {
      setIsSpeaking(false);
      if (voiceModeRef.current) {
        startListeningRef
          .current()
          .catch(error =>
            console.error('Voice agent could not resume listening:', error),
          );
      }
    };
    const handleTtsCancel = () => setIsSpeaking(false);
    const handleTtsError = () => {
      setIsSpeaking(false);
      setVoiceError(
        'Speech playback failed. Check that text-to-speech is enabled on your device.',
      );
      if (voiceModeRef.current) {
        voiceModeRef.current = false;
        setVoiceMode(false);
      }
    };

    Voice.onSpeechStart = handleSpeechStart;
    Voice.onSpeechEnd = handleSpeechEnd;
    Voice.onSpeechResults = handleSpeechResults;
    Voice.onSpeechError = handleSpeechError;
    Tts.addEventListener('tts-start', handleTtsStart);
    Tts.addEventListener('tts-finish', handleTtsFinish);
    Tts.addEventListener('tts-cancel', handleTtsCancel);
    Tts.addEventListener('tts-error', handleTtsError);

    return () => {
      voiceModeRef.current = false;
      Tts.removeEventListener('tts-start', handleTtsStart);
      Tts.removeEventListener('tts-finish', handleTtsFinish);
      Tts.removeEventListener('tts-cancel', handleTtsCancel);
      Tts.removeEventListener('tts-error', handleTtsError);
      Tts.stop().catch(error =>
        console.error('Could not stop text-to-speech:', error),
      );
      Voice.destroy()
        .then(() => Voice.removeAllListeners())
        .catch(error =>
          console.error('Could not release speech recognition:', error),
        );
    };
  }, []);

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardAvoider}
      >
        <View style={styles.sheet}>
          <View style={styles.header}>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel="Go back"
              onPress={() => navigation.navigate('Home')}
              style={styles.backButton}
            >
              <ArrowLeft size={20} color="#52645A" />
            </TouchableOpacity>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel="Configure Gemini cloud AI"
              onPress={() => setShowGeminiConfig(current => !current)}
              style={styles.headerIdentity}
            >
              <View style={styles.headerIcon}>
                <Sparkles size={19} color="#FFFFFF" />
              </View>
              <View>
                <Text style={styles.headerTitle}>AI Assistant</Text>
                <Text style={styles.headerSubtitle}>
                  {geminiApiKey
                    ? 'Gemini cloud AI • Ready'
                    : 'Set up Gemini cloud AI'}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel={
                voiceMode ? 'Turn off voice agent' : 'Start voice agent'
              }
              disabled={loadingContext || (sending && !voiceMode)}
              onPress={toggleVoiceAgent}
              style={[
                styles.voiceAgentButton,
                voiceMode && styles.voiceAgentButtonActive,
              ]}
            >
              {voiceMode ? (
                <MicOff size={17} color="#FFFFFF" />
              ) : (
                <Mic size={17} color="#159765" />
              )}
              <Text
                style={[
                  styles.voiceAgentButtonText,
                  voiceMode && styles.voiceAgentButtonTextActive,
                ]}
              >
                {voiceMode ? 'Stop' : 'Voice'}
              </Text>
            </TouchableOpacity>
          </View>

          {showGeminiConfig ? (
            <View style={styles.geminiConfig}>
              <Text style={styles.geminiConfigLabel}>
                Gemini API key {geminiApiKey ? '(saved)' : '(required)'}
              </Text>
              <Text style={styles.geminiPrivacyNote}>
                Your finance summary and prompts are sent to Google Gemini.
                Create a key at aistudio.google.com/apikey. Do not share your
                key; it is stored on this device.
              </Text>
              <View style={styles.geminiConfigRow}>
                <TextInput
                  value={geminiApiKeyInput}
                  onChangeText={setGeminiApiKeyInput}
                  placeholder={
                    geminiApiKey ? 'Enter a replacement key' : 'Paste API key'
                  }
                  placeholderTextColor="#96A49B"
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry
                  style={styles.geminiConfigInput}
                />
                <TouchableOpacity
                  accessibilityRole="button"
                  onPress={saveGeminiApiKey}
                  style={styles.geminiConfigSave}
                >
                  <Text style={styles.geminiConfigSaveText}>Save key</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}

          {contextError ? (
            <Text style={styles.contextWarning}>{contextError}</Text>
          ) : null}
          {loadingContext ? (
            <View style={styles.contextLoading}>
              <ActivityIndicator size="small" color="#159765" />
              <Text style={styles.thinkingText}>
                Loading your money summary...
              </Text>
            </View>
          ) : null}
          <ScrollView
            ref={messageListRef}
            style={styles.messages}
            contentContainerStyle={styles.messagesContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() =>
              messageListRef.current?.scrollToEnd({ animated: true })
            }
          >
            {!loadingContext && messages.length === 0 ? (
              <View style={styles.welcome}>
                <View style={styles.welcomeIcon}>
                  <Bot size={28} color="#159765" />
                </View>
                <Text style={styles.welcomeTitle}>Hey! How can I help?</Text>
                <Text style={styles.welcomeText}>
                  Ask about your {monthLabel.toLowerCase()} spending or get
                  ideas to stay on budget.
                </Text>
                <View style={styles.suggestions}>
                  {suggestions.map(item => (
                    <TouchableOpacity
                      key={item}
                      accessibilityRole="button"
                      disabled={sending || loadingContext}
                      onPress={() => handleSend(item)}
                      style={styles.suggestion}
                    >
                      <Text style={styles.suggestionText}>{item}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ) : (
              messages.map(message => (
                <View
                  key={message.id}
                  style={[
                    styles.messageRow,
                    message.role === 'user' && styles.userMessageRow,
                  ]}
                >
                  {message.role === 'assistant' && (
                    <View style={styles.messageAvatar}>
                      <Sparkles size={14} color="#159765" />
                    </View>
                  )}
                  <View
                    style={[
                      styles.messageBubble,
                      message.role === 'user'
                        ? styles.userBubble
                        : styles.assistantBubble,
                      message.isError && styles.errorBubble,
                    ]}
                  >
                    <Text
                      style={[
                        styles.messageText,
                        message.role === 'user' && styles.userMessageText,
                        message.isError && styles.errorMessageText,
                      ]}
                    >
                      {message.content}
                    </Text>
                  </View>
                  {message.role === 'assistant' && !message.isError && (
                    <TouchableOpacity
                      accessibilityRole="button"
                      accessibilityLabel={
                        isSpeaking ? 'Stop speaking' : 'Read response aloud'
                      }
                      onPress={() =>
                        isSpeaking
                          ? stopSpeaking()
                          : speakAnswer(message.content)
                      }
                      style={styles.speakButton}
                    >
                      {isSpeaking ? (
                        <VolumeX size={15} color="#159765" />
                      ) : (
                        <Volume2 size={15} color="#159765" />
                      )}
                    </TouchableOpacity>
                  )}
                </View>
              ))
            )}
            {sending && (
              <View style={styles.thinkingRow}>
                <View style={styles.messageAvatar}>
                  <Sparkles size={14} color="#159765" />
                </View>
                <View style={styles.thinkingBubble}>
                  <ActivityIndicator size="small" color="#159765" />
                  <Text style={styles.thinkingText}>Thinking...</Text>
                </View>
              </View>
            )}
          </ScrollView>

          <View style={styles.composer}>
            <TextInput
              accessibilityLabel="Message the AI assistant"
              style={styles.input}
              value={input}
              onChangeText={setInput}
              onSubmitEditing={() => handleSend()}
              placeholder="Ask about your money..."
              placeholderTextColor="#97A49C"
              returnKeyType="send"
              maxLength={1000}
              editable={!sending && !loadingContext && !voiceMode}
            />
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel={
                isListening ? 'Stop voice input' : 'Start voice input'
              }
              disabled={sending || loadingContext || voiceMode}
              onPress={toggleDictation}
              style={[
                styles.voiceInputButton,
                isListening && styles.voiceInputButtonActive,
                (sending || loadingContext || voiceMode) &&
                  styles.sendButtonDisabled,
              ]}
            >
              {isListening ? (
                <MicOff size={18} color="#FFFFFF" />
              ) : (
                <Mic size={18} color="#159765" />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel="Send message"
              disabled={!input.trim() || sending || loadingContext || voiceMode}
              onPress={() => handleSend()}
              style={[
                styles.sendButton,
                (!input.trim() || sending || loadingContext || voiceMode) &&
                  styles.sendButtonDisabled,
              ]}
            >
              {sending ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <ArrowUp size={19} color="#FFFFFF" />
              )}
            </TouchableOpacity>
          </View>
          {voiceError ? (
            <Text style={styles.voiceError}>{voiceError}</Text>
          ) : isListening ? (
            <Text style={styles.voiceStatus}>Listening in Hindi...</Text>
          ) : voiceMode ? (
            <Text style={styles.voiceStatus}>
              Voice agent on · I will listen after each reply
            </Text>
          ) : null}
          <Text style={styles.footerNote}>Powered by Google Gemini</Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AssistantScreen;
