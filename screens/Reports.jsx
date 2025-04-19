import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
  Image
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import user from "../assets/user-avatar 1.png";
import notification from "../assets/notification2.png";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ip } from "./ip.js";

const GEMINI_API_KEY = "AIzaSyBkjlQOMXkGpGZqpGXg1jp1PxYdhXWi36s";
const GEMINI_MODEL = "gemini-1.5-flash";

export default function Reports({ navigation, route }) {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState(null);
  const [generatingReport, setGeneratingReport] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userId = route.params?.patientId || await AsyncStorage.getItem('userId');
        if (!userId) throw new Error('User ID not found');

        const response = await fetch(`${ip}/user/profile?userId=${userId}`);
        const data = await response.json();
        if (response.ok && data.success) {
          setProfileData(data.data);
          generateHealthReport(data.data);
        } else {
          throw new Error(data.message || 'Failed to fetch profile data');
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load profile data');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const generateHealthReport = async (userData) => {
    if (!userData) return;
    
    setGeneratingReport(true);
    try {
      const prompt = `Generate a comprehensive diabetes health report in Markdown format for a patient with the following details:
      
      **Patient Profile:**
      - Name: ${userData.name || 'Not provided'}
      - Age: ${userData.age || 'Not provided'}
      - Weight: ${userData.weight || 'Not provided'} kg
      - Diabetes Type: ${userData.diabetesType || 'Not provided'}
      - Fasting Blood Sugar: ${userData.fastingSugar || 'Not provided'} mg/dL
      - Cumulative Sugar (A1C): ${userData.cumulativeSugar || 'Not provided'}%
      ${userData.medications ? `- Medications: ${userData.medications}` : ''}

      **Report Requirements:**
      1. Start with an overall health assessment (good/fair/poor control)
      2. Analyze each metric (age, weight, blood sugar levels)
      3. Explain what the numbers mean in simple terms
      4. Provide specific health risks based on the data
      5. Offer personalized recommendations for:
         - Diet modifications
         - Exercise suggestions
         - Lifestyle changes
         - Medication adherence (if applicable)
      6. Include short-term and long-term goals
      7. Add motivational tips for diabetes management

      Format the report with clear section headings (##) and bullet points.
      Use simple language suitable for a non-medical audience.
      Keep the total length to about 500 words.`;

      const requestBody = {
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.5
        }
      };

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        }
      );

      const responseData = await response.json();
      
      if (!response.ok) {
        console.error('Full API error response:', responseData);
        throw new Error(responseData.error?.message || `API request failed with status ${response.status}`);
      }

      const textResponse = responseData.candidates?.[0]?.content?.parts?.[0]?.text || 
                         "Could not generate report content";
      
      if (textResponse.includes("Could not generate")) {
        throw new Error("Empty or invalid response from API");
      }

      setReport(textResponse);
    } catch (error) {
      console.error("Error generating report:", error);
      Alert.alert(
        "Error", 
        error.message || "Failed to generate health report. Please try again later."
      );
      setReport(null);
    } finally {
      setGeneratingReport(false);
    }
  };

  const renderMarkdown = (text) => {
    if (!text) return null;
    
    return (
      <Text style={styles.reportText}>
        {text.split('\n').map((line, i) => {
          if (line.startsWith('## ')) {
            return (
              <Text key={i} style={styles.sectionHeader}>
                {line.substring(3)}{'\n\n'}
              </Text>
            );
          } else if (line.startsWith('- ') || line.startsWith('* ')) {
            return (
              <Text key={i}>
                {'\u2022 '}{line.substring(2)}{'\n'}
              </Text>
            );
          } else {
            return (
              <Text key={i}>
                {line}{'\n\n'}
              </Text>
            );
          }
        })}
      </Text>
    );
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

  if (!profileData) {
    return (
      <LinearGradient colors={['#1CD3DA', '#0F7074']} style={styles.gradient}>
        <View style={styles.loadingContainer}>
          <Text style={styles.errorText}>Failed to load profile data</Text>
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

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
            <Text style={styles.text2}>Health Report</Text>
          </View>

          <View style={styles.reportContainer}>
            {generatingReport ? (
              <View style={styles.generatingContainer}>
                <ActivityIndicator size="large" color="#286E77" />
                <Text style={styles.generatingText}>Generating your personalized health report...</Text>
              </View>
            ) : report ? (
              <>
                <Text style={styles.patientHeader}>
                  Report for: {profileData.name}
                </Text>
                <View style={styles.reportContent}>
                  {renderMarkdown(report)}
                </View>
                <TouchableOpacity 
                  onPress={() => generateHealthReport(profileData)}
                  style={styles.refreshButton}
                >
                  <Text style={styles.refreshButtonText}>Regenerate Report</Text>
                </TouchableOpacity>
              </>
            ) : (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Failed to generate report</Text>
                <Text style={styles.errorSubtext}>Please check your internet connection and try again</Text>
                <TouchableOpacity 
                  onPress={() => generateHealthReport(profileData)}
                  style={styles.refreshButton}
                >
                  <Text style={styles.refreshButtonText}>Try Again</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={() => navigation.goBack()}
                  style={styles.secondaryButton}
                >
                  <Text style={styles.secondaryButtonText}>Go Back</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { flex: 1 },
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorText: {
    color: 'white',
    fontSize: wp('4%'),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: hp('1%')
  },
  errorSubtext: {
    color: 'white',
    fontSize: wp('3.5%'),
    textAlign: 'center',
    marginBottom: hp('2%')
  },
  reportContainer: {
    backgroundColor: "#B0FFF3",
    borderRadius: wp('8%'),
    marginHorizontal: wp('4%'),
    padding: wp('5%'),
    marginTop: hp('3%'),
    minHeight: hp('40%')
  },
  generatingContainer: {
    padding: wp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: hp('30%')
  },
  generatingText: {
    marginTop: hp('2%'),
    fontSize: wp('4%'),
    color: '#286E77',
    textAlign: 'center'
  },
  patientHeader: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: '#286E77',
    marginBottom: hp('2%'),
    textAlign: 'center'
  },
  reportContent: {
    backgroundColor: 'white',
    borderRadius: wp('4%'),
    padding: wp('5%'),
    marginBottom: hp('2%')
  },
  reportText: {
    fontSize: wp('4%'),
    color: '#333',
    lineHeight: hp('3%'),
  },
  sectionHeader: {
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
    color: '#286E77',
    marginVertical: hp('1%'),
  },
  refreshButton: {
    backgroundColor: "#286E77",
    borderRadius: wp('10%'),
    padding: wp('3%'),
    alignItems: 'center',
    marginTop: hp('1%')
  },
  refreshButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: wp('4%')
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#286E77",
    borderRadius: wp('10%'),
    padding: wp('3%'),
    alignItems: 'center',
    marginTop: hp('1%')
  },
  secondaryButtonText: {
    color: '#286E77',
    fontWeight: 'bold',
    fontSize: wp('4%')
  },
  errorContainer: {
    alignItems: 'center',
    padding: wp('5%')
  },
  backButton: {
    backgroundColor: "#286E77",
    borderRadius: wp('10%'),
    padding: wp('3%'),
    marginTop: hp('3%'),
    paddingHorizontal: wp('8%')
  },
  backButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: wp('4%')
  }
});