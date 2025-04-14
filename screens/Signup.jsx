import { ip } from "./ip.js";

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
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient';
import DropDownPicker from "react-native-dropdown-picker";
import md5 from 'react-native-md5'; 
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default ({ navigation }) => {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState(null);
  const [roles, setRoles] = useState([
    { label: "User", value: "user" },
    { label: "Doctor", value: "doctor" },
  ]);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    phoneNumber: '',
    birthday: '',
    diabetesType: '',
    gender: '',
    weight: '',
    password: '',
    rePassword: '',
  });

  const [showGenderModal, setShowGenderModal] = useState(false);
  const [showBirthdayPicker, setShowBirthdayPicker] = useState(false);
  const [selectedBirthday, setSelectedBirthday] = useState(new Date());

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || selectedBirthday;
    const today = new Date();
    const minDate = new Date(1900, 0, 1); // هنا خليت التاريخ الميلاد مينفعش يكون تحت 1900 و ميكونش في مستقبل

    if (currentDate > today) {
      Alert.alert('Error', 'Birth date cannot be in the future!');
      return;
    }
    
    if (currentDate < minDate) {
      Alert.alert('Error', 'Birth date cannot be before 1900!');
      return;
    }

    setShowBirthdayPicker(false);
    setFormData({
      ...formData,
      birthday: currentDate.toISOString().split('T')[0], 
    });
    setSelectedBirthday(currentDate);
  };

  const handleSubmit = async () => {
    if (formData.password !== formData.rePassword) {
      Alert.alert('Error', 'Passwords do not match!');
      return;
    }

    //  انا افترضت انه بين ال 1 و 3 الType of Diabetes 
    //معرفش ده صح ولا غلط
    const diabetesValue = parseInt(formData.diabetesType);
    if (isNaN(diabetesValue)) {
      Alert.alert('Error', 'Diabetes type must be a number (1, 2, or 3)');
      return;
    }
    if (diabetesValue < 1 || diabetesValue > 3) {
      Alert.alert('Error', 'Diabetes type must be between 1 and 3');
      return;
    }

    // //  تشفير الباسوورد ب md5
    // const encryptedPassword = md5.hex_md5(formData.password);
    // const encryptedRePassword = md5.hex_md5(formData.rePassword); 

    try {
      const response = await fetch(`${ip}/user/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify({
        //   ...formData,
        //   password: encryptedPassword,
        //   rePassword: encryptedRePassword, 
        //   role: role 
        // }),        


        body: JSON.stringify({
          ...formData,
          password: formData.password,
          rePassword: formData.rePassword, 
          role: role 
        }),
        
      });

      const result = await response.json();
      
      if (response.ok) {
        Alert.alert('Success', 'Account created successfully!');
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', result.message || 'Something went wrong');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error. Please try again.');
      console.error('Error:', error);
    }
  };

  const handleSignUp = () => {
    for (const key in formData) {
      if (formData[key] === '') {
        Alert.alert('Missing Field', `Please fill out the ${key} field.`);
        return;
      }
    }

    if (!formData.email.includes('@')) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    
    if (formData.phoneNumber.length < 10) {
      Alert.alert('Invalid Phone', 'Please enter a valid phone number.');
      return;
    }

    handleSubmit();
  };

  const handleWeightChange = (text) => {
    if (/^\d+$/.test(text) || text === '') {
      setFormData({ ...formData, weight: text });
    }
  };

  const handleGenderSelection = (gender) => {
    setFormData({ ...formData, gender });
    setShowGenderModal(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#1CD3DA', '#0F7074']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <ScrollView style={styles.scrollView}>
          <View style={styles.header}>
            <Image
              source={require('../assets/project.png')} style={styles.logo}
            />
          </View>
          
          <View style={styles.row}>
            <Text style={styles.text2}>Sign up</Text>
            <DropDownPicker
              open={open}
              value={role}
              items={roles}
              setOpen={setOpen}
              setValue={setRole}
              setItems={setRoles}
              placeholder="Select Role"
              style={{top:10,width:wp('80%'),left:wp('10%')}}
              listMode="SCROLLVIEW"
            />
            <Image
              source={{
                uri: 'https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/a532963d-10fd-42cd-bf1a-efcbc62dfa35',
              }}
              resizeMode={'stretch'}
              style={styles.image}
            />
          </View>
          
          <View style={styles.column}>
            {[
              {
                label: 'First Name',
                key: 'firstName',
                image: 'https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/c31dc436-67e0-47cc-beff-da84b762af4c',
              },
              {
                label: 'Last Name',
                key: 'lastName',
                image: 'https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/c31dc436-67e0-47cc-beff-da84b762af4c',
              },
              {
                label: 'UserName',
                key: 'userName',
                image: 'https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/c31dc436-67e0-47cc-beff-da84b762af4c',
              },
              {
                label: 'Email',
                key: 'email',
                image: 'https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/9e7546ea-cb3d-4970-95b5-6d9c9561ffda',
              },
              {
                label: 'Phone Number',
                key: 'phoneNumber',
                image: 'https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/bafa54a7-1357-4424-9114-6f85f5c70bf0',
              },
              {
                label: 'Type of Diabetes',
                key: 'diabetesType',
                image: 'https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/e67b5441-2b83-465b-b14f-d78b002c224d',
              },
              {
                label: 'Password',
                key: 'password',
                secureTextEntry: true,
                image: 'https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/f9b684a8-1b4d-4def-ac57-3ae88cfb953d',
              },
              {
                label: 'Re-enter Password',
                key: 'rePassword',
                secureTextEntry: true,
                image: 'https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/f89cff68-36a4-4be5-a3cc-e6824d557d11',
              },
            ].map(({ label, key, secureTextEntry, image }) => (
              <View key={key} style={styles.inputGroup}>
                <View style={styles.labelContainer}>
                  <Image source={{ uri: image }} style={styles.icon} />
                  <Text style={styles.label}>{label}</Text>
                </View>
                <TextInput
                  style={styles.textField}
                  value={formData[key]}
                  secureTextEntry={secureTextEntry}
                  onChangeText={(text) => setFormData({ ...formData, [key]: text })}
                />
              </View>
            ))}

            <View style={styles.inputGroup}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>Weight</Text>
              </View>
              <TextInput
                style={styles.textField}
                value={formData.weight}
                keyboardType="numeric"
                onChangeText={handleWeightChange}
              />
            </View>

            <TouchableOpacity onPress={() => setShowBirthdayPicker(true)}>
              <View style={styles.inputGroup}>
                <View style={styles.labelContainer}>
                  <Text style={styles.label}>Birth Date</Text>
                </View>
                <TextInput
                  style={styles.textField}
                  value={formData.birthday}
                  editable={false}
                  placeholder="Select Birth Date"
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setShowGenderModal(true)}>
              <View style={styles.inputGroup}>
                <View style={styles.labelContainer}>
                  <Text style={styles.label}>Gender</Text>
                </View>
                <TextInput
                  style={styles.textField}
                  value={formData.gender}
                  editable={false}
                  placeholder="Select Gender"
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.signUpButton}
              onPress={handleSignUp}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>

      <Modal
        transparent={true}
        visible={showGenderModal}
        animationType="slide"
        onRequestClose={() => setShowGenderModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowGenderModal(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text
                style={styles.modalText}
                onPress={() => handleGenderSelection('Male')}
              >
                Male
              </Text>
              <Text
                style={styles.modalText}
                onPress={() => handleGenderSelection('Female')}
              >
                Female
              </Text>
              <TouchableOpacity onPress={() => setShowGenderModal(false)}>
                <Text style={styles.modalCloseText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {showBirthdayPicker && (
        <DateTimePicker
          value={selectedBirthday}
          mode="date"
          display="default"
          onChange={handleDateChange}
          maximumDate={new Date()} 
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1, 
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingTop: hp('2%'),
  },
  column: {
    backgroundColor: '#B0FFF3',
    borderRadius: 40,
    paddingTop: hp('3%'),
    paddingBottom: hp('10%'),
    paddingHorizontal: wp('5%'),
  },
  inputGroup: {
    marginBottom: hp('3%'),
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  label: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: '#000',
    marginLeft: wp('2%'),
  },
  icon: {
    width: wp('5%'),
    height: wp('5%'),
  },
  textField: {
    height: hp('6%'),
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    paddingHorizontal: wp('3%'),
    shadowColor: '#00000040',
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
  },
  signUpButton: {
    backgroundColor: '#0F7174',
    borderRadius: 32,
    height: hp('7%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('3%'),
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: wp('5%'),
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: hp('2%'),
    alignItems: 'center',
  },
  modalText: {
    fontSize: wp('5%'),
    paddingVertical: hp('2%'),
    color: '#000',
  },
  modalCloseText: {
    fontSize: wp('4%'),
    color: '#1DD4DA',
    marginTop: hp('2%'),
  },
  header: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp('2%'),
    marginHorizontal: wp('5%'),
    marginBottom: hp('5%'),
  },
  text: {
    fontSize: wp('9%'),
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  textMonitor: {
    fontWeight: 'bold',
    fontSize: wp('8%'),
    color: '#FFFFFF',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp('5%'),
    marginBottom: hp('2%'),
  },
  text2: {
    fontSize: wp('9%'),
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginRight: wp('2%'),
  },
  image: {
    width: wp('10%'),
    height: wp('10%'),
  },
  logo: {
    width: wp('25%'),
    height: wp('25%'),
    bottom: hp('-2%'),
    left: wp('30%'),
  },
});
