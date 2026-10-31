import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  TRANSACTIONS_STORAGE_KEY,
  type Transaction,
} from '../types/transaction';

// Normalize mobile number
const normalizeMobile = (mobile: string): string => {
  return String(mobile || '').replace(/\D/g, '');
};

// Get user-specific storage key
export const getTransactionStorageKey = (
  mobile: string,
): string => {
  const number = normalizeMobile(mobile);

  if (!/^[6-9]\d{9}$/.test(number)) {
    throw new Error('Valid logged-in mobile number not found.');
  }

  return `${TRANSACTIONS_STORAGE_KEY}/${number}`;
};

// GET ALL TRANSACTIONS
export const getTransactions = async (
  mobile: string,
): Promise<Transaction[]> => {
  const key = getTransactionStorageKey(mobile);

  const rawData = await AsyncStorage.getItem(key);

  if (!rawData) {
    return [];
  }

  try {
    const parsedData: unknown = JSON.parse(rawData);

    if (!Array.isArray(parsedData)) {
      return [];
    }

    return parsedData.map((item: any) => ({
      ...item,
      id: String(item.id),
      title:
        item.title ||
        item.description ||
        item.category ||
        'Transaction',
      amount: Number(item.amount) || 0,
      description: item.description || '',
    })) as Transaction[];

  } catch (error) {
    console.log('Transaction data parse error:', error);
    return [];
  }
};

// SAVE ALL TRANSACTIONS
export const saveTransactions = async (
  mobile: string,
  transactions: Transaction[],
): Promise<void> => {
  const key = getTransactionStorageKey(mobile);

  await AsyncStorage.setItem(
    key,
    JSON.stringify(transactions),
  );
};

// ADD NEW TRANSACTION
export const addTransaction = async (
  mobile: string,
  transaction: Transaction,
): Promise<Transaction[]> => {
  const currentTransactions = await getTransactions(mobile);

  const updatedTransactions = [
    transaction,
    ...currentTransactions,
  ];

  await saveTransactions(mobile, updatedTransactions);

  return updatedTransactions;
};

// UPDATE EXISTING TRANSACTION
export const updateTransaction = async (
  mobile: string,
  id: string,
  changes: Partial<Transaction>,
): Promise<Transaction[]> => {
  if (!mobile) {
    throw new Error('User mobile number is missing.');
  }

  if (!id) {
    throw new Error('Transaction ID is missing.');
  }

  // Get existing transactions
  const currentTransactions = await getTransactions(mobile);

  // Check transaction exists
  const transactionExists = currentTransactions.some(
    item => String(item.id) === String(id),
  );

  if (!transactionExists) {
    throw new Error(
      'Transaction not found. Please refresh and try again.',
    );
  }

  // Update only selected transaction
  const updatedTransactions = currentTransactions.map(item => {
    if (String(item.id) === String(id)) {
      return {
        ...item,
        ...changes,
        id: item.id,
      };
    }

    return item;
  });

  // Save updated data to AsyncStorage
  await saveTransactions(mobile, updatedTransactions);

  console.log('Transaction updated successfully:', id);

  return updatedTransactions;
};

// DELETE TRANSACTION
export const deleteTransaction = async (
  mobile: string,
  id: string,
): Promise<Transaction[]> => {
  if (!mobile || !id) {
    throw new Error('Mobile number or transaction ID is missing.');
  }

  const currentTransactions = await getTransactions(mobile);

  const updatedTransactions = currentTransactions.filter(
    item => String(item.id) !== String(id),
  );

  if (updatedTransactions.length === currentTransactions.length) {
    throw new Error('Transaction not found or already deleted.');
  }

  await saveTransactions(mobile, updatedTransactions);

  console.log('Transaction deleted successfully:', id);

  return updatedTransactions;
};