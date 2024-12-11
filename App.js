import React from 'react';
 

import { StyleSheet, View, Text,Image, Button ,TouchableOpacity} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
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
      <Image source={require('./assets/project.png')} style={styles.logo} />
      <Image source={require('./assets/Component 1.png')}style={styles.img}/>
      <Image source={require('./assets/profile-circle.png')}style={styles.icon}/>
      <Text style={{fontWeight: 'bold', position: 'absolute', top: 130,right:157}}>This Week</Text>
       
        </View>
        <View style={styles.container}>
      <View style={styles.rectangle}>
        <Text style={{fontWeight:'bold',left:20,top:8}}>Glucose reads</Text>
        <View style={styles.line} />
      
        
      </View>
    </View>
   
    </LinearGradient>
  );
};
// ay change

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    width: 150,
    height: 110,
    marginBottom:710,
    marginTop:5,
    alignItems: 'center',
     
  },
  rectangle: {
    width: 360,    
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
    top: 20,   
    left: 220,

  },
  icon: {
    width:38, 
    height: 38,
    position: 'absolute', 
    top:16,
    right: 220,
  },
  Button: {
    width:40,
    height:15,
    backgroundColor: '#B0FFF3',        
    borderRadius: 7,  
     top: 157,               
    left: 139,              
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