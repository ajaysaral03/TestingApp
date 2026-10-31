
import React, { useEffect, useRef, useState } from 'react';


import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ActivityIndicator,
} from 'react-native';

import {
  Wallet,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  Phone,
  RefreshCw,
  CheckCircle2,
} from 'lucide-react-native';

import {
  verifyLoginOtp,
  resendLoginOtp,
} from '../../services/authService';
import { saveCurrentUser } from '../../storage/authStorage';

import SweetAlert from '../../components/SweetAlert/SweetAlert';

import { styles } from './OtpVerificationScreen.styles';

type AlertType = {
  visible: boolean;
  title: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  buttonText: string;
  onConfirm?: () => void;
};

export default function OtpVerificationScreen({
  navigation,
  route,
}: any) {
  const mobile: string = route?.params?.mobile ?? '';

  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [verificationBlocked, setVerificationBlocked] =
    useState(false);

  const [alertData, setAlertData] = useState<AlertType>({
    visible: false,
    title: '',
    message: '',
    type: 'info',
    buttonText: 'OK',
  });

  // Refs
  const inputRefs = useRef<
    (React.ElementRef<typeof TextInput> | null)[]
  >([]);
  const alertLock = useRef(false);
  const requestLock = useRef(false);

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(35)).current;
  const logoScale = useRef(new Animated.Value(0.7)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Screen animation
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),

      Animated.timing(translateY, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),

      Animated.spring(logoScale, {
        toValue: 1,
        friction: 5,
        tension: 45,
        useNativeDriver: true,
      }),
    ]).start();

    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1200,
          useNativeDriver: true,
        }),

        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
      ]),
    );

    pulse.start();

    return () => {
      pulse.stop();
    };
  }, [fadeAnim, translateY, logoScale, pulseAnim]);

  // SweetAlert
  const showSweetAlert = (
    title: string,
    message: string,
    type: AlertType['type'] = 'info',
    buttonText = 'OK',
    onConfirm?: () => void,
  ) => {
    // Prevent multiple alerts
    if (alertLock.current) {
      return;
    }

    alertLock.current = true;

    setAlertData({
      visible: true,
      title,
      message,
      type,
      buttonText,
      onConfirm,
    });
  };

  const handleAlertConfirm = () => {
    if (!alertLock.current) {
      return;
    }

    const callback = alertData.onConfirm;

    alertLock.current = false;

    setAlertData(prev => ({
      ...prev,
      visible: false,
      onConfirm: undefined,
    }));

    callback?.();
  };

  // OTP Input
  const handleOtpChange = (value: string, index: number) => {
    if (verificationBlocked || loading) {
      return;
    }

    const digit = value.replace(/\D/g, '').slice(-1);

    const updatedOtp = [...otp];
    updatedOtp[index] = digit;

    setOtp(updatedOtp);

    if (digit && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Backspace handling
  const handleOtpKeyPress = (
    key: string,
    index: number,
  ) => {
    if (
      key === 'Backspace' &&
      !otp[index] &&
      index > 0 &&
      !verificationBlocked
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Verify OTP
  const handleVerify = async () => {
    if (
      verificationBlocked ||
      alertLock.current ||
      requestLock.current ||
      loading
    ) {
      return;
    }

    const enteredOtp = otp.join('');

    if (!/^\d{4}$/.test(enteredOtp)) {
      showSweetAlert(
        'Incomplete OTP',
        'Please enter all 4 digits of your OTP.',
        'warning',
      );

      return;
    }

    requestLock.current = true;

    try {
      setLoading(true);

      const result = await verifyLoginOtp(mobile, enteredOtp);

      if (result.success) {
        await saveCurrentUser(mobile);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      } else {
        // Wrong OTP: block further verification
        setVerificationBlocked(true);

        showSweetAlert(
          'Incorrect OTP',
          'Your OTP is incorrect or expired. Please resend a new OTP or go back to login.',
          'error',
          'OK',
        );
      }
    } catch (error: any) {
      // Failed verification: show only one alert
      setVerificationBlocked(true);

      showSweetAlert(
        'Verification Failed',
        error?.message ||
          'OTP is incorrect or expired. Please resend a new OTP.',
        'error',
        'OK',
      );
    } finally {
      setLoading(false);
      requestLock.current = false;
    }
  };

  // Resend OTP
  const handleResend = async () => {
    if (
      loading ||
      requestLock.current ||
      alertLock.current
    ) {
      return;
    }

    requestLock.current = true;

    try {
      setLoading(true);

      const result = await resendLoginOtp(mobile);

      // Reset old OTP
      setOtp(['', '', '', '']);

      // Allow verification again
      setVerificationBlocked(false);

      showSweetAlert(
        'New OTP Generated!',
        `Your new demo OTP is ${result.otp}. Please enter the new OTP.`,
        'success',
        'OK',
        () => {
          inputRefs.current[0]?.focus();
        },
      );
    } catch (error: any) {
      showSweetAlert(
        'Resend Failed',
        error?.message || 'Unable to resend OTP. Please try again.',
        'error',
      );
    } finally {
      setLoading(false);
      requestLock.current = false;
    }
  };

  // Back to Login
  const handleBack = () => {
    if (loading || alertLock.current) {
      return;
    }

    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar
        barStyle="dark-content"
      />

      {/* Background */}
      <View style={styles.backgroundCircleLarge} />
      <View style={styles.backgroundCircleSmall} />
      <View style={styles.backgroundDotOne} />
      <View style={styles.backgroundDotTwo} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={[
            styles.mainContent,
            {
              opacity: fadeAnim,
              transform: [{ translateY }],
            },
          ]}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.backButton}
              onPress={handleBack}
              disabled={loading || alertData.visible}
            >
              <ArrowLeft size={22} color="#18392B" />
            </TouchableOpacity>

            <View style={styles.headerBrand}>
              <Wallet size={21} color="#239D64" />

              <Text style={styles.brandName}>
                ExpenseTracker
              </Text>

              <Sparkles size={15} color="#35A96B" />
            </View>

            <View style={styles.headerSpace} />
          </View>

          {/* Animated Logo */}
          <Animated.View
            style={[
              styles.illustrationSection,
              {
                transform: [
                  { scale: logoScale },
                  { scale: pulseAnim },
                ],
              },
            ]}
          >
            <View style={styles.glowCircle} />

            <View style={styles.shieldCircle}>
              <View style={styles.innerShield}>
                <ShieldCheck
                  size={65}
                  color="#FFFFFF"
                  strokeWidth={1.8}
                />
              </View>
            </View>

            <View style={styles.sparkleOne}>
              <Sparkles size={20} color="#239D64" />
            </View>

            <View style={styles.sparkleTwo}>
              <CheckCircle2 size={22} color="#239D64" />
            </View>
          </Animated.View>

          {/* Heading */}
          <View style={styles.heading}>
            <Text style={styles.title}>
              Verify Your Number
            </Text>

            <Text style={styles.titleGreen}>
              Almost There!
            </Text>

            <Text style={styles.subtitle}>
              Enter the 4-digit OTP sent to your
              {'\n'}
              mobile number to continue.
            </Text>
          </View>

          {/* Mobile Card */}
          <View style={styles.mobileCard}>
            <View style={styles.mobileIcon}>
              <Phone size={21} color="#239D64" />
            </View>

            <View style={styles.mobileDetails}>
              <Text style={styles.mobileLabel}>
                OTP sent to mobile number
              </Text>

              <Text style={styles.mobileNumber}>
                +91 {mobile}
              </Text>
            </View>

            <View style={styles.verifiedBadge}>
              <CheckCircle2 size={20} color="#239D64" />
            </View>
          </View>

          {/* OTP Card */}
          <View style={styles.otpCard}>
            <View style={styles.otpHeading}>
              <Text style={styles.otpTitle}>
                Enter 4-Digit OTP
              </Text>

              <Text style={styles.otpStep}>
                STEP 2 OF 2
              </Text>
            </View>

            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={ref => {
                    inputRefs.current[index] = ref;
                  }}
                  style={[
                    styles.otpInput,
                    digit ? styles.otpInputFilled : null,
                    verificationBlocked && styles.otpInputBlocked,
                  ]}
                  value={digit}
                  onChangeText={value =>
                    handleOtpChange(value, index)
                  }
                  onKeyPress={({ nativeEvent }) =>
                    handleOtpKeyPress(nativeEvent.key, index)
                  }
                  keyboardType="number-pad"
                  maxLength={1}
                  selectTextOnFocus
                  textContentType="oneTimeCode"
                  editable={!loading && !verificationBlocked}
                />
              ))}
            </View>

            {/* Resend OTP */}
            <View style={styles.timerSection}>
              <Text style={styles.timerLabel}>
                Didn't receive the OTP?
              </Text>

              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.resendButton}
                onPress={handleResend}
                disabled={loading || alertData.visible}
              >
                {loading ? (
                  <ActivityIndicator
                    size="small"
                    color="#159765"
                  />
                ) : (
                  <RefreshCw
                    size={14}
                    color="#159765"
                  />
                )}

                <Text style={styles.resendText}>
                  Resend OTP
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Verify Button */}
          <TouchableOpacity
            activeOpacity={0.85}
            style={[
              styles.verifyButton,
              (
                otp.join('').length !== 4 ||
                loading ||
                verificationBlocked
              ) && styles.verifyDisabled,
            ]}
            onPress={handleVerify}
            disabled={
              loading ||
              verificationBlocked ||
              alertData.visible ||
              otp.join('').length !== 4
            }
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <>
                <Text style={styles.verifyText}>
                  Verify & Continue
                </Text>

                <ArrowLeft
                  size={19}
                  color="#FFFFFF"
                  style={{
                    transform: [{ rotate: '180deg' }],
                  }}
                />
              </>
            )}
          </TouchableOpacity>

          {/* Blocked Message */}
          {verificationBlocked && (
            <Text style={styles.blockedMessage}>
              Please resend OTP or go back to login.
            </Text>
          )}

          {/* Security */}
          <View style={styles.securityCard}>
            <View style={styles.securityIcon}>
              <ShieldCheck size={21} color="#239D64" />
            </View>

            <View style={styles.securityDetails}>
              <Text style={styles.securityTitle}>
                Secure Verification
              </Text>

              <Text style={styles.securityDescription}>
                Your mobile number is protected.
              </Text>
            </View>
          </View>

          {/* Footer */}
          <Text style={styles.footerText}>
            YOUR MONEY, YOUR CONTROL
          </Text>
        </Animated.View>
      </ScrollView>

      {/* Custom SweetAlert */}
     <SweetAlert
  visible={alertData.visible}
  title={alertData.title}
  message={alertData.message}
  type={alertData.type}
  buttonText={alertData.buttonText}
  onConfirm={handleAlertConfirm}
/>
    </KeyboardAvoidingView>
  );
}
