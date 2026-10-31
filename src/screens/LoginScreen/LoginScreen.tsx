
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
  Phone,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  X,
} from 'lucide-react-native';

import SweetAlert from '../../components/SweetAlert/SweetAlert';

import { sendLoginOtp } from '../../services/authService';

import { styles } from './LoginScreen.styles';

import { COLORS } from '../../constants/colors';

import { FONTS } from '../../constants/fonts';

type AlertType = {
  show: boolean;
  title: string;
  message: string;
  confirmText: string;
  onConfirm?: () => void;
};

const LoginScreen = ({ navigation }: any) => {
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const [alertData, setAlertData] = useState<AlertType>({
    show: false,
    title: '',
    message: '',
    confirmText: 'OK',
  });

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(35)).current;
  const logoScale = useRef(new Animated.Value(0.7)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),

      Animated.timing(translateY, {
        toValue: 0,
        duration: 900,
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
          toValue: 1.045,
          duration: 1300,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1300,
          useNativeDriver: true,
        }),
      ]),
    );

    const rotate = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 18000,
        useNativeDriver: true,
      }),
    );

    pulse.start();
    rotate.start();

    return () => {
      pulse.stop();
      rotate.stop();
    };
  }, [fadeAnim, translateY, logoScale, pulseAnim, rotateAnim]);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // SweetAlert helper
  const showSweetAlert = (
    title: string,
    message: string,
    confirmText = 'OK',
    onConfirm?: () => void,
  ) => {
    setAlertData({
      show: true,
      title,
      message,
      confirmText,
      onConfirm,
    });
  };

  const closeSweetAlert = () => {
    setAlertData(prev => ({
      ...prev,
      show: false,
    }));
  };

  const handleAlertConfirm = () => {
    const callback = alertData.onConfirm;

    closeSweetAlert();

    if (callback) {
      callback();
    }
  };

  // Get OTP
  const handleGetOTP = async () => {
    const number = mobile.replace(/\D/g, '');

    if (!/^[6-9]\d{9}$/.test(number)) {
      showSweetAlert(
        'Invalid Mobile Number',
        'Please enter a valid 10-digit Indian mobile number.',
      );
      return;
    }

    try {
      setLoading(true);

      const response = await sendLoginOtp(number);

      showSweetAlert(
        'OTP Sent Successfully!',
        `Your demo OTP is ${response.otp}. Please use it to continue.`,
        'Continue',
        () => {
          navigation.navigate('OtpVerification', {
            mobile: number,
          });
        },
      );
    } catch (error: any) {
      showSweetAlert(
        'OTP Failed',
        error?.message || 'Something went wrong. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.background}
      />

      {/* Background Design */}
      <Animated.View
        style={[
          styles.backgroundCircleLarge,
          { transform: [{ rotate: rotateInterpolate }] },
        ]}
      />

      <View style={styles.backgroundCircleSmall} />
      <View style={styles.backgroundDotOne} />
      <View style={styles.backgroundDotTwo} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
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
          {/* Brand */}
          <View style={styles.topBrand}>
            <View style={styles.brandIcon}>
              <Wallet
                size={25}
                color="#FFFFFF"
                strokeWidth={2.5}
              />
            </View>

            <Text style={styles.brandText}>
              Expense
              <Text style={styles.brandGreen}>Tracker</Text>
            </Text>

            <Sparkles size={17} color="#35A96B" />
          </View>

          <Text style={styles.brandTagline}>
            SMART MONEY MANAGEMENT
          </Text>

          {/* Animated Wallet Logo */}
          <Animated.View
            style={[
              styles.logoWrapper,
              {
                opacity: fadeAnim,
                transform: [
                  { scale: logoScale },
                  { scale: pulseAnim },
                ],
              },
            ]}
          >
            <View style={styles.logoOuterCircle}>
              <View style={styles.logoMiddleCircle}>
                <View style={styles.logoInnerCircle}>
                  <Wallet
                    size={100}
                    color="#229B67"
                    strokeWidth={1.7}
                  />

                  <View style={styles.walletBadge}>
                    <TrendingUp
                      size={25}
                      color="#FFFFFF"
                      strokeWidth={2.5}
                    />
                  </View>
                </View>
              </View>
            </View>
          </Animated.View>

          {/* Heading */}
          <View style={styles.heading}>
            <Text style={styles.title}>
              Welcome Back!
            </Text>

            <Text style={styles.titleGreen}>
              Manage Your Money
            </Text>

            <Text style={styles.subtitle}>
              Login with your mobile number to track
              {'\n'}
              your income and expenses.
            </Text>
          </View>

          {/* Login Form */}
          <View style={styles.form}>
            <Text style={styles.label}>
              Mobile Number
            </Text>

            <View
              style={[
                styles.phoneInput,
                isFocused && styles.phoneInputFocused,
              ]}
            >
              <View style={styles.phoneIcon}>
                <Phone size={19} color="#239D64" />
              </View>

              <Text style={styles.countryCode}>
                +91
              </Text>

              <View style={styles.separator} />

              <TextInput
                style={styles.input}
                placeholder="Enter mobile number"
                placeholderTextColor="#A2B0A7"
                keyboardType="number-pad"
                maxLength={10}
                value={mobile}
                onChangeText={value =>
                  setMobile(
                    value.replace(/\D/g, '').slice(0, 10),
                  )
                }
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />

              {mobile.length === 10 && (
                <ShieldCheck
                  size={21}
                  color="#239D64"
                />
              )}
            </View>

            <Text style={styles.helperText}>
              Enter your 10-digit mobile number.
            </Text>

            {/* Get OTP Button */}
            <TouchableOpacity
              activeOpacity={0.85}
              style={[
                styles.button,
                loading && styles.buttonDisabled,
              ]}
              onPress={handleGetOTP}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <>
                  <Text style={styles.buttonText}>
                    Get OTP
                  </Text>

                  <View style={styles.buttonArrow}>
                    <ArrowRight
                      size={23}
                      color="#239D64"
                      strokeWidth={2.5}
                    />
                  </View>
                </>
              )}
            </TouchableOpacity>
          </View>

          {/* Security */}
          <View style={styles.secureRow}>
            <ShieldCheck size={16} color="#239D64" />

            <Text style={styles.secureText}>
              Your information is safe and secure.
            </Text>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <View style={styles.footerLine} />

            <Text style={styles.footerText}>
              YOUR MONEY, YOUR CONTROL
            </Text>
          </View>
        </Animated.View>
      </ScrollView>

      {/* SweetAlert Popup */}
       <SweetAlert
        visible={alertData.show}
        title={alertData.title}
        message={alertData.message}
        type="success"
        confirmText={alertData.confirmText}
        onConfirm={handleAlertConfirm}
      />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
