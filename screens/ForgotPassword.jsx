 import { ip } from "./ip.js";
//  `${ip}/user/forgotPassword`

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function ForgotPasswordScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const formatEgyptianNumber = (number) => {
    // Remove any non-digit characters
    const cleaned = number.replace(/\D/g, '');
    
    // Handle Egyptian numbers starting with 0
    if (cleaned.startsWith('0')) {
      return `+2${cleaned}`;
    }
    
    // Handle numbers without 0 prefix (assume it's Egyptian)
    if (cleaned.length === 10 && !cleaned.startsWith('0')) {
      return `+2${cleaned}`;
    }
    
    // If already has +2, return as is
    if (cleaned.startsWith('2')) {
      return `+${cleaned}`;
    }
    
    // Default case - return with +2 prefix
    return `+2${cleaned}`;
  };

  const handleSubmit = async () => {
    // Validate phone number
    if (!phoneNumber.trim()) {
      Alert.alert('Error', 'Please enter your phone number');
      return;
    }

    // Basic phone number validation for Egyptian numbers
    const cleanedNumber = phoneNumber.replace(/\D/g, '');
    if (cleanedNumber.length !== 10 && cleanedNumber.length !== 11) {
      Alert.alert('Error', 'Please enter a valid Egyptian phone number (10 or 11 digits)');
      return;
    }

    setIsLoading(true);
    
    try {
      // Format the number for the backend
      const formattedNumber = formatEgyptianNumber(phoneNumber);
      
      const response = await fetch(`${ip}/user/forgotPassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: formattedNumber,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        if (data.devPassword) {
          // Development mode - show password directly
          Alert.alert(
            'Development Mode', 
            `Password reset: ${data.devPassword}\n(In production, this would be sent via SMS)`,
            [{ text: 'OK', onPress: () => setPhoneNumber('') }]
          );
        } else {
          Alert.alert('Success', data.message || 'New password sent to your phone via SMS');
          setPhoneNumber('');
        }
      } else {
        Alert.alert('Error', data.message || 'User not found with this phone number');
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      Alert.alert('Error', 'Network error. Please try again');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['#00C9C8', '#74D3D3']}
      style={styles.container}
    >
      <View style={styles.header}>
        <Image source={require('../assets/project.png')} style={styles.logo} />
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.instructions}>
          Enter your registered phone number to receive a new password via SMS
        </Text>

        <TextInput
          placeholder="Enter phone number ( 01234567890)"
          placeholderTextColor="#666"
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="done"
          onSubmitEditing={handleSubmit}
        />

        <TouchableOpacity 
          style={styles.submitButton} 
          onPress={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#00C9C8" />
          ) : (
            <Text style={styles.submitText}>Send</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.noteText}>
          Note: You'll receive an SMS with a temporary password. 
          Please change it after logging in.
        </Text>
      </View>
    </LinearGradient>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp('6%'),
    paddingHorizontal: wp('5%'),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('2%'),
  },
  logo: {
    width: wp('18%'), 
    height: wp('18%'),
    resizeMode: 'contain',
    left: '85%'
  },
  card: {
    backgroundColor: '#A8F3F2',
    borderRadius: wp('5%'),
    padding: wp('5%'),
    height: hp('60%'),
    justifyContent: 'center',
    top: 40
  },
  title: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: hp('2%'),
    color: '#333',
  },
  instructions: {
    fontSize: wp('4%'),
    textAlign: 'center',
    marginBottom: hp('3%'),
    color: '#555',
    lineHeight: hp('2.8%'),
  },
  input: {
    backgroundColor: 'white',
    borderRadius: wp('3%'),
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('4%'),
    fontSize: wp('4%'),
    marginBottom: hp('3%'),
    borderWidth: 1,
    borderColor: '#ddd',
  },
  submitButton: {
    backgroundColor: 'white',
    paddingVertical: hp('1.5%'),
    borderRadius: wp('3%'),
    alignItems: 'center',
    marginTop: hp('1%'),
    borderWidth: 1,
    borderColor: '#00C9C8',
  },
  submitText: {
    fontWeight: 'bold',
    fontSize: wp('4%'),
    color: '#00C9C8',
  },
  noteText: {
    fontSize: wp('3.5%'),
    textAlign: 'center',
    marginTop: hp('3%'),
    color: '#666',
    fontStyle: 'italic',
  },
});