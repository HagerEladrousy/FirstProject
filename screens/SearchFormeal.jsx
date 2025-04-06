import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Image,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Speech from "expo-speech";
import { Audio } from "expo-av";

const { width, height } = Dimensions.get("window");

export default function SearchForMeals() {
  const [textInput1, onChangeTextInput1] = useState("");

  const handleSearchByText = () => {
    Alert.alert("Search", `Searching for: ${textInput1}`);
  };

  const handleSearchByCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status === "granted") {
      let result = await ImagePicker.launchCameraAsync();
      if (!result.cancelled) {
        Alert.alert("Camera Search", "Image captured for search!");
      }
    } else {
      Alert.alert("Permission Denied", "Camera permission is required.");
    }
  };

  const handleSearchByVoice = async () => {
    try {
      const { granted } = await Audio.requestPermissionsAsync();
      if (!granted) {
        Alert.alert("Permission Denied", "Microphone permission is required.");
        return;
      }

      Alert.alert("Voice Search", "Voice input started...");
      Speech.speak("Searching for meals based on your voice input.");
    } catch (error) {
      Alert.alert("Error", "Something went wrong with voice search.");
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          {/* <Image source={require("../assets/user.png")} style={styles.icon} /> */}
          <Image source={require("../assets/notification.png")} style={styles.icon} />
          <Image
           source={require("../assets/project.png")}
            style={styles.logo}
          />
        </View>

        {/* Search Box */}
        <View style={styles.searchBox}>
          <TextInput
            placeholder="Search for meals"
            value={textInput1}
            onChangeText={onChangeTextInput1}
            style={styles.textInput}
          />
          <View style={styles.searchIcons}>
            <TouchableOpacity onPress={handleSearchByText}>
              <Image source={require("../assets/search.png")} style={styles.smallIcon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSearchByCamera}>
              <Image source={require("../assets/camera.png")} style={styles.smallIcon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSearchByVoice}>
              <Image source={require("../assets/mic.png")} style={styles.smallIcon} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Content Box (Body) */}
        <View style={styles.bodyBox}></View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1DD4DA",
  },
  scrollContent: {
    alignItems: "center",
    paddingVertical: height * 0.02,
  },
  header: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    //marginBottom: height * 0.015,
    //paddingHorizontal: width * 0.05,
    paddingTop: height * 0.05,
    paddingBottom: height * 0.02,
  },
  icon: {
    width: width * 0.09,
    height: width * 0.09,
  },
  logo: {
    width: width * 0.15,
    height: width * 0.15,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#B0FFF3",
    width: "90%",
    borderRadius: width * 0.07,
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.01,
    marginBottom: height * 0.02,
  },
  textInput: {
    flex: 1,
    fontSize: width * 0.04,
    color: "#000",
  },
  searchIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  smallIcon: {
    width: width * 0.06,
    height: width * 0.06,
    marginLeft: width * 0.02,
  },
  bodyBox: {
    width: "90%",
    height: height * 0.55,
    backgroundColor: "#B0FFF3",
    borderRadius: width * 0.07,
  },
});

