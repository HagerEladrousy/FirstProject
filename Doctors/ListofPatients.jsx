import { useEffect, useState } from "react";
import { StyleSheet, ScrollView, Text, View, Image, TouchableOpacity, Alert } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ip } from "../screens/ip.js";

import logo from "../assets/project.png";
import notification from "../assets/notification2.png";
import home from "../assets/home.png";
import chatoutline from "../assets/chatoutline.png";
import Menue from "../assets/menuoutline.png";
import profile from "../assets/profile-circle.png";
import deleteIcon from "../assets/delete.png";

export default function Doctorhome({ navigation }) {
  const [patients, setPatients] = useState([]);
  const [doctorId, setDoctorId] = useState(null);
  const [connections, setConnections] = useState([]); 

  useEffect(() => {
    const fetchApprovedPatients = async () => {
      try {
        const id = await AsyncStorage.getItem('doctorId');
        if (!id) return;
        setDoctorId(id);

        const response = await axios.get(`${ip}/request/approved/${id}`);
        const approvedConnections = response.data.data;
        setConnections(approvedConnections); 

        const patientDetails = await Promise.all(
          approvedConnections.map(async (conn) => {
            const res = await axios.get(`${ip}/user/profile?userId=${conn.user}`);
            return { ...res.data.data, requestId: conn._id }; 
          })
        );

        setPatients(patientDetails);
      } catch (error) {
        console.error('Error fetching approved patients:', error);
      }
    };

    fetchApprovedPatients();
  }, []);

  const handleDeletePatient = async (requestId, patientId) => {
    try {
      await axios.delete(`${ip}/request/delete-request/${requestId}`);
      setPatients(prev => prev.filter(p => p._id !== patientId));
      Alert.alert("Success", "Patient removed successfully!");
    } catch (error) {
      console.error('Error deleting patient:', error);
      Alert.alert("Error", "Could not remove patient");
    }
  };

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

        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>Patients</Text>
          {patients.length > 0 ? (
            patients.map((patient, index) => (
              <View key={index} style={styles.doctorCard}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Profile', { patientId: patient._id })}
                  style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
                >
                  <Image source={profile} style={styles.profile} />
                  <Text style={styles.doctorName}>{patient.name}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleDeletePatient(patient.requestId, patient._id)}
                  style={styles.deleteButton}
                >
                  <Image source={deleteIcon} style={styles.deleteIcon} />
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text style={styles.noDataText}>No approved patients</Text>
          )}
        </View>
      </ScrollView>

      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Doctorhome')}>
          <Image source={home} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ChatListUsers')}>
          <Image source={chatoutline} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('AccountDocror')}>
          <Image source={Menue} style={styles.navIcon} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: hp('9%'),
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
  deleteButton: {
    backgroundColor: '#ff4d4d',
    padding: wp('2%'),
    borderRadius: wp('2%'),
    marginLeft: 'auto'
  },
  deleteIcon: {
    width: wp('6%'),
    height: wp('6%'),
    resizeMode: 'contain',
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
