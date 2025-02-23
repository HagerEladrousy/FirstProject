import React from 'react';
import { View, Text, StyleSheet ,Image,Pressable,Alert ,TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import logo from "../assets/project.png";
import profilecircle from "../assets/profile-circle.png";
import Ellipsewhite from "../assets/Ellipsewhite.png";
import call from "../assets/call.png";
import smsstar from "../assets/sms-star.png";


export default function App({ navigation }) {

  const handlePress = () => {
    Alert.alert("Emergency number", "0000000");
  };


  return (
    
    <LinearGradient
      // Colors for the gradient
      colors={['#7D0505', '#E03939']}
      // Gradient direction (top-left to bottom-right by default)
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      
      
        <View style={styles.container}>
       
       

        <Image source={logo} style={styles.logo}></Image>
        <TouchableOpacity  onPress={() => navigation.navigate('Account')}>
        <Image source={profilecircle} style={styles.profilecircle}></Image>
        </TouchableOpacity>
        <View style={styles.rectangle}></View>
        <Text style={styles.text2}>Emergency TIPS</Text>
        


      <Text style={styles.text}>Very High Suger</Text>

      <Image source={Ellipsewhite} style={styles.Ellipsewhite1}></Image>
      <Pressable onPress={handlePress}>
      <Image source={call} style={styles.call}></Image>
      </Pressable>
      <Text style={styles.textcall}>Call the emergency</Text>

      <Image source={Ellipsewhite} style={styles.Ellipsewhite2}></Image>
      <Pressable onPress={handlePress}>
      <Image source={smsstar} style={styles.smsstar}></Image>
      </Pressable>
      <Text style={styles.textsmsstar}>send massage emergency</Text>
      
     
      </View>
      
  
    </LinearGradient>
   
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1, // Fill the entire screen
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  container: {
    flex: 1,
    //backgroundColor: "#18B0B5",
    alignItems:"center",
    justifyContent:"center",
    //paddingLeft: 2,
    paddingTop:220,
    paddingRight:5,
    //paddingBottom :50,
  },

  text:{
    fontSize:35,
    fontWeight: 'bold', 
    bottom:300,
    fontFamily:"Almarai-Regular",
    color:'#FFF'
  },

  logo:{
    width:90,
    height:90,
    bottom:110,
    left:140
  },
  
  profilecircle:{
    width:40,
    height:40,
    bottom:190,
    right:150
  },

  rectangle: {
    alignItems:"center",
    width: 300,    
    height:120,  
    backgroundColor: '#B0FFF3',
    opacity:0.6,
    borderRadius: 20,
    top:180,
    
  },
  text2:{
    fontSize:25,
    color:"#fff",
    fontWeight:'bold',
    top:65,
    fontFamily:"Almarai-Regular",
    
  },
  Ellipsewhite1:{
    //paddingLeft: 20,
    //resizeMode: "contain",
    width:60,
    height:60,
    bottom:200,
    right:100,
  },
  call:{
    width:35,
    height:35,
    bottom:248,
    right:100,
  },
  textcall:{
    fontSize:15,
    color:"#fff",
    fontWeight:'bold',
    fontFamily:"Almarai-Regular",
    bottom:230,
    right:95,
  },

  Ellipsewhite2:{
    //paddingLeft: 20,
    //resizeMode: "contain",
    width:60,
    height:60,
    bottom:315,
    left:100,
  },
  smsstar:{
    width:35,
    height:35,
    bottom:363,
    left:100,
  },
  textsmsstar:{
    fontSize:15,
    color:"#fff",
    fontWeight:'bold',
    fontFamily:"Almarai-Regular",
    bottom:345,
    left:90,
  }
  
});

