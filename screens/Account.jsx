  // import React from 'react';
  import React, { useState } from 'react';
  import * as ImagePicker from 'expo-image-picker';

  import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Button } from 'react-native';


import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  const handlePress = () => {
    alert('Button pressed!');
  };
  
  
  
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      setUser(prevState => ({
        ...prevState,
        image: result.uri, 
      }));
    }
  };
  
 
  <Button style={{color:'#1E4D6E'}} title="Change Profile Picture" onPress={pickImage} />
  const [user, setUser] = useState({
    image: '../assets/profile-circle.png', 
    name: 'account name',
    
  });

  const [isEditingName, setIsEditingName] = useState(false);
 // const [isEditingBio, setIsEditingBio] = useState(false);
  const [newName, setNewName] = useState(user.name);
 

  
  const saveName = () => {
    setUser(prevState => ({
      ...prevState,
      name: newName,
    }));
    setIsEditingName(false); 
  };
 
  
  return (
    <LinearGradient
      colors={['#1CD3DA', '#0F7074']} 
      style={styles.container} >
        
  
      
       
       <View style={styles.buttonContainer}>
        <Button style={{color:'#1E4D6E'}} title="Change Profile Picture" onPress={pickImage}  />
      </View>
     
      <View style={styles.topSection}>
        <Image source={{ uri: user.image }} style={styles.profileImage} />
        <Image source={require('../assets/profile-circle.png')}style={styles.profileImage}/> 

        
        {isEditingName ? (
          <TextInput
            style={styles.textInput}
            value={newName}
            onChangeText={setNewName} // Update name while typing
            onSubmitEditing={saveName} // Save the name when the user presses "Enter"
            autoFocus 
          />
        ) : (
          <TouchableOpacity onPress={() => setIsEditingName(true)}>
            <Text style={styles.userName}>{user.name}</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.container}>
      <View style={styles.rectangle}/> 
      <View style={styles.rect}>
      <TouchableOpacity  onPress={handlePress}>
       <Image source={require('../assets/home.png')} style={{left:45,top:12,padding:3}}/> </TouchableOpacity>
       <TouchableOpacity  onPress={handlePress}>
       <Image source={require('../assets/note.png')} style={{left:145,bottom:28,padding:3}}/> </TouchableOpacity>
       <TouchableOpacity  onPress={handlePress}>
       <Image source={require('../assets/pill.png')} style={{left:245,bottom:67,padding:3}}/> </TouchableOpacity>
       <TouchableOpacity  onPress={handlePress}>
       <Image source={require('../assets/menu.png')} style={{left:330,bottom:107,padding:3}}/> </TouchableOpacity>
    
    
    
    
        
      </View>
     
    
       
     <TouchableOpacity style={styles.Button} onPress={handlePress}>
     
      <Text style={{backgroundColor:'#B0FFF3',top:50,width:330,height:29,borderRadius: 15, fontSize: 15,
      fontWeight: 'bold',textAlign: 'center', paddingRight:6 , paddingTop: 4,bottom:2,}}> <Image source={require('../assets/moon.png')} style={{width:18,height:17}}/>  Sleep </Text></TouchableOpacity>
      <TouchableOpacity style={styles.Button} onPress={handlePress}>
     
      <Text style={{backgroundColor:'#B0FFF3',top:100,width:330,height:29,borderRadius: 15, fontSize: 15,
      fontWeight: 'bold',textAlign: 'center', paddingRight:6 , paddingTop: 4,bottom:2,}}> <Image source={require('../assets/status-up.png')} style={{width:18,height:17}}/>  Progress</Text></TouchableOpacity>
      <TouchableOpacity style={styles.Button} onPress={handlePress}>
      
       <Text style={{backgroundColor:'#B0FFF3',top:150,width:330,height:29,borderRadius: 15, fontSize: 15,
      fontWeight: 'bold',textAlign: 'center', paddingRight:6 , paddingTop: 4,bottom:2,}}> <Image source={require('../assets/notification.png')} style={{width:18,height:17}}/>  Reminders</Text></TouchableOpacity>
     <TouchableOpacity style={styles.Button} onPress={handlePress}>
     
     <Text style={{backgroundColor:'#B0FFF3',top:200,width:330,height:29,borderRadius: 15, fontSize: 15,
      fontWeight: 'bold',textAlign: 'center', paddingRight:6 , paddingTop: 4,bottom:2,}}> <Image source={require('../assets/document-normal.png')} style={{width:18,height:17}}/>  Recipes</Text></TouchableOpacity>
      <TouchableOpacity style={styles.Button} onPress={handlePress}>
      
       <Text style={{backgroundColor:'#B0FFF3',top:250,width:330,height:29,borderRadius: 15, fontSize: 15,
      fontWeight: 'bold',textAlign: 'center', paddingRight:6 , paddingTop: 3,bottom:2,}}> <Image source={require('../assets/messages.png')} style={{width:18,height:17,paddingTop:4}}/>  Chats</Text></TouchableOpacity>
      <TouchableOpacity style={styles.Button} onPress={handlePress}>
    
      <Text style={{backgroundColor:'#B0FFF3',top:300,width:330,height:29,borderRadius: 15, fontSize: 15,
      fontWeight: 'bold',textAlign: 'center', paddingRight:6 , paddingTop: 3,bottom:2,}}> <Image source={require('../assets/document-text.png')} style={{width:18,height:17}}/>  Reports</Text></TouchableOpacity>
      <TouchableOpacity style={styles.Button} onPress={handlePress}>
    
       <Text style={{backgroundColor:'#B0FFF3',top:350,width:330,height:29,borderRadius: 15, fontSize: 15,
      fontWeight: 'bold',textAlign: 'center', paddingRight:6 , paddingTop: 3,bottom:2,}}> <Image source={require('../assets/shield-tick.png')} style={{width:18,height:17}}/>  Privacy Center</Text></TouchableOpacity>
      <TouchableOpacity style={styles.Button} onPress={handlePress}>

      <Text style={{backgroundColor:'#B0FFF3',top:400,width:330,height:29,borderRadius: 15, fontSize: 15,
      fontWeight: 'bold',textAlign: 'center', paddingRight:6 , paddingTop: 3,bottom:2,}}> <Image source={require('../assets/setting-2.png')} style={{width:18,height:17,paddingTop:3}}/>  Settings</Text></TouchableOpacity> 
       <TouchableOpacity style={styles.Button} onPress={handlePress}> 
       <Text style={{backgroundColor:'#B0FFF3',top:450,width:330,height:29,borderRadius: 15, fontSize: 15,
      fontWeight: 'bold',textAlign: 'center', paddingRight:6 , paddingTop: 3,bottom:2,}}> <Image source={require('../assets/sync.png')} style={{width:16,height:17,paddingTop:2}}/>  Help Center</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Button} onPress={handlePress}>
          <Text style={{top:5,width:330,height:29,borderRadius: 15, fontSize: 15,
      fontWeight: 'bold',textAlign: 'center', paddingRight:2 , paddingTop: 0,bottom:2,left:6}}> <Image source={require('../assets/user.png')} style={{width:18,height:17}}/> My profile</Text>
      
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
  },
  buttonContainer: {
    position: 'absolute',
    top: 170, 
    left: '51%',
    transform: [{ translateX: -100 }],
    zIndex: 1,
    
    
  },
    
    
    
  topSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100, 
  },
  profileImage: {
    width: 65,
    height: 65,
    borderRadius: 75,  
    bottom:0,
  top:5,
  marginTop:-20,
    right:35,
    position:'absolute',
    
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 750,
    top:50,
    right:2,
    
    
  },
  textInput: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#007bff',
    width: '80%',
    padding: 5,
    textAlign: 'center',
    marginVertical: 10,
  },

  rectangle: {
    width: 370,    
    height: 750,  
    backgroundColor: '#B0FFF3',
    opacity:0.6,
    marginBottom:600,
    borderRadius: 30,
    },
    Button: {
      width:330,
      height:29,
      backgroundColor: '#B0FFF3',        
      borderRadius: 15,  
       marginTop:3000,
      bottom:625,            
      left: 20, 
      position:'absolute',             
    },
    buttonText: {
      color: '#000000',
      fontSize: 15,
      fontWeight: 'bold',
      textAlign: 'center',
      paddingRight:6 ,  
      paddingTop: 5,
      bottom:2,
      
      },
      rect:{
        width:410,
        height:130,
        backgroundColor:'#B0FFF3',
        position:'absolute',
        borderRadius: 40,
        

      },
      buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#B0FFF3',
        width: '100%',
        height: 40,
        borderRadius: 15,
        paddingHorizontal: 10,
        justifyContent: 'center',
      },
    
   
 
});
