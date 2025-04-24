import React, { useState, useEffect } from "react";
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
  ActivityIndicator,
  Modal,
  Platform
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { LinearGradient } from 'expo-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import user from "../assets/user-avatar 1.png";
import notification from "../assets/notification2.png";
import profile from "../assets/profile-circle.png";
import call from "../assets/call.png";
import email2 from "../assets/email2.png";
import calender from "../assets/calendar.png";
import health from "../assets/health.png";
import weight from "../assets/weight.png";
import blood from "../assets/blood.png";
import editIcon from "../assets/edit.png";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ip } from "./ip.js";

export default function Profile({ navigation, route }) {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [editField, setEditField] = useState("");
  const [editValue, setEditValue] = useState("");
  const [editFirstName, setEditFirstName] = useState("");
  const [editLastName, setEditLastName] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const calculateAge = (birthDate) => {
    if (!birthDate) {
      console.log('No birth date provided');
      return 0;
    }

    const birthDateObj = new Date(birthDate);
    if (isNaN(birthDateObj.getTime())) {
      console.log('Invalid birth date:', birthDate);
      return 0;
    }

    const today = new Date();
    
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    const dayDiff = today.getDate() - birthDateObj.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    console.log(`Calculated age: ${age} from birth date: ${birthDateObj}`);
    return age >= 0 ? age : 0;
  };

  const openEdit = (field, value) => {
    setEditField(field);
  
    if (field === "birthDate") {
      let initialDate;
  
      if (profileData?.birthDate) {
        const profileDate = new Date(profileData.birthDate);
        if (!isNaN(profileDate.getTime())) {
          initialDate = profileDate;
        }
      }
  
      if (!initialDate) {
        initialDate = new Date();
      }
  
      setSelectedDate(initialDate);
      setEditValue(initialDate.toISOString().split("T")[0]);
  
      setShowDatePicker(true); 
    } 
    else if (field === "name") {
      const names = value?.split(" ") || ["", ""];
      setEditFirstName(names[0] || "");
      setEditLastName(names[1] || "");
      setModalVisible(true);
    } 
    else {
      setEditValue(value?.toString() || "");
      setModalVisible(true);
    }
  };
  
  

  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
  
    if (date) {
      setSelectedDate(date);
      const isoDate = date.toISOString();
      setEditValue(isoDate.split("T")[0]);
      console.log("Selected new date:", isoDate);
  
      saveEdit("birthDate", isoDate);
    }
  };
  
  
  

  const saveEdit = async (fieldOverride = null, valueOverride = null) => {
    let fieldToUpdate = fieldOverride || editField;
    let valueToUpdate = valueOverride || editValue;
  
    if (fieldToUpdate === "name") {
      valueToUpdate = `${editFirstName.trim()} ${editLastName.trim()}`;
      if (!editFirstName || !editLastName) {
        return Alert.alert("Validation Error", "Please enter both first and last name.");
      }
    } 
    else if (fieldToUpdate === "birthDate") {
      if (!valueToUpdate) {
        return Alert.alert("Error", "Please select or enter a valid date");
      }
  
      console.log('Saving new birth date:', valueToUpdate);
    } 
    else if (fieldToUpdate === "phone") {
      if (!/^\d{11}$/.test(valueToUpdate)) {
        return Alert.alert("Invalid Phone", "Phone number must be exactly 11 digits.");
      }
    } 
    else if (fieldToUpdate === "diabetesType") {
      const type = parseInt(valueToUpdate);
      if (isNaN(type) || type < 1 || type > 3) {
        return Alert.alert("Invalid Type", "Diabetes type must be 1, 2, or 3.");
      }
    }
  
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) throw new Error("User ID not found");
  
      const response = await fetch(`${ip}/user/updateProfile`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${await AsyncStorage.getItem('token')}`
        },
        body: JSON.stringify({
          userId,
          field: fieldToUpdate,
          value: valueToUpdate,
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to update profile");
      }
  
      Alert.alert("Success", "Profile updated successfully");
  
      const newAge = fieldToUpdate === "birthDate" ? calculateAge(valueToUpdate) : profileData.age;
      console.log('Updating profile with new age:', newAge);
  
      setProfileData(prev => ({
        ...prev,
        [fieldToUpdate]: valueToUpdate,
        age: newAge
      }));
  
      setModalVisible(false);
      setShowDatePicker(false);
    } catch (error) {
      console.error("Update error:", error);
      Alert.alert("Update Error", error.message || "Failed to update profile");
    }
  };
  

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userId = route.params?.patientId || await AsyncStorage.getItem('userId');
        if (!userId) throw new Error('User ID not found');
    
        const response = await fetch(`${ip}/user/profile?userId=${userId}`, {
          headers: {
            "Authorization": `Bearer ${await AsyncStorage.getItem('token')}`
          }
        });
    
        const data = await response.json();
    
        if (response.ok && data.success) {
          const birthDateRaw =
            data.data.birthDate ||
            data.data.birthday ||
            data.data.birthdate ||
            null;
    
          let age = 0;
    
          if (birthDateRaw) {
            age = calculateAge(birthDateRaw);
          } else {
            console.log("No valid birth date found in profile data");
          }
    
          console.log('Fetched profile data with age:', age, 'from birth date:', birthDateRaw);
    
          setProfileData({
            ...data.data,
            age,
            birthDate: birthDateRaw,
          });
        } else {
          throw new Error(data.message || 'Failed to fetch profile data');
        }
      } catch (error) {
        console.error('Profile fetch error:', error);
        Alert.alert('Error', error.message || 'Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };
    

    fetchProfileData();
  }, []);

  if (loading) {
    return (
      <LinearGradient colors={['#1CD3DA', '#0F7074']} style={styles.gradient}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFFFFF" />
        </View>
      </LinearGradient>
    );
  }

  if (!profileData) {
    return (
      <LinearGradient colors={['#1CD3DA', '#0F7074']} style={styles.gradient}>
        <View style={styles.loadingContainer}>
          <Text style={styles.errorText}>Failed to load profile data</Text>
        </View>
      </LinearGradient>
    );
  }

  const InfoRow = ({ icon, label, value, editableField }) => (
    <View style={styles.infoRow}>
      <Image source={icon} style={styles.icon} />
      <Text style={styles.infoText}>{label}: {value || 'Not set'}</Text>
      {editableField &&
        <TouchableOpacity onPress={() => openEdit(editableField, value)}>
          <Image source={editIcon} style={styles.editIcon} />
        </TouchableOpacity>
      }
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#1CD3DA', '#0F7074']} style={styles.gradient}>
        <ScrollView contentContainerStyle={{ paddingBottom: hp('10%') }}>
          <View style={styles.header}>
            <Image source={notification} style={styles.notification} />
            <Image source={require('../assets/project.png')} style={styles.logo} />
          </View>

          <View style={styles.row}>
            <Image source={user} style={styles.image} />
            <Text style={styles.text2}>Edit Profile</Text>
          </View>

          <View style={styles.column}>
            <InfoRow icon={profile} label="Name" value={profileData.name} editableField="name" />
            <InfoRow icon={call} label="Phone" value={profileData.phone} editableField="phone" />
            {/* <InfoRow icon={email2} label="Email" value={profileData.email} /> */}
            <InfoRow icon={calender} label="Age" value={`${profileData.age} years`} editableField="birthDate" />
            <InfoRow icon={health} label="Diabetes Type" value={profileData.diabetesType} editableField="diabetesType" />
            <InfoRow icon={weight} label="Weight" value={profileData.weight} editableField="weight" />
            {/* <InfoRow icon={blood} label="Fasting Sugar" value={profileData.fastingSugar} />
            <InfoRow icon={blood} label="Cumulative Sugar" value={profileData.cumulativeSugar} /> */}

            <View style={styles.buttonsRow}>
              {/* <TouchableOpacity onPress={() => navigation.navigate('Medicines')}>
                <View style={styles.textField}>
                  <Text style={styles.buttonText}>Medicines</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.textField}>
                  <Text style={styles.buttonText}>Meals</Text>
                </View>
              </TouchableOpacity> */}
            </View>
          </View>
        </ScrollView>

        <Modal visible={modalVisible} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {editField === "name" ? (
                <>
                  <TextInput
                    placeholder="First Name"
                    value={editFirstName}
                    onChangeText={setEditFirstName}
                    style={styles.input}
                  />
                  <TextInput
                    placeholder="Last Name"
                    value={editLastName}
                    onChangeText={setEditLastName}
                    style={styles.input}
                  />
                </>
              ) : editField === "birthDate" ? (
                <>
                  {showDatePicker || Platform.OS === 'ios' ? (
                    <DateTimePicker
                      value={selectedDate}
                      mode="date"
                      display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                      maximumDate={new Date()}
                      onChange={handleDateChange}
                      style={styles.datePicker}
                    />
                  ) : (
                    <TouchableOpacity 
                      onPress={() => setShowDatePicker(true)}
                      style={styles.dateInput}
                    >
                      <Text>{editValue || 'Select date'}</Text>
                    </TouchableOpacity>
                  )}
                  <Text style={styles.selectedDateText}>
                    Selected: {editValue || 'No date selected'}
                  </Text>
                </>
              ) : (
                <TextInput
                  placeholder={`Enter new ${editField}`}
                  value={editValue}
                  onChangeText={setEditValue}
                  keyboardType={
                    editField === "phone" || editField === "diabetesType" || editField === "weight"
                      ? "numeric"
                      : "default"
                  }
                  style={styles.input}
                />
              )}

              <View style={styles.modalButtons}>
                <TouchableOpacity onPress={() => {
                  setModalVisible(false);
                  setShowDatePicker(false);
                }}>
                  <View style={styles.cancelButton}>
                    <Text style={styles.buttonModalText}>Cancel</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => saveEdit()}>
                <View style={styles.confirmButton}>
                    <Text style={styles.buttonModalText}>Save</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {showDatePicker && Platform.OS === 'android' && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            maximumDate={new Date()}
            onChange={handleDateChange}
          />
        )}
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { flex: 1 },
  column: {
    backgroundColor: "#B0FFF3",
    borderRadius: wp('8%'),
    marginHorizontal: wp('4%'),
    paddingVertical: hp('3%'),
    paddingHorizontal: wp('5%'),
    marginTop: hp('3%')
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: wp('5%'),
    marginTop: hp('4%'),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: wp('5%'),
    marginTop: hp('2%'),
  },
  text2: {
    fontSize: wp('6%'),
    fontWeight: "bold",
    color: "#FFFFFF",
    marginLeft: wp('2%'),
  },
  image: {
    width: wp('8%'),
    height: wp('8%'),
  },
  logo: {
    width: wp('20%'),
    height: wp('20%'),
  },
  notification: {
    width: wp('7%'),
    height: wp('7%'),
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp('2%')
  },
  icon: {
    width: wp('6%'),
    height: wp('6%'),
    marginRight: wp('3%'),
  },
  infoText: {
    fontSize: wp('4.5%'),
    fontWeight: "bold",
    flex: 1
  },
  editIcon: {
    width: wp('5%'),
    height: wp('5%'),
    marginLeft: wp('2%'),
  },
  textField: {
    height: hp('5.5%'),
    backgroundColor: "#286E77",
    borderRadius: wp('10%'),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
    marginTop: hp('2%'),
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: wp('4%'),
    color: "white",
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('2%'),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorText: {
    color: 'white',
    fontSize: wp('4%'),
    fontWeight: 'bold'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalContent: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    padding: 10,
    fontSize: wp('4%')
  },
  datePicker: {
    width: '100%',
    marginBottom: 15,
  },
  dateInput: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
  },
  selectedDateText: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: wp('4%'),
    color: '#555',
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15
  },
  cancelButton: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    minWidth: 100,
    alignItems: 'center'
  },
  confirmButton: {
    backgroundColor: "#1CD3DA",
    padding: 10,
    borderRadius: 5,
    minWidth: 100,
    alignItems: 'center'
  },
  buttonModalText: {
    fontWeight: "bold",
  }
});