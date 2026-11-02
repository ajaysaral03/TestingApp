import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
  Modal,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {
  ArrowLeft,
  Pencil,
  User,
  Wallet,
  Lock,
  Bell,
  Palette,
  ShieldCheck,
  HelpCircle,
  Info,
  ChevronRight,
  LogOut,
  Camera,
  TrendingUp,
  TrendingDown,
  ReceiptText,
  IndianRupee,
  X,
} from 'lucide-react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {launchImageLibrary} from 'react-native-image-picker';
import {useFocusEffect} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {styles} from './ProfileScreen.styles';
import {
  getCurrentUser,
  clearCurrentUser,
} from '../../storage/authStorage';
import {
  getProfile,
  saveProfile,
  ProfileData,
} from '../../storage/profileStorage';
import {
  getTransactions,
  Transaction,
} from '../../storage/transactionStorage';
import {RootStackParamList} from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;
type EditorType = 'name' | 'budget' | null;

const DEFAULT_PROFILE: ProfileData = {
  name: '',
  photo: null,
  monthlyBudget: 30000,
};

const getAmount = (value: unknown): number => {
  const cleaned = String(value ?? 0)
    .replace(/[₹,\s]/g, '')
    .trim();
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : 0;
};

const normalizeType = (value: unknown): string =>
  String(value ?? '').trim().toLowerCase();

const getTransactionMonth = (dateValue: unknown): string => {
  const value = String(dateValue ?? '').trim();
  if (!value) {
    return '';
  }

  // ISO: YYYY-MM-DD or YYYY-MM-DDTHH:mm:ss
  const isoMatch = value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (isoMatch) {
    const month = Number(isoMatch[2]);
    if (month >= 1 && month <= 12) {
      return `${isoMatch[1]}-${String(month).padStart(2, '0')}`;
    }
    return '';
  }

  // Indian date: DD/MM/YYYY or DD-MM-YYYY (also accepts a time suffix)
  const indianMatch = value.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})(?:\s|$)/);
  if (indianMatch) {
    const day = Number(indianMatch[1]);
    const month = Number(indianMatch[2]);
    if (day >= 1 && day <= 31 && month >= 1 && month <= 12) {
      return `${indianMatch[3]}-${String(month).padStart(2, '0')}`;
    }
  }

  return '';
};

const getCurrentMonthKey = (): string => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
};

const getCurrentMonthLabel = (): string =>
  new Date().toLocaleDateString('en-IN', {
    month: 'long',
    year: 'numeric',
  });

const formatAmount = (amount: number): string => {
  const safeAmount = Number.isFinite(amount) ? amount : 0;
  return `${safeAmount < 0 ? '-₹' : '₹'}${Math.abs(safeAmount).toLocaleString(
    'en-IN',
    {maximumFractionDigits: 2},
  )}`;
};

