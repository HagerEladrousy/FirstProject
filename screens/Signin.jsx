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

      const response = await fetch('http://192.168.1.10:5500/user/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email.toLowerCase().trim(),
          password: formData.password.trim()
        }),
      });

      const result = await response.json();
      
      
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
        navigation.navigate('Doctorhome', { user: result.user });
      } else {
        navigation.navigate('Home', { user: result.user });
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
    paddingVertical: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
  },
  formContainer: {
    backgroundColor: '#B0FFF3',
    borderRadius: 40,
    padding: 25,
    marginHorizontal: 20,
    marginBottom: 30,
  },
  signInHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  signInText: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  },
  signInIcon: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
  dropdown: {
    backgroundColor: 'white',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 20,
    zIndex: 1000,
  },
  inputGroup: {
    marginBottom: 20,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  inputIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  textField: {
    backgroundColor: 'white',
    height: 50,
    borderRadius: 15,
    paddingHorizontal: 15,
    borderColor: '#000',
    borderWidth: 1,
  },
  signUpButton: {
    backgroundColor: '#0F7174',
    borderRadius: 32,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  socialButtonsContainer: {
    marginTop: 20,
  },
  socialButton: {
    backgroundColor: 'white',
    borderRadius: 32,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  socialIcon: {
    width: 25,
    height: 25,
  },
});