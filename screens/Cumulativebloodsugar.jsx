import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getMealSuggestions } from '../api/geminiApi';

export default function CumulativeBloodSugar({ navigation }) {
  const [bloodSugar, setBloodSugar] = useState('');
  const [suggestions, setSuggestions] = useState('');

  const handleSubmit = async () => {
    if (!bloodSugar) return alert('Please enter a blood sugar level.');
    
    const sugarLevel = Number(bloodSugar);

    if (sugarLevel < 70) {
      navigation.navigate('Verylow');
    } else if (sugarLevel >= 70 && sugarLevel < 90) {
      navigation.navigate('Low');
    } else if (sugarLevel >= 90 && sugarLevel <= 140) {
      navigation.navigate('Normal');
    } else if (sugarLevel > 140 && sugarLevel <= 180) {
      navigation.navigate('HighScreen');
    } else {
      navigation.navigate('Veryhigh');
    }

    setSuggestions('Fetching meal suggestions...');
    const response = await getMealSuggestions(sugarLevel);
    setSuggestions(response);
  };

  return (
    <LinearGradient colors={['#1CD3DA', '#0F7074']} style={styles.container}>
      <Text style={styles.title}>Enter Cumulative Blood Sugar Level</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Enter number..."
        keyboardType="numeric"
        value={bloodSugar}
        onChangeText={setBloodSugar}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, color: '#fff' },
  input: { width: '90%', height: 50, borderColor: '#ccc', borderWidth: 1, borderRadius: 10, textAlign: 'center', backgroundColor: '#fff', fontSize: 16 },
  button: { marginTop: 20, backgroundColor: '#286E77', padding: 10, borderRadius: 10 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});