import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#000',
          borderTopColor: '#000',
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#888',
      }}
    >
      <Tab.Screen
        name="Início"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Perfil"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
        }
          
