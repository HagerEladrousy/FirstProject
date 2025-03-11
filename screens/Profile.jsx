import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import user from "../assets/user-avatar 1.png"
import notification from "../assets/notification2.png"
import profile from "../assets/profile-circle.png";
import call from "../assets/call.png";
import email2 from "../assets/email2.png";
import calender from "../assets/calendar.png";
import health from "../assets/health.png";
import weight from "../assets/weight.png";
import blood from "../assets/blood.png"


export default ({navigation }) => {
  return (
    <SafeAreaView style={styles.container}>

    <LinearGradient
    // Colors for the gradient
    colors={['#1CD3DA', '#0F7074']}
    // Gradient direction (top-left to bottom-right by default)
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={styles.gradient}
   >
      <ScrollView style={styles.scrollView}>

        <View style={styles.header}>
          <Image source={require('../assets/project.png')} style={styles.logo}/>
          <Image source={notification} style={styles.notification}/>
        </View>

        <View style={styles.row}>
          <Image source={user} style={styles.image}/>
          <Text style={styles.text2}>Profile</Text>
        </View>


        <View style={styles.column}>
        <Image source={profile} style={{width:30,height:30,top:10,position:"absolute",left:20}}/>
        <Text style={{left:60,top:15,fontWeight:"bold",fontSize:17}} >Hager Ahmed</Text>

        <Image source={call} style={{width:30,height:30,top:70,position:"absolute",left:20}}/>
        <Text style={{left:60,top:50,fontWeight:"bold",fontSize:17}} >Phone number:01211111119</Text>

        <Image source={email2} style={{width:20,height:20,top:130,position:"absolute",left:20}}/>
        <Text style={{left:60,top:83,fontWeight:"bold",fontSize:17}} >Email:hager2001@gmail.com</Text>

        <Image source={calender} style={{width:25,height:25,top:190,position:"absolute",left:20}}/>
        <Text style={{left:60,top:120,fontWeight:"bold",fontSize:17}} >Age:23</Text>

        <Image source={health} style={{width:25,height:25,top:250,position:"absolute",left:20}}/>
        <Text style={{left:60,top:158,fontWeight:"bold",fontSize:17}} >Type of diabetes:1</Text>

        <Image source={weight} style={{width:25,height:25,top:310,position:"absolute",left:20,tintColor:"black"}}/>
        <Text style={{left:60,top:195,fontWeight:"bold",fontSize:17}} >Weight:68</Text>


        <Image source={blood} style={{width:40,height:40,top:370,position:"absolute",left:20,tintColor:"black"}}/>
        <Text style={{left:60,top:235,fontWeight:"bold",fontSize:17}} >Fasting sugar:99</Text>


        <Image source={blood} style={{width:40,height:40,top:430,position:"absolute",left:20,tintColor:"black"}}/>
        <Text style={{left:60,top:270,fontWeight:"bold",fontSize:17}} >Cumulative sugar:100</Text>


        <TouchableOpacity  onPress={() => navigation.navigate('Medicines')}>
        <View style={styles.textField}>
        <Text style={{fontWeight:"bold",left:25,fontSize:15,color:"white",top:5}}>medicines</Text>
        </View>
        </TouchableOpacity>


        <TouchableOpacity>
        <View style={styles.textField2}>
        <Text style={{fontWeight:"bold",left:25,fontSize:15,color:"white",top:5}}>meals</Text>
        </View>
        </TouchableOpacity>
        </View>
      </ScrollView>
      </LinearGradient>
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
   // backgroundColor: "#1DD4DA",
   
  },
  scrollView: {
    flex: 1,
    paddingTop: 25,
  },
  column: {
    backgroundColor: "#B0FFF3",
    borderRadius: 40,
    //paddingTop: 25,
    //paddingBottom: 74,
    //paddingHorizontal: 20,
    bottom:100,
    height:600,
    width:345,
    right:-8

  },  
  textField: {
    height: 40,
    backgroundColor: "#286E77",
    borderRadius: 90,
    //paddingHorizontal: 15,
    shadowColor: "#00000040",
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
    bottom:-350,
    width:120,
    left:10
  },

  textField2: {
    height: 40,
    backgroundColor: "#286E77",
    borderRadius: 90,
    //paddingHorizontal: 15,
    shadowColor: "#00000040",
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
    bottom:-310,
    width:120,
    left:210
  },
  
  
  
    header: {
        flexDirection: "colomn",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 20,
        marginHorizontal: 20,
        marginBottom: 30,
        marginLeft:170
      },
      
      
      row: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 20,
        marginBottom: 20,
      },
      text2: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#FFFFFF",
        bottom:90
      },
      image: {
        width: 30,
        height: 30,
        bottom:90
      },
      logo:{
        width:100,
        height:100,
        bottom:20,
        left:60
      },

      notification:{
        width:30,
        height:30,
        bottom:100,
        right:230
      },
});