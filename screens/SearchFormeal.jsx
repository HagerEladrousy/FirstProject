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
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Speech from "expo-speech";
import { Audio } from "expo-av";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function SearchForMeals() {
  const [textInput1, onChangeTextInput1] = useState("");

  const handleSearchByText = () => {
    Alert.alert("Search", `Searching for: ${textInput1}`);
  };

  const handleSearchByCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status === "granted") {
      let result = await ImagePicker.launchCameraAsync();
      if (!result.canceled) {
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
          <Image source={require("../assets/notification2.png")} style={styles.icon} />
          <Image source={require("../assets/project.png")} style={styles.logo} />
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
    paddingVertical: hp(2),
  },
  header: {
    width: wp(90),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: hp(5),
    paddingBottom: hp(2),
  },
  icon: {
    width: wp(9),
    height: wp(9),
  },
  logo: {
    width: wp(15),
    height: wp(15),
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#B0FFF3",
    width: wp(90),
    borderRadius: wp(7),
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    marginBottom: hp(2),
  },
  textInput: {
    flex: 1,
    fontSize: wp(4),
    color: "#000",
  },
  searchIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  smallIcon: {
    width: wp(6),
    height: wp(6),
    marginLeft: wp(2),
  },
  bodyBox: {
    width: wp(90),
    height: hp(55),
    backgroundColor: "#B0FFF3",
    borderRadius: wp(7),
  },
});
