import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getMealSuggestions } from '../api/geminiApi';
import logo from "../assets/project.png";
import profilecircle from "../assets/profile-circle.png";

export default function High() {
  const [suggestions, setSuggestions] = useState('');

  useEffect(() => {
    const fetchSuggestions = async () => {
      setSuggestions('Fetching meal suggestions...');
      const response = await getMealSuggestions(150); // Example value
      setSuggestions(response);
    };

    fetchSuggestions();
  }, []);

  return (
    <LinearGradient colors={['#090C6A', '#3E38ED']} style={styles.gradient}>
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <Image source={profilecircle} style={styles.profilecircle} />

        <Text style={styles.text}>High Sugar</Text>

        <ScrollView style={styles.resultBox}>
          <Text style={styles.resultText}>{suggestions}</Text>
        </ScrollView>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 40, fontWeight: 'bold', color: '#FFF' },
  logo: { width: 90, height: 90 },
  profilecircle: { width: 40, height: 40 },
  resultBox: { marginTop: 20, padding: 15, backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: 10, width: '90%' },
  resultText: { fontSize: 16, textAlign: 'center' },
});