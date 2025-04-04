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
import {ip} from "./ip.js";


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
          const response = await fetch(
            `${ip}/user/meds?userId=${id}`
          );
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
            const response = await fetch(
              `${ip}/user/med/${medId}`,
              {
                method: "DELETE",
              }
            );
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
      <LinearGradient
        colors={["#1CD3DA", "#0F7074"]}
        style={styles.loadingContainer}
      >
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
            <Image source={icons.menu} style={styles.headerIcon} />
          </TouchableOpacity>
          <Image source={icons.logo} style={styles.logo} />
          <TouchableOpacity>
            <Image source={icons.notification} style={styles.headerIcon} />
          </TouchableOpacity>
        </View>

        {/* Med List */}
        <View style={styles.medContainer}>
          <View style={styles.medHeader}>
            <Text style={styles.medTitle}>Your medicines</Text>
            <TouchableOpacity>
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
            contentContainerStyle={{ paddingBottom: 100 }}
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
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
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
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  headerIcon: {
    width: 30,
    height: 30,
    tintColor: "#FFFFFF",
  },
  logo: {
    width: 50,
    height: 50,
  },
  medContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 15,
    padding: 15,
    flex: 1, // ✅ عشان يسمح بالـ scroll
  },
  medHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  medTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  addIcon: {
    width: 25,
    height: 25,
  },
  medItem: {
    backgroundColor: "rgba(176, 255, 243, 0.7)",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  medName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  medDate: {
    fontSize: 14,
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  medIcon: {
    width: 20,
    height: 20,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#B0FFF3",
    borderRadius: 30,
    height: 60,
    alignItems: "center",
    position: "absolute",
    bottom: 10,
    left: 20,
    right: 20,
  },
  navIcon: {
    width: 28,
    height: 28,
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
    fontSize: 16,
    marginTop: 20,
  },
});
