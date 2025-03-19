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
            {/* User Name on the Left */}
            <Text style={styles.text}>{userDetails?.name || 'Guest'}</Text>

            {/* Urdu Word on the Right */}
            <Text style={styles.logo}>آداب</Text>
        </View>
    );
};

export default Avatar;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', // Align items in a row
        alignItems: 'center', // Vertically align items
        justifyContent: 'space-between', // Push items to both ends
        paddingHorizontal: 15, // Horizontal padding for spacing
        paddingVertical: 10, // Vertical padding
        width: '100%', // Full width
        borderWidth: 1, // Border thickness
        borderColor: 'red', // Border color
        borderRadius: 5, // Rounded corners
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "white",
        textAlign: 'left', // Align name to the left
    },
    logo: {
        color: 'red',
        fontSize: 22, // Adjust font size
        fontWeight: 'bold',
        textShadowColor: 'rgba(255, 0, 0, 0.6)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
        textAlign: 'right', // Align text to the right
    },
});
