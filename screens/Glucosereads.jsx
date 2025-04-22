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
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"; // إضافة استيراد

const icons = {
  logo: require("../assets/project.png"),
  notification: require("../assets/notification2.png"),
  home: require("../assets/home.png"),
  menu: require("../assets/menuoutline.png"),
  chatoutline: require("../assets/chatoutline.png"),
  pill: require("../assets/pill.png"),
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
                  onPress={() => navigation.navigate("Fastingbloodsugar")}
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
                      {/* <TouchableOpacity>
                        <Image source={icons.alert} style={styles.actionIcon} />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Image source={icons.pill} style={styles.actionIcon} />
                      </TouchableOpacity> */}
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
                  onPress={() => navigation.navigate("Cumulativebloodsugar")}
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
                      <Text style={styles.readingValue}>{item.value}%</Text>
                      <View style={styles.readingTime}>
                        <Text style={styles.readingDate}>{date}</Text>
                        <Text style={styles.readingHour}>{time}</Text>
                      </View>
                    </View>
                    <View style={styles.readingActions}>
                      {/* <TouchableOpacity>
                        <Image source={icons.alert} style={styles.actionIcon} />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Image source={icons.pill} style={styles.actionIcon} />
                      </TouchableOpacity> */}
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
            <Image source={icons.chatoutline} style={styles.navIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Medicines")}>
            <Image source={icons.pill} style={styles.navIcon} />
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
    padding: wp("5%"), // تعديل عرض الحواف
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp("2%"), // تعديل المسافة بين العناصر
  },
  headerIcon: {
    width: wp("8%"), // تعديل عرض الأيقونة
    height: wp("8%"), // تعديل ارتفاع الأيقونة
  },
  logo: {
    width: wp("15%"), // تعديل عرض الشعار
    height: wp("15%"), // تعديل ارتفاع الشعار
  },
  mainContainer: {
    flex: 1,
    marginBottom: hp("8%"), // تعديل المسافة السفلية
  },
  readingsSection: {
    marginBottom: hp("3%"), // تعديل المسافة بين الأقسام
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp("1%"), // تعديل المسافة بين العناصر
  },
  sectionTitle: {
    fontSize: wp("4%"), // تعديل حجم النص
    fontWeight: "bold",
    color: "#000",
  },
  sectionActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp("3%"), // تعديل المسافة بين الأزرار
  },
  addButton: {
    backgroundColor: "#B0FFF3",
    borderRadius: 20,
    padding: wp("2%"), // تعديل الحجم الداخلي
  },
  addIcon: {
    width: wp("5%"), // تعديل حجم الأيقونة
    height: wp("5%"), // تعديل حجم الأيقونة
  },
  moreButton: {
    backgroundColor: "rgba(176, 255, 243, 0.5)",
    borderRadius: 20,
    padding: wp("2%"), // تعديل الحجم الداخلي
  },
  moreIcon: {
    width: wp("5%"), // تعديل حجم الأيقونة
    height: wp("5%"), // تعديل حجم الأيقونة
  },
  readingItem: {
    backgroundColor: "rgba(176, 255, 243, 0.7)",
    borderRadius: 10,
    padding: wp("3%"), // تعديل الحجم الداخلي
    marginBottom: hp("1%"), // تعديل المسافة السفلية
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  readingContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  readingValue: {
    fontSize: wp("4%"), // تعديل حجم النص
    fontWeight: "bold",
    color: "#0F7074",
    marginRight: wp("5%"), // تعديل المسافة بين النص
  },
  readingTime: {
    alignItems: "flex-start",
  },
  readingDate: {
    fontSize: wp("3.5%"), // تعديل حجم النص
    color: "#0F7074",
  },
  readingHour: {
    fontSize: wp("3%"), // تعديل حجم النص
    color: "#0F7074",
  },
  readingActions: {
    flexDirection: "row",
    gap: wp("5%"), // تعديل المسافة بين الأزرار
  },
  actionIcon: {
    width: wp("6%"), // تعديل حجم الأيقونة
    height: wp("6%"), // تعديل حجم الأيقونة
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#B0FFF3',
    width: '111%',
    paddingVertical: hp(2),
    borderTopLeftRadius: wp(8),
    borderTopRightRadius: wp(8),
    position: 'absolute',
    bottom: 0,
    left: wp(0),
     right: wp(0),
  },
  navIcon: {
    width: wp(7),
    height: wp(7),
    resizeMode: 'contain',
  },
  
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    textAlign: "center",
    color: "#fff",
    fontSize: wp("4%"), // تعديل حجم النص
    marginTop: hp("2%"), // تعديل المسافة العلوية
    padding: wp("3%"), // تعديل الحجم الداخلي
  },
  errorText: {
    textAlign: "center",
    color: "#fff",
    fontSize: wp("4.5%"), // تعديل حجم النص
    marginTop: hp("5%"), // تعديل المسافة العلوية
    fontWeight: "bold",
  },
});
