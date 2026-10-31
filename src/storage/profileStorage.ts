
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface ProfileData {
  name: string;
  photo: string | null;
  monthlyBudget: number;
}

const PROFILE_STORAGE_KEY = '@expense_tracker/profile';

export const getProfile = async (
  mobile: string,
): Promise<ProfileData> => {
  const number = mobile.replace(/\D/g, '');

  if (!/^[6-9]\d{9}$/.test(number)) {
    throw new Error('Invalid mobile number');
  }

  const key = `${PROFILE_STORAGE_KEY}/${number}`;

  const data = await AsyncStorage.getItem(key);

  if (!data) {
    return {
      name: '',
      photo: null,
      monthlyBudget: 30000,
    };
  }

  const parsed = JSON.parse(data);

  return {
    name: parsed.name || '',
    photo: parsed.photo || null,
    monthlyBudget: Number(parsed.monthlyBudget) || 30000,
  };
};

export const saveProfile = async (
  mobile: string,
  profile: ProfileData,
): Promise<void> => {
  const number = mobile.replace(/\D/g, '');

  if (!/^[6-9]\d{9}$/.test(number)) {
    throw new Error('Invalid mobile number');
  }

  const key = `${PROFILE_STORAGE_KEY}/${number}`;

  await AsyncStorage.setItem(key, JSON.stringify(profile));

  console.log('Profile saved successfully');
};
