import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '../Profile';
import ManageProfile from './ManageProfile';

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen name="ProfileHome" component={Profile} />
      <Stack.Screen name="ManageProfile" component={ManageProfile} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
