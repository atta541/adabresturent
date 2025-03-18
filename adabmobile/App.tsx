// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import { AuthProvider } from './src/context/AuthContext';
// import Login from './src/screens/Login';
// import Register from './src/screens/Register';
// import Home from './src/screens/Home';
// import Atta from './src/screens/Atta';
// import ForgotPassword from './src/screens/ForgotPassword';
// import ResetPassword from './src/screens/ResetPassword';
// const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <AuthProvider>
//       <NavigationContainer>
//         <Stack.Navigator>
//           <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
//           <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
//           <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: true }} />
//           <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown: true }} />
//           <Stack.Screen name="Atta" component={Atta} />
//           <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </AuthProvider>
//   );
// }



// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { AuthProvider } from './src/context/AuthContext';

// import Home from './src/screens/Home';
// import Atta from './src/screens/Atta';
// import Login from './src/screens/Login';
// import Register from './src/screens/Register';
// import ForgotPassword from './src/screens/ForgotPassword';
// import ResetPassword from './src/screens/ResetPassword';

// // Stack for Authentication Screens
// const Stack = createNativeStackNavigator();
// const AuthStack = () => (
//   <Stack.Navigator screenOptions={{ headerShown: false }}>
//     <Stack.Screen name="Login" component={Login} />
//     <Stack.Screen name="Register" component={Register} />
//     <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
//     <Stack.Screen name="ResetPassword" component={ResetPassword} />
//   </Stack.Navigator>
// );

// // Bottom Tab Navigator (Without Icons)
// const Tab = createBottomTabNavigator();
// const AppTabs = () => (
//   <Tab.Navigator>
//     <Tab.Screen name="Home" component={Home} />
//     <Tab.Screen name="Atta" component={Atta} />
//   </Tab.Navigator>
// );

// export default function App() {
//   return (
//     <AuthProvider>
//       <NavigationContainer>
//         <AppTabs />
//       </NavigationContainer>
//     </AuthProvider>
//   );
// }



import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider, AuthContext } from './src/context/AuthContext';
import TabNavigator from './src/navigation/TabNavigator';
import AuthNavigator from './src/navigation/AuthNavigator';
import { UserDetailsProvider } from './src/context/UserDetailsContext';


export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
      <UserDetailsProvider>
        <MainNavigator />
        </UserDetailsProvider>
      </NavigationContainer>
      
    </AuthProvider>
  ); 
}

const MainNavigator = () => {
  const { token } = useContext(AuthContext); 
  return token ? <TabNavigator /> : <AuthNavigator />;
};
