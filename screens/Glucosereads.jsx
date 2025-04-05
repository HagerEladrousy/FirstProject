import { ip } from "./ip.js";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  more: require("../assets/more.png"),
};

export default function GlucoseReads() {
  const navigation = useNavigation();
  const [fastingReadings, setFastingReadings] = useState([]);
  const [cumulativeReadings, setCumulativeReadings] = useState([]);
  const [showAllFasting, setShowAllFasting] = useState(false);
  const [showAllCumulative, setShowAllCumulative] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGlucoseReads = async () => {
    try {
      const id = await AsyncStorage.getItem("userId");
      if (!id) {
        setError("User ID not found. Please log in.");
        return;
      }

      const [fastingResponse, cumulativeResponse] = await Promise.all([
        fetch(`${ip}/user/fastingBloods?userId=${id}`),
        fetch(`${ip}/user/cumulativeBloods?userId=${id}`),
      ]);

      const fastingData = await fastingResponse.json();
      const cumulativeData = await cumulativeResponse.json();

      if (fastingResponse.ok && cumulativeResponse.ok) {
        const sortedFasting = (fastingData.data || [])
          .map(item => ({...item, sortDate: new Date(item.date)}))
          .sort((a, b) => b.sortDate - a.sortDate);
        
        const sortedCumulative = (cumulativeData.data || [])
          .map(item => ({...item, sortDate: new Date(item.date)}))
          .sort((a, b) => b.sortDate - a.sortDate);

        setFastingReadings(sortedFasting);
        setCumulativeReadings(sortedCumulative);
      } else {
        setError("Failed to fetch glucose readings");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Error fetching glucose readings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGlucoseReads();
  }, []);

  const handleDelete = async (id, type) => {
    Alert.alert(
      "Delete Reading",
      `Are you sure you want to delete this ${type} reading?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: async () => {
            try {
              setLoading(true);
              const response = await fetch(
                `${ip}/user/delete${type === 'fasting' ? 'Fasting' : 'Cumulative'}Blood/${id}`,
                { method: "DELETE" }
              );

              if (response.ok) {
                await fetchGlucoseReads();
              } else {
                throw new Error("Failed to delete reading");
              }
            } catch (error) {
              console.error("Delete error:", error);
              Alert.alert("Error", "Failed to delete reading");
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return { date: "N/A", time: "" };
    const date = new Date(dateString);
    return {
      date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
      time: `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`
    };
  };

  const toggleShowAllFasting = () => setShowAllFasting(!showAllFasting);
  const toggleShowAllCumulative = () => setShowAllCumulative(!showAllCumulative);

  if (loading) {
    return (
      <LinearGradient colors={["#1CD3DA", "#0F7074"]} style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </LinearGradient>
    );
  }

  if (error) {
    return (
      <LinearGradient colors={["#1CD3DA", "#0F7074"]} style={styles.gradient}>
        <View style={styles.container}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={["#1CD3DA", "#0F7074"]} style={styles.gradient}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Image source={icons.notification} style={styles.headerIcon} />
          </TouchableOpacity>
          <Image source={icons.logo} style={styles.logo} />
        </View>

        <ScrollView style={styles.mainContainer}>
          <View style={styles.readingsSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Fasting Readings</Text>
              <View style={styles.sectionActions}>
                <TouchableOpacity 
                  style={styles.addButton}
                  onPress={() => navigation.navigate("AddGlucose", { type: 'fasting' })}
                >
                  <Image source={icons.add} style={styles.addIcon} />
                </TouchableOpacity>
                {fastingReadings.length > 3 && (
                  <TouchableOpacity 
                    style={styles.moreButton}
                    onPress={toggleShowAllFasting}
                  >
                    <Image source={icons.more} style={styles.moreIcon} />
                  </TouchableOpacity>
                )}
              </View>
            </View>

            {fastingReadings.length > 0 ? (
              (showAllFasting ? fastingReadings : fastingReadings.slice(0, 3)).map((item) => {
                const { date, time } = formatDateTime(item.date);
                return (
                  <View key={`fasting-${item._id}`} style={styles.readingItem}>
                    <View style={styles.readingContent}>
                      <Text style={styles.readingValue}>{item.value} mg/dL</Text>
                      <View style={styles.readingTime}>
                        <Text style={styles.readingDate}>{date}</Text>
                        <Text style={styles.readingHour}>{time}</Text>
                      </View>
                    </View>
                    <View style={styles.readingActions}>
                      <TouchableOpacity>
                        <Image source={icons.alert} style={styles.actionIcon} />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Image source={icons.pill} style={styles.actionIcon} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => handleDelete(item._id, 'fasting')}>
                        <Image source={icons.delete} style={styles.actionIcon} />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })
            ) : (
              <Text style={styles.emptyText}>No fasting readings found</Text>
            )}
          </View>

          <View style={styles.readingsSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Cumulative Readings</Text>
              <View style={styles.sectionActions}>
                <TouchableOpacity 
                  style={styles.addButton}
                  onPress={() => navigation.navigate("AddGlucose", { type: 'cumulative' })}
                >
                  <Image source={icons.add} style={styles.addIcon} />
                </TouchableOpacity>
                {cumulativeReadings.length > 3 && (
                  <TouchableOpacity 
                    style={styles.moreButton}
                    onPress={toggleShowAllCumulative}
                  >
                    <Image source={icons.more} style={styles.moreIcon} />
                  </TouchableOpacity>
                )}
              </View>
            </View>

            {cumulativeReadings.length > 0 ? (
              (showAllCumulative ? cumulativeReadings : cumulativeReadings.slice(0, 3)).map((item) => {
                const { date, time } = formatDateTime(item.date);
                return (
                  <View key={`cumulative-${item._id}`} style={styles.readingItem}>
                    <View style={styles.readingContent}>
                      <Text style={styles.readingValue}>{item.value} mg/dL</Text>
                      <View style={styles.readingTime}>
                        <Text style={styles.readingDate}>{date}</Text>
                        <Text style={styles.readingHour}>{time}</Text>
                      </View>
                    </View>
                    <View style={styles.readingActions}>
                      <TouchableOpacity>
                        <Image source={icons.alert} style={styles.actionIcon} />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Image source={icons.pill} style={styles.actionIcon} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => handleDelete(item._id, 'cumulative')}>
                        <Image source={icons.delete} style={styles.actionIcon} />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })
            ) : (
              <Text style={styles.emptyText}>No cumulative readings found</Text>
            )}
          </View>
        </ScrollView>

        <View style={styles.bottomNav}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Image source={icons.home} style={styles.navIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Notes")}>
            <Image source={icons.note} style={styles.navIcon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={icons.pill} style={styles.navIcon} />
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
    marginBottom: 15,
  },
  headerIcon: {
    width: 30,
    height: 30,
    //tintColor: '#FFFFFF'
  },
  logo: {
    width: 50,
    height: 50,
  },
  mainContainer: {
    flex: 1,
    marginBottom: 80,
  },
  readingsSection: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  sectionActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  addButton: {
    backgroundColor: "#B0FFF3",
    borderRadius: 20,
    padding: 5,
  },
  addIcon: {
    width: 20,
    height: 20,
    //tintColor: '#0F7074'
  },
  moreButton: {
    backgroundColor: "rgba(176, 255, 243, 0.5)",
    borderRadius: 20,
    padding: 5,
  },
  moreIcon: {
    width: 20,
    height: 20,
    //tintColor: '#0F7074'
  },
  readingItem: {
    backgroundColor: "rgba(176, 255, 243, 0.7)",
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  readingContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  readingValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0F7074",
    marginRight: 15,
    minWidth: 60,
  },
  readingTime: {
    alignItems: "flex-start",
  },
  readingDate: {
    fontSize: 14,
    color: "#0F7074",
  },
  readingHour: {
    fontSize: 12,
    color: "#0F7074",
  },
  readingActions: {
    flexDirection: "row",
    gap: 10,
  },
  actionIcon: {
    width: 20,
    height: 20,
    //tintColor: '#0F7074'
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
    paddingHorizontal: 10,
  },
  navIcon: {
    width: 24,
    height: 24,
    //tintColor: '#000000' 
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 14,
    marginTop: 10,
    padding: 10,
  },
  errorText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    marginTop: 20,
    fontWeight: "bold",
  },
});