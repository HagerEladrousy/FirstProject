import { ip } from "../screens/ip.js";

import React, { useState } from 'react'
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
} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { LinearGradient } from 'expo-linear-gradient'

export default ({ navigation }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    phoneNumber: '',
    birthday: '',
    medicalSpecialty: '',
    gender: '',
    experience: '',
    password: '',
    rePassword: '',
  })

  const [showGenderModal, setShowGenderModal] = useState(false)
  const [showBirthdayPicker, setShowBirthdayPicker] = useState(false)
  const [selectedBirthday, setSelectedBirthday] = useState(new Date())

  const handleSubmit = async () => {
    try {
      const url = `${ip}/doc/signup`;
      console.log('Making request to:', url);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()
        console.log(result);
      if (response.ok) {
        Alert.alert('Success', 'Account created successfully!')
        navigation.navigate('Doctorhome')
      } else {
        Alert.alert('Error', result.message || 'Something went wrong')
      }
    } catch (error) {
      Alert.alert('Error', 'Network error. Please try again.')
      console.error(error)
    }
  }

  const handleSignUp = () => {
    for (const key in formData) {
      if (formData[key] === '') {
        Alert.alert('Missing Field', `Please fill out the ${key} field.`)
        return
      }
    }

    if (!formData.email.includes('@')) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.')
      return
    }
    if (formData.password !== formData.rePassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match.')
      return
    }
    if (formData.phoneNumber.length !== 11) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid phone number with 11 digits.')
      return
    }    

    handleSubmit()
  }

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || selectedBirthday
    setShowBirthdayPicker(false)
    setFormData({
      ...formData,
      birthday: currentDate.toISOString().split('T')[0],
    })
    setSelectedBirthday(currentDate)
  }

  const handleGenderSelection = (gender) => {
    setFormData({ ...formData, gender })
    setShowGenderModal(false)
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#1CD3DA', '#0F7074']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.gradient}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.header}>
            <Image source={require('../assets/project.png')} style={styles.logo} />
          </View>

          <View style={styles.row}>
            <Text style={styles.text2}>Sign up</Text>
            <Image
              source={{ uri: 'https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/a532963d-10fd-42cd-bf1a-efcbc62dfa35' }}
              resizeMode={'stretch'}
              style={styles.image}
            />
          </View>

          <View style={styles.column}>
            {[
              { label: 'First Name', key: 'firstName' },
              { label: 'Last Name', key: 'lastName' },
              { label: 'UserName', key: 'userName' },
              { label: 'Email', key: 'email' },
              { label: 'Phone Number', key: 'phoneNumber' },
              { label: 'Medical specialty', key: 'medicalSpecialty' },
              { label: 'Password', key: 'password', secureTextEntry: true },
              { label: 'Re-enter Password', key: 'rePassword', secureTextEntry: true },
            ].map(({ label, key, secureTextEntry }) => (
              <View key={key} style={styles.inputGroup}>
                <View style={styles.labelContainer}>
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
                <Text style={styles.label}>Experience</Text>
              </View>
              <TextInput
                style={styles.textField}
                value={formData.experience}
                keyboardType="numeric"
                onChangeText={(text) => setFormData({ ...formData, experience: text })}
              />
            </View>

            <TouchableOpacity onPress={() => setShowBirthdayPicker(true)}>
              <View style={styles.inputGroup}>
                <View style={styles.labelContainer}>
                  <Text style={styles.label}>Your Birthday</Text>
                </View>
                <TextInput
                  style={styles.textField}
                  value={formData.birthday}
                  editable={false}
                  placeholder="Select Birthday"
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

            <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
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
              <Text style={styles.modalText} onPress={() => handleGenderSelection('Male')}>Male</Text>
              <Text style={styles.modalText} onPress={() => handleGenderSelection('Female')}>Female</Text>
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
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingTop: 25,
  },
  column: {
    backgroundColor: '#B0FFF3',
    borderRadius: 40,
    paddingTop: 25,
    paddingBottom: 74,
    paddingHorizontal: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 8,
  },
  textField: {
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    paddingHorizontal: 15,
    shadowColor: '#00000040',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    elevation: 4,
  },
  signUpButton: {
    backgroundColor: '#0F7174',
    borderRadius: 32,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
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
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    paddingVertical: 10,
    color: '#000',
  },
  modalCloseText: {
    fontSize: 16,
    color: '#1DD4DA',
    marginTop: 10,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  text2: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginRight: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  image: {
    width: 40,
    height: 40,
  },
  logo: {
    width: 100,
    height: 100,
  },
})