const ProfileScreen = ({navigation}: Props) => {
  const [mobile, setMobile] = useState('');
  const [profile, setProfile] = useState<ProfileData>(DEFAULT_PROFILE);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editorVisible, setEditorVisible] = useState(false);
  const [editorType, setEditorType] = useState<EditorType>(null);
  const [inputValue, setInputValue] = useState('');

  // All-time totals: every saved transaction for the logged-in user.

  // Current-month totals: only transactions whose date belongs to this month.
  const currentMonthKey = getCurrentMonthKey();
  const currentMonthTransactions = transactions.filter(
    item => getTransactionMonth(item.date) === currentMonthKey,
  );

  const monthlyIncome = currentMonthTransactions.reduce((sum, item) => {
    return normalizeType(item.type) === 'income'
      ? sum + getAmount(item.amount)
      : sum;
  }, 0);

  const monthlyExpense = currentMonthTransactions.reduce((sum, item) => {
    return normalizeType(item.type) === 'expense'
      ? sum + getAmount(item.amount)
      : sum;
  }, 0);

  const monthlyBalance = monthlyIncome - monthlyExpense;

  const loadProfileData = useCallback(async () => {
    try {
      setLoading(true);
      const currentMobile = await getCurrentUser();

      if (!currentMobile) {
        setMobile('');
        setProfile(DEFAULT_PROFILE);
        setTransactions([]);
        navigation.replace('Login');
        return;
      }

      const userMobile = String(currentMobile)
        .replace(/\D/g, '')
        .slice(-10);

      if (!/^[6-9]\d{9}$/.test(userMobile)) {
        throw new Error('Invalid logged-in mobile number.');
      }

      setMobile(userMobile);

      const [savedProfile, savedTransactions] = await Promise.all([
        getProfile(userMobile),
        getTransactions(userMobile),
      ]);

      setProfile(savedProfile || DEFAULT_PROFILE);
      setTransactions(Array.isArray(savedTransactions) ? savedTransactions : []);
    } catch (error) {
      console.log('Profile loading error:', error);
      Alert.alert(
        'Profile Error',
        error instanceof Error ? error.message : 'Unable to load profile data.',
      );
    } finally {
      setLoading(false);
    }
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      loadProfileData();
    }, [loadProfileData]),
  );

  const openEditor = (type: EditorType) => {
    setEditorType(type);
    setInputValue(
      type === 'name' ? profile.name : String(profile.monthlyBudget),
    );
    setEditorVisible(true);
  };

  const handleSave = async () => {
    if (!mobile || !editorType) {
      Alert.alert('Error', 'Profile details not found.');
      return;
    }

    const updatedProfile = {...profile};

    if (editorType === 'name') {
      const newName = inputValue.trim();
      if (!newName) {
        Alert.alert('Validation', 'Please enter your name.');
        return;
      }
      updatedProfile.name = newName;
    }

    if (editorType === 'budget') {
      const newBudget = getAmount(inputValue);
      if (!Number.isFinite(newBudget) || newBudget <= 0) {
        Alert.alert('Validation', 'Please enter a valid budget.');
        return;
      }
      updatedProfile.monthlyBudget = newBudget;
    }

    try {
      setSaving(true);
      await saveProfile(mobile, updatedProfile);
      setProfile(updatedProfile);
      setEditorVisible(false);
      Alert.alert('Success', 'Profile updated successfully.');
    } catch (error) {
      console.log('Profile save error:', error);
      Alert.alert(
        'Error',
        error instanceof Error ? error.message : 'Unable to save profile.',
      );
    } finally {
      setSaving(false);
    }
  };

  const handleImagePicker = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 1,
        maxWidth: 500,
        maxHeight: 500,
        quality: 0.7,
      });

      if (result.didCancel) {
        return;
      }

      if (result.errorCode) {
        Alert.alert(
          'Image Error',
          result.errorMessage || 'Unable to select image.',
        );
        return;
      }

      const imageUri = result.assets?.[0]?.uri;
      if (!imageUri || !mobile) {
        return;
      }

      const updatedProfile: ProfileData = {
        ...profile,
        photo: imageUri,
      };

      await saveProfile(mobile, updatedProfile);
      setProfile(updatedProfile);
    } catch (error) {
      console.log('Image picker error:', error);
      Alert.alert('Error', 'Unable to save profile photo.');
    }
  };

  const settings = [
    {
      title: 'Personal Information',
      subtitle: 'Update your name and profile',
      icon: User,
      action: () => openEditor('name'),
    },
    {
      title: 'Monthly Budget',
      subtitle: 'Manage your monthly budget',
      icon: Wallet,
      action: () => openEditor('budget'),
    },
    {
      title: 'Security',
      subtitle: 'Manage account security',
      icon: Lock,
      action: () =>
        Alert.alert('Security', 'Security settings coming soon.'),
    },
    {
      title: 'Notifications',
      subtitle: 'Manage notification preferences',
      icon: Bell,
      action: () =>
        Alert.alert('Notifications', 'Notification settings coming soon.'),
    },
    {
      title: 'Appearance & Theme',
      subtitle: 'Customize app appearance',
      icon: Palette,
      action: () =>
        Alert.alert('Appearance', 'Theme settings coming soon.'),
    },
    {
      title: 'Privacy Policy',
      subtitle: 'Read our privacy policy',
      icon: ShieldCheck,
      action: () =>
        Alert.alert('Privacy Policy', 'Privacy policy coming soon.'),
    },
    {
      title: 'Help & Support',
      subtitle: 'Get help with the app',
      icon: HelpCircle,
      action: () =>
        Alert.alert('Help & Support', 'Contact app support for assistance.'),
    },
    {
      title: 'About App',
      subtitle: 'App information and version',
      icon: Info,
      action: () =>
        Alert.alert('About App', 'Expense Tracker\nVersion 1.0.0'),
    },
  ];

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          try {
            await clearCurrentUser();
            navigation.reset({
              index: 0,
              routes: [{name: 'Login'}],
            });
          } catch (error) {
            Alert.alert('Error', 'Unable to logout.');
          }
        },
      },
    ]);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#159765" />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor="#F3F8F5" barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}>
          <ArrowLeft size={22} color="#18392B" />
        </TouchableOpacity>

        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>My Profile</Text>
          <Text style={styles.headerSubtitle}>Manage your account</Text>
        </View>

        <TouchableOpacity
          style={styles.headerButton}
          activeOpacity={0.7}
          onPress={() => openEditor('name')}>
          <Pencil size={18} color="#159765" />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* PROFILE */}
        <View style={styles.profileCard}>
          <TouchableOpacity
            style={styles.imageContainer}
            activeOpacity={0.8}
            onPress={handleImagePicker}>
            {profile.photo ? (
              <Image
                source={{uri: profile.photo}}
                style={styles.profileImage}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarText}>
                  {profile.name?.charAt(0)?.toUpperCase() || 'U'}
                </Text>
              </View>
            )}
            <View style={styles.cameraIcon}>
              <Camera size={15} color="#FFFFFF" />
            </View>
          </TouchableOpacity>

          <Text style={styles.profileName}>
            {profile.name || 'Add Your Name'}
          </Text>
          <Text style={styles.profileMobile}>+91 {mobile}</Text>

          <View style={styles.memberBadge}>
            <ShieldCheck size={14} color="#159765" />
            <Text style={styles.memberText}>Personal Account</Text>
          </View>
        </View>


        {/* CURRENT MONTH SUMMARY */}
        <View style={styles.summarySection}>
          <View style={styles.summarySectionHeader}>
            <Text style={styles.summarySectionTitle}>
              This Month - {getCurrentMonthLabel()}
            </Text>
            <Text style={styles.summarySectionSubtitle}>
              Only this month's income and expenses
            </Text>
          </View>

          <View style={styles.summaryContainer}>
            <View style={styles.summaryCard}>
              <View style={styles.summaryIconIncome}>
                <TrendingUp size={20} color="#159765" />
              </View>
              <Text style={styles.summaryLabel}>Monthly Income</Text>
              <Text
                style={styles.incomeAmount}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.7}>
                {formatAmount(monthlyIncome)}
              </Text>
            </View>

            <View style={styles.summaryCard}>
              <View style={styles.summaryIconExpense}>
                <TrendingDown size={20} color="#E85C68" />
              </View>
              <Text style={styles.summaryLabel}>Monthly Expenses</Text>
              <Text
                style={styles.expenseAmount}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.7}>
                {formatAmount(monthlyExpense)}
              </Text>
            </View>

            <View style={styles.summaryCard}>
              <View style={styles.summaryIconBlue}>
                <IndianRupee size={20} color="#4386CF" />
              </View>
              <Text style={styles.summaryLabel}>Monthly Balance</Text>
              <Text
                style={monthlyBalance < 0 ? styles.negativeBalanceAmount : styles.balanceAmount}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.7}>
                {formatAmount(monthlyBalance)}
              </Text>
            </View>

            <View style={styles.summaryCard}>
              <View style={styles.summaryIconPurple}>
                <ReceiptText size={20} color="#8A68CC" />
              </View>
              <Text style={styles.summaryLabel}>Monthly Transactions</Text>
              <Text style={styles.transactionAmount}>
                {currentMonthTransactions.length}
              </Text>
            </View>
          </View>
        </View>

        {/* ACCOUNT DETAILS */}
        <View style={styles.detailsSection}>
          <Text style={styles.sectionTitle}>Account Details</Text>
          <View style={styles.detailsCard}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Mobile Number</Text>
              <Text style={styles.detailValue}>+91 {mobile}</Text>
            </View>

            <View style={styles.detailDivider} />

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Account Type</Text>
              <Text style={styles.detailValue}>Personal</Text>
            </View>

            <View style={styles.detailDivider} />

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Monthly Budget</Text>
              <Text style={styles.detailValue}>
                {formatAmount(getAmount(profile.monthlyBudget))}
              </Text>
            </View>
          </View>
        </View>

        {/* SETTINGS */}
        <View style={styles.settingsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Settings</Text>
            <Text style={styles.sectionSubtitle}>
              Customize your experience
            </Text>
          </View>

          <View style={styles.settingsCard}>
            {settings.map((item, index) => {
              const IconComponent = item.icon;

              return (
                <TouchableOpacity
                  key={item.title}
                  style={[
                    styles.settingItem,
                    index !== settings.length - 1 && styles.settingBorder,
                  ]}
                  activeOpacity={0.7}
                  onPress={item.action}>
                  <View style={styles.settingIcon}>
                    <IconComponent size={20} color="#159765" />
                  </View>

                  <View style={styles.settingTextContainer}>
                    <Text style={styles.settingTitle}>{item.title}</Text>
                    <Text style={styles.settingSubtitle}>
                      {item.subtitle}
                    </Text>
                  </View>

                  <ChevronRight size={19} color="#A0AAA5" />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* LOGOUT */}
        <TouchableOpacity
          style={styles.logoutButton}
          activeOpacity={0.7}
          onPress={handleLogout}>
          <LogOut size={19} color="#E85C68" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>
          Expense Tracker · Version 1.0.0
        </Text>
      </ScrollView>

      {/* EDIT PROFILE MODAL */}
      <Modal
        visible={editorVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setEditorVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {editorType === 'name' ? 'Edit Your Name' : 'Monthly Budget'}
              </Text>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setEditorVisible(false)}>
                <X size={22} color="#18392B" />
              </TouchableOpacity>
            </View>

            <Text style={styles.inputLabel}>
              {editorType === 'name' ? 'Full Name' : 'Enter Monthly Budget'}
            </Text>

            <TextInput
              style={styles.modalInput}
              value={inputValue}
              onChangeText={setInputValue}
              placeholder={
                editorType === 'name'
                  ? 'Enter your name'
                  : 'Enter budget amount'
              }
              placeholderTextColor="#A0AAA4"
              keyboardType={editorType === 'budget' ? 'numeric' : 'default'}
              autoCapitalize="words"
              maxLength={editorType === 'name' ? 50 : 12}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                activeOpacity={0.7}
                onPress={() => setEditorVisible(false)}
                disabled={saving}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.saveButton}
                activeOpacity={0.7}
                onPress={handleSave}
                disabled={saving}>
                {saving ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.saveText}>Save Changes</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ProfileScreen;
