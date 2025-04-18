import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ip } from "./ip.js";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

export default function MedicineSchedule({ navigation }) {
  const [medicine, setMedicine] = useState('');
  const [compound, setCompound] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [frequency, setFrequency] = useState('');
  const [medicineType, setMedicineType] = useState('');
  const [doseTimes, setDoseTimes] = useState([]);
  const [showDosePickers, setShowDosePickers] = useState([]);
  const [userId, setUserId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFrequencyChange = (value) => {
    setFrequency(value);
    const times = Array.from({ length: parseInt(value) || 0 }, () => new Date());
    setDoseTimes(times);
    setShowDosePickers(Array.from({ length: parseInt(value) || 0 }, () => false));
  };

  const handleDoseTimeChange = (event, selectedDate, index) => {
    if (selectedDate) {
      const updatedTimes = [...doseTimes];
      updatedTimes[index] = selectedDate;
      setDoseTimes(updatedTimes);
    }
    const updatedShowPickers = [...showDosePickers];
    updatedShowPickers[index] = false;
    setShowDosePickers(updatedShowPickers);
  };

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (storedUserId) {
          setUserId(storedUserId);
        }
      } catch (error) {
        console.error('Error retrieving userId from AsyncStorage', error);
      }
    };
    fetchUserId();
  }, []);

  const validateFields = () => {
    if (!medicine) {
      Alert.alert('Error', 'Please select a medicine');
      return false;
    }
    if (!compound) {
      Alert.alert('Error', 'Please select an active ingredient');
      return false;
    }
    if (!frequency || isNaN(frequency)) {
      Alert.alert('Error', 'Please enter a valid frequency');
      return false;
    }
    if (doseTimes.length === 0 || doseTimes.some(time => !time)) {
      Alert.alert('Error', 'Please set all dose times');
      return false;
    }
    if (!medicineType) {
      Alert.alert('Error', 'Please select a medicine type');
      return false;
    }
    if (startDate > endDate) {
      Alert.alert('Error', 'End date cannot be before start date');
      return false;
    }
    return true;
  };

  const addMedication = async () => {
    if (!validateFields()) return;
    if (!userId) {
      Alert.alert('Error', 'User ID is not available');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(`${ip}/user/med`, {
        id: userId,
        medName: medicine,
        effMaterial: compound,
        times_per_day: frequency,
        type: medicineType,
        dose_time: doseTimes.map((date) => date.toISOString()),
        start: startDate.toISOString(),
        end: endDate.toISOString(),
      });

      if (response.data.success) {
        Alert.alert('Success', 'Medication added successfully!', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      } else {
        Alert.alert('Error', response.data.message || 'Error adding medication');
      }
    } catch (error) {
      console.error('Error:', error);
      let errorMessage = 'An error occurred while adding medication';
      
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.request) {
        errorMessage = 'No response from server. Please check your connection.';
      }
      
      Alert.alert('Error', errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LinearGradient colors={['#1CD3DA', '#0F7074']} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Image source={require('../assets/notification2.png')} style={styles.notification} />
          <Image source={require('../assets/project.png')} style={styles.logo} />
        </View>

        <View style={styles.container}>
          <Text style={styles.label}>Select Medicine</Text>
          <RNPickerSelect onValueChange={setMedicine} items={[
            { label: 'Metformin', value: 'metformin' },
            { label: 'Insulin', value: 'insulin' },
            { label: 'Glimepiride', value: 'glimepiride' },
            { label: 'Pioglitazone', value: 'pioglitazone' },
            { label: 'Sitagliptin', value: 'sitagliptin' },
            { label: 'Vildagliptin', value: 'vildagliptin' },
            { label: 'Empagliflozin', value: 'empagliflozin' },
            { label: 'Dapagliflozin', value: 'dapagliflozin' },
          ]} />

          <Text style={styles.label}>Select Active Ingredient</Text>
          <RNPickerSelect onValueChange={setCompound} items={[
            { label: 'Metformin', value: 'metformin' },
            { label: 'Insulin', value: 'insulin' },
            { label: 'Sulfonylureas', value: 'sulfonylureas' },
            { label: 'DPP-4 Inhibitors', value: 'dpp4' },
            { label: 'SGLT2 Inhibitors', value: 'sglt2' },
            { label: 'Thiazolidinediones', value: 'thiazolidinediones' },
            { label: 'GLP-1 Receptor Agonists', value: 'glp1' },
          ]} />

          <Text style={styles.label}>Start Date</Text>
          <Button 
            title={startDate.toDateString()} 
            onPress={() => setShowStartDatePicker(true)} 
            color="#0F7074"
          />
          {showStartDatePicker && (
            <DateTimePicker
              value={startDate}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowStartDatePicker(false);
                if (selectedDate) setStartDate(selectedDate);
              }}
            />
          )}

          <Text style={styles.label}>End Date</Text>
          <Button 
            title={endDate.toDateString()} 
            onPress={() => setShowEndDatePicker(true)} 
            color="#0F7074"
          />
          {showEndDatePicker && (
            <DateTimePicker
              value={endDate}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowEndDatePicker(false);
                if (selectedDate) setEndDate(selectedDate);
              }}
            />
          )}

          <Text style={styles.label}>Times per Day</Text>
          <TextInput 
            style={styles.input} 
            keyboardType="numeric" 
            value={frequency} 
            onChangeText={handleFrequencyChange} 
            placeholder="Enter Frequency" 
          />

          {doseTimes.map((time, index) => (
            <View key={index}>
              <Text style={styles.label}>{`Dose Time ${index + 1}`}</Text>
              <TouchableOpacity 
                style={styles.timeButton}
                onPress={() => {
                  const updatedShowPickers = [...showDosePickers];
                  updatedShowPickers[index] = true;
                  setShowDosePickers(updatedShowPickers);
                }}
              >
                <Text style={styles.timeButtonText}>{time.toLocaleTimeString()}</Text>
              </TouchableOpacity>
              {showDosePickers[index] && (
                <DateTimePicker
                  value={time}
                  mode="time"
                  display="default"
                  onChange={(event, selectedDate) => handleDoseTimeChange(event, selectedDate, index)}
                />
              )}
            </View>
          ))}

          <Text style={styles.label}>Medicine Type</Text>
          <RNPickerSelect onValueChange={setMedicineType} items={[
            { label: 'Injection', value: 'injection' },
            { label: 'Pill', value: 'pill' },
            { label: 'Inhalable Insulin', value: 'inhalable_insulin' },
          ]} />

          <View style={{ marginTop: hp(2) }}>
            <Button 
              title={isSubmitting ? "Adding..." : "Add Medication"} 
              onPress={addMedication} 
              disabled={isSubmitting}
              color="#0F7074"
            />
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    backgroundColor: '#fff',
    padding: wp(3),
    borderRadius: wp(2),
    color: '#000',
    fontSize: wp(4),
  },
  inputAndroid: {
    backgroundColor: '#fff',
    padding: wp(3),
    borderRadius: wp(2),
    color: '#000',
    fontSize: wp(4),
  },
  placeholder: {
    color: '#999',
  },
});

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: hp(4),
  },
  header: {
    width: wp(90),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: hp(5),
  },
  logo: {
    width: wp(20),
    height: wp(20),
  },
  notification: {
    width: wp(8),
    height: wp(8),
  },
  container: {
    width: wp(85),
    backgroundColor: "#B0FFF3",
    borderRadius: wp(6),
    padding: wp(5),
    marginTop: hp(2),
  },
  label: {
    fontSize: wp(4.5),
    fontWeight: 'bold',
    color: '#000',
    marginBottom: hp(1),
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: wp(2),
    marginBottom: hp(2),
    paddingHorizontal: wp(1),
  },
  input: {
    backgroundColor: '#fff',
    padding: wp(3),
    borderRadius: wp(2),
    marginBottom: hp(2),
    color: '#000',
    fontSize: wp(4),
  },
  timeButton: {
    backgroundColor: '#fff',
    padding: wp(3),
    borderRadius: wp(2),
    marginBottom: hp(2),
    alignItems: 'center',
  },
  timeButtonText: {
    color: '#000',
    fontSize: wp(4),
  },
});