import React, { useState, useEffect  } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image,TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Alert } from 'react-native';



export default function MedicineSchedule() {
  const [medicine, setMedicine] = useState('');
  const [compound, setCompound] = useState('');
  // const [startDate, setStartDate] = useState('');
  // const [endDate, setEndDate] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [frequency, setFrequency] = useState('');
  const [medicineType, setMedicineType] = useState('');
  // const [doseTimes, setDoseTimes] = useState([]);
  // const [showDosePickers, setShowDosePickers] = useState([]);
  const [doseTimes, setDoseTimes] = useState([]);
  const [showDosePickers, setShowDosePickers] = useState([]);

  const [userId, setUserId] = useState(''); 



  const handleFrequencyChange = (value) => {
    setFrequency(value);
    const times = Array.from({ length: parseInt(value) || 0 }, () => new Date());
    setDoseTimes(times);
    setShowDosePickers(Array.from({ length: parseInt(value) || 0 }, () => false));
    setDoseTimes(times);
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


  // استرجاع الـ userId من AsyncStorage عند تحميل المكون
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

  // دالة لإضافة الدواء باستخدام Axios
  const addMedication = async () => {
    if (!userId) {
      Alert.alert('Error', 'User ID is not available');
      return;
    }


    try {
      const response = await axios.post('http://192.168.1.10:5500/user/med', {
        id: userId,
        medName: medicine,
        effMaterial: compound,
        times_per_day: frequency,
        type: medicineType,
        // dose_time: doseTimes,
        // start: startDate,
        // end: endDate,
        dose_time: doseTimes.map((date) => date.toISOString()), 
        start: startDate.toISOString(),
        end: endDate.toISOString(),

      });

      if (response.data.success) {
        Alert.alert('Success', 'Medication added successfully!');
      } else {
        Alert.alert('Error', 'Error adding medication: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred while adding medication');
    }
  };

  return (
    <LinearGradient colors={['#1CD3DA', '#0F7074']} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Image source={require('../assets/notification.png')} style={styles.notification} />
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

          {/* <Text style={styles.label}>Start Date</Text>
          <TextInput style={styles.input} value={startDate} onChangeText={setStartDate} placeholder="Enter Start Date (YYYY-MM-DD)" />

          <Text style={styles.label}>End Date</Text>
          <TextInput style={styles.input} value={endDate} onChangeText={setEndDate} placeholder="Enter End Date (YYYY-MM-DD)" /> */}

<Text style={styles.label}>Start Date</Text>
          <Button title={startDate.toDateString()} onPress={() => setShowStartDatePicker(true)} />
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
          <Button title={endDate.toDateString()} onPress={() => setShowEndDatePicker(true)} />
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
          <TextInput style={styles.input} keyboardType="numeric" value={frequency} onChangeText={handleFrequencyChange} placeholder="Enter Frequency" />

          {doseTimes.map((time, index) => (
            <View key={index}>
            <Text style={styles.label}>{`Dose Time ${index + 1}`}</Text>
            <TouchableOpacity onPress={() => {
              const updatedShowPickers = [...showDosePickers];
              updatedShowPickers[index] = true;
              setShowDosePickers(updatedShowPickers);
            }}>
              <Text style={styles.dateText}>{time.toLocaleTimeString()}</Text>
            </TouchableOpacity>
            {showDosePickers[index] && (
              <DateTimePicker value={time} mode="time" display="default" onChange={(event, selectedDate) => handleDoseTimeChange(event, selectedDate, index)} />
            )}
          </View>
          ))}

          <Text style={styles.label}>Medicine Type</Text>
          <RNPickerSelect onValueChange={setMedicineType} items={[
            { label: 'Injection', value: 'injection' },
            { label: 'Pill', value: 'pill' },
            { label: 'Inhalable Insulin', value: 'inhalable_insulin' },
          ]} />
          <Button title="Add Medication" onPress={addMedication} />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 20,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 90,
    height: 90,
  },
  notification: {
    width: 30,
    height: 30,
    marginTop: -10,
  },
  container: {
    width: 320,
    backgroundColor: "#B0FFF3",
    borderRadius: 30,
    padding: 20,
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  dateText: { 
    backgroundColor: '#fff',
    padding: 10, 
    borderRadius: 5,
    marginBottom: 10,
    textAlign: 'center' },

});

