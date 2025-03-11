import { StyleSheet, ScrollView, TextInput, View,Image,TouchableOpacity ,Text} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import logo from "../assets/project.png"
import notification from "../assets/notification2.png"
import home from "../assets/homeinline.png";
import notedoctor from "../assets/notedoctoroutline.png"
import add from "../assets/addpatientsoutline.png"
import Menue from "../assets/menuoutline.png";
import profile from "../assets/profile-circle.png";



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
       <TextInput style={styles.serch} placeholder="Search for patients" multiline={true}></TextInput>

       <View style={styles.box}></View>

       
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
       <View style={[styles.boxuser,{top:50}]}></View> 
       </TouchableOpacity>

       <TouchableOpacity>
       <View style={[styles.boxuser,{top:130}]}></View>
       </TouchableOpacity>

       <TouchableOpacity>
       <View style={[styles.boxuser,{top:210}]}></View>
       </TouchableOpacity>
       <Image source={profile} style={[styles.profile,{top:55}]}></Image>
       <Image source={profile} style={[styles.profile,{top:135}]}></Image>
       <Image source={profile} style={[styles.profile,{top:215}]}></Image>

       <TouchableOpacity>
        <Text style={{bottom:-83,position:"absolute",left:90,fontWeight:"bold",fontSize:17}}>User name</Text>
       </TouchableOpacity>

       <TouchableOpacity>
        <Text style={{bottom:-163,position:"absolute",left:90,fontWeight:"bold",fontSize:17}}>User name</Text>
       </TouchableOpacity>

       <TouchableOpacity>
        <Text style={{bottom:-243,position:"absolute",left:90,fontWeight:"bold",fontSize:17}}>User name</Text>
       </TouchableOpacity>
       </View>

      

       
      
      <View>
      <View style={styles.bar}></View>

        <TouchableOpacity>
        <Image source={home} style={[styles.optionofbar,{right:270}]}></Image>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Doctornote')}>
        <Image source={notedoctor} style={[styles.optionofbar,{right:150}]}></Image>
        </TouchableOpacity>

        {/* <TouchableOpacity onPress={() => navigation.navigate('Doctorsignup')}>
        <Image source={add} style={[styles.optionofbar,{right:110}]}></Image>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={() => navigation.navigate('Account')}>
        <Image source={Menue} style={[styles.optionofbar,{right:50}]}></Image>
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
    top:200,
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
    width:320,
    height:45,
    position:"absolute",
    backgroundColor:"#B0FFF3",
    opacity:0.6,
    borderRadius:30,
    top:130,
    left:"5%",
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
  
});
