import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabRoutes from './TabRoutes';
import DetailsScreen from '../screens/DetailsScreen';
import PlayerScreen from '../screens/PlayerScreen';

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
  return (
    <Stack.Navigator>
      {/* Rotas principais */}
      <Stack.Screen
        name="TabRoutes"
        component={TabRoutes}
        options={{ headerShown: false }}
      />

      {/* Tela de detalhes */}
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ headerShown: false }}
      />

      {/* Player */}
      <Stack.Screen
        name="Player"
        component={PlayerScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
