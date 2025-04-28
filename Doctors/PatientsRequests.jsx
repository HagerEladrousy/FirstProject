import * as React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import 'react-native-url-polyfill/auto';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';
import { ip } from "../screens/ip.js";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PatientRequestsScreen() {
  const [requests, setRequests] = useState([]);
  const [doctorId, setDoctorId] = useState(null);
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const fetchDoctorIdAndRequests = async () => {
      try {
        const storedDoctorId = await AsyncStorage.getItem('doctorId');
        if (!storedDoctorId) return;
        console.log("Doctor ID is:", storedDoctorId);
        setDoctorId(storedDoctorId);

        const response = await axios.get(`${ip}/request/pending/${storedDoctorId}`);
        if (response.data.success) {
          console.log("Waiting requests:", response.data.data);
          setRequests(response.data.data);

          // Fetch user details in parallel
          const userIds = response.data.data.map(req => req.user);
          const detailPromises = userIds.map(id => axios.get(`${ip}/user/profile?userId=${id}`));

          const userResponses = await Promise.all(detailPromises);
          const details = {};
          userResponses.forEach((res, idx) => {
            if (res.data.success) {
              details[userIds[idx]] = res.data.data;
            }
          });
          setUserDetails(details);
        }
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchDoctorIdAndRequests();
  }, []);

  const handleAction = async (userId, action) => {
    try {
      const response = await axios.post(`${ip}/request/respond`, {
        user: userId,
        doctor: doctorId,
        action: action,
      });

      if (response.data.success) {
        setRequests(prev => prev.filter(req => req.user !== userId));
        Alert.alert("Success", action === "approve" ? "Request approved" : "Request declined");
      } else {
        Alert.alert("Error", response.data.message);
      }
    } catch (error) {
      console.error("Error responding to request:", error);
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <LinearGradient
      colors={['#00C9C8', '#74D3D3']}
      style={styles.container}
    >
      <View style={styles.headerIcons}>
        <Ionicons name="notifications-outline" size={wp('6%')} color="black" />
        <Image source={require('../assets/project.png')} style={styles.logo} />
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Patients Requests</Text>

        {requests.length === 0 ? (
          <Text style={styles.noRequests}>No waiting requests</Text>
        ) : (
          requests.map((req, index) => {
            const userInfo = userDetails[req.user];
            return (
              <View key={index} style={styles.requestBox}>
                <View style={styles.requestHeader}>
                  <Text style={styles.username}>
                    {userInfo ? `${userInfo.name} (${userInfo.email})` : req.user}
                  </Text>
                  <Ionicons name="person" size={wp('5%')} color="black" />
                </View>
                <View style={styles.buttonRow}>
                  <TouchableOpacity style={styles.actionButton} onPress={() => handleAction(req.user, "approve")}> 
                    <Text style={styles.buttonText}>Accept</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton} onPress={() => handleAction(req.user, "deny")}> 
                    <Text style={styles.buttonText}>Decline</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp('6%'),
    paddingHorizontal: wp('5%'),
  },
  headerIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('2%'),
  },
  logo: {
    width: wp('10%'),
    height: wp('10%'),
    resizeMode: 'contain',
  },
  card: {
    backgroundColor: '#A8F3F2',
    borderRadius: wp('5%'),
    padding: wp('5%'),
    height: hp('75%'),
    width: '100%',
  },
  title: {
    fontSize: wp('5.5%'),
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: hp('3%'),
  },
  requestBox: {
    backgroundColor: '#C5F7F7',
    borderRadius: wp('4%'),
    padding: wp('4%'),
    marginBottom: hp('2.5%'),
  },
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('1.5%'),
  },
  username: {
    fontWeight: 'bold',
    fontSize: wp('4.5%'),
    color: '#000',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    backgroundColor: 'white',
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('6%'),
    borderRadius: wp('3%'),
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: wp('3.5%'),
  },
  noRequests: {
    textAlign: 'center',
    fontSize: wp('4%'),
    color: '#555',
    marginTop: hp('3%'),
  },
});
