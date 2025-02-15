import { StyleSheet,View,Image,TouchableOpacity,Text} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import logo from "../assets/project.png"
import notification from "../assets/notification2.png"
import home from "../assets/homeinline.png";
import Menue from "../assets/menuoutline.png";
import Note from "../assets/note.png";
import Pill from "../assets/pill.png";
import add from "../assets/add-square.png";


export default function Home({ navigation }){
  return(
<LinearGradient
      // Colors for the gradient
      colors={['#1CD3DA', '#0F7074']}
      // Gradient direction (top-left to bottom-right by default)
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
    
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
    <View style={styles.box}></View>
    <Text style={{left:45, position:"absolute",top:130,fontWeight:"bold",fontSize:16}}>Glucose reads</Text>
    <Text style={{fontSize:90, position:"absolute",top:150}}>150</Text>
    <TouchableOpacity>
    <Image source={add} style={{width:20,height:20,position:"absolute",top:-150,right:-100}}></Image>
    </TouchableOpacity>
    <View style={styles.smallbox1}></View>
    <Text style={{position:"absolute",top:380,right:246,fontWeight:"bold",fontSize:13}}>Fasting sugar</Text>
    <TouchableOpacity  onPress={() => navigation.navigate('Fastingbloodsugar')}>
    <Image source={add} style={{width:20,height:20,position:"absolute",top:62,right:15}}></Image>
    </TouchableOpacity>
    <Text style={{position:"absolute",top:450,right:225,fontWeight:"bold",fontSize:13}}>Cumulative sugar</Text>
    <TouchableOpacity  onPress={() => navigation.navigate('Cumulativebloodsugar')}>
    <Image source={add} style={{width:20,height:20,position:"absolute",top:132,right:15}}></Image>
    </TouchableOpacity>
    <View style={styles.smallbox2}></View>
    <Text style={{position:"absolute",top:380,left:195,fontWeight:"bold",fontSize:13}}>Medicines</Text>
    <TouchableOpacity >
    <Image source={add} style={{width:20,height:20,position:"absolute",top:134,left:125}}></Image>
    </TouchableOpacity>
    <Text style={{position:"absolute",top:450,left:195,fontWeight:"bold",fontSize:13}}>Meals</Text>
    <TouchableOpacity onPress={() => navigation.navigate('Medicines')}>
    <Image source={add} style={{width:20,height:20,position:"absolute",top:64,left:125}}></Image>
    </TouchableOpacity>

    
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
  box:{
    width:305,
    height:210,
    position:"absolute",
    backgroundColor:"#B0FFF3",
    opacity:0.6,
    borderRadius:30,
    top:120
  },
  smallbox1:{
    width:150,
    height:155,
    position:"absolute",
    backgroundColor:"#B0FFF3",
    opacity:0.6,
    borderRadius:30,
    top:355,
    left:25,
  },
  smallbox2:{
    width:150,
    height:155,
    position:"absolute",
    backgroundColor:"#B0FFF3",
    opacity:0.6,
    borderRadius:30,
    top:355,
    right:25,
  },
  
});