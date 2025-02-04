import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet,Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
const handlePress = () => {
  alert('Button pressed!');
};





return (
  <LinearGradient
    colors={['#1CD3DA', '#0F7074']} 
    style={styles.container} >
      <Image source={require('../assets/project.png')} style={{bottom:705,padding:50,left:235,position:'absolute'}}/>
       <TouchableOpacity  onPress={handlePress}>
       <Image source={require('../assets/notification.png')} style={{top:55,right:145,padding:4,position:'absolute'}}/> </TouchableOpacity>
      
      
      
      
      <View style={styles.container}> 
    <View style={styles.rectangle}/>
    <Text style={{bottom:680,right:105,fontSize:20,fontWeight:'bold'}}>Your medicines</Text>
    <View style={styles.hr}></View>
    <TouchableOpacity style={styles.addButton} onPress={handlePress}>
       <Image source={require('../assets/add-square.png') } style={{width:23,height:25}} /> </TouchableOpacity>
       <View style={styles.example}></View>
       <Text style={{color:'black',position:'absolute',top:280,fontWeight:'bold',left:20}}>Micronase      From: 24/10      TO: 24/11</Text>
       <TouchableOpacity style={styles.addButton} onPress={handlePress}>
       <Image source={require('../assets/notification.png') } style={{width:23,height:25,top:67,padding:2,right:55}} /> </TouchableOpacity>
       {/* <TouchableOpacity style={styles.addButton} onPress={handlePress}>
       <Image source={require('../assets/trash.png') } style={{width:23,height:25,top:66,padding:3.5,right:25}} />
        </TouchableOpacity> */}
       <TouchableOpacity style={styles.addButton} onPress={handlePress}>
       <Image source={require('../assets/arrow-square-down.png') } style={{width:23,height:25,top:66,padding:3.5,left:5}} /> </TouchableOpacity>
       </View>
       


      <View style={styles.rect}>
      <TouchableOpacity  onPress={handlePress}>
       <Image source={require('../assets/home.png')} style={{left:45,top:12,padding:3}}/> </TouchableOpacity>
       <TouchableOpacity  onPress={handlePress}>
       <Image source={require('../assets/note.png')} style={{left:145,bottom:28,padding:3}}/> </TouchableOpacity>
       <TouchableOpacity  onPress={handlePress}>
       <Image source={require('../assets/pill.png')} style={{left:245,bottom:62,padding:3}}/> </TouchableOpacity>
       <TouchableOpacity  onPress={handlePress}>
       <Image source={require('../assets/menu.png')} style={{left:330,bottom:100,padding:3}}/> </TouchableOpacity>
       </View>
      
    </LinearGradient>);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rectangle: {
    width: 397,    
    height: 670,  
    backgroundColor: '#B0FFF3',
    opacity:0.7,
   marginTop:350,
   bottom:30,
    borderRadius: 30,
    },
    hr: {
      borderBottomWidth: 1,
      borderBottomColor: '#000000', 
      marginVertical: 10,
      position:'absolute',
      width:155,
      top:225,
      left:19,
      opacity:0.5
      },
      addButton: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 5,
      borderRadius: 5,
      position:'absolute',
      top:204,
      right:15
      
      },
      rect:{
        width:415,
        height:115,
        backgroundColor:'#B0FFF3',
        top:40,
        borderRadius: 35,
      },
      example:{
        width:'93%',
        height:35,
        backgroundColor:'#29a2ab',
        opacity:0.5,
        position:'absolute',
        bottom:475,
        borderRadius: 35


      }
        



   
  });
