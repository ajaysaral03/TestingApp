
import React, { useEffect, useRef, useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
  Modal,
  Pressable,
  Image,
  ActivityIndicator,
} from 'react-native';

import {
  Smartphone,
  ArrowRight,
  ShieldCheck,
  X,
  Check,
  AlertCircle,
  Droplets,
  Milk,
  Truck,
  Sparkles,
} from 'lucide-react-native';

import { styles } from './LoginScreen.styles';

import {
  sendLoginOtp,
} from '../../services/authService';

type AlertType = 'success' | 'error';

const LoginScreen = ({ navigation }: any) => {

  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState<AlertType>('error');
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const screenOpacity = useRef(new Animated.Value(0)).current;
  const screenTranslate = useRef(new Animated.Value(25)).current;

  const logoScale = useRef(new Animated.Value(0.8)).current;
  const logoPulse = useRef(new Animated.Value(1)).current;

  const buttonScale = useRef(new Animated.Value(1)).current;

  const floatOne = useRef(new Animated.Value(0)).current;
  const floatTwo = useRef(new Animated.Value(0)).current;
  const floatThree = useRef(new Animated.Value(0)).current;

  const modalScale = useRef(new Animated.Value(0.8)).current;
  const modalOpacity = useRef(new Animated.Value(0)).current;

  // Screen Animation

  useEffect(() => {

    const entrance = Animated.parallel([
      Animated.timing(screenOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),

      Animated.timing(screenTranslate, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),

      Animated.spring(logoScale, {
        toValue: 1,
        friction: 5,
        tension: 70,
        useNativeDriver: true,
      }),
    ]);

    entrance.start();

    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(logoPulse, {
          toValue: 1.04,
          duration: 1000,
          useNativeDriver: true,
        }),

        Animated.timing(logoPulse, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    );

    const createFloat = (value: Animated.Value, duration: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(value, {
            toValue: 1,
            duration,
            useNativeDriver: true,
          }),

          Animated.timing(value, {
            toValue: 0,
            duration,
            useNativeDriver: true,
          }),
        ]),
      );

    const animations = [
      pulseAnimation,
      createFloat(floatOne, 1300),
      createFloat(floatTwo, 1600),
      createFloat(floatThree, 1400),
    ];

    animations.forEach(animation => animation.start());

    return () => {
      entrance.stop();
      animations.forEach(animation => animation.stop());
    };

  }, []);

  // Alert Animation

  useEffect(() => {

    if (!alertVisible) {
      return;
    }

    modalScale.setValue(0.8);
    modalOpacity.setValue(0);

    Animated.parallel([
      Animated.spring(modalScale, {
        toValue: 1,
        friction: 6,
        tension: 90,
        useNativeDriver: true,
      }),

      Animated.timing(modalOpacity, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start();

  }, [alertVisible]);

  // Show Alert

  const showAlert = (
    type: AlertType,
    title: string,
    message: string,
  ) => {
    setAlertType(type);
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertVisible(true);
  };

  const closeAlert = () => {
    setAlertVisible(false);
  };

  // Get OTP API using Fetch service
const handleGetOTP = async () => {
  const cleanMobile = mobile.replace(/\D/g, '');

  if (!/^[6-9][0-9]{9}$/.test(cleanMobile)) {
    showAlert(
      'error',
      'Invalid Mobile Number',
      'Please enter a valid 10-digit number starting with 6, 7, 8 or 9.',
    );
    return;
  }

  try {
    setLoading(true);

    const response = await sendLoginOtp(cleanMobile);

    if (response.success) {
      showAlert(
        'success',
        'OTP Generated Successfully',
        `Your Demo OTP is ${response.otp}`,
      );
    }
  } catch (error: any) {
    showAlert(
      'error',
      'Something Went Wrong',
      error.message || 'Please try  again.',
    );
  } finally {
    setLoading(false);
  }
};

  // Continue to OTP Screen only after successful API response
  const handleContinue = () => {
    setAlertVisible(false);

    navigation.navigate('OtpVerification', {
      mobile,
    });
  };

  // Button Animation

  const handlePressIn = () => {

    Animated.spring(buttonScale, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();

  };

  const handlePressOut = () => {

    Animated.spring(buttonScale, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();

  };

  const isSuccess = alertType === 'success';

  const floatY = (value: Animated.Value) =>
    value.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -10],
    });

  return (

    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >

      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F8FCFF"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >

        <Animated.View
          style={[
            styles.page,
            {
              opacity: screenOpacity,
              transform: [{ translateY: screenTranslate }],
            },
          ]}
        >

          {/* Background */}

          <View style={styles.backgroundCircleOne} />
          <View style={styles.backgroundCircleTwo} />

          {/* Brand */}

          <View style={styles.brandRow}>

            <View style={styles.brandIcon}>
              <Droplets
                size={24}
                color="#229BD5"
              />
            </View>

            <Text style={styles.brandText}>
              Milk
              <Text style={styles.brandGreen}>Mate</Text>
            </Text>

            <Sparkles
              size={17}
              color="#35A9D6"
            />

          </View>

          <Text style={styles.brandTagline}>
            YOUR MILK BUSINESS PARTNER
          </Text>

          {/* Milk Delivery Logo */}

          <View style={styles.hero}>

            <Animated.View
              style={[
                styles.floatingIcon,
                {
                  left: 12,
                  top: 20,
                  transform: [{ translateY: floatY(floatOne) }],
                },
              ]}
            >
              <Milk size={24} color="#299ED5" />
            </Animated.View>

            <Animated.View
              style={[
                styles.floatingIcon,
                {
                  right: 12,
                  top: 20,
                  transform: [{ translateY: floatY(floatTwo) }],
                },
              ]}
            >
              <Truck size={24} color="#28A65A" />
            </Animated.View>

            <Animated.View
              style={[
                styles.floatingIcon,
                {
                  right: 15,
                  bottom: 18,
                  transform: [{ translateY: floatY(floatThree) }],
                },
              ]}
            >
              <Droplets size={23} color="#299ED5" />
            </Animated.View>

            <Animated.View
              style={[
                styles.heroOuterCircle,
                {
                  transform: [
                    { scale: logoScale },
                    { scale: logoPulse },
                  ],
                },
              ]}
            >

              <View style={styles.heroMiddleCircle}>

                <View style={styles.heroInnerCircle}>

                  <Image
                    source={require('../../assets/images/download.png')}
                    style={styles.deliveryImage}
                    resizeMode="contain"
                  />

                </View>

              </View>

            </Animated.View>

          </View>

          {/* Heading */}

          <View style={styles.heading}>

            <Text style={styles.eyebrow}>
              WELCOME TO MILKMATE
            </Text>

            <Text style={styles.title}>
              Fresh Milk
            </Text>

            <Text style={styles.titleGreen}>
              Delivered Daily!
            </Text>

            <Text style={styles.subtitle}>
              Manage your milk business easily
              {'\n'}
              with MilkMate.
            </Text>

          </View>

          {/* Login Form */}

          <View style={styles.form}>

            <Text style={styles.label}>
              Enter Your Mobile Number
            </Text>

            <View style={styles.phoneInput}>

              <View style={styles.phoneIcon}>
                <Smartphone
                  size={21}
                  color="#299ED5"
                />
              </View>

              <Text style={styles.countryCode}>
                +91
              </Text>

              <View style={styles.separator} />

              <TextInput
                style={styles.input}
                placeholder="10-digit mobile number"
                placeholderTextColor="#AAB5C0"
                keyboardType="number-pad"
                maxLength={10}
                value={mobile}
                onChangeText={text =>
                  setMobile(text.replace(/\D/g, '').slice(0, 10))
                }
                returnKeyType="done"
              />

              {mobile.length === 10 && (
                <Check
                  size={21}
                  color="#28A65A"
                />
              )}

            </View>

            <Text style={styles.helperText}>
              We will send a 4-digit OTP to verify your number.
            </Text>

            {/* Continue Button */}

            <Animated.View
              style={{
                transform: [{ scale: buttonScale }],
              }}
            >

              <TouchableOpacity
                style={[
                  styles.button,
                  loading && styles.buttonDisabled,
                ]}
                activeOpacity={0.9}
                onPress={handleGetOTP}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
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
                        size={21}
                        color="#239B68"
                      />
                    </View>
                  </>

                )}

              </TouchableOpacity>

            </Animated.View>

            {/* Security */}

            <View style={styles.secureRow}>

              <ShieldCheck
                size={18}
                color="#28A65A"
              />

              <Text style={styles.secureText}>
                Your information is safe and secure.
              </Text>

            </View>

          </View>

          {/* Footer */}

          <View style={styles.footer}>

            <View style={styles.footerFeature}>

              <Truck size={17} color="#299ED5" />

              <Text style={styles.footerFeatureText}>
                Daily Delivery
              </Text>

              <View style={styles.footerDot} />

              <ShieldCheck size={17} color="#28A65A" />

              <Text style={styles.footerFeatureText}>
                Pure Milk
              </Text>

            </View>

            <Text style={styles.footerText}>
              FRESHNESS YOU CAN TRUST
            </Text>

          </View>

        </Animated.View>

      </ScrollView>

      {/* SweetAlert Popup */}

      <Modal
        visible={alertVisible}
        transparent
        animationType="none"
        statusBarTranslucent
        onRequestClose={closeAlert}
      >

        <View style={styles.modalRoot}>

          <Animated.View
            style={[
              styles.modalOverlay,
              { opacity: modalOpacity },
            ]}
          />

          <Pressable
            style={styles.dismissArea}
            onPress={closeAlert}
          />

          <Animated.View
            style={[
              styles.alertCard,
              {
                opacity: modalOpacity,
                transform: [{ scale: modalScale }],
              },
            ]}
          >

            <TouchableOpacity
              style={styles.closeButton}
              onPress={closeAlert}
            >
              <X size={19} color="#718092" />
            </TouchableOpacity>

            <View
              style={[
                styles.alertIcon,
                isSuccess
                  ? styles.alertIconSuccess
                  : styles.alertIconError,
              ]}
            >

              {isSuccess ? (

                <Check
                  size={35}
                  color="#FFFFFF"
                  strokeWidth={2.5}
                />

              ) : (

                <AlertCircle
                  size={35}
                  color="#FFFFFF"
                />

              )}

            </View>

            <Text style={styles.alertTitle}>
              {alertTitle}
            </Text>

            <Text style={styles.alertMessage}>
              {alertMessage}
            </Text>

            <TouchableOpacity
              style={[
                styles.alertButton,
                !isSuccess && styles.alertButtonError,
              ]}
              activeOpacity={0.85}
              onPress={isSuccess ? handleContinue : closeAlert}
            >

              <Text style={styles.alertButtonText}>
                {isSuccess ? 'Continue to OTP' : 'Try Again'}
              </Text>

              {isSuccess && (
                <ArrowRight size={18} color="#FFFFFF" />
              )}

            </TouchableOpacity>

          </Animated.View>

        </View>

      </Modal>

    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
