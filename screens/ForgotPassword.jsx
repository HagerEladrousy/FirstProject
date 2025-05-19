import { ip } from "./ip.js";

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch(`${ip}/user/forgotPassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      
      if (response.ok) {
        Alert.alert(
          'Success', 
          data.message || 'A temporary password has been sent to your email.\nPlease change it after logging in.',
          [{ text: 'OK', onPress: () => setEmail('') }]
        );
      } else {
        Alert.alert('Error', data.message || 'No user found with this email');
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      Alert.alert('Error', 'Network error. Please try again');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#00C9C8', '#74D3D3']} style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/project.png')} style={styles.logo} />
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.instructions}>
          Enter your registered email to receive a new temporary password
        </Text>

        <TextInput
          placeholder="Enter your email"
          placeholderTextColor="#666"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
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
          You'll receive an email with a temporary password. 
          Make sure to change it after logging in.
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
    left: '85%',
  },
  card: {
    backgroundColor: '#A8F3F2',
    borderRadius: wp('5%'),
    padding: wp('5%'),
    height: hp('60%'),
    justifyContent: 'center',
    top: 40,
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
