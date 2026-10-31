
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  TRANSACTIONS_STORAGE_KEY,
  Transaction,
} from '../types/transaction';

import { getCurrentUser } from '../storage/authStorage';

// Get storage key for logged-in user
const getUserStorageKey = async (): Promise<string> => {
  const mobile = await getCurrentUser();

  if (!mobile) {
    throw new Error('User is not logged in');
  }

  return `${TRANSACTIONS_STORAGE_KEY}/${mobile}`;
};

// Get logged-in user's transactions
export const getTransactions = async (): Promise<Transaction[]> => {
  try {
    const storageKey = await getUserStorageKey();

    const storedData = await AsyncStorage.getItem(storageKey);

    if (!storedData) {
      return [];
    }

    const parsedData: unknown = JSON.parse(storedData);

    if (!Array.isArray(parsedData)) {
      return [];
    }

    return parsedData as Transaction[];
  } catch (error) {
    console.error('Get transactions error:', error);
    throw error;
  }
};

// Save new transaction for logged-in user
export const saveTransaction = async (
  transaction: Transaction,
): Promise<void> => {
  const storageKey = await getUserStorageKey();
  const existingTransactions = await getTransactions();

  await AsyncStorage.setItem(
    storageKey,
    JSON.stringify([transaction, ...existingTransactions]),
  );
};

// Alias for existing AddTransactionScreen code
export const addTransaction = saveTransaction;

// Delete transaction for logged-in user
export const deleteTransaction = async (
  transactionId: string,
): Promise<void> => {
  try {
    const storageKey = await getUserStorageKey();

    const existingTransactions = await getTransactions();

    const updatedTransactions = existingTransactions.filter(
      item => item.id !== transactionId,
    );

    await AsyncStorage.setItem(
      storageKey,
      JSON.stringify(updatedTransactions),
    );
  } catch (error) {
    console.error('Delete transaction error:', error);
    throw error;
  }
};

// Clear only logged-in user's transactions
export const clearTransactions = async (): Promise<void> => {
  try {
    const storageKey = await getUserStorageKey();

    await AsyncStorage.removeItem(storageKey);
  } catch (error) {
    console.error('Clear transactions error:', error);
    throw error;
  }
};
