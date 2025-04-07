import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import logo from "../assets/project.png";
import notification2 from "../assets/notification2.png";

export default function App({ navigation }) {
  return (
    <LinearGradient
    colors={['#117001', '#22FF29']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <View style={styles.container}>
       
        <Image source={logo} style={styles.logo} />

        
        <TouchableOpacity style={styles.notificationContainer} >
          <Image source={notification2} style={styles.profilecircle} />
        </TouchableOpacity>

        
        <Text style={styles.text}>Normal suger</Text>

        
        <View style={styles.rectangle}>
          <Text style={styles.text2}>Emergency TIPS</Text>
          <Text style={styles.text3}>
          🎉 Great job! Keep up your healthy routine
          🥗 Stay balanced with good food & movement
      📊 Check regularly to stay on track
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: wp(5),
  },
  text: {
    fontSize: wp(10),
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: hp(4),
  },
  logo: {
    width: wp(20),
    height: wp(20),
    position: 'absolute',
    top: hp(4), 
    right: wp(2), 
  },
  notificationContainer: {
    position: 'absolute',
    top: hp(6),
    left: wp(5),
    width: wp(10),
    height: wp(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilecircle: {
    width: '100%',
    height: '100%',
    borderRadius: wp(7), 
  },
  rectangle: {
    width: wp(85),
    padding: wp(5),
    backgroundColor: '#B0FFF3',
    //opacity: 0.6,
    borderRadius: wp(5),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(10),
  },
  text2: {
    fontSize: wp(7),
    fontWeight: 'bold',
    color: '#000',
    marginBottom: hp(2),
  },
  text3: {
    fontSize: wp(4),
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
