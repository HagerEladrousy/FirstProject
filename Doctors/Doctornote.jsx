import { StyleSheet, ScrollView, TextInput, View,Image,TouchableOpacity ,Text} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import logo from "../assets/project.png"
import notification from "../assets/notification2.png"
import home from "../assets/home.png";
import note from "../assets/NoteDoctor.png"
import add from "../assets/addpatientsoutline.png"
import Menue from "../assets/menuoutline.png";


export default function Home({ navigation }) {
  return (
    <LinearGradient
      colors={['#1CD3DA', '#0F7074']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <ScrollView 
      contentContainerStyle={styles.scrollContainer}
      nestedScrollEnabled={true}  // Important for Android
      //showsVerticalScrollIndicator={false} // Hide scroll bar
      >
    <Image source={logo} style={styles.logo}></Image>
    <Image source={notification} style={styles.notification}></Image>
    <TextInput style={styles.serch} placeholder="To:" multiline={true}></TextInput>
    <TextInput style={styles.Notetopatient} placeholder="Note to Patient:" multiline={true} textAlignVertical="top"></TextInput>

    <View>
    <View style={styles.bar}></View>
    
            
           <TouchableOpacity onPress={() => navigation.navigate('Doctorhome')}>
            <Image source={home} style={[styles.optionofbar,{right:300}]}></Image>
            </TouchableOpacity>
    
            <TouchableOpacity>
            <Image source={note} style={[styles.optionofbar,{right:205}]}></Image>
            </TouchableOpacity>
    
            <TouchableOpacity onPress={() => navigation.navigate('AddPatient')}>
            <Image source={add} style={[styles.optionofbar,{right:110}]}></Image>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Account')}>
            <Image source={Menue} style={[styles.optionofbar,{right:30}]}></Image>
            </TouchableOpacity>
    
            </View>
    
    </ScrollView>
    </LinearGradient>
  );
}
  const styles = StyleSheet.create({
    gradient: {
      flex: 1,
     
    },
    scrollContainer: {
      flexGrow: 1,
      paddingVertical: 50,
    },
    logo:{
      width:90,
      height:90,
      left:270,
      bottom:25
    },
    notification:{
      width:30,
      height:30,
      left:20,
      bottom:95,
    },
    serch:{
      width:320,
      height:45,
      position:"absolute",
      backgroundColor:"#B0FFF3",
      opacity:0.6,
      borderRadius:30,
      top:130,
      left:"5%",
    },
    Notetopatient:{
      width:320,
      height:320,
      position:"absolute",
      backgroundColor:"#B0FFF3",
      opacity:0.6,
      borderRadius:30,
      top:200,
      left:"5%",
    },

    bar:{
      flexDirection:"row",
      justifyContent:"flex-end",
      position:"absolute",
      backgroundColor:"#B0FFF3",
      width:360,
      height:100,
      top:380,
      borderRadius:40,
      //opacity:0.9,
    },
    optionofbar:{
      position:"absolute",
      width:27,
      height:27,
      top:390,
    },
  
})
