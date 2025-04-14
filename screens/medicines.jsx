import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  FlatList,
  Alert,
  ActivityIndicator,
  Vibration,
  Modal
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from 'expo-av';
import * as Notifications from 'expo-notifications';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { ip } from "./ip.js";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const icons = {
  logo: require("../assets/project.png"),
  notification: require("../assets/notification2.png"),
  home: require("../assets/home.png"),
  menu: require("../assets/menuoutline.png"),
  note: require("../assets/note.png"),
  pill: require("../assets/Subtract.png"),
  add: require("../assets/add-square.png"),
  delete: require("../assets/delete.png"),
  alert: require("../assets/notification2.png"),
};

export default function Medicines() {
  const navigation = useNavigation();
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAlarm, setShowAlarm] = useState(false);
  const [currentMed, setCurrentMed] = useState(null);
  const soundRef = useRef(null);
  const snoozeTimeout = useRef(null);

  const loadSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/alarm.mp3'),
        { shouldPlay: false, isLooping: true }
      );
      soundRef.current = sound;
    } catch (error) {
      console.error('Failed to load sound', error);
    }
  };

  useEffect(() => {
    loadSound();
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
      if (snoozeTimeout.current) {
        clearTimeout(snoozeTimeout.current);
      }
    };
  }, []);

  const triggerAlarm = async (medication) => {
    console.log('Triggering alarm for:', medication.medName);
    setCurrentMed(medication);
    setShowAlarm(true);

    try {
      if (soundRef.current) {
        await soundRef.current.replayAsync();
      }

      Vibration.vibrate([1000, 1000], true);

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Medication Time!",
          body: `Time to take ${medication.medName}`,
          sound: true,
          data: { medicationId: medication._id },
        },
        trigger: null,
      });
    } catch (error) {
      console.error('Alarm error:', error);
    }
  };

  const stopAlarm = async () => {
    try {
      if (soundRef.current) {
        await soundRef.current.stopAsync();
      }
      Vibration.cancel();
    } catch (error) {
      console.error('Stop alarm error:', error);
    }
  };

  const handleSnooze = async () => {
    await stopAlarm();
    setShowAlarm(false);
    
    if (snoozeTimeout.current) {
      clearTimeout(snoozeTimeout.current);
    }
    
    snoozeTimeout.current = setTimeout(() => {
      if (currentMed) {
        triggerAlarm(currentMed);
      }
    }, 5 * 60 * 1000);
  };

  const handleDismiss = async () => {
    await stopAlarm();
    setShowAlarm(false);
    
    if (snoozeTimeout.current) {
      clearTimeout(snoozeTimeout.current);
    }
  };

  useEffect(() => {
    const checkMedicationTimes = () => {
      const now = new Date();
      const currentTime = now.getHours() * 60 + now.getMinutes();
      
      medications.forEach(med => {
        med.dose_time?.forEach(time => {
          const doseTime = new Date(time);
          if (isNaN(doseTime.getTime())) return;
          
          const doseMinutes = doseTime.getHours() * 60 + doseTime.getMinutes();
          
          if (Math.abs(currentTime - doseMinutes) <= 1 && !showAlarm) {
            triggerAlarm(med);
          }
        });
      });
    };

    const interval = setInterval(checkMedicationTimes, 30000);
    return () => clearInterval(interval);
  }, [medications, showAlarm]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = await AsyncStorage.getItem("userId");
        if (id) {
          const response = await fetch(`${ip}/user/meds?userId=${id}`);
          const { data } = await response.json();
          if (response.ok) {
            setMedications(data);
          }
        }
      } catch (error) {
        Alert.alert("Error", "Failed to load medications");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}`;
  };

  const formatTime = (timeString) => {
    if (!timeString) return "";
    const time = new Date(timeString);
    return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return (
      <LinearGradient colors={["#1CD3DA", "#0F7074"]} style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={["#1CD3DA", "#0F7074"]} style={styles.gradient}>
      <View style={styles.container}>
        <Modal
          visible={showAlarm}
          transparent={true}
          animationType="fade"
          onRequestClose={handleDismiss}
        >
          <View style={styles.alarmContainer}>
            <View style={styles.alarmContent}>
              <Text style={styles.alarmTitle}> Medication Time </Text>
              <Text style={styles.alarmText}>
                Time to take {currentMed?.medName}
              </Text>
              
              <View style={styles.alarmButtons}>
                <TouchableOpacity 
                  style={[styles.alarmButton, styles.snoozeButton]} 
                  onPress={handleSnooze}
                >
                  <Text style={styles.buttonText}>Snooze 5 minutes</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.alarmButton, styles.dismissButton]} 
                  onPress={handleDismiss}
                >
                  <Text style={styles.buttonText}>Confirm Medication Taken</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <View style={styles.header}>
          <TouchableOpacity>
            <Image source={icons.notification} style={styles.headerIcon} />
          </TouchableOpacity>
          <Image source={icons.logo} style={styles.logo} />
        </View>

        <View style={styles.medContainer}>
          <View style={styles.medHeader}>
            <Text style={styles.medTitle}>Your Medications</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Addmedicine")}>
              <Image source={icons.add} style={styles.addIcon} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={medications}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.medItem}>
                <Text style={styles.medName}>{item.medName}</Text>
                <Text style={styles.medDate}>
                  From: {formatDate(item.start)} To: {formatDate(item.end)}
                </Text>
                <Text style={styles.medTime}>
                  Times: {item.dose_time.map(t => formatTime(t)).join(', ')}
                </Text>
                <View style={styles.iconRow}>
                  <TouchableOpacity>
                    <Image source={icons.alert} style={styles.medIcon} />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image source={icons.pill} style={styles.medIcon} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDelete(item._id)}>
                    <Image source={icons.delete} style={styles.medIcon} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No medications registered</Text>
            }
            contentContainerStyle={{ paddingBottom: hp(10) }}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <View style={styles.bottomNav}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Image source={icons.home} style={styles.navIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Notes")}>
            <Image source={icons.note} style={styles.navIcon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={icons.pill} style={[styles.navIcon, styles.active]} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Account")}>
            <Image source={icons.menu} style={styles.navIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: wp(5),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp(2),
  },
  headerIcon: {
    width: wp(8),
    height: wp(8),
  },
  logo: {
    width: wp(12),
    height: wp(12),
  },
  medContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: wp(4),
    padding: wp(5),
    flex: 1,
  },
  medHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: hp(2),
  },
  medTitle: {
    fontSize: wp(5),
    fontWeight: "bold",
    color: "#000",
  },
  addIcon: {
    width: wp(6),
    height: wp(6),
  },
  medItem: {
    backgroundColor: "rgba(176, 255, 243, 0.7)",
    borderRadius: wp(3),
    padding: wp(4),
    marginBottom: hp(2),
  },
  medName: {
    fontWeight: "bold",
    fontSize: wp(4.5),
  },
  medDate: {
    fontSize: wp(4),
  },
  medTime: {
    fontSize: wp(4),
    marginVertical: hp(0.5),
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: wp(3),
  },
  medIcon: {
    width: wp(6),
    height: wp(6),
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#B0FFF3",
    width: wp(100),
    paddingVertical: hp(2),
    borderTopLeftRadius: wp(8),
    borderTopRightRadius: wp(8),
    position: "absolute",
    bottom: 0,
    left: wp(0),
    right: wp(0),
  },
  navIcon: {
    width: wp(7),
    height: wp(7),
    resizeMode: "contain",
  },
  active: {
    transform: [{ scale: 1.2 }],
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    textAlign: "center",
    color: "#fff",
    fontSize: wp(4),
    marginTop: hp(5),
  },
  alarmContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  alarmContent: {
    backgroundColor: 'white',
    width: wp(90),
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  alarmTitle: {
    fontSize: wp(7),
    fontWeight: 'bold',
    color: '#FF0000',
    marginBottom: hp(2),
    textAlign: 'center',
  },
  alarmText: {
    fontSize: wp(5),
    textAlign: 'center',
    marginBottom: hp(4),
    fontWeight: '600',
  },
  alarmButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  alarmButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  snoozeButton: {
    backgroundColor: '#FFA500',
  },
  dismissButton: {
    backgroundColor: '#1CD3DA',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: wp(4),
  },
});