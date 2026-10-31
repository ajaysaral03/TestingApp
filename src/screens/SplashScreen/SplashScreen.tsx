
import React, { useEffect } from 'react';

import {
  View,
  Text,
  Animated,
  StatusBar,
} from 'react-native';

import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PieChart,
  ShieldCheck,
  Sparkles,
} from 'lucide-react-native';

import { styles } from './SplashScreen.styles';

import { useSplashAnimation } from './SplashScreen.animation';

import { COLORS } from '../../constants/colors';

const SplashScreen = ({ navigation }: any) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  const {
    logoScale,
    logoOpacity,
    contentOpacity,
    contentTranslate,
    pulse,
    rotateInterpolate,
    progressWidth,
    progressPercent,
  } = useSplashAnimation();

  return (
    <View style={styles.container}>

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

      {/* Main Content */}

      <View style={styles.mainContent}>

        {/* Brand */}

        <Animated.View
          style={[
            styles.topBrand,
            { opacity: contentOpacity },
          ]}
        >

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

        </Animated.View>

        <Text style={styles.brandTagline}>
          SMART MONEY MANAGEMENT
        </Text>

        {/* Animated Wallet Logo */}

        <Animated.View
          style={[
            styles.logoWrapper,
            {
              opacity: logoOpacity,
              transform: [
                { scale: logoScale },
                { scale: pulse },
              ],
            },
          ]}
        >

          <View style={styles.logoOuterCircle}>

            <View style={styles.logoMiddleCircle}>

              <View style={styles.logoInnerCircle}>

                <Wallet
                  size={110}
                  color="#229B67"
                  strokeWidth={1.7}
                />

                <View style={styles.walletBadge}>
                  <TrendingUp
                    size={28}
                    color="#FFFFFF"
                    strokeWidth={2.5}
                  />
                </View>

              </View>

            </View>

          </View>

        </Animated.View>

        {/* Title */}

        <Animated.View
          style={[
            styles.content,
            {
              opacity: contentOpacity,
              transform: [
                { translateY: contentTranslate },
              ],
            },
          ]}
        >

          <Text style={styles.title}>
            Track Your Money
          </Text>

          <Text style={styles.titleGreen}>
            Manage Your Future
          </Text>

          <Text style={styles.subtitle}>
            Manage income, expenses and savings
            {'\n'}
            easily with ExpenseTracker.
          </Text>

          {/* Features */}

          <View style={styles.featureRow}>

            <View style={styles.feature}>
              <View style={styles.featureIcon}>
                <TrendingUp size={27} color="#25A866" />
              </View>

              <Text style={styles.featureText}>
                Income
              </Text>
            </View>

            <View style={styles.feature}>
              <View style={styles.featureIcon}>
                <TrendingDown size={27} color="#E45D5D" />
              </View>

              <Text style={styles.featureText}>
                Expenses
              </Text>
            </View>

            <View style={styles.feature}>
              <View style={styles.featureIcon}>
                <PieChart size={27} color="#299ED5" />
              </View>

              <Text style={styles.featureText}>
                Analytics
              </Text>
            </View>

            <View style={styles.feature}>
              <View style={styles.featureIcon}>
                <ShieldCheck size={27} color="#25A866" />
              </View>

              <Text style={styles.featureText}>
                Secure
              </Text>
            </View>

          </View>

        </Animated.View>

      </View>

      {/* Bottom Loading */}

      <Animated.View
        style={[
          styles.bottom,
          { opacity: contentOpacity },
        ]}
      >

        <View style={styles.loadingHeader}>

          <Text style={styles.loadingText}>
            Preparing your experience...
          </Text>

          <Text style={styles.loadingPercent}>
            {progressPercent}%
          </Text>

        </View>

        <View style={styles.progressBackground}>

          <Animated.View
            style={[
              styles.progress,
              { width: progressWidth },
            ]}
          />

        </View>

        <Text style={styles.footerText}>
          YOUR MONEY, YOUR CONTROL
        </Text>

      </Animated.View>

    </View>
  );
};

export default SplashScreen;
