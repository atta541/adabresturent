import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useContext } from 'react';
import { UserDetailsContext } from '../context/UserDetailsContext';

const Avatar = () => {
    const { userDetails, loading } = useContext(UserDetailsContext);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{userDetails?.name || 'User'}</Text>
            <Text style={styles.email}>{userDetails?.email}</Text>
        </View>
    );
};

export default Avatar;

const styles = StyleSheet.create({
    container: {
        padding: 10,
        alignItems: 'center'
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    email: {
        fontSize: 14,
        color: 'gray'
    }
});
