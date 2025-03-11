import { StyleSheet,View,Image,TouchableOpacity,Text,ScrollView} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import logo from "../assets/project.png"
import notification from "../assets/notification2.png"
import home from "../assets/home.png";
import Menue from "../assets/menuoutline.png";
import Note from "../assets/note.png";
import Pill from "../assets/Subtract.png";
import add from "../assets/add-square.png";

export default function Medicines({ navigation }) {
  return (
    <LinearGradient
      // Colors for the gradient
      colors={['#1CD3DA', '#0F7074']}
      // Gradient direction (top-left to bottom-right by default)
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      {/* <ScrollView 
              contentContainerStyle={styles.scrollContainer}
              nestedScrollEnabled={true}  // Important for Android
              //showsVerticalScrollIndicator={false} // Hide scroll bar
            > */}
            <View style={styles.box}></View>
            <Text style={{bottom:450,right:200,fontSize:17,fontWeight:'bold',position:"absolute"}}>Your medicines</Text>
            <View style={styles.hr}></View>
            <TouchableOpacity>
                <Image source={add} style={{width:20,height:20,position:"absolute",top:-145,left:120}}></Image>
                </TouchableOpacity>
       <Image source={logo} style={styles.logo}></Image>
            <TouchableOpacity>
            <Image source={notification} style={styles.notification}></Image>
            </TouchableOpacity>
            <View style={styles.bar}></View>
      
          <TouchableOpacity>
            <Image source={home} style={[styles.optionofbar,{right:100}]}></Image>
          </TouchableOpacity>
          
          <TouchableOpacity >
            <Image source={Note} style={[styles.optionofbar,{right:20}]}></Image>
          </TouchableOpacity>
          
          <TouchableOpacity>
            <Image source={Pill} style={[styles.optionofbar,{left:30}]}></Image>
          </TouchableOpacity>
      
          <TouchableOpacity onPress={() => navigation.navigate('Account')}>
            <Image source={Menue} style={[styles.optionofbar,{left:100}]}></Image>
          </TouchableOpacity>
          
          
          {/* </ScrollView> */}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1, // Fill the entire screen
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  logo:{
    width:90,
    height:90,
    left:280,
    top:22,
    position:"absolute",
  },
  notification:{
    width:30,
    height:30,
    right:145,
    bottom:250
  },
  bar:{
    flexDirection:"row",
    justifyContent:"flex-end",
    position:"absolute",
    backgroundColor:"#B0FFF3",
    width:360,
    height:100,
    bottom:-50,
    borderRadius:40,
    opacity:0.9,
  },
  optionofbar:{
    position:"absolute",
    width:30,
    height:30,
    top:240,
  },
  // scrollContainer: {
  //   flexGrow: 1,
  //   //paddingVertical: 100,
  // },
  
  box:{
    width:320,
    height:910,
    position:"absolute",
    backgroundColor:"#B0FFF3",
    opacity:0.6,
    borderRadius:30,
    top:120
  
  },
  hr: {
    borderBottomWidth: 1,
    borderBottomColor: '#000000', 
    marginVertical: 10,
    position:'absolute',
    width:155,
    top:150,
    left:30,
    opacity:0.5
    },
});

