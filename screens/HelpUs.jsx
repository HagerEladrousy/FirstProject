import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function ContactUs() {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={['#1CD3DA', '#0F7074']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={wp('7%')} color="#fff" />
      </TouchableOpacity>

      <View style={styles.container}>
        <Text style={styles.header}>Help Center</Text>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.text}>hagerahmedrmdan2016@gmail.com</Text>

        <Text style={styles.label}>Phone:</Text>
        <Text style={styles.text}>+30 123 456 7890</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    paddingTop: hp('6%'),
    paddingHorizontal: wp('5%'),
  },
  backButton: {
    position: 'absolute',
    top: hp('8%'),
    left: wp('5%'),
    zIndex: 1,
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: wp('5%'),
    borderRadius: wp('5%'),
    alignItems: 'center',
    marginTop: hp('30%'),
    alignSelf: 'center',
    width: wp('85%'),
  },
  header: {
    fontSize: wp('7%'),
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: hp('3%'),
  },
  label: {
    fontSize: wp('4.5%'),
    color: '#fff',
    marginTop: hp('1.5%'),
  },
  text: {
    fontSize: wp('4%'),
    color: '#f0f0f0',
    textAlign: 'center',
  },
});
