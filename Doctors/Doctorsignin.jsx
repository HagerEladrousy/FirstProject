import {ip} from "../screens/ip.js";

import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



export default ({ navigation }) => {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState(null);
  const [roles, setRoles] = useState([
    { label: "User", value: "user" },
    { label: "Doctor", value: "doctor" },
  ]);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async () => {
    try {
      if (!formData.email || !formData.password) {
        throw new Error('Please fill in all fields');
      }

      if (!formData.email.includes('@')) {
        throw new Error('Please enter a valid email address');
      }

        const url = `${ip}/doc/signin`;
        console.log('Making request to:', url);
            
        const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          //email: formData.email.toLowerCase().trim(),
          email: formData.email,
          password: formData.password.trim()
        }),
      });

      const result = await response.json();
      console.log(result)
      
      if (!response.ok) {
        throw new Error(result.message || 'Login failed');
      }

      const id = result.user.id; // استخراج _id وإعادة تسميته إلى id
      
      const saveUserId = async (userId) => {  // تأكد أن `userId` هو المعامل المستلم
        try {
          await AsyncStorage.setItem('userId', userId);
          console.log('User ID saved successfully!');
        } catch (error) {
          console.error('Error saving userId:', error);
        }
      };
      
      // استدعاء الدالة بعد استخراج الـ id
      saveUserId(id);
      


      if (role === 'doctor') {
        navigation.navigate('Doctorhome');
      } else {
        navigation.navigate('Home');
      }

    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#1CD3DA', '#0F7074']}
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.header}>
            <Image
              source={require('../assets/project.png')}
              style={styles.logo}
            />
          </View>
          
          <View style={styles.formContainer}>
            <View style={styles.signInHeader}>
              <Text style={styles.signInText}>Sign In</Text>
              <Image
                source={{ uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/669591d3-068a-4d4b-b7c0-9350a8486f4d" }}
                style={styles.signInIcon}
              />
            </View>

            <DropDownPicker
              open={open}
              value={role}
              items={roles}
              setOpen={setOpen}
              setValue={setRole}
              setItems={setRoles}
              placeholder="Select Role"
              style={styles.dropdown}
              listMode="SCROLLVIEW"
            />

            <View style={styles.inputGroup}>
              <View style={styles.labelContainer}>
                <Image
                  source={{ uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/9e7546ea-cb3d-4970-95b5-6d9c9561ffda" }}
                  style={styles.inputIcon}
                />
                <Text style={styles.label}>Email</Text>
              </View>
              <TextInput
                style={styles.textField}
                value={formData.email}
                onChangeText={(text) => setFormData({...formData, email: text})}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.labelContainer}>
                <Image
                  source={{ uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/f9b684a8-1b4d-4def-ac57-3ae88cfb953d" }}
                  style={styles.inputIcon}
                />
                <Text style={styles.label}>Password</Text>
              </View>
              <TextInput
                style={styles.textField}
                value={formData.password}
                onChangeText={(text) => setFormData({...formData, password: text})}
                secureTextEntry
              />
            </View>

            <TouchableOpacity style={styles.signUpButton} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>

            <View style={styles.socialButtonsContainer}>
              <TouchableOpacity style={styles.socialButton}>
                <Text style={styles.socialButtonText}>Sign In with Google</Text>
                <Image
                  source={{ uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/e247c3e6-e81b-4069-b1d8-36a1b678a22b" }}
                  style={styles.socialIcon}
                />
              </TouchableOpacity>

              <TouchableOpacity style={styles.socialButton}>
                <Text style={styles.socialButtonText}>Sign In with Facebook</Text>
                <Image
                  source={{ uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/91d14ecf-3323-4007-9326-7b721be77f4b" }}
                  style={styles.socialIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    paddingVertical: hp('2%'),
  },
  header: {
    alignItems: 'center',
    marginTop: hp('2%'),
    marginBottom: hp('3%'),
  },
  logo: {
    width: wp('25%'),
    height: wp('25%'),
    left: wp('35%'),
  },
  formContainer: {
    backgroundColor: '#B0FFF3',
    borderRadius: wp('8%'),
    padding: wp('5%'),
    marginHorizontal: wp('5%'),
    marginBottom: hp('3%'),
  },
  signInHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp('3%'),
  },
  signInText: {
    color: 'white',
    fontSize: wp('9%'),
    fontWeight: 'bold',
  },
  signInIcon: {
    width: wp('7%'),
    height: wp('7%'),
    marginLeft: wp('2%'),
  },
  dropdown: {
    backgroundColor: 'white',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: wp('4%'),
    marginBottom: hp('2%'),
    zIndex: 1000,
  },
  inputGroup: {
    marginBottom: hp('2%'),
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  inputIcon: {
    width: wp('6%'),
    height: wp('6%'),
    marginRight: wp('2%'),
  },
  label: {
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
    color: '#000',
  },
  textField: {
    backgroundColor: 'white',
    height: hp('7%'),
    borderRadius: wp('4%'),
    paddingHorizontal: wp('4%'),
    borderColor: '#000',
    borderWidth: 1,
  },
  signUpButton: {
    backgroundColor: '#0F7174',
    borderRadius: wp('8%'),
    height: hp('6%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('2%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: wp('5%'),
    fontWeight: 'bold',
  },
  socialButtonsContainer: {
    marginTop: hp('2%'),
  },
  socialButton: {
    backgroundColor: 'white',
    borderRadius: wp('8%'),
    height: hp('6%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
    marginBottom: hp('2%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  socialButtonText: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
    color: '#000',
  },
  socialIcon: {
    width: wp('6%'),
    height: wp('6%'),
  },
});