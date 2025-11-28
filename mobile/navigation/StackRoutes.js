import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

import TabRoutes from './TabRoutes';
import DetailsScreen from '../screens/DetailsScreen';
import PlayerScreen from '../screens/PlayerScreen';

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      {/* Telas de Autenticação */}
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />

      {/* Telas principais */}
      <Stack.Screen name="Tabs" component={TabRoutes} />

      {/* Detalhes de filme */}
      <Stack.Screen name="Details" component={DetailsScreen} />

      {/* Player */}
      <Stack.Screen name="Player" component={PlayerScreen} />

    </Stack.Navigator>
  );
}
