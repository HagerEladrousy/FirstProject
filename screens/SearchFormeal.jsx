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

export default function SearchForMeals(props) {
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
      Alert.alert("Permission Denied", "Camera permission is required to search by camera.");
    }
  };

  const handleSearchByVoice = async () => {
    try {
      const { granted } = await Audio.requestPermissionsAsync();
      if (!granted) {
        Alert.alert("Permission Denied", "Microphone permission is required for voice search.");
        return;
      }

      // Simulate voice input with Expo Speech API
      Alert.alert("Voice Search", "Voice input started...");
      Speech.speak("Searching for meals based on your voice input.");

      // In a real-world case, integrate speech-to-text for actual search.
    } catch (error) {
      Alert.alert("Error", "Something went wrong with voice search.");
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.row}>
          <Image
            source={{ uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/b525fb3a-5e61-4688-b90b-e46f8658b430" }}
            resizeMode={"stretch"}
            style={styles.image}
          />
          <View style={styles.box}></View>
          <View style={styles.view}>
            <View>
              <Image
                source={{ uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/6f4abb4b-61ae-4798-b0ff-f3adb202160e" }}
                resizeMode={"stretch"}
                style={styles.image2}
              />
              <View style={styles.row2}>
                <TextInput
                  placeholder={"Breakfast"}
                  value={textInput1}
                  onChangeText={onChangeTextInput1}
                  style={styles.input}
                />
                <TouchableOpacity onPress={handleSearchByText}>
                  <Image
                    source={{ uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/2c4202eb-5e55-45e1-b457-ed374b7632ee" }}
                    resizeMode={"stretch"}
                    style={styles.image3}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Image
            source={require("../../assets/images/notification.png")}
            resizeMode={"stretch"}
            style={styles.image4}
          />
        </View>
        
        {/* Adjusted row to fix image shifting issue */}
        <View style={styles.row3}>
          <View style={styles.textInputContainer}>
            <TextInput
              placeholder="Search for meals"
              value={textInput1}
              onChangeText={onChangeTextInput1}
              style={[styles.input2, { fontSize: 20 }]}  // Adjust the fontSize as needed
              multiline={true} // Allow text to wrap to the next line
              numberOfLines={4} // Optional: set the max number of lines visible
            />
          </View>

          <TouchableOpacity onPress={handleSearchByText}>
            <Image
              source={{ uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/bdcaf517-597d-4203-b6bf-04e32dff0b29" }}
              resizeMode={"stretch"}
              style={styles.image5}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSearchByCamera}>
            <Image
              source={{ uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/a89547c4-a430-4f21-a129-a1fadaff4127" }}
              resizeMode={"stretch"}
              style={styles.image6}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSearchByVoice}>
            <Image
              source={{ uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/6c9b986f-7334-49e3-ac73-df9ca505ba81" }}
              resizeMode={"stretch"}
              style={styles.image7}
            />
          </TouchableOpacity>
        </View>
        
        <View style={styles.box2}></View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1DD4DA",
  },
  box: {
    flex: 1,
  },
  box2: {
    height: 932,
    backgroundColor: "#B0FFF3",
    borderRadius: 30,
  },
  image: {
    width: 40,
    height: 40,
    marginTop: 50,
  },
  image2: {
    height: 167,
    width: 250,
    marginTop: 50,
    marginLeft: 20,
  },
  image3: {
    width: 18,
    height: 18,
  },
  image4: {
    width: 40,
    height: 40,
    marginTop: 50,
  },
  image5: {
    width: 24,
    height: 24,
    marginRight: 5,  // Reduced margin to decrease space
    marginLeft: 10,  // Reduced margin to decrease space
  },
  image6: {
    width: 24,
    height: 24,
    marginRight: 5,  // Reduced margin to decrease space
    marginLeft: 10,  // Reduced margin to decrease space
  },
  image7: {
    width: 24,
    height: 24,
    marginLeft: 10,  // Reduced margin to decrease space
  },
  input: {
    color: "#000000",
    fontSize: 14,
    marginRight: 4,
    flex: 1,
    paddingVertical: 6,
  },
  input2: {
    color: "#000000",
    fontSize: 20,
    flex: 1,
    paddingVertical: 6,
    paddingRight: 8,
    minWidth: 180, // Prevents resizing
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 14,
  },
  row2: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#B0FFF3",
    borderRadius: 30,
    paddingHorizontal: 25,
    marginHorizontal: 30,
  },
  row3: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#B0FFF3",
    borderRadius: 30,
    paddingVertical: 10,
    paddingLeft: 35,
    paddingRight: 17,
    marginBottom: 24,
  },
  textInputContainer: {
    flex: 1,
    marginRight: 10, // Space between input and images
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  text: {
    color: "#000000",
    fontSize: 24,
    marginRight: 4,
    flex: 1,
  },
  view: {
    width: 250,
    marginRight: 25,
  },
});