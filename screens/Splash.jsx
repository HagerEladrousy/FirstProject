

import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import image from '../assets/project.png';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function SplashScreen({ onSplashEnd }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onSplashEnd(); // Call the navigation function after delay
    }, 2500);

    return () => clearTimeout(timer); // Clean up on unmount
  }, []);

  return (
    <LinearGradient
      colors={['#1CD3DA', '#0F7074']}
      style={styles.container}
    >
      <StatusBar style="light" />

      <Image source={image} style={styles.logo} />

      <Text style={styles.title}>
        <Text style={styles.highlight}>G</Text>luco
        <Text style={styles.highlight}>C</Text>are 
      </Text>

      <Text style={styles.title2}>
        <Text style={styles.highlight}> M</Text>onitor
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: wp('120%'),
    height: wp('120%'),
    resizeMode: 'contain',
    marginBottom: hp('-5%'),
  },
  title: {
    fontSize: wp('11%'),
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Almarai-Bold',
  },
  title2: {
    fontSize: wp('11%'),
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Almarai-Bold',
  },
  highlight: {
    color: '#1E4D6E',
  },
});