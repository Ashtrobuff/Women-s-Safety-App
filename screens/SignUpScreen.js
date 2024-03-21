import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Import createUserWithEmailAndPassword from firebase auth
import { getAuth } from 'firebase/auth'; // Import getAuth from firebase auth

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth(); // Get the auth instance

  const signUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.navigate('Home');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View className="flex-1 justify-center align-middle px-20 bg-purple-300">
        <View className=' w-86 px-10  shadow-lg bg-white rounded-xl ' style={{height:"200px"}}>
        <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Sign Up" onPress={signUp} />
      <Button title="Sign In" onPress={() => navigation.navigate('SignIn')} />
        </View>
   
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20, // Add horizontal padding for better aesthetics
  },
  input: {
    width: '100%', // Adjust input width to fit container width
    marginBottom: 10,
    borderBottomWidth: 1,
    padding: 10,
  },
});

export default SignUpScreen;
