import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet, ActivityIndicator, Alert, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ip } from "../screens/ip.js";
import AsyncStorage from '@react-native-async-storage/async-storage';
import user from "../assets/user-avatar 1.png";
import notification2 from "../assets/notification2.png";
import profile from "../assets/profile-circle.png";
import call from "../assets/call.png";
import email2 from "../assets/email2.png";
import medical from "../assets/medical.png";
import Gender from "../assets/Gender.png";
import experience from "../assets/experience.png";
import editIcon from "../assets/edit.png";
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import DateTimePicker from '@react-native-community/datetimepicker';

export default function DoctorProfile({ route, navigation }) {
  const [doctorData, setDoctorData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentField, setCurrentField] = useState('');
  const [currentLabel, setCurrentLabel] = useState('');
  const [newValue, setNewValue] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [chooseNamePartModal, setChooseNamePartModal] = useState(false); // <<< أضفنا هذه

  useEffect(() => {
    fetchDoctorProfile();
  }, []);

  const fetchDoctorProfile = async () => {
    try {
      const doctorId = route.params?.doctorId || await AsyncStorage.getItem('doctorId');
      if (!doctorId) {
        throw new Error('Doctor ID not found');
      }

      const response = await fetch(`${ip}/doc/profile?doctorId=${doctorId}`);
      const data = await response.json();

      if (response.ok && data.success) {
        setDoctorData(data.data);
      } else {
        throw new Error(data.message || 'Failed to fetch doctor profile');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleEditField = (field, label) => {
    setCurrentField(field);
    setCurrentLabel(label);
    setNewValue('');
    if (field === 'birthDate') {
      setShowDatePicker(true);
    } else {
      setEditModalVisible(true);
    }
  };

  const submitEdit = async () => {
    if (!newValue) {
      Alert.alert('Error', `Please enter new ${currentLabel}`);
      return;
    }

    try {
      const doctorId = route.params?.doctorId || await AsyncStorage.getItem('doctorId');
      const response = await fetch(`${ip}/doc/updateProfile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ doctorId, field: currentField, value: newValue }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        Alert.alert('Success', `${currentLabel} updated successfully`);
        fetchDoctorProfile();
        setEditModalVisible(false);
        setShowDatePicker(false);
      } else {
        throw new Error(data.message || 'Failed to update profile');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to update profile');
    }
  };

  if (loading) {
    return (
      <LinearGradient colors={['#1CD3DA', '#0F7074']} style={styles.gradient}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFFFFF" />
        </View>
      </LinearGradient>
    );
  }

  if (!doctorData) {
    return (
      <LinearGradient colors={['#1CD3DA', '#0F7074']} style={styles.gradient}>
        <View style={styles.loadingContainer}>
          <Text style={styles.errorText}>Failed to load doctor profile</Text>
        </View>
      </LinearGradient>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#1CD3DA', '#0F7074']} style={styles.gradient}>

        {/* مودال اختيار تعديل الاسم */}
        {chooseNamePartModal && (
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Which part of the name?</Text>
              <TouchableOpacity style={styles.modalButton} onPress={() => { setChooseNamePartModal(false); handleEditField('firstName', 'First Name'); }}>
                <Text style={styles.modalButtonText}>Edit First Name</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={() => { setChooseNamePartModal(false); handleEditField('lastName', 'Last Name'); }}>
                <Text style={styles.modalButtonText}>Edit Last Name</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setChooseNamePartModal(false)}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* مودال تعديل القيم العادي */}
        {editModalVisible && (
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Edit {currentLabel}</Text>
              <TextInput
                style={styles.modalInput}
                placeholder={`Enter new ${currentLabel}`}
                value={newValue}
                onChangeText={setNewValue}
              />
              <TouchableOpacity style={styles.modalButton} onPress={submitEdit}>
                <Text style={styles.modalButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setEditModalVisible(false)}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Date Picker */}
        {showDatePicker && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                setNewValue(selectedDate.toISOString().split('T')[0]);
                submitEdit();
              }
            }}
          />
        )}

        <ScrollView contentContainerStyle={{ paddingBottom: hp('10%') }}>
          <View style={styles.header}>
            <Image source={notification2} style={styles.notification} />
            <Image source={require('../assets/project.png')} style={styles.logo} />
          </View>

          <View style={styles.row}>
            <Image source={user} style={styles.imageprofile} />
            <Text style={styles.text2}>Edit Profile</Text>
          </View>

          <View style={styles.column}>
            
            {/* كل صف فيه بيانات + أيقونة تعديل */}
            <TouchableOpacity style={styles.infoRow} onPress={() => setChooseNamePartModal(true)}>
              <Image source={profile} style={styles.image} />
              <Text style={styles.infoText}>Name: {doctorData.firstName} {doctorData.lastName}</Text>
              <Image source={editIcon} style={styles.editIcon} />
            </TouchableOpacity>

            {/* <TouchableOpacity style={styles.infoRow} onPress={() => handleEditField('email', 'Email')}>
              <Image source={email2} style={styles.image} />
              <Text style={styles.infoText}>Email: {doctorData.email}</Text>
              <Image source={editIcon} style={styles.editIcon} />
            </TouchableOpacity> */}

            <TouchableOpacity style={styles.infoRow} onPress={() => handleEditField('phoneNumber', 'Phone')}>
              <Image source={call} style={styles.image} />
              <Text style={styles.infoText}>Phone: {doctorData.phoneNumber}</Text>
              <Image source={editIcon} style={styles.editIcon} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.infoRow} onPress={() => handleEditField('medicalSpecialty', 'Specialty')}>
              <Image source={medical} style={styles.image} />
              <Text style={styles.infoText}>Specialty: {doctorData.medicalSpecialty}</Text>
              <Image source={editIcon} style={styles.editIcon} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.infoRow} onPress={() => handleEditField('gender', 'Gender')}>
              <Image source={Gender} style={styles.image} />
              <Text style={styles.infoText}>Gender: {doctorData.gender}</Text>
              <Image source={editIcon} style={styles.editIcon} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.infoRow} onPress={() => handleEditField('experience', 'Experience')}>
              <Image source={experience} style={styles.image} />
              <Text style={styles.infoText}>Experience: {doctorData.experience} years</Text>
              <Image source={editIcon} style={styles.editIcon} />
            </TouchableOpacity>

          </View>
        </ScrollView>

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
    marginHorizontal: wp('5%'),
    paddingVertical: hp('3%'),
    paddingHorizontal: wp('5%'),
    marginTop: hp('4%')
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
    marginTop: hp('3%'),
  },
  text2: {
    fontSize: wp('6%'),
    fontWeight: "bold",
    color: "#FFFFFF",
    marginLeft: wp('2%'),
  },
  imageprofile: {
    width: wp('12%'),
    height: wp('12%'),
  },
  image: {
    width: wp('5%'),
    height: wp('5%'),
    marginRight: wp('1%'),
  },
  logo: {
    width: wp('20%'),
    height: wp('20%'),
  },
  notification: {
    width: wp('8%'),
    height: wp('8%'),
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  infoText: {
    fontSize: wp('4.5%'),
    fontWeight: "bold",
    color: "#000",
    flex: 1, // يخلي التكست ياخد المساحة كلها
  },
  // editIcon: {
  //   marginLeft: 'auto',
  // },
  editIcon: {
    width: wp('5%'),
    height: wp('5%'),
    marginLeft: wp('2%'),
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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: wp('5%'),
    borderRadius: wp('4%'),
    width: wp('80%'),
    alignItems: 'center'
  },
  modalTitle: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    marginBottom: hp('2%'),
  },
  modalInput: {
    width: '100%',
    height: hp('6.5%'),
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: wp('2%'),
    paddingHorizontal: wp('2%'),
    marginBottom: hp('2%'),
  },
  modalButton: {
    backgroundColor: '#1CD3DA',
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('10%'),
    borderRadius: wp('2%'),
    marginBottom: hp('1%'),
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: wp('4%'),
  },
  modalCancelText: {
    marginTop: hp('1%'),
    color: 'red',
    fontSize: wp('4%'),
  },
});
