import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ip } from "./ip.js";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

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

  const handleDelete = async (medId) => {
    Alert.alert("Delete Medication", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: async () => {
          try {
            const response = await fetch(`${ip}/user/med/${medId}`, {
              method: "DELETE",
            });
            if (response.ok) {
              setMedications((prev) => prev.filter((med) => med._id !== medId));
            }
          } catch (error) {
            Alert.alert("Error", "Failed to delete medication");
          }
        },
      },
    ]);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}`;
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
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity>
            <Image source={icons.notification} style={styles.headerIcon} />
          </TouchableOpacity>
          <Image source={icons.logo} style={styles.logo} />
        </View>

        {/* Med List */}
        <View style={styles.medContainer}>
          <View style={styles.medHeader}>
            <Text style={styles.medTitle}>Your medicines</Text>
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
                  From: {formatDate(item.start)} TO: {formatDate(item.end)}
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
              <Text style={styles.emptyText}>No medications found</Text>
            }
            contentContainerStyle={{ paddingBottom: hp(10) }} // Adjust padding based on screen height
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* Bottom Nav */}
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
    padding: wp(5), // Use wp() for padding based on screen width
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp(2), // Use hp() for margin based on screen height
  },
  headerIcon: {
    width: wp(8), // Use wp() for icon size
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
    fontSize: wp(5), // Adjust font size based on screen width
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
  iconRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: wp(3), // Adjust gap based on screen width
  },
  medIcon: {
    width: wp(6), // Icon size relative to screen width
    height: wp(6),
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#B0FFF3",
    width: wp(100), // Full width
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
    fontSize: wp(4), // Font size adjusted to screen width
    marginTop: hp(5), // Margin adjusted to screen height
  },
});
