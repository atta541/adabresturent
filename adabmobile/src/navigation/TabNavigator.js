import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Atta from '../screens/Atta';
import ProfileStack from '../screens/ProfileStack/ProfileStack';  // Import the Profile Stack

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator >
    <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
    <Tab.Screen name="Atta" component={Atta} options={{ headerShown: false }} />
    <Tab.Screen name="Profile" component={ProfileStack} options={{ headerShown: false }} />  
    {/* Now ProfileStack is used instead of Profile */}
  </Tab.Navigator>
);

export default TabNavigator;
