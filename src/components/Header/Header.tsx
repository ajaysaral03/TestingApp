
import React, { useCallback, useState } from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import {
  Bell,
  UserRound,
} from 'lucide-react-native';

import { useFocusEffect } from '@react-navigation/native';

import { getCurrentUser } from '../../storage/authStorage';
import { getProfile } from '../../storage/profileStorage';

import type { ProfileData } from '../../storage/profileStorage';

import { styles } from './Header.styles';

interface HeaderProps {
  onNotificationPress?: () => void;
  onSettingsPress?: () => void;
}

const DEFAULT_PROFILE: ProfileData = {
  name: '',
  photo: null,
  monthlyBudget: 30000,
};

const Header = ({ onNotificationPress }: HeaderProps) => {
  const [profile, setProfile] =
    useState<ProfileData>(DEFAULT_PROFILE);

  const [mobile, setMobile] = useState('');
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(true);

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? 'Good Morning'
      : hour < 17
      ? 'Good Afternoon'
      : 'Good Evening';

  const loadUserData = useCallback(async () => {
    try {
      const currentMobile = await getCurrentUser();

      if (!currentMobile) {
        setMobile('');
        setProfile(DEFAULT_PROFILE);
        return;
      }

      setMobile(currentMobile);

      const savedProfile = await getProfile(currentMobile);

      setProfile(savedProfile || DEFAULT_PROFILE);
      setImageError(false);
    } catch (error) {
      console.log('Header Profile Error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadUserData();
    }, [loadUserData])
  );

  const userName = profile.name?.trim() || 'User';

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={['top']}
    >
      <StatusBar
        backgroundColor="#F5F8F6"
        barStyle="dark-content"
        translucent={false}
      />

      <View style={styles.container}>
        <View style={styles.profileSection}>
          {profile.photo && !imageError ? (
            <Image
              source={{ uri: profile.photo }}
              style={styles.avatar}
              resizeMode="cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <View style={styles.avatarPlaceholder}>
              {userName === 'User' ? (
                <UserRound size={23} color="#159765" />
              ) : (
                <Text style={styles.avatarText}>
                  {userName.charAt(0).toUpperCase()}
                </Text>
              )}
            </View>
          )}

          <View style={styles.userDetails}>
            <Text style={styles.greeting}>
              {greeting}
            </Text>

            <Text
              style={styles.userName}
              numberOfLines={1}
            >
              {loading ? 'Loading...' : `Hi, ${userName} 👋`}
            </Text>

            <Text
              style={styles.phoneNumber}
              numberOfLines={1}
            >
              {mobile
                ? `+91 ${mobile}`
                : 'Mobile number unavailable'}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={onNotificationPress}
          activeOpacity={0.7}
        >
          <Bell size={21} color="#18392B" />
          <View style={styles.notificationDot} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Header;
