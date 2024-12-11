import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,Image,TouchableOpacity} from 'react-native';
import image from "./assets/Layer1.png";
import image2 from "./assets/Ellipse 1.png";
import image3 from "./assets/Sign_up_circle.png";
import Sign_in_circle from "./assets/Sign_in_circle.png";
import language from "./assets/language.png";
import { LinearGradient } from 'expo-linear-gradient';




export default function App() {
  return (
    <LinearGradient
    // Colors for the gradient
    colors={['#1CD3DA', '#0F7074']}
    // Gradient direction (top-left to bottom-right by default)
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={styles.gradient}
  >
    <View style={styles.container}>
       
      <Image source={image2} style={{width:200,height:200}}></Image>
      <Image source={image} style={{width:350,height:350,position: 'absolute',top:'30%'}}></Image>
      


      <TouchableOpacity style={styles.Button}>
        <Text style={styles.buttonText}>Sign In</Text>
        <Image source={Sign_in_circle} style={styles.image}></Image>
      </TouchableOpacity>
    
      <TouchableOpacity style={styles.Button2}>
        <Text style={styles.buttonText}>Sign Up</Text>
        <Image source={image3} style={styles.image}></Image>
      </TouchableOpacity>
      

      <TouchableOpacity style={styles.Button3}>
        <Text style={styles.buttonText}>Language</Text>
        <Image source={language} style={styles.image}></Image>
      </TouchableOpacity>


      <Text style={styles.text}>
      <Text style={styles.colorlitter}>{"G"}</Text>
        {"luco"}
        <Text style={styles.colorlitter}>{"C"}</Text>
        {"are"}
        </Text>
      <Text style={styles.text2}>
      <Text style={styles.colorlitter}>{"M"}</Text>
        {"onitor"}
        </Text>
      
        
     </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1, // Fill the entire screen
        justifyContent: 'center', // Center content vertically
        alignItems: 'center', // Center content horizontally
      },
  container: {
    flex: 1,
    //backgroundColor: "#18B0B5",
    alignItems:"center",
    justifyContent:"center",
    padding: 80,
    
  },
  text:{
    position: 'absolute',
    top: 20, 
    right: 20, 
    fontSize:39,
    // marginBottom:8,
    // marginHorizontal:10,
    fontFamily:"Almarai-Regular",
    fontWeight: 'bold',
    color: '#FFF',
  },
  text2:{
    position: 'absolute',
    top: 60, // Distance from the top
    right:25, 
     fontSize:35,
    // marginHorizontal:118,
    ontFamily:"Almarai-Regular",
    fontWeight: 'bold',
    color: '#FFF',
    
  },
  colorlitter:{
    
    color:"#1E4D6E",
  },
  Button:{
    flexDirection: 'row', 
    alignItems: 'center',
    backgroundColor: '#FFFFFF', 
    paddingVertical: 10,  
    paddingHorizontal: 20, 
    borderRadius: 26, 
    elevation: 5,
    position: 'absolute', 
    bottom: 65, 
    left: 50,
  },
  buttonText: {
    color: '#000000',
    fontSize: 16, 
    fontWeight: 'bold', 
  },

  Button2:{
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', 
    paddingVertical: 10,  
    paddingHorizontal: 20, 
    borderRadius: 26, 
    elevation: 5,
    position: 'absolute', 
    bottom: 65,
    right: 60,
  },

  Button3:{
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', 
    paddingVertical: 10,  
    paddingHorizontal: 20, 
    borderRadius: 26, 
    elevation: 5,
    position: 'absolute', 
    bottom: 10,
    left: 110,
  },
  image: {
    width: 20, 
    height: 20, 
    marginLeft:5,
  },
  
  

});
