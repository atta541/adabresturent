import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Register = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { register } = useContext(AuthContext);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match!');
      return;
    }
    try {
      await register(name, email, password);
      Alert.alert('Success', 'Account created successfully!');
      navigation.replace('Login');
    } catch (error) {
      Alert.alert('Error', error.message || 'Something went wrong');
    }
  };
  return (
    <View style={styles.container}>
      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>آداب</Text>
        <Text style={styles.tagline}>Join Us and Enjoy Authentic Flavors!</Text>
        <Text style={styles.taglineemoji}>🍛🍔🪔🪞🪕🧺✨</Text>
      </View>

      {/* Input Section */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm your password"
          placeholderTextColor="#999"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      {/* Button Section */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>
            Already have an account? <Text style={styles.loginLink}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    color: 'red',
    fontSize: 80,
    fontWeight: 'bold',
    fontFamily: 'DancingScript-Bold',
    textShadowColor: 'rgba(255, 0, 0, 0.6)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  tagline: {
    color: '#AAA',
    fontSize: 20,
    fontStyle: 'normal',
    marginTop: 10,
  },
  taglineemoji: {
    fontSize: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#FFF',
    color: '#000',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    fontSize: 16,
    shadowColor: '#FF0000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  registerButton: {
    backgroundColor: '#FF0000',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#FF6347',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
  },
  registerButtonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  loginText: {
    color: '#FFF',
    marginTop: 15,
    fontSize: 16,
  },
  loginLink: {
    color: '#FF4500',
    fontWeight: 'bold',
  },
});