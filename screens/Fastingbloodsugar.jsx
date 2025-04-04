import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ip} from "./ip.js";


const addFastingBlood = async (sugarLevel, userId) => {
  try {
    const response = await axios.post(`${ip}/user/addFastingBlood`, {
      sugar_level: sugarLevel,
      user_id: userId,
      date: new Date(),
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

export default function App({ navigation }) {
  const [sugarLevel, setSugarLevel] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const getUserId = async () => {
      const storedUserId = await AsyncStorage.getItem('userId');
      if (storedUserId) {
        setUserId(storedUserId);
      }
    };
    getUserId();
  }, []);

  const handleSubmit = () => {
    if (!sugarLevel) {
      alert('Please enter a valid sugar level');
      return;
    }
    if (!userId) {
      alert('User ID not found. Please log in again.');
      return;
    }
    addFastingBlood(Number(sugarLevel), userId);
    
    if (sugarLevel < 70) {
      navigation.navigate('Verylow');
    } else if (sugarLevel < 90) {
      navigation.navigate('Low');
    } else if (sugarLevel <= 140) {
      navigation.navigate('Normal');
    } else if (sugarLevel <= 180) {
      navigation.navigate('HighScreen');
    } else {
      navigation.navigate('Veryhigh');
    }
  };

  return (
    <LinearGradient colors={['#1CD3DA', '#0F7074']} style={styles.container}>
      <Image source={require('../assets/project.png')} style={styles.logo} />
      <Image source={require('../assets/blood.png')} style={styles.icon} />
      <Text style={styles.title}>Glucose reading</Text>

      <View style={styles.container}>
        <View style={styles.rectangle} />
        <Text style={styles.prompt}>Enter fasting blood sugar</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Enter the number..."
          keyboardType="numeric"
          value={sugarLevel}
          onChangeText={setSugarLevel}
        />

        <TouchableOpacity style={styles.Button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  logo: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 120,
    height: 120,
  },
  icon: {
    top: 100,
    right: 120,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 19,
    top: 45,
    right: 20,
  },
  rectangle: {
    width: 370,
    height: 650,
    backgroundColor: '#B0FFF3',
    opacity: 0.6,
    marginTop: 300,
    borderRadius: 50,
  },
  prompt: {
    position: 'absolute',
    top: 200,
    fontWeight: 'bold',
    fontSize: 19,
    textAlign: 'center',
  },
  input: {
    width: '90%',
    height: 55,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 30,
    textAlign: 'center',
    fontSize: 15,
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    bottom: 200,
  },
  Button: {
    width: 150,
    height: 50,
    backgroundColor: '#286E77',
    borderRadius: 25,
    bottom: 60,
    left: 120,
    position: 'absolute',
  },
  buttonText: {
    fontWeight: 'bold',
    textAlign: 'center',
    top: 15,
    fontSize: 15,
    color: 'white',
  },
});
