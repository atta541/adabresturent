// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const Profile = () => {
//   return (
//     <View>
//       <Text>Profile</Text>
//     </View>
//   )
// }

// export default Profile

// const styles = StyleSheet.create({})

import { StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';

const Profile = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <Button title="Manage Profile" onPress={() => navigation.navigate('ManageProfile')} />
      <Button title="Logout" onPress={() => console.log('Logout Clicked')} />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
