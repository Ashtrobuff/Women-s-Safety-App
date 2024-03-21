import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Image } from 'react-native';
import { ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native';
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
    <ImageBackground source={require('../assets/images/wbg.png')} resizeMode={'cover'} style={{flex:1,justifyContent:'center'}}>
        
        <View style={styles.container}>
    
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
    
    <TouchableOpacity title="Sign Up" disabled={loading} className="h-10 w-full bg-blue-300 items-center justify-center rounded-lg"onPress={signIn}><Text>Sign In</Text></TouchableOpacity>
  </View>
</View>
       
</ImageBackground>
   
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
