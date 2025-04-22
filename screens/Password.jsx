import {
  StyleSheet,
  ScrollView,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Text,
  Alert
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ip } from "./ip";
import md5 from 'react-native-md5';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import logo from "../assets/project.png";
import notification from "../assets/notification2.png";
import home from "../assets/home.png";
import chatoutline from "../assets/chatoutline.png";
import pill from "../assets/pill.png";
import Menue from "../assets/menuoutline.png";
import password from "../assets/password.png";

export default function ChangePasswordScreen({ navigation }) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await AsyncStorage.getItem('userId');
      setUserId(id);
    };
    fetchUserId();
  }, []);

  const handleSubmit = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New passwords do not match');
      return;
    }

    try {
      const response = await fetch(`${ip}/user/changePassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          oldPassword: md5.hex_md5(oldPassword),
          newPassword: md5.hex_md5(newPassword),
          confirmPassword: md5.hex_md5(confirmPassword)
        })
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          Alert.alert('Error', 'Old password is incorrect');
          return;
        } else {
          Alert.alert('Error', data.message || 'Request failed');
          return;
        }
      }

      if (data.success) {
        Alert.alert('Success', 'Password changed successfully');
        navigation.goBack();
      } else {
        Alert.alert('Error', data.message || 'Failed to change password');
      }
    } catch (error) {
      if (error.message === 'Failed to fetch') {
        Alert.alert('Error', 'Network error - please check your connection');
      } else {
        Alert.alert('Error', 'An unexpected error occurred');
      }
    }
  };

  return (
    <LinearGradient
      colors={['#1CD3DA', '#0F7074']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        nestedScrollEnabled={true}
      >
        <View style={styles.header}>
          <TouchableOpacity>
            <Image source={notification} style={styles.notification} />
          </TouchableOpacity>
          <Image source={logo} style={styles.logo} />
        </View>

        <View style={styles.titleContainer}>
          <Image source={password} style={styles.icon} />
          <Text style={styles.title}>Change Password</Text>
        </View>

        <View style={styles.box}></View>

        <View style={styles.form}>
          <Text style={styles.label}>Old Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            value={oldPassword}
            onChangeText={setOldPassword}
          />

          <Text style={styles.label}>New Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            value={newPassword}
            onChangeText={setNewPassword}
          />

          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, { backgroundColor: '#ccc' }]} onPress={() => navigation.goBack()}>
            <Text style={[styles.buttonText, { color: '#333' }]}>Cancel</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bar}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image source={home} style={styles.bottomIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Doctornote')}>
            <Image source={chatoutline} style={styles.bottomIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Medicines')}>
            <Image source={pill} style={styles.bottomIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Account')}>
            <Image source={Menue} style={styles.bottomIcon} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: hp('12%'),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp('5%'),
    marginTop: hp('5%'),
  },
  logo: {
    width: wp('20%'),
    height: wp('20%'),
  },
  notification: {
    width: wp('8%'),
    height: wp('8%'),
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('2%'),
    marginLeft: wp('10%'),
  },
  icon: {
    width: wp('8%'),
    height: wp('8%'),
    marginRight: wp('2%'),
  },
  title: {
    fontWeight: 'bold',
    fontSize: wp('5%'),
    color: 'white',
  },
  box: {
    position: 'absolute',
    top: hp('25%'),
    left: wp('5%'),
    width: wp('90%'),
    height: hp('80%'),
    backgroundColor: "#B0FFF3",
    opacity: 0.6,
    borderRadius: wp('8%'),
  },
  form: {
    marginTop: hp('4%'),
    paddingHorizontal: wp('10%'),
  },
  label: {
    fontWeight: 'bold',
    fontSize: wp('4.5%'),
    marginTop: hp('2%'),
    marginBottom: hp('1%'),
  },
  input: {
    backgroundColor: 'white',
    borderRadius: wp('6%'),
    paddingHorizontal: wp('4%'),
    height: hp('6%'),
    opacity: 0.7,
  },
  button: {
    backgroundColor: '#286E77',
    marginTop: hp('3%'),
    paddingVertical: hp('1.5%'),
    borderRadius: wp('6%'),
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
  bar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: hp('10%'),
    backgroundColor: "#B0FFF3",
    borderTopLeftRadius: wp('8%'),
    borderTopRightRadius: wp('8%'),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  bottomIcon: {
    width: wp('7%'),
    height: wp('7%'),
  },
});
