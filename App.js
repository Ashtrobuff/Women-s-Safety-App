import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert, Touchable, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import { encode } from 'base-64';

export default function App() {
  const [location, setLocation] = useState(null);
  const [buttonPressed, setButtonPressed] = useState(false);

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

  const handleButtonPress = () => {
    setButtonPressed(true);
  };

  const handleButtonRelease = async () => {
    setButtonPressed(false);
    if (location) {
      try {
        const message = `Help! I feel unsafe. Location: https://maps.apple.com/?ll=${location.coords.latitude},${location.coords.longitude}`;
        await sendSms(message, '+919372584027'); // Replace with your recipient's phone number
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
      const accountSid = process.env.TWILIO_SID;
      const authToken = process.env.TWILIO_AUTH_TOKEN;

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
    <View style={styles.container}>
      <Text style={styles.title}>Personal Safety App</Text>
      <Text style={styles.subtitle}>Press and hold the button if you feel unsafe.</Text>
      <TouchableOpacity style={styles.button}
        title="Press and Hold"
        //onPress={handleButtonRelease}
        onPressOut={handleButtonRelease}
        disabled={buttonPressed}
      />
      {location && (
        <Text style={styles.locationText}>
          Your current location: {location.coords.latitude}, {location.coords.longitude}
        </Text>
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
    backgroundColor: '#fff',
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
