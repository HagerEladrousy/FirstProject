import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ip } from "../screens/ip.js";
import AsyncStorage from '@react-native-async-storage/async-storage';
import user from "../assets/user-avatar 1.png"
import notification2 from "../assets/notification2.png"
import profile from "../assets/profile-circle.png"
import call from "../assets/call.png";
import email2 from "../assets/email2.png";
import medical from "../assets/medical.png"
import Gender from "../assets/Gender.png"
import experience from "../assets/experience.png"


export default function DoctorProfile({ route, navigation }) {
  const [doctorData, setDoctorData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchDoctorProfile();
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
        <ScrollView contentContainerStyle={{ paddingBottom: hp('10%') }}>
          <View style={styles.header}>
                      <Image source={notification2} style={styles.notification} />
                      <Image source={require('../assets/project.png')} style={styles.logo} />
                    </View>
          

          <View style={styles.row}>
            <Image source={user} style={styles.imageprofile} />
            <Text style={styles.text2}>Doctor Profile</Text>
          </View>

          <View style={styles.column}>
            <View style={styles.infoRow}>
            <Image source={profile} style={styles.image} />
              <Text style={styles.infoText}>Name: {doctorData.firstName} {doctorData.lastName}</Text>
            </View>
            <View style={styles.infoRow}>
            <Image source={email2} style={styles.image} />
              <Text style={styles.infoText}>Email: {doctorData.email}</Text>
            </View>
            <View style={styles.infoRow}>
            <Image source={call} style={styles.image} />

              <Text style={styles.infoText}>Phone: {doctorData.phoneNumber}</Text>
            </View>
            <View style={styles.infoRow}>
            <Image source={medical} style={styles.image} />

              <Text style={styles.infoText}>Specialty: {doctorData.medicalSpecialty}</Text>
            </View>
            <View style={styles.infoRow}>
            <Image source={Gender} style={styles.image} />

              <Text style={styles.infoText}>Gender: {doctorData.gender}</Text>
            </View>
            <View style={styles.infoRow}>
            <Image source={experience} style={styles.image} />

              <Text style={styles.infoText}>Experience: {doctorData.experience} years</Text>
            </View>
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
        marginRight:wp('1%'),
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
      color: "#000"
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
    }
});