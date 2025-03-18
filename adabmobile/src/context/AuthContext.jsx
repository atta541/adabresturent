import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load user and token from AsyncStorage on app start
    useEffect(() => {
        const loadAuthData = async () => {
            const storedUser = await AsyncStorage.getItem('user');
            const storedToken = await AsyncStorage.getItem('token');
            if (storedUser && storedToken) {
                setUser(JSON.parse(storedUser));
                setToken(storedToken);
            }
            setLoading(false);
        };
        loadAuthData();
    }, []);

    // Login Function
    const login = async (email, password) => {
        try {
            const response = await fetch('http://10.0.2.2:5000/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Login failed');

            setUser(data.user);
            setToken(data.token); // Store token

            // Save user and token in AsyncStorage
            await AsyncStorage.setItem('user', JSON.stringify(data.user));
            await AsyncStorage.setItem('token', data.token);
        } catch (error) {
            throw error;
        }
    };

    // Register Function
    const register = async (name, email, password) => {
        try {
            const response = await fetch('http://10.0.2.2:5000/api/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Registration failed');

            setUser(data.user);
            setToken(data.token);

            // Save user and token in AsyncStorage
            await AsyncStorage.setItem('user', JSON.stringify(data.user));
            await AsyncStorage.setItem('token', data.token);
        } catch (error) {
            throw error;
        }
    };

    // Logout Function
    const logout = async () => {
        setUser(null);
        setToken(null);
        await AsyncStorage.removeItem('user');
        await AsyncStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

