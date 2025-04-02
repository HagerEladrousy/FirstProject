import { useEffect, useState } from "react";
import { StyleSheet, ScrollView, TextInput, View, Image, TouchableOpacity, Text } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import logo from "../assets/project.png";
import notification from "../assets/notification2.png";
import home from "../assets/homeinline.png";
import notedoctor from "../assets/notedoctoroutline.png";
import Menue from "../assets/menuoutline.png";
import profile from "../assets/profile-circle.png";

export default function Doctorhome({ navigation }) {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetch("http://172.20.10.2:3001/doctors") 
      .then((res) => res.json())
      .then((data) => setDoctors(data)) 
      .catch((err) => console.log(err));
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
        <TextInput style={styles.search} placeholder="Search for patients" multiline={true} />

        {/* قائمة الأطباء */}
        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>Patients</Text>
          {doctors.length > 0 ? (
            doctors.map((patient) => (
              <TouchableOpacity key={patient.id} onPress={() => navigation.navigate('Profile')}>
                <View style={styles.doctorCard}>
                  <Image source={profile} style={styles.profile} />
                  <Text style={styles.doctorName}>{patient.name}</Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noDataText}>No patients</Text>
          )}
        </View>
      </ScrollView>

      {/* ✅ شريط التنقل ثابت أسفل الشاشة */}
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
    paddingVertical: 50,
    alignItems: "center",
    paddingBottom: 80, // لإعطاء مساحة تحتية حتى لا يغطيها الـ navbar
  },
  logo: {
    width: 90,
    height: 90,
    marginBottom: 20,
    bottom: 30,
    left: 130,
  },
  notification: {
    width: 30,
    height: 30,
    position: "absolute",
    bottom: 90,
    right: 130,
  },
  search: {
    width: "90%",
    height: 45,
    backgroundColor: "#B0FFF3",
    opacity: 0.6,
    borderRadius: 30,
    bottom: 50,
  },
  listContainer: {
    width: "90%",
    backgroundColor: "#B0FFF3",
    padding: 15,
    borderRadius: 30,
    bottom: 40,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  doctorCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 10,
    marginBottom: 10,
  },
  profile: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  noDataText: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
    marginTop: 10,
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#B0FFF3",
    width: "100%",
    height: 60,
    alignItems: "center",
    position: "absolute",
    bottom: 0,
  },
  navIcon: {
    width: 30,
    height: 30,
  },
});
