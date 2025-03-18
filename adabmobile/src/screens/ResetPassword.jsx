// import React, { useState } from 'react';
// import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';

// const ResetPassword = ({ route }) => {
//   const { token } = route.params; // Get token from navigation
//   const [newPassword, setNewPassword] = useState('');

//   const handleResetPassword = async () => {
//     if (!newPassword) {
//       Alert.alert('Error', 'Please enter a new password');
//       return;
//     }

//     try {
//       const response = await fetch('http://10.0.2.2:5000/api/users/reset-password', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ token, newPassword }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         Alert.alert('Success', 'Password reset successfully');
//       } else {
//         Alert.alert('Error', data.message || 'Something went wrong');
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Network error, please try again');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Reset Password</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter new password"
//         secureTextEntry
//         value={newPassword}
//         onChangeText={setNewPassword}
//       />
//       <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
//         <Text style={styles.buttonText}>Reset Password</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default ResetPassword;

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
//   title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
//   input: { width: '100%', height: 50, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, paddingHorizontal: 10, marginBottom: 20 },
//   button: { width: '100%', backgroundColor: '#007BFF', padding: 15, borderRadius: 8, alignItems: 'center' },
//   buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
// });


import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const ResetPassword = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (route.params?.token) {
      setToken(route.params.token);
    }
  }, [route.params]);

  const handleResetPassword = async () => {
    try {
      const response = await fetch(`http://10.0.2.2:5000/api/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Password reset successfully!');
        navigation.navigate('Login');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error resetting password:', error);
    }
  };

  return (
    <View>
      <Text>Enter New Password</Text>
      <TextInput
        placeholder="New Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Reset Password" onPress={handleResetPassword} />
    </View>
  );
};

export default ResetPassword;
