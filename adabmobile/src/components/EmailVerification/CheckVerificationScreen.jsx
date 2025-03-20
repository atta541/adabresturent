// import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
// import React, { useContext, useState, useEffect, useMemo } from 'react';
// import { AuthContext } from '../../context/AuthContext';
// import { useNavigation } from '@react-navigation/native';
// import Base_URL from '../../../Base_URL';


// const CheckVerificationScreen = () => {
//     const { token,emailVerification } = useContext(AuthContext);
//     const [verificationStatus, setVerificationStatus] = useState(null);
//     const [errorMessage, setErrorMessage] = useState('');
//     const navigation = useNavigation();

//     const headers = useMemo(() => ({
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//     }), [token]);

//     useEffect(() => {
//         const checkEmailVerification = async () => {
//             try {
//                 const response = await fetch(`${Base_URL}/api/users/check-verification`, {
//                     method: 'GET',
//                     headers: headers,
//                 });

//                 const data = await response.json();
//                 if (response.ok) {
//                     setVerificationStatus(data.isEmailVerified ? 'Verified' : 'Not Verified');
//                 } else {
//                     setErrorMessage(data.message || 'Failed to fetch verification status');
//                 }
//             } catch (error) {
//                 setErrorMessage('Network error, please try again.');
//             }
//         };

//         checkEmailVerification();
//     }, [headers]);

//     return (
//         <View style={styles.container}>
//             <Text style={styles.text}>Email Verification Status</Text>
//             {verificationStatus && <Text>Status: {verificationStatus}</Text>}
//             {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

//             {verificationStatus !== 'Verified' && (
//                 <TouchableOpacity 
//                     style={styles.button} 
//                     onPress={() => navigation.navigate('SendOTP')}
//                 >
//                     <Text style={styles.buttonText}>Proceed to Verification</Text>
//                 </TouchableOpacity>
//             )}
//         </View>
//     );
// };

// export default CheckVerificationScreen;

// const styles = StyleSheet.create({
//     container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
//     text: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
//     error: { color: 'red', marginTop: 10 },
//     button: { backgroundColor: '#007BFF', padding: 10, borderRadius: 5, marginTop: 10 },
//     buttonText: { color: '#FFF', fontSize: 16 },
// });



import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const CheckVerificationScreen = () => {
    const { emailVerification } = useContext(AuthContext);
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Email Verification Status</Text>
            <Text>Status: {emailVerification ? 'Verified ✅' : 'Not Verified ❌'}</Text>

            {!emailVerification && (
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => navigation.navigate('SendOTP')}
                >
                    <Text style={styles.buttonText}>Proceed to Verification</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default CheckVerificationScreen;

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    text: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
    button: { backgroundColor: '#007BFF', padding: 10, borderRadius: 5, marginTop: 10 },
    buttonText: { color: '#FFF', fontSize: 16 },
});
