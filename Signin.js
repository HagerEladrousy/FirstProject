import React, { useState } from "react";
import { SafeAreaView, View, ScrollView, Image, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from "react-native";

export default (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Basic form validation
  const handleSignIn = () => {
    if (username === '' || password === '') {
      Alert.alert("Error", "Please enter both username and password");
    } else {
      // Your authentication logic here (e.g., Firebase authentication)
      Alert.alert("Signed In", "Welcome back, " + username);
    }
  };

  // Handle Google sign-in
  const handleGoogleSignIn = () => {
    Alert.alert("Google Sign-In", "Google login flow triggered.");
  };

  // Handle Facebook sign-in
  const handleFacebookSignIn = () => {
    Alert.alert("Facebook Sign-In", "Facebook login flow triggered.");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.column}>
          <Image
            source={{ uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/c446ce18-444e-4770-b539-d6cbd2c71f8d" }}
            resizeMode={"stretch"}
            style={styles.image}
          />
          <View style={styles.signInTextContainer}>
            <Text style={styles.text}>{"Sign In"}</Text>
            <Image
              source={{ uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/669591d3-068a-4d4b-b7c0-9350a8486f4d" }}
              resizeMode={"stretch"}
              style={styles.image2}
            />
          </View>
        </View>

        <View style={styles.column2}>
          <View style={styles.row}>
            <Image
              source={{ uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/fc39f927-0ae0-49bf-afc2-ed3cb615d249" }}
              resizeMode={"stretch"}
              style={styles.image3}
            />
            <Text style={styles.text2}>{"Username"}</Text>
          </View>
          <TextInput
            placeholder=""
            value={username}
            onChangeText={setUsername}
            style={styles.textField} // Custom text field style
          />
          
          <View style={styles.row2}>
            <Image
              source={{ uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/e0eb7cd0-f98f-455d-ab06-cc2e2bbb454e" }}
              resizeMode={"stretch"}
              style={styles.image4}
            />
            <Text style={styles.text3}>{"Password"}</Text>
          </View>
          <TextInput
            placeholder=""
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.textField} // Custom text field style
          />
         

          {/* Sign In Button inside White Container */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonInnerContainer} onPress={handleSignIn}>
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
          </View>

          {/* Sign In with Google Button inside White Container */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonInnerContainer} onPress={handleGoogleSignIn}>
              <Text style={styles.buttonText}>Sign In with Google</Text>
              <Image
                source = {{uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/e247c3e6-e81b-4069-b1d8-36a1b678a22b"}} 
                resizeMode={"stretch"}
                style={styles.logoImage}
              />
            </TouchableOpacity>
          </View>

          {/* Sign In with Facebook Button inside White Container */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonInnerContainer} onPress={handleFacebookSignIn}>
              <Text style={styles.buttonText}>Sign In with Facebook</Text>
              <Image
                source = {{uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/91d14ecf-3323-4007-9326-7b721be77f4b"}}
                resizeMode={"stretch"}
                style={styles.logoImage}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1DD4DA",
  },
  scrollView: {
    flexGrow: 1,
  },
  column: {
    marginBottom: 34,
    marginHorizontal: 93,
  },
  column2: {
    backgroundColor: "#B0FFF3",
    borderRadius: 40,
    paddingTop: 52,
    paddingBottom: 232,
  },
  image: {
      height: 230,
      width:230
  },
  signInTextContainer: {
    flexDirection: "row", // Makes the text and image align horizontally
    alignItems: "center", // Aligns text and image vertically in the center
  },
  image2: {
    height: 30, // Set height to 30
    width: 30, // Set width to 30
    marginLeft: 10, // Adds space between the text and image
  },
  text: {
    color: "white",
    fontSize: 40,
  },
  image3: {
    width: 40,
    height: 40,
    marginRight: 4,
  },
  image4: {
    width: 40,
    height: 40,
    marginRight: 5,
  },
  image5: {
    width: 26,
    height: 26,
    marginTop: 9,
  },
  textField: {
    backgroundColor: "white", // Make text field background white
    fontSize: 18,
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 28,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 15, // Round the corners
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  row: {
    flexDirection: "row",
    marginBottom: 6,
    marginHorizontal: 44,
  },
  row2: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
    marginHorizontal: 44,
  },
  text2: {
    color: "#000000",
    fontSize: 30,
    marginTop: 11,
    flex: 1,
  },
  text3: {
    color: "#000000",
    fontSize: 30,
    flex: 1,
  },
  view: {
    backgroundColor: "#FFFFFF",
    borderRadius: 32,
    paddingLeft: 321,
    paddingRight: 19,
    marginBottom: 115,
    marginHorizontal: 28,
    shadowColor: "#00000040",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    elevation: 4,
  },
  buttonContainer: {
    marginHorizontal: 28,
    marginVertical: 8,
  },
  buttonInnerContainer: {
    backgroundColor: "white", // White container for buttons
    borderRadius: 10, // Rounded edges for buttons
    shadowColor: "#00000040",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    elevation: 4,
    flexDirection: "row", // Align text and logo horizontally
    justifyContent: "space-between", // Add space between text and logo
    alignItems: "center", // Vertically center the text and logo
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  buttonText: {
      fontSize: 19,
    color: "#000", // Text color
  },
  logoImage: {
    width: 25,
    height: 25,
  },
});