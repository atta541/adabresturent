// import { Button, StyleSheet, Text, View } from 'react-native';
// import React, { useContext } from 'react'; 
// import Avator from '../components/Avator';
// import { AuthContext } from '../context/AuthContext';

// const Home = ({ navigation }) => {
//   const { token, logout } = useContext(AuthContext); 
//   console.log(token);

//   const handleLogout = async () => {
//     await logout(); 
//     navigation.replace('Login');
//   };

//   return (
    
//     <View style={styles.container}>
      

//       <Text style={styles.title}>Home</Text>
      
//       <Button title="Go to Atta" onPress={() => navigation.navigate('Atta')} />
      
//       <View style={styles.logoutButton}>
//         <Button title="Logout" onPress={handleLogout} color="red" />
//         <Text>{token}</Text> 
//       </View>
//     </View>
//   );
// };

// export default Home;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f8f9fa',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   logoutButton: {
//     marginTop: 20,
//   },
// });





import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react'; 
import Avator from '../components/Avator';
import { AuthContext } from '../context/AuthContext';

const Home = ({ navigation }) => {
  const { token, logout } = useContext(AuthContext); 

  const handleLogout = async () => {
    await logout(); 
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      {/* Top Bar Avatar */}
      <View style={styles.topBar}>
        <Avator />
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Home</Text>

        <Button title="Go to Atta" onPress={() => navigation.navigate('Atta')} />

        <View style={styles.logoutButton}>
          <Button title="Logout" onPress={handleLogout} color="red" />
        </View>

        {token && <Text style={styles.tokenText}>Token: {token}</Text>}
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingTop: 60, // To prevent content from overlapping with the top bar
  },
  topBar: {
    position: 'absolute',
    top: 0,
    width: '100%',
    backgroundColor: '#fff', // Adjust background color if needed
    paddingVertical: 10,
    alignItems: 'center',
    elevation: 5, // Adds shadow effect on Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  logoutButton: {
    marginTop: 20,
  },
  tokenText: {
    marginTop: 10,
    fontSize: 12,
    color: 'gray',
  },
});
