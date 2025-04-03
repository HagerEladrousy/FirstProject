import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import RNPickerSelect from 'react-native-picker-select';

export default function MedicineSchedule() {
  const [medicine, setMedicine] = useState('');
  const [compound, setCompound] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [frequency, setFrequency] = useState('');
  const [medicineType, setMedicineType] = useState('');
  const [doseTimes, setDoseTimes] = useState([]);

  const handleFrequencyChange = (value) => {
    setFrequency(value);
    const times = Array.from({ length: parseInt(value) || 0 }, (_, i) => "");
    setDoseTimes(times);
  };

  const handleDoseTimeChange = (text, index) => {
    const updatedTimes = [...doseTimes];
    updatedTimes[index] = text;
    setDoseTimes(updatedTimes);
  };

  return (
    <LinearGradient colors={['#1CD3DA', '#0F7074']} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Image source={require('../assets/project.png')} style={styles.logo} />
          <Image source={require('../assets/notification.png')} style={styles.notification} />
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
          <TextInput style={styles.input} value={startDate} onChangeText={setStartDate} placeholder="Enter Start Date (YYYY-MM-DD)" />

          <Text style={styles.label}>End Date</Text>
          <TextInput style={styles.input} value={endDate} onChangeText={setEndDate} placeholder="Enter End Date (YYYY-MM-DD)" />

          <Text style={styles.label}>Times per Day</Text>
          <TextInput style={styles.input} keyboardType="numeric" value={frequency} onChangeText={handleFrequencyChange} placeholder="Enter Frequency" />

          {doseTimes.map((time, index) => (
            <View key={index}>
              <Text style={styles.label}>{`Dose Time ${index + 1}`}</Text>
              <TextInput style={styles.input} value={time} onChangeText={(text) => handleDoseTimeChange(text, index)} placeholder="Enter Dose Time (HH:mm)" />
            </View>
          ))}

          <Text style={styles.label}>Medicine Type</Text>
          <RNPickerSelect onValueChange={setMedicineType} items={[
            { label: 'Injection', value: 'injection' },
            { label: 'Pill', value: 'pill' },
            { label: 'Inhalable Insulin', value: 'inhalable_insulin' },
          ]} />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

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
    left: 250,
  },
  notification: {
    width: 30,
    height: 30,
    right: 300,
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
});