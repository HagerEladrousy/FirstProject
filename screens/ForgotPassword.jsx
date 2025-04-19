import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function ForgotPasswordScreen() {
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
          Enter your registered email to receive a password reset link.
        </Text>

        <TextInput
          placeholder="Email Address"
          keyboardType="email-address"
          style={styles.input}
          placeholderTextColor="#666"
        />

        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitText}>Send Email</Text>
        </TouchableOpacity>
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
    left:'85%'
   },
  card: {
    backgroundColor: '#A8F3F2',
    borderRadius: wp('5%'),
    padding: wp('5%'),
    height: hp('60%'),
    justifyContent: 'center',
    top:40
  },
  title: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: hp('2%'),
  },
  instructions: {
    fontSize: wp('4%'),
    textAlign: 'center',
    marginBottom: hp('3%'),
  },
  input: {
    backgroundColor: 'white',
    borderRadius: wp('3%'),
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('4%'),
    fontSize: wp('4%'),
    marginBottom: hp('3%'),
  },
  submitButton: {
    backgroundColor: 'white',
    paddingVertical: hp('1.5%'),
    borderRadius: wp('3%'),
    alignItems: 'center',
  },
  submitText: {
    fontWeight: 'bold',
    fontSize: wp('4%'),
  },
});