
import AsyncStorage from '@react-native-async-storage/async-storage';

const CURRENT_USER_KEY = '@expense_tracker/current_user_mobile';

// Save logged-in user's mobile number
export const saveCurrentUser = async (
  mobile: string,
): Promise<void> => {
  const number = mobile.replace(/\D/g, '');

  if (!/^[6-9]\d{9}$/.test(number)) {
    throw new Error('Invalid mobile number.');
  }

  await AsyncStorage.setItem(CURRENT_USER_KEY, number);
};

// Get logged-in user's mobile number
export const getCurrentUser = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(CURRENT_USER_KEY);
  } catch (error) {
    console.log('Get current user error:', error);
    return null;
  }
};

// Logout user
export const clearCurrentUser = async (): Promise<void> => {
  await AsyncStorage.removeItem(CURRENT_USER_KEY);
};

// Check whether user is logged in
export const isUserLoggedIn = async (): Promise<boolean> => {
  const mobile = await getCurrentUser();
  return mobile !== null;
};
