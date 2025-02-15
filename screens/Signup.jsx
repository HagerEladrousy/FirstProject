import React, { useState } from "react";
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
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker"; // Import DateTimePicker
import { LinearGradient } from 'expo-linear-gradient';


export default ({navigation }) => {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phoneNumber: "",
    birthday: "",
    diabetesType: "",
    gender: "",
    weight: "",
    password: "",
    rePassword: "",
  });

  const [showGenderModal, setShowGenderModal] = useState(false);
  const [showBirthdayPicker, setShowBirthdayPicker] = useState(false);
  const [selectedBirthday, setSelectedBirthday] = useState(new Date());

  const handleSignUp = () => {
    // Validate all fields
    for (const key in formData) {
      if (formData[key] === "") {
        Alert.alert("Missing Field", `Please fill out the ${key} field.`);
        return;
      }
    }

    if (!formData.email.includes("@")) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }
    if (formData.password !== formData.rePassword) {
      Alert.alert("Password Mismatch", "Passwords do not match.");
      return;
    }
    if (formData.phoneNumber.length < 10) {
      Alert.alert("Invalid Phone Number", "Please enter a valid phone number.");
      return;
    }

    Alert.alert("Success", "Account created successfully!");
  };

  const handleWeightChange = (text) => {
    // Allow only numbers in the weight field
    if (/^\d+$/.test(text) || text === "") {
      setFormData({ ...formData, weight: text });
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || selectedBirthday;
    setShowBirthdayPicker(false);
    setFormData({ ...formData, birthday: currentDate.toISOString().split('T')[0] }); // format as YYYY-MM-DD
    setSelectedBirthday(currentDate);
  };

  const handleGenderSelection = (gender) => {
    setFormData({ ...formData, gender });
    setShowGenderModal(false);
  };

  return (

    

  
    <SafeAreaView style={styles.container}>

<LinearGradient
    // Colors for the gradient
    colors={['#1CD3DA', '#0F7074']}
    // Gradient direction (top-left to bottom-right by default)
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={styles.gradient}
  >
      <ScrollView style={styles.scrollView}>
    


        <View style={styles.header}>
          <Image source={require('../assets/project.png')} style={styles.logo}/>
        </View>
        <View style={styles.row}>
          <Text style={styles.text2}>Sign up</Text>
          <Image
            source={{
              uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/a532963d-10fd-42cd-bf1a-efcbc62dfa35",
            }}
            resizeMode={"stretch"}
            style={styles.image}
          />
        </View>
        <View style={styles.column}>
          {[ 
            { label: "First Name", key: "firstName", image: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/c31dc436-67e0-47cc-beff-da84b762af4c" },
            { label: "Last Name", key: "lastName", image: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/c31dc436-67e0-47cc-beff-da84b762af4c" },
            { label: "Username", key: "username", image: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/c31dc436-67e0-47cc-beff-da84b762af4c" },
            { label: "Email", key: "email", image: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/9e7546ea-cb3d-4970-95b5-6d9c9561ffda" },
            { label: "Phone Number", key: "phoneNumber", image: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/bafa54a7-1357-4424-9114-6f85f5c70bf0" },
            { label: "Type of Diabetes", key: "diabetesType", image: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/e67b5441-2b83-465b-b14f-d78b002c224d" },
            { label: "Password", key: "password", secureTextEntry: true, image: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/f9b684a8-1b4d-4def-ac57-3ae88cfb953d" },
            { label: "Re-enter Password", key: "rePassword", secureTextEntry: true, image: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/f89cff68-36a4-4be5-a3cc-e6824d557d11" },
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

          {/* Weight Field (only accepts numbers) */}
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

          {/* Birthday Field (Date Picker) */}
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

          {/* Gender Field (Modal) */}
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

          <TouchableOpacity style={styles.signUpButton} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        
      </ScrollView>

      </LinearGradient>

      {/* Gender Modal */}
      <Modal
        transparent={true}
        visible={showGenderModal}
        animationType="slide"
        onRequestClose={() => setShowGenderModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowGenderModal(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText} onPress={() => handleGenderSelection("Male")}>
                Male
              </Text>
              <Text style={styles.modalText} onPress={() => handleGenderSelection("Female")}>
                Female
              </Text>
              <TouchableOpacity onPress={() => setShowGenderModal(false)}>
                <Text style={styles.modalCloseText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* DateTimePicker for Birthday */}
      {showBirthdayPicker && (
        <DateTimePicker
          value={selectedBirthday}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  gradient: {
    flex: 1, // Fill the entire screen
    //justifyContent: 'center', // Center content vertically
    //alignItems: 'center', // Center content horizontally
  },

  container: {
    flex: 1,
   // backgroundColor: "#1DD4DA",
   
  },
  scrollView: {
    flex: 1,
    paddingTop: 25,
  },
  column: {
    backgroundColor: "#B0FFF3",
    borderRadius: 40,
    paddingTop: 25,
    paddingBottom: 74,
    paddingHorizontal: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginLeft: 8,
  },
  icon: {
    width: 22,
    height: 22,
  },
  textField: {
    height: 40,
    backgroundColor: "#FFFFFF",
    borderRadius: 32,
    paddingHorizontal: 15,
    shadowColor: "#00000040",
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
  },
  signUpButton: {
    backgroundColor: "#0F7174",
    borderRadius: 32,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    paddingVertical: 10,
    color: "#000",
  },
  modalCloseText: {
    fontSize: 16,
    color: "#1DD4DA",
    marginTop: 10,
    },
    header: {
        flexDirection: "colomn",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 20,
        marginHorizontal: 20,
        marginBottom: 30,
        marginLeft:170
      },
      text: {
        fontSize: 36,
        fontWeight: "bold",
        color: "#FFFFFF",
      },
      textMonitor: {
        fontWeight: "bold",
        fontSize: 35,
        color: "#FFFFFF",
      },
      row: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 20,
        marginBottom: 20,
      },
      text2: {
        fontSize: 40,
        fontWeight: "bold",
        color: "#FFFFFF",
        marginRight: 10,
      },
      image: {
        width: 40,
        height: 40,
      },
      logo:{
        width:100,
        height:100,
        bottom:10,
        left:50
      },
});