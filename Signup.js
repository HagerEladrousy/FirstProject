import { StyleSheet } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

export default function Signup()
{
  return(
    
    <LinearGradient
    // Colors for the gradient
    colors={['#1CD3DA', '#0F7074']}
    // Gradient direction (top-left to bottom-right by default)
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={styles.gradient}
  >
    
  </LinearGradient>
  );


}
const styles=StyleSheet.create({

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


});