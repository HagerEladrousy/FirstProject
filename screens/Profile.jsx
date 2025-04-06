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
  ActivityIndicator
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import user from "../assets/user-avatar 1.png"
import notification from "../assets/notification2.png"
import profile from "../assets/profile-circle.png";
import call from "../assets/call.png";
import email2 from "../assets/email2.png";
import calender from "../assets/calendar.png";
import health from "../assets/health.png";
import weight from "../assets/weight.png";
import blood from "../assets/blood.png"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ip } from "./ip.js";

export default ({ navigation }) => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (!userId) throw new Error('User ID not found');
        const response = await fetch(`${ip}/user/profile?userId=${userId}`);
        const data = await response.json();
        if (response.ok && data.success) {
          setProfileData(data.data);
        } else {
          throw new Error(data.message || 'Failed to fetch profile data');
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load profile data');
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

  const InfoRow = ({ icon, label }) => (
    <View style={styles.infoRow}>
      <Image source={icon} style={styles.icon} />
      <Text style={styles.infoText}>{label}</Text>
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
            <Text style={styles.text2}>Profile</Text>
          </View>

          <View style={styles.column}>
            <InfoRow icon={profile} label={profileData.name} />
            <InfoRow icon={call} label={`Phone: ${profileData.phone}`} />
            <InfoRow icon={email2} label={`Email: ${profileData.email}`} />
            <InfoRow icon={calender} label={`Age: ${profileData.age}`} />
            <InfoRow icon={health} label={`Diabetes: ${profileData.diabetesType}`} />
            <InfoRow icon={weight} label={`Weight: ${profileData.weight}`} />
            <InfoRow icon={blood} label={`Fasting Sugar: ${profileData.fastingSugar}`} />
            <InfoRow icon={blood} label={`Cumulative Sugar: ${profileData.cumulativeSugar}`} />

            <View style={styles.buttonsRow}>
              <TouchableOpacity onPress={() => navigation.navigate('Medicines')}>
                <View style={styles.textField}>
                  <Text style={styles.buttonText}>Medicines</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.textField}>
                  <Text style={styles.buttonText}>Meals</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

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
  }
});
