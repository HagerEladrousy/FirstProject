import { StyleSheet,View,Image,Text,TouchableOpacity, Settings } from "react-native";
import Profile from "../assets/profile-circle.png";
import { LinearGradient } from 'expo-linear-gradient';
import Home from "../assets/home.png";
import Menue from "../assets/menu.png";
import Note from "../assets/note.png";
import Pill from "../assets/pill.png";

export default function Account({navigation}) {
  return(
    <LinearGradient
    // Colors for the gradient
    colors={['#1CD3DA', '#0F7074']}
    // Gradient direction (top-left to bottom-right by default)
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={styleSheet.gradient}
    >
    <View style={styleSheet.Container}>
    <Image source={Profile} style={styleSheet.profile} ></Image>
    <Text style={styleSheet.textaccount}>account name</Text>

    <TouchableOpacity>
    <Text style={styleSheet.textchange}>Edit Picture</Text>
    </TouchableOpacity>

    <View style={styleSheet.box}></View>


    
      <View style={[styleSheet.option,{top:140}]}>
        <TouchableOpacity>
          <Text style={{left:70,fontWeight:"bold"}}>Change password</Text>
        </TouchableOpacity>
      </View>

      <View style={[styleSheet.option,{top:190}]}>
        <TouchableOpacity>
          <Text style={{left:112,fontWeight:"bold"}}>Sleep</Text>
        </TouchableOpacity>
      </View>

      <View style={[styleSheet.option,{top:240}]}>
        <TouchableOpacity>
          <Text style={{left:112,fontWeight:"bold"}}>Reports</Text>
        </TouchableOpacity>
      </View>

      <View style={[styleSheet.option,{top:290}]}>
        <TouchableOpacity>
          <Text style={{left:105,fontWeight:"bold"}}>Settings</Text>
        </TouchableOpacity>
      </View>

      <View style={[styleSheet.option,{top:340}]}>
        <TouchableOpacity>
          <Text style={{left:100,fontWeight:"bold"}}>Help Center</Text>
        </TouchableOpacity>
      </View>

      <View style={[styleSheet.option,{top:390}]}>
        <TouchableOpacity>
          <Text style={{left:100,fontWeight:"bold"}}>Reminders</Text>
        </TouchableOpacity>
      </View>

      <View style={[styleSheet.option,{top:440}]}>
        <TouchableOpacity>
          <Text style={{left:100,fontWeight:"bold"}}>Privacy Center</Text>
        </TouchableOpacity>
      </View>
    

    <View style={styleSheet.bar}></View>

    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
      <Image source={Home} style={[styleSheet.optionofbar,{right:100}]}></Image>
    </TouchableOpacity>
    
    <TouchableOpacity>
      <Image source={Note} style={[styleSheet.optionofbar,{right:20}]}></Image>
    </TouchableOpacity>
    
    <TouchableOpacity>
      <Image source={Pill} style={[styleSheet.optionofbar,{left:30}]}></Image>
    </TouchableOpacity>

    <TouchableOpacity>
      <Image source={Menue} style={[styleSheet.optionofbar,{left:100}]}></Image>
    </TouchableOpacity>

    </View>
    </LinearGradient>
  );

}

const styleSheet = StyleSheet.create({
  gradient: {
    flex: 1, // Fill the entire screen
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
 
  
  Container:{
    flex: 1, // Fill the entire screen
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },

  profile:{
    bottom:255,
    width: 40,
    height: 40, 
  },

  box:{
    position:"absolute",
    backgroundColor:"#B0FFF3",
    width:300,
    height:490,
    bottom:1,
    borderRadius:40,
    opacity:0.2
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

  textaccount:{
    position:"absolute",
    bottom:520,
    fontWeight:"bold"
  },

  textchange:{
    position:"absolute",
    bottom:220,
    right:-35,
    color:"white",
  },
  optionofbar:{
    position:"absolute",
    width:30,
    height:30,
    top:240,
  },
  option:{
    position:"absolute",
    width:250,
    height:22,
    backgroundColor:"#B0FFF3",
    borderRadius:40,
  },
});

