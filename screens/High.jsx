import React from 'react';
import { View, Text, StyleSheet ,Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import logo from "../assets/project.png";
import profilecircle from "../assets/profile-circle.png";


export default function App({ navigation }) {
  return (
    <LinearGradient
      // Colors for the gradient
      colors={['#090C6A', '#3E38ED']}
      // Gradient direction (top-left to bottom-right by default)
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <Image source={logo} style={styles.logo}></Image>
        <Image source={profilecircle} style={styles.profilecircle}></Image>
        <View style={styles.rectangle}></View>
        <Text style={styles.text2}>Emergency TIPS</Text>



      <Text style={styles.text}>High Suger</Text>
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
    justifyContent:"center"
    
  },

  text:{
    fontSize:40,
    fontWeight: 'bold', 
    bottom:200,
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
    top:150,
  },
  text2:{
    fontSize:25,
    color:"#fff",
    fontWeight:'bold',
    top:35,
    fontFamily:"Almarai-Regular",
    
  }
 

 
});

