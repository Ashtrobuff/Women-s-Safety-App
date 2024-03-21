import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { Image } from 'react-native';
import { Text } from 'react-native';
const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth();

  const signUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.navigate('Home');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    
      <ImageBackground source={require('../assets/images/wbg.png')} resizeMode={'cover'} style={{flex:1,justifyContent:'center'}}>
       <View style={styles.container} >
      <Image source={require('../assets/images/bgt.png')} className="rounded-lg rounded-b-none" style={{width:310,height:320}} />
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
        <TouchableOpacity title="Sign Up"  className="h-10 w-full bg-blue-300 items-center justify-center rounded-lg"onPress={signUp}><Text>Sign Up</Text></TouchableOpacity>
        <TouchableOpacity title="Sign in" onPressIn={()=>{navigation.navigate('SignIn')}} className="h-10 w-full bg-blue-300 items-center justify-center rounded-lg mt-5" sx><Text>Sign In</Text></TouchableOpacity>
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

export default SignUpScreen;
