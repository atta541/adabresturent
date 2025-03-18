import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useContext } from 'react';
import { UserDetailsContext } from '../context/UserDetailsContext';
import Icons from 'react-native-vector-icons/MaterialIcons';

const Avatar = () => {
    const { userDetails, loading } = useContext(UserDetailsContext);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            {/* User name */}
            <Text style={styles.text}>{userDetails?.name || 'User'}</Text>

            {/* Search Icon */}
            <Icons name="search" size={30} color="black" style={styles.icon} />
        </View>
    );
};

export default Avatar;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', // Align text and icon in a row
        alignItems: 'center', // Vertically align items
        justifyContent: 'space-between', // Space between text and icon
        padding: 10,
        width: '100%', // Ensure it takes the full width
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'left', 
    },
    icon: {
        marginLeft: 'auto', // Pushes the icon to the right
    },
});
