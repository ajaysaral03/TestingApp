
import React, { useEffect } from 'react';

import {
  View,
  Text,
  Animated,
  StatusBar,
  Image,
} from 'react-native';

import {
  Droplets,
  ShieldCheck,
  Truck,
  Users,
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
          {
            transform: [
              { rotate: rotateInterpolate },
            ],
          },
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
            {
              opacity: contentOpacity,
            },
          ]}
        >

          <View style={styles.brandIcon}>

            <Droplets
              size={24}
              color="#229BD5"
              strokeWidth={2.5}
            />

          </View>

          <Text style={styles.brandText}>
            Milk
            <Text style={styles.brandGreen}>
              Mate
            </Text>
          </Text>

          <Sparkles
            size={17}
            color="#35A9D6"
          />

        </Animated.View>

        <Text style={styles.brandTagline}>
          YOUR MILK BUSINESS PARTNER
        </Text>

        {/* Bike Rider Circular Logo */}

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

                <Image
                  source={require('../../assets/images/download.png')}
                  style={styles.deliveryImage}
                  resizeMode="contain"
                />

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
            Fresh Milk
          </Text>

          <Text style={styles.titleGreen}>
            Delivered Daily
          </Text>

          <Text style={styles.subtitle}>
            Manage your milk business easily
            {'\n'}
            with MilkMate
          </Text>

          {/* Features */}

          <View style={styles.featureRow}>

            {/* Fresh */}

            <View style={styles.feature}>

              <View style={styles.featureIcon}>
                <Droplets
                  size={28}
                  color="#299ED5"
                />
              </View>

              <Text style={styles.featureText}>
                Fresh
              </Text>

            </View>

            {/* Pure */}

            <View style={styles.feature}>

              <View style={styles.featureIcon}>
                <ShieldCheck
                  size={29}
                  color="#2DAE5B"
                  strokeWidth={2.5}
                />
              </View>

              <Text style={styles.featureText}>
                Pure
              </Text>

            </View>

            {/* Daily */}

            <View style={styles.feature}>

              <View style={styles.featureIcon}>
                <Truck
                  size={29}
                  color="#299ED5"
                />
              </View>

              <Text style={styles.featureText}>
                Daily
              </Text>

            </View>

            {/* Happy Customers */}

            <View style={styles.feature}>

              <View style={styles.featureIcon}>
                <Users
                  size={29}
                  color="#299ED5"
                />
              </View>

              <Text style={styles.featureText}>
                Happy
                {'\n'}
                Customers
              </Text>

            </View>

          </View>

        </Animated.View>

      </View>

      {/* Bottom Loading */}

      <Animated.View
        style={[
          styles.bottom,
          {
            opacity: contentOpacity,
          },
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
              {
                width: progressWidth,
              },
            ]}
          />

        </View>

        <Text style={styles.footerText}>
          🌱  FRESHNESS YOU CAN TRUST
        </Text>

      </Animated.View>

    </View>
  );
};

export default SplashScreen;
