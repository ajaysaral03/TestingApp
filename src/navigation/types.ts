
export type TransactionType = 'income' | 'expense';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;

  OtpVerification: {
    mobile: string;
  };

  Home: undefined;

  AddTransaction: {
    type: TransactionType;
  };

  Transactions: undefined;
  Analytics: undefined;
  Profile: undefined;
};
