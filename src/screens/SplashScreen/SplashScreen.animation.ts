
import { useEffect, useRef, useState } from 'react';
import { Animated, Easing } from 'react-native';

export const useSplashAnimation = () => {
  const logoScale = useRef(new Animated.Value(0.65)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;
  const contentTranslate = useRef(new Animated.Value(25)).current;
  const pulse = useRef(new Animated.Value(1)).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const progress = useRef(new Animated.Value(0)).current;

  const [progressPercent, setProgressPercent] = useState(0);

  const rotateInterpolate = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  useEffect(() => {
    const listenerId = progress.addListener(({ value }) => {
      setProgressPercent(Math.min(100, Math.floor(value * 100)));
    });

    const entranceAnimation = Animated.sequence([
      Animated.parallel([
        Animated.timing(logoScale, {
          toValue: 1,
          duration: 650,
          easing: Easing.out(Easing.back(1.4)),
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(contentOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(contentTranslate, {
          toValue: 0,
          duration: 500,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ]);

    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1.04,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
      ]),
    );

    const rotationAnimation = Animated.loop(
      Animated.timing(rotate, {
        toValue: 1,
        duration: 18000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );

    const progressAnimation = Animated.timing(progress, {
      toValue: 1,
      duration: 3000,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    });

    entranceAnimation.start();
    pulseAnimation.start();
    rotationAnimation.start();
    progressAnimation.start();

    return () => {
      progress.removeListener(listenerId);
      entranceAnimation.stop();
      pulseAnimation.stop();
      rotationAnimation.stop();
      progressAnimation.stop();
    };
  }, [
    logoScale,
    logoOpacity,
    contentOpacity,
    contentTranslate,
    pulse,
    rotate,
    progress,
  ]);

  return {
    logoScale,
    logoOpacity,
    contentOpacity,
    contentTranslate,
    pulse,
    rotateInterpolate,
    progressWidth,
    progressPercent,
  };
};
