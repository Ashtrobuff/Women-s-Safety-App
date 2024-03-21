import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { firebase } from '@firebase/app';
import { auth } from '../firebase';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[loading,sertloading]=useState(false);
  const auth =getAuth()

  const signIn = async () => {
    try { 
       const response=await signInWithEmailAndPassword(auth,email, password);
      navigation.navigate('Home');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container} className=" w-86 bg-purple-300 px-20">
      <View className="px-10 py-10 w-86 bg-white rounded-xl">
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
    <Button title="Sign In" className="" onPress={signIn} />
  </View>
  </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    marginBottom: 10,
    borderBottomWidth: 1,
    padding: 10,
  },
});

export default SignInScreen;
