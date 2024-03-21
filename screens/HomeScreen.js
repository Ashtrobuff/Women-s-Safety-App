import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert, Touchable, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import { encode } from 'base-64';
import { Linking } from 'react-native';
import { TextInput } from 'react-native';

export default function App() {
  const [location, setLocation] = useState(null);
  const [buttonPressed, setButtonPressed] = useState(false);
  const [toNumber, setToNumber] = useState('+919372584027')

  useEffect(() => {
      
      getLocation();
      
  }, []);

  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'Location permission is required to send the distress message.');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    } catch (error) {
      console.error('Error getting location:', error);
      Alert.alert('Error', 'Failed to get current location. Please try again.');
    }
  };
  getLocation();
  const handleButtonPress = () => {
    setButtonPressed(true);
  };

  const handleButtonRelease = async () => {
    setButtonPressed(false);
    if (location) {
      try {
        const message = `Help! I feel unsafe. Location: https://maps.apple.com/?ll=${location.coords.latitude},${location.coords.longitude}`;
        await sendSms(message,toNumber); // Replace with your recipient's phone number
        Alert.alert('Message Sent', 'Your distress message with location has been sent successfully.');
     
      } catch (error) {
        Alert.alert('Error', 'Failed to send distress message. Please try again later.');
        console.error('Error sending message:', error);
      }
    } else {
      Alert.alert('Error', 'Failed to obtain current location. Please try again.');
    }
  };

  const sendSms = async (message, toNumber) => {
    try {
      const accountSid = 'ACed4bdf952a823ab5970cbc922c0cea72';
      const authToken = 'a8fa370e4bd4d68e377fa6b78f2b55d4';

      const authHeader = `Basic ${encode(`${accountSid}:${authToken}`)}`;
      const response = await axios.post(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
        Body: message,
        From: '+15344447273', // Your Twilio phone number
        To: toNumber,
      }, {
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      console.log(response.data);
    } catch (error) {
     console.log(error.message)
    }
  };

  return (
    <View style={styles.container} className="bg-purple-400">
        <TouchableOpacity><Text>Change Number</Text></TouchableOpacity>
        <TextInput
        style={styles.input}
        onChangeText={setToNumber}
        value={toNumber}
        placeholder="Enter recipient's phone number"
      />
      <Text style={styles.title} className=" text-white mb-12 text-center">"Best Protection a woman can have is courage"</Text>
      <Text style={styles.subtitle} className=" text-white mt-12">Press and hold the button if you feel unsafe.</Text>
      <View className="fixed mt h-64 w-64 rounded-full bg-white opacity-40 " style={{zIndex:-1}}></View>
     <TouchableOpacity className=" absolute mt- h-52 w-52 rounded-full bg-white border-8 border-opacity-5" style={{zIndex:20}} 
        title="Press and Hold"
        onPress={handleButtonRelease}
      //  onPressOut={handleButtonRelease}
        disabled={buttonPressed}
      />
     
     {location && (
        <TouchableOpacity onPress={() => Linking.openURL(`https://maps.apple.com/?ll=${location.coords.latitude},${location.coords.longitude}`)}>
          <Text style={styles.locationText} className="font-bold text-white">
            View location on map
          </Text>
        </TouchableOpacity>
      )}
      
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  locationText: {
    marginTop: 20,
  },
});
