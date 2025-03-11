import React, { useState } from "react";
import { SafeAreaView, View, ScrollView, Image, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

import DropDownPicker from "react-native-dropdown-picker";


export default ( {navigation }) => {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState(null);
  const [roles, setRoles] = useState([
    { label: "User", value: "user" },
    { label: "Doctor", value: "doctor" },
  ]);



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
      <LinearGradient
      // Colors for the gradient
      colors={['#1CD3DA', '#0F7074']}
      // Gradient direction (top-left to bottom-right by default)
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
        <View style={styles.column}>
          <Image
            source={require('../assets/project.png')}
            //resizeMode={"stretch"}
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
        <DropDownPicker
        open={open}
        value={role}
        items={roles}
        setOpen={setOpen}
        setValue={setRole}
        setItems={setRoles}
        placeholder="Select"
        style={{top:30,width:200,left:35}}
        listMode="SCROLLVIEW"
        
      />

        <View style={styles.column2}>
          <View style={styles.row}>
            <Image
              source={{ uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/fc39f927-0ae0-49bf-afc2-ed3cb615d249" }}
              resizeMode={"stretch"}
              style={styles.image3}
            />
            <Text style={styles.text2}>{"UserName"}</Text>
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
            <TouchableOpacity style={styles.signUpButton} onPress={() => navigation.navigate('Doctorhome')}>
              <Text style={styles.buttonTextSignin}>Sign In</Text>
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
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1, // Fill the entire screen
    //justifyContent: 'center', // Center content vertically
    //alignItems: 'center', // Center content horizontally
  },
  container: {
    flex: 1,
    //backgroundColor: "#1CD3DA",
    //paddingBottom:10,
    //paddingTop:20
    //padding:10
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
    bottom:50
    
  },
  image: {
      height:100,
      width:100,
      top:20,
      left:170
  },
  signInTextContainer: {
    flexDirection: "row", // Makes the text and image align horizontally
    alignItems: "center", // Aligns text and image vertically in the center
  },
  image2: {
    height: 30, // Set height to 30
    width: 30, // Set width to 30
    marginLeft: 10, // Adds space between the text and image
    top:35,
  },
  text: {
    color: "white",
    fontSize: 40,
    fontWeight:'bold',
    top:30,
  },
  image3: {
    width: 40,
    height: 40,
    marginRight: 4,
    top:6,
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
    marginBottom: 10,
    paddingHorizontal: 12,
    right:-1,
    top:30
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
    fontSize: 25,
    marginTop: 11,
    flex: 1,
    right:50,
    top:30
  },
  text3: {
    color: "#000000",
    fontSize: 25,
    flex: 1,
    right:50,
    top:30
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
    //backgroundColor: "#0F7174", // White container for buttons
    backgroundColor:"white",
    borderRadius: 32, // Rounded edges for buttons
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
  buttonTextSignin: {
      fontSize: 19,
    color: "#fff", // Text color
    fontWeight:'bold',
  },
  buttonText: {
    fontSize: 19,
  color: "#000", // Text color
  fontWeight:'bold',

},
  logoImage: {
    width: 25,
    height: 25,
  },

  signUpButton: {
    backgroundColor: "#0F7174",
    borderRadius: 32,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
  },
});