
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
} from '../../services/transactionService';

import {RootStackParamList} from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

type EditorType = 'name' | 'budget' | null;

const DEFAULT_PROFILE: ProfileData = {
  name: '',
  photo: null,
  monthlyBudget: 30000,
};

const formatAmount = (amount: number) =>
  `₹${amount.toLocaleString('en-IN')}`;

const ProfileScreen = ({navigation}: Props) => {
  const [mobile, setMobile] = useState('');
  const [profile, setProfile] = useState<ProfileData>(DEFAULT_PROFILE);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [editorVisible, setEditorVisible] = useState(false);
  const [editorType, setEditorType] = useState<EditorType>(null);
  const [inputValue, setInputValue] = useState('');

  // TRANSACTION CALCULATIONS
  const totalIncome = transactions
    .filter(item => item.type === 'income')
    .reduce((sum, item) => sum + Number(item.amount || 0), 0);

  const totalExpense = transactions
    .filter(item => item.type === 'expense')
    .reduce((sum, item) => sum + Number(item.amount || 0), 0);

  const balance = totalIncome - totalExpense;

  // LOAD PROFILE AND TRANSACTIONS
  const loadProfileData = useCallback(async () => {
    try {
      setLoading(true);

      // IMPORTANT: getCurrentUser returns mobile string directly.
      const currentMobile = await getCurrentUser();

      console.log('Logged-in mobile:', currentMobile);

      if (!currentMobile) {
        setMobile('');
        setProfile(DEFAULT_PROFILE);
        setTransactions([]);
        navigation.replace('Login');
        return;
      }

      // Normalize mobile number.
      const userMobile = String(currentMobile)
        .replace(/\D/g, '')
        .slice(-10);

      if (!/^[6-9]\d{9}$/.test(userMobile)) {
        throw new Error('Invalid logged-in mobile number.');
      }

      setMobile(userMobile);

      // Load profile for logged-in user.
      const savedProfile = await getProfile(userMobile);
      setProfile(savedProfile);

      // IMPORTANT: Pass mobile to getTransactions.
      const savedTransactions = await getTransactions(userMobile);

      console.log('Profile data:', savedProfile);
      console.log('Transaction data:', savedTransactions);

      setTransactions(savedTransactions);
    } catch (error) {
      console.log('Profile loading error:', error);

      Alert.alert(
        'Profile Error',
        error instanceof Error
          ? error.message
          : 'Unable to load profile data.',
      );
    } finally {
      setLoading(false);
    }
  }, [navigation]);

  // RELOAD WHEN PROFILE SCREEN OPENS
  useFocusEffect(
    useCallback(() => {
      loadProfileData();
    }, [loadProfileData]),
  );

  // OPEN EDIT MODAL
  const openEditor = (type: EditorType) => {
    setEditorType(type);

    if (type === 'name') {
      setInputValue(profile.name);
    } else if (type === 'budget') {
      setInputValue(String(profile.monthlyBudget));
    }

    setEditorVisible(true);
  };

  // SAVE PROFILE
  const handleSave = async () => {
    if (!mobile) {
      Alert.alert('Error', 'Mobile number not found.');
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
      const newBudget = Number(inputValue);

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

  // PROFILE IMAGE PICKER
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

      Alert.alert('Success', 'Profile photo updated successfully.');
    } catch (error) {
      console.log('Image picker error:', error);
      Alert.alert('Error', 'Unable to save profile photo.');
    }
  };

  // SETTINGS OPTIONS
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

  // LOGOUT
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
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
      ],
    );
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
      <StatusBar
        backgroundColor="#F3F8F5"
        barStyle="dark-content"
      />

      {/* FIXED HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.goBack()}>
          <ArrowLeft size={22} color="#18392B" />
        </TouchableOpacity>

        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>My Profile</Text>
          <Text style={styles.headerSubtitle}>Manage your account</Text>
        </View>

        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => openEditor('name')}>
          <Pencil size={18} color="#159765" />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>

        {/* PROFILE CARD */}
        <View style={styles.profileCard}>
          <TouchableOpacity
            style={styles.imageContainer}
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

        {/* INCOME AND EXPENSE */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <View style={styles.summaryIconIncome}>
              <TrendingUp size={20} color="#159765" />
            </View>

            <Text style={styles.summaryLabel}>Total Income</Text>
            <Text style={styles.incomeAmount}>
              {formatAmount(totalIncome)}
            </Text>
          </View>

          <View style={styles.summaryCard}>
            <View style={styles.summaryIconExpense}>
              <TrendingDown size={20} color="#E85C68" />
            </View>

            <Text style={styles.summaryLabel}>Total Expenses</Text>
            <Text style={styles.expenseAmount}>
              {formatAmount(totalExpense)}
            </Text>
          </View>
        </View>

        {/* BALANCE AND TRANSACTIONS */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <View style={styles.summaryIconBlue}>
              <IndianRupee size={20} color="#4386CF" />
            </View>

            <Text style={styles.summaryLabel}>Current Balance</Text>
            <Text style={styles.balanceAmount}>
              {formatAmount(balance)}
            </Text>
          </View>

          <View style={styles.summaryCard}>
            <View style={styles.summaryIconPurple}>
              <ReceiptText size={20} color="#8A68CC" />
            </View>

            <Text style={styles.summaryLabel}>Transactions</Text>
            <Text style={styles.transactionAmount}>
              {transactions.length}
            </Text>
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
                {formatAmount(profile.monthlyBudget)}
              </Text>
            </View>
          </View>
        </View>

        {/* SETTINGS - 8 OPTIONS */}
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
                    index !== settings.length - 1 &&
                      styles.settingBorder,
                  ]}
                  activeOpacity={0.7}
                  onPress={item.action}>
                  <View style={styles.settingIcon}>
                    <IconComponent size={20} color="#159765" />
                  </View>

                  <View style={styles.settingTextContainer}>
                    <Text style={styles.settingTitle}>
                      {item.title}
                    </Text>
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
          onPress={handleLogout}>
          <LogOut size={19} color="#E85C68" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>
          Expense Tracker · Version 1.0.0
        </Text>
      </ScrollView>

      {/* EDIT MODAL */}
      <Modal
        visible={editorVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setEditorVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {editorType === 'name'
                  ? 'Edit Your Name'
                  : 'Monthly Budget'}
              </Text>

              <TouchableOpacity
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
              keyboardType={
                editorType === 'budget' ? 'numeric' : 'default'
              }
              autoCapitalize="words"
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setEditorVisible(false)}
                disabled={saving}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.saveButton}
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
