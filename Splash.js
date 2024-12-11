import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Button,Image} from 'react-native';
import image from "./assets/project.png";
import { LinearGradient } from 'expo-linear-gradient';



export default function App() {
  return (
    <View style={styles.container}>
      <LinearGradient
      // Colors for the gradient
      colors={['#1CD3DA', '#0F7074']}
      // Gradient direction (top-left to bottom-right by default)
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      
      <Image source={image} style={{width:300,height:300}}></Image>
      {/* <Text style={styles.colorlitter}>{"G"}</Text> */}
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
        </LinearGradient>

    </View>
    
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
    justifyContent:"center"
    
  },

  text:{
    fontSize:39,
    marginBottom:8,
    marginHorizontal:88,
    fontFamily:"Almarai-Regular",
    fontWeight: 'bold',
    color: '#FFF',
  },
  text2:{
    fontSize:35,
    marginHorizontal:118,
    ontFamily:"Almarai-Regular",
    fontWeight: 'bold',
    color: '#FFF',
    
  },
  colorlitter:{
    
    color:"#1E4D6E",
  },

});
