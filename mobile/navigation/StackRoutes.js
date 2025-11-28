import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import TabRoutes from "./TabRoutes";
import DetailsScreen from "../screens/DetailsScreen";
import PlayerScreen from "../screens/PlayerScreen";
import ProfileScreen from "../screens/ProfileScreen";
import PaymentScreen from "../screens/PaymentScreen";

const Stack = createStackNavigator();

export default function StackRoutes() {
  return (
    <Stack.Navigator>

      {/* Telas principais */}
      <Stack.Screen
        name="TabRoutes"
        component={TabRoutes}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Player"
        component={PlayerScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />

      {/* Tela de Pagamento */}
      <Stack.Screen
        name="Payment"
        component={PaymentScreen}
        options={{ headerShown: false }}
      />

    </Stack.Navigator>
  );
}
