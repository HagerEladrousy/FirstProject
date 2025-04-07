import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ip } from './ip.js';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const addCumulativeBlood = async (sugarLevel, userId) => {
  try {
    const response = await axios.post(`${ip}/user/addCumulativeBlood`, {
      sugar_level: sugarLevel,
      user_id: userId,
      date: new Date().toISOString(),
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

export default function CumulativeBloodScreen({ navigation }) {
  const [bloodSugar, setBloodSugar] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (storedUserId) {
          setUserId(storedUserId);
        }
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };
    fetchUserId();
  }, []);

  const handleSubmit = async () => {
    if (!bloodSugar)
      return Alert.alert('Error', 'Please enter a blood sugar level.');
    if (!userId)
      return Alert.alert('Error', 'User ID not found. Please login again.');

    const sugarLevel = Number(bloodSugar);
    await addCumulativeBlood(sugarLevel, userId);

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
      {/* الشعار */}
      <Image source={require('../assets/project.png')} style={styles.logo} />

      {/* أيقونة الدم */}
      <Image source={require('../assets/blood.png')} style={styles.bloodIcon} />

      {/* العنوان */}
      <Text style={styles.title}>Glucose Reading</Text>

      {/* المحتوى */}
      <View style={styles.contentBox}>
        <Text style={styles.prompt}>Enter Cumulative Blood Sugar</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter number..."
          keyboardType="numeric"
          value={bloodSugar}
          onChangeText={setBloodSugar}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp('8%'),
    alignItems: 'center',
  },
  logo: {
    width: wp('25%'),
    height: wp('25%'),
    resizeMode: 'contain',
    position: 'absolute',
    top: hp('5%'),
    right: wp('5%'),
  },
  bloodIcon: {
    width: wp('30%'),
    height: wp('30%'),
    resizeMode: 'contain',
    marginTop: hp('2%'),
  },
  title: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: hp('2%'),
  },
  contentBox: {
    width: wp('90%'),
    backgroundColor: 'rgba(176, 255, 243, 0.6)',
    borderRadius: wp('6%'),
    padding: wp('5%'),
    alignItems: 'center',
    marginTop: hp('2%'),
  },
  prompt: {
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
    marginBottom: hp('2%'),
    textAlign: 'center',
    color: '#000',
  },
  input: {
    width: '100%',
    height: hp('7%'),
    backgroundColor: '#fff',
    borderRadius: wp('5%'),
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: wp('3%'),
    fontSize: wp('4%'),
    textAlign: 'center',
    marginBottom: hp('3%'),
  },
  button: {
    backgroundColor: '#286E77',
    borderRadius: wp('5%'),
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('10%'),
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: wp('4%'),
    textAlign: 'center',
  },
});
