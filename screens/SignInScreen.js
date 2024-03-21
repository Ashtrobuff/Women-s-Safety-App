import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Image } from 'react-native';
const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const authInstance = getAuth();

  const signIn = async () => {
    try {
      setLoading(true);
      const response = await signInWithEmailAndPassword(authInstance, email, password);
      navigation.navigate('Home');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style = {{ backgroundColor: 'rgb(253 164 175)'}}>
        <KeyboardAvoidingView behavior='scroll' style = {{backgroundColor: 'pink ', flex: 1}}>
        <View style={styles.container} className="bg-rose-300">
    
    <Image source={require('../assets/images/bg.png')} className="w-84 rounded-lg rounded-b-none" style={{width:310,height:320}} />
  <View style={styles.card} className="rounded-t-none">
 
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
    <Button title="Sign In" onPress={signIn} disabled={loading} />
  </View>
</View></KeyboardAvoidingView> 
       
</ScrollView>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  card: {
    width: '80%',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  input: {
    marginBottom: 10,
    borderBottomWidth: 1,
    padding: 10,
  },
});

export default SignInScreen;
