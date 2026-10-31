// Transaction type
export type TransactionType = 'income' | 'expense';

// Transaction interface
export interface Transaction {
  id: string;
  title: string;
  category: string;
  amount: number;
  type: TransactionType;
  date: string; // YYYY-MM-DD format
  description?: string;
}

// AsyncStorage base key
export const TRANSACTIONS_STORAGE_KEY =
  '@expense_tracker/transactions';

// Monthly budget
export const MONTHLY_BUDGET: number = 30000;