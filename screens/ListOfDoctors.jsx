import { useEffect, useState } from "react";
import { StyleSheet, ScrollView, TouchableOpacity, Text, Image, View, Alert } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ip } from "./ip.js";

import logo from "../assets/project.png";
import notification from "../assets/notification2.png";
import home from "../assets/home.png";
import chat from "../assets/chat.png";
import Menue from "../assets/menuoutline.png";
import profile from "../assets/profile-circle.png";
import Pill from "../assets/pill.png";
import deleteIcon from "../assets/delete.png";

export default function ChatListDoctors({ navigation }) {
  const [doctors, setDoctors] = useState([]);
  const [userId, setUserId] = useState(null);
  const [sentRequests, setSentRequests] = useState({});

  useEffect(() => {
    const getUserId = async () => {
      try {
        const id = await AsyncStorage.getItem('userId');
        setUserId(id);
      } catch (error) {
        console.error("Error fetching userId:", error);
      }
    };
    getUserId();
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`${ip}/doc/doctors`);
        setDoctors(response.data.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };
    fetchDoctors();
  }, []);

  useEffect(() => {
    const fetchSentRequests = async () => {
      try {
        if (!userId) return;
        const res = await axios.get(`${ip}/request/sent/${userId}`);
        const requests = res.data.data;
        const mapped = {};
        requests.forEach(req => {
          mapped[req.doctor] = { status: req.status, requestId: req._id };
        });
        setSentRequests(mapped);
      } catch (error) {
        console.error("Error fetching sent requests:", error);
      }
    };
    fetchSentRequests();
  }, [userId]);

  const handleAddDoctor = async (doctorId) => {
    try {
      await axios.post(`${ip}/request/send`, { user: userId, doctor: doctorId });
      setSentRequests(prev => ({ ...prev, [doctorId]: { status: "waiting" } }));
      Alert.alert("Success", "Friend request sent!");
    } catch (error) {
      console.error("Error sending request:", error);
      Alert.alert("Error", "Could not send request");
    }
  };

  const handleDeleteRequest = async (requestId, doctorId) => {
    try {
      await axios.delete(`${ip}/request/delete-request/${requestId}`);
      setSentRequests(prev => {
        const updated = { ...prev };
        delete updated[doctorId];
        return updated;
      });
      Alert.alert("Success", "Friend removed!");
    } catch (error) {
      console.error("Error deleting request:", error);
      Alert.alert("Error", "Could not remove friend");
    }
  };

  return (
    <LinearGradient colors={['#1CD3DA', '#0F7074']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={logo} style={styles.logo} />
        <TouchableOpacity>
          <Image source={notification} style={styles.notification} />
        </TouchableOpacity>

        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>List of doctors</Text>
          {doctors.length > 0 ? (
            doctors.map((doctor) => (
              doctor._id && (
                <View key={doctor._id} style={styles.doctorCard}>
                  <Image source={profile} style={styles.profile} />
                  <Text style={styles.doctorName}>{doctor.firstName} {doctor.lastName}</Text>

                  {sentRequests[doctor._id]?.status === "approved" ? (
                    <TouchableOpacity
                      onPress={() => handleDeleteRequest(sentRequests[doctor._id].requestId, doctor._id)}
                      style={styles.deleteButton}
                    >
                      <Image source={deleteIcon} style={styles.deleteIcon} />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => handleAddDoctor(doctor._id)}
                      disabled={sentRequests[doctor._id]?.status === "waiting"}
                      style={{
                        backgroundColor: sentRequests[doctor._id] ? "#ccc" : "#1CD3DA",
                        padding: wp('2%'),
                        borderRadius: wp('2%'),
                        marginLeft: 'auto'
                      }}
                    >
                      <Text style={{ color: "white" }}>
                        {sentRequests[doctor._id]?.status === "waiting" ? "Pending" : "Add"}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              )
            ))
          ) : (
            <Text style={styles.noDataText}>No doctors</Text>
          )}
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Home')}>
          <Image source={home} style={styles.navIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('ChatListDoctors')}>
          <Image source={chat} style={styles.navIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Medicines')}>
          <Image source={Pill} style={styles.navIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Account')}>
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
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#B0FFF3',
    borderTopLeftRadius: wp(8),
    borderTopRightRadius: wp(8),
    paddingVertical: hp(2),
    position: 'absolute',
    bottom: 0,
    left: wp(0),
    right: wp(0),
    width: '100%',
  },
  navButton: {
    padding: wp(2),
  },
  navIcon: {
    width: wp(7),
    height: wp(7),
    resizeMode: 'contain',
  },
});
