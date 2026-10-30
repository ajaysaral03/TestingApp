import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SplashScreen from '../screens/SplashScreen/SplashScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;