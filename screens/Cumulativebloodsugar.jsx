import React, { useState } from 'react';
//import React from 'react';
  //import React, { useState } from 'react';
  

  import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Button } from 'react-native';


import { LinearGradient } from 'expo-linear-gradient';

export default function App({navigation }) {
  const [bloodSugar, setBloodSugar] = useState('');
  const [suggestions, setSuggestions] = useState('');

  const handleSubmit = async () => {
    if (!bloodSugar) return alert('Please enter a blood sugar level.');
    
    const sugarLevel = Number(bloodSugar);

    if (sugarLevel < 70) {
      navigation.navigate('Verylow');
    } else if (sugarLevel >= 70 && sugarLevel < 90) {
      navigation.navigate('Low');
    } else if (sugarLevel >= 90 && sugarLevel <= 140) {
      navigation.navigate('Normal');
    } else if (sugarLevel > 140 && sugarLevel <= 180) {
      navigation.navigate('HighScreen');
    } else {
      navigation.navigate('Veryhigh');
    }
  };

  // const handlePress = () => {
  //   alert('Button pressed!');
  // };
  
 
  
  
  
  return (
    <LinearGradient
      colors={['#1CD3DA', '#0F7074']} 
      style={styles.container} >
        <Image source={require('../assets/project.png')} style={{bottom:465,padding:25,left:250,position:'absolute',width:120,height:120}}/>
        <Image source={require('../assets/blood.png')} style={{top:100,right:120}}/><Text style={{fontWeight:'bold',fontSize:19,top:45,right:20}}>Glucose reading</Text>

        <View style={styles.container}>
      <View style={styles.rectangle}/>
      
      <Text style={{position:'absolute',top:200,fontWeight:'bold',fontSize:19,textAlign:'center'}}>Enter Cumulative blood sugar</Text>
      
      {/* Input field */}
      <TextInput
       style={styles.input}
       placeholder="Enter number..."
       keyboardType="numeric"
       value={bloodSugar}
       onChangeText={setBloodSugar}
      />
        
     <TouchableOpacity style={styles.Button} onPress={handleSubmit} >
      <Text style={{fontWeight:'bold',textAlign:'center',top:15,fontSize:15,color:'white'}}>Submit</Text>
     
    </TouchableOpacity>
      </View>
      
      
      
      
      </LinearGradient>
   

   
   
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    //paddingTop:100
    padding:10
  },
  rectangle: {
    width: 370,    
    height: 650,  
    backgroundColor: '#B0FFF3',
    opacity:0.6,
   marginTop:300,
    borderRadius: 50,
    },
   
    input: {
      width: '90%',
      height: 55,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 30,
      textAlign:'center',
      fontSize:15,
    
      position:'absolute',
      backgroundColor:'#FFFFFF',
      bottom:200,
     
    },
    Button: {
      width:150,
      height:50,
      backgroundColor: '#286E77',        
      borderRadius: 25,  
       marginTop:3000,
      bottom:60,   
      left: 120, 
      position:'absolute',             
    },
 
   
 
});