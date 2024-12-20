import React from 'react';
 

import { StyleSheet, View, Text,Image, Button ,TouchableOpacity} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

export default function App({ navigation }) {
  const handlePress = () => {
    alert('Button pressed!');
  };
  
 
 
 
  
  return (
    <LinearGradient
      colors={['#1CD3DA', '#0F7074']} 
      style={styles.container}
    >
  
   
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <TouchableOpacity style={styles.Button} onPress={handlePress}>
    <Text style={styles.buttonText}> more </Text>
      </TouchableOpacity>

   

     </View>
 
      <View style={styles.content}>
      <Image source={require('../assets/project.png')} style={styles.logo} />
      <Image source={require('../assets/Component 1.png')}style={styles.img}/>
      <Image source={require('../assets/profile-circle.png')}style={styles.icon}/>
      <Text style={{fontWeight: 'bold', position: 'absolute', top: 290,right:125}}>This Week</Text>
       
        </View>
        <View style={styles.container}>
      <View style={styles.rectangle}>
        <TouchableOpacity onPress={() => navigation.navigate('Fastingbloodsugar')}>
        <Text style={{fontWeight:'bold',left:20,top:100}}>Fasting sugar</Text>
        {/* <View style={styles.line} /> */}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Cumulativebloodsugar')}>
        <Text style={{fontWeight:'bold',left:170,top:80}}>Cumulative sugar</Text>
        {/* <View style={styles.line} /> */}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('SearchFormeal')}>
        <Text style={{fontWeight:'bold',left:90,top:100}}>Search for meal</Text>
        {/* <View style={styles.line} /> */}
        </TouchableOpacity>
      
        
      </View>
    </View>
   
    </LinearGradient>
  );
};


const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    //padding:100,
    //paddingBottom:50
    paddingTop:200,
  },

  logo: {
    width: 150,
    height: 110,
    marginBottom:710,
    marginTop:5,
    alignItems: 'center',
    //bottom:600,
    top:120,
    left:10,
    width:100,
    height:100
     
  },
  rectangle: {
    width: 300,    
    height: 250,  
    backgroundColor: '#B0FFF3',
    opacity:0.8,
    marginBottom:1125,
    borderRadius: 20,
    
     
  },
  img: {
   width:30,
   height:30, 
    position: 'absolute',  
    top: 140,   
    left: 190,

  },
  icon: {
    width:38, 
    height: 38,
    position: 'absolute', 
    top:130,
    right: 190,
  },
  Button: {
    width:40,
    height:15,
    backgroundColor: '#B0FFF3',        
    borderRadius: 7,  
     top: 300,               
    left: 120,              
  },
  buttonText: {
    color: '#000000',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingLeft: 0,  
    paddingTop: 0,
  right:1,  },
  line: {
    width: '33%',            
    height: 1,               
    backgroundColor: '#000',
    marginVertical: 13,
    left:15, 
    opacity:0.5, 
  },
  
 
});