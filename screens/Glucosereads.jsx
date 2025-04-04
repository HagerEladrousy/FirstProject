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

export default function GlucoseReads() {
    const navigation = useNavigation();
    const [glucoseReads, setGlucoseReads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const id = await AsyncStorage.getItem("userId");
                if (id) {
                    const fastingResponse = await fetch(
                        `http://192.168.1.10:5500/user/getfastingBlood?userId=${id}`
                    );
                    const cumulativeResponse = await fetch(
                        `http://192.168.1.10:5500/user/getcumulativeBlood?userId=${id}`
                    );
                    const fastingData = await fastingResponse.json();
                    const cumulativeData = await cumulativeResponse.json();

                    if (fastingResponse.ok && cumulativeResponse.ok) {
                        const combinedData = fastingData.data.map((item, index) => ({
                            fastingBlood: item.value || 0,  // Default to 0 if value is undefined
                            cumulativeBlood: cumulativeData.data[index]?.value || 0,  // Default to 0
                            date: item.date || "", // Default to empty string if no date
                            _id: item._id || index,  // Ensure a unique identifier
                        }));
                        setGlucoseReads(combinedData);
                    } else {
                        setError("No data found or failed to fetch data");
                    }
                } else {
                    setError("User ID not found. Please log in.");
                }
            } catch (error) {
                setError("Error fetching glucose readings. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (readId) => {
        Alert.alert("Delete Glucose Read", "Are you sure?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Delete",
                onPress: async () => {
                    try {
                        const fastingDeleteResponse = await fetch(
                            `http://192.168.1.10:5500/user/deletefastingBlood/${readId}`,
                            { method: "DELETE" }
                        );

                        const cumulativeDeleteResponse = await fetch(
                            `http://192.168.1.10:5500/user/deletecumulativeBlood/${readId}`,
                            { method: "DELETE" }
                        );

                        if (fastingDeleteResponse.ok && cumulativeDeleteResponse.ok) {
                            setGlucoseReads((prev) =>
                                prev.filter((read) => read._id !== readId)
                            );
                        } else {
                            Alert.alert("Error", "Failed to delete glucose reading from both sources");
                        }
                    } catch (error) {
                        Alert.alert("Error", "Failed to delete glucose reading from both sources");
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
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity>
                        <Image source={icons.notification} style={styles.headerIcon} />
                    </TouchableOpacity>
                    <Image source={icons.logo} style={styles.logo} />
                </View>

                {/* Glucose Reads List */}
                <View style={styles.readsContainer}>
                    <View style={styles.readsHeader}>
                        <Text style={styles.readsTitle}>Glucose Reads</Text>
                        <TouchableOpacity>
                            <Image source={icons.add} style={styles.addIcon} />
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={glucoseReads}
                        keyExtractor={(item) => item._id || item.date} // Use item._id or a fallback identifier
                        renderItem={({ item }) => (
                            <View style={styles.readItem}>
                                <View style={styles.readValuesContainer}>
                                    <Text style={styles.readValue}>
                                        Fasting: {item.fastingBlood ? `${item.fastingBlood} mg/dL` : "N/A"}
                                    </Text>
                                    <Text style={styles.readValue}>
                                        Cumulative: {item.cumulativeBlood ? `${item.cumulativeBlood} mg/dL` : "N/A"}
                                    </Text>
                                </View>
                                <Text style={styles.readDate}>Date: {item.date ? formatDate(item.date) : "N/A"}</Text>
                                <View style={styles.iconRow}>
                                    <TouchableOpacity>
                                        <Image source={icons.alert} style={styles.readIcon} />
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Image source={icons.pill} style={styles.readIcon} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleDelete(item._id)}>
                                        <Image source={icons.delete} style={styles.readIcon} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                        ListEmptyComponent={<Text style={styles.emptyText}>No glucose reads found</Text>}
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
    },
    logo: {
        width: 50,
        height: 50,
    },
    readsContainer: {
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        borderRadius: 15,
        padding: 15,
        flex: 1,
    },
    readsHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    readsTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000",
    },
    addIcon: {
        width: 25,
        height: 25,
    },
    readItem: {
        backgroundColor: "rgba(176, 255, 243, 0.7)",
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    },
    readValuesContainer: {
        flexDirection: "column",  // تغيير الفليكس من row إلى column
        justifyContent: "space-between",
    },
    readValue: {
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 5, // إضافة مسافة بين القيم
    },
    readDate: {
        fontSize: 14,
        marginTop: 5,
    },
    iconRow: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 10,
        marginTop: 10,
    },
    readIcon: {
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
    errorText: {
        textAlign: "center",
        color: "#fff",
        fontSize: 16,
        marginTop: 20,
        fontWeight: "bold",
    },
});
