
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/SplashScreen/SplashScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import OtpVerificationScreen from '../screens/OtpVerification/OtpVerificationScreen';

import HomeScreen from '../screens/Home/HomeScreen';
import AddTransactionScreen from '../screens/AddTransaction/AddTransactionScreen';
import TransactionsScreen from '../screens/Transactions/TransactionsScreen';
import AnalyticsScreen from '../screens/Analytics/AnalyticsScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  OtpVerification: { mobile: string };
  Home: undefined;
  AddTransaction: { type?: 'income' | 'expense' };
  Transactions: undefined;
  Analytics: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen
        name="OtpVerification"
        component={OtpVerificationScreen}
      />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="AddTransaction"
        component={AddTransactionScreen}
      />
      <Stack.Screen name="Transactions" component={TransactionsScreen} />
      <Stack.Screen name="Analytics" component={AnalyticsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
