import { StyleSheet, ScrollView, TextInput, View,Image,TouchableOpacity ,Text} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import logo from "../assets/project.png"
import notification from "../assets/notification2.png"
import home from "../assets/home.png";
import note from "../assets/notedoctoroutline.png"
import add from "../assets/addpatientsoutline.png"
import Menue from "../assets/menuoutline.png";
import password from "../assets/password.png"

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
       <TouchableOpacity>
        <Image source={notification} style={styles.notification}></Image>
        </TouchableOpacity>

        <Text style={{position:"absolute",top:120,left:80,fontWeight:"bold",fontSize:17}}>Change Password</Text>
        <Image source={password} style={{width:30,height:30,top:115,position:"absolute",left:40}}></Image>

       <View style={styles.box}></View>
       <Text style={{position:"absolute",top:170,left:50,fontWeight:"bold",fontSize:17}}>Old Password</Text>
       <TextInput style={[styles.serch,{top:205}]} multiline={true}></TextInput>


       <Text style={{position:"absolute",top:270,left:50,fontWeight:"bold",fontSize:17}}>New Password</Text>
       <TextInput style={[styles.serch,{top:305}]} multiline={true}></TextInput>

       <Text style={{position:"absolute",top:370,left:50,fontWeight:"bold",fontSize:17}}>Confirm Password</Text>
       <TextInput style={[styles.serch,{top:405}]} multiline={true} passwordRules={true} ></TextInput>

      <View>
       <TouchableOpacity style={[styles.Button2,{right: 60}]}>
        <Text style={styles.buttonText}>OK</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.Button2,{left: 60}]}>
        <Text style={[styles.buttonText,{left:25,top:5}]}>cancle</Text>
        </TouchableOpacity>

        </View>
        
             




      <View>
      <View style={styles.bar}></View>
        <TouchableOpacity>
        <Image source={home} style={[styles.optionofbar,{right:300}]}></Image>
        </TouchableOpacity>

        <TouchableOpacity>
        <Image source={note} style={[styles.optionofbar,{right:205}]}></Image>
        </TouchableOpacity>

        <TouchableOpacity>
        <Image source={add} style={[styles.optionofbar,{right:110}]}></Image>
        </TouchableOpacity>
        <TouchableOpacity>
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
  box:{
    width:320,
    height:1000,
    position:"absolute",
    backgroundColor:"#B0FFF3",
    opacity:0.6,
    borderRadius:30,
    top:150,
    left:"5%",
  },
  notification:{
    width:30,
    height:30,
    left:20,
    bottom:95,
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
  serch:{
    width:300,
    height:45,
    position:"absolute",
    backgroundColor:"white",
    opacity:0.5,
    borderRadius:30,
    left:"29",
  },

  boxuser:{
    width:300,
    height:45,
    position:"absolute",
    backgroundColor:"#B0FFF3",
    opacity:0.6,
    borderRadius:30,
    left:"29",
  },
  profile:{
    width:30,
    height:30,
    left:40,
    // bottom:345,
    position:"absolute"
  },
  Button2:{
    width:100,
    height:35,
    backgroundColor: '#286E77',  
    borderRadius: 26, 
    position: 'absolute', 
    top: 320,
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 16, 
    fontWeight: 'bold', 
    left:40,
    top:5  
},
  
});
