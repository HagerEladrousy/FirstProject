import { useEffect, useState } from "react";
import { StyleSheet, ScrollView, TouchableOpacity, Text, Image, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';  // استيراد axios
import { ip } from "./ip.js";

import AsyncStorage from '@react-native-async-storage/async-storage';

import logo from "../assets/project.png";
import notification from "../assets/notification2.png";
import home from "../assets/homeinline.png";
import notedoctor from "../assets/notedoctoroutline.png";
import Menue from "../assets/menuoutline.png";
import profile from "../assets/profile-circle.png";

export default function ChatListDoctors({ navigation }) {
  const [doctors, setDoctors] = useState([]);
  const [userId, setuserId] = useState(null);

useEffect(() => {
  const getuserId = async () => {
    try {
      const id = await AsyncStorage.getItem('userId');
      setuserId(id);
    } catch (error) {
      console.error("Error fetching userId:", error);
    }
  };

  getuserId();
}, []);


  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`${ip}/doc/doctors`);
        const doctors = response.data.data;
        setDoctors(doctors);
        //console.log(doctors);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <LinearGradient
      colors={['#1CD3DA', '#0F7074']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={logo} style={styles.logo} />
        <TouchableOpacity>
          <Image source={notification} style={styles.notification} />
        </TouchableOpacity>

        {/* قائمة المرضى */}
        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>Doctors</Text>
          {doctors.length > 0 ? (
            doctors.map((doctors) => (
              doctors._id ? (  // تحقق من وجود _id
                <TouchableOpacity
                  key={doctors._id}
                  onPress={() => navigation.navigate('Chat', { userId: userId, doctorId: doctors._id })}
                >
                  <View style={styles.doctorCard}>
                    <Image source={profile} style={styles.profile} />
                    <Text style={styles.doctorName}>{doctors.firstName} {doctors.lastName}</Text>
                  </View>
                </TouchableOpacity>
              ) : null  // إذا لم يكن هناك _id، لا تظهر العنصر
            ))
          ) : (
            <Text style={styles.noDataText}>No doctors</Text>
          )}

        </View>
      </ScrollView>

      {/* شريط التنقل ثابت أسفل الشاشة */}
      <View style={styles.navBar}>
        <TouchableOpacity>
          <Image source={home} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Doctornote')}>
          <Image source={notedoctor} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Account')}>
          <Image source={Menue} style={styles.navIcon} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: hp('5%'),
    alignItems: "center",
    paddingBottom: hp('10%'),
  },
  logo: {
    width: wp('20%'),
    height: wp('20%'),
    marginBottom: hp('2%'),
    bottom: hp('5%'),
    left: wp('38%'),
  },
  notification: {
    width: wp('7%'),
    height: wp('7%'),
    position: "absolute",
    bottom: hp('12%'),
    right: wp('38%'),
  },
  listContainer: {
    width: wp('90%'),
    backgroundColor: "#B0FFF3",
    padding: wp('4%'),
    borderRadius: wp('6%'),
    top: hp('2%'),
  },
  listTitle: {
    fontSize: wp('5%'),
    fontWeight: "bold",
    marginBottom: hp('1%'),
  },
  doctorCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: wp('4%'),
    padding: wp('3%'),
    marginBottom: hp('2%'),
  },
  profile: {
    width: wp('12%'),
    height: wp('12%'),
    marginRight: wp('5%'),
  },
  doctorName: {
    fontSize: wp('4.5%'),
    fontWeight: "bold",
  },
  noDataText: {
    fontSize: wp('4%'),
    color: "gray",
    textAlign: "center",
    marginTop: hp('8%'),
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#B0FFF3',
    width: '100%',
    paddingVertical: hp(2),
    borderTopLeftRadius: wp(8),
    borderTopRightRadius: wp(8),
    position: 'absolute',
    bottom: 0,
  },
  navIcon: {
    width: wp(7),
    height: wp(7),
    resizeMode: 'contain',
  },
});
