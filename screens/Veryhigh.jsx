import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, Alert, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import logo from "../assets/project.png";
import profilecircle from "../assets/notification2.png";
import Ellipsewhite from "../assets/Ellipsewhite.png";
import callIcon from "../assets/call.png";
import smsstar from "../assets/sms-star.png";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as SMS from 'expo-sms';
import call from 'react-native-phone-call';

export default function App({ navigation }) {

  const handleCall = () => {
    const args = {
      number: '123', // رقم الطوارئ
      prompt: true,
    };
    call(args).catch(console.error);
  };

  const handleSMS = async () => {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      SMS.sendSMSAsync(
        ['123'], // رقم الطوارئ
        'This is an emergency! Please help immediately.'
      );
    } else {
      Alert.alert('SMS is not available on this device');
    }
  };

  return (
    <LinearGradient
      colors={['#7D0505', '#E03939']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <View style={styles.container}>
        
        <Image source={logo} style={styles.logo} />
        
        <TouchableOpacity>
          <Image source={profilecircle} style={styles.profilecircle} />
        </TouchableOpacity>

        <Text style={styles.text}>Very High Sugar</Text>

        
        <View style={styles.emergencyRow}>
         
          <View style={styles.emergencyOption}>
            <Image source={Ellipsewhite} style={styles.ellipse} />
            <Pressable onPress={handleCall} style={styles.iconWrapper}>
              <Image source={callIcon} style={styles.icon} />
            </Pressable>
            <Text style={styles.optionText}>Call</Text>
          </View>

          
          <View style={styles.emergencyOption}>
            <Image source={Ellipsewhite} style={styles.ellipse} />
            <Pressable onPress={handleSMS} style={styles.iconWrapper}>
              <Image source={smsstar} style={styles.icon} />
            </Pressable>
            <Text style={styles.optionText}>SMS</Text>
          </View>
        </View>

        <View style={styles.rectangle}>
          <Text style={styles.tipTitle}>Emergency TIPS</Text>
          <Text style={styles.tipText}>
            Drink plenty of water, monitor your blood sugar closely, and if you feel dizzy, 
            very tired, or have rapid breathing — go to the ER immediately.
          </Text>
        </View>

      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: hp('5%'),
  },
  logo: {
    width: wp('20%'),
    height: wp('20%'),
    marginBottom: hp('2%'),
    alignSelf: 'flex-end',
    marginRight: wp('2%'),
  },
  profilecircle: {
    width: wp('10%'),
    height: wp('10%'),
    position: 'absolute',
    bottom: hp('6%'), 
    right: wp('35%'),
  },
  rectangle: {
    width: wp('85%'),
    backgroundColor: '#B0FFF3',
    //opacity: 0.8,
    borderRadius: 20,
    padding: wp('4%'),
    marginTop: hp('10%'),
  },
  tipTitle: {
    fontSize: wp('5.5%'),
    fontWeight: 'bold',
    color: '#7D0505',
    textAlign: 'center',
    marginBottom: hp('1%'),
    fontFamily: "Almarai-Regular",
  },
  tipText: {
    fontSize: wp('4%'),
    textAlign: 'center',
    color: '#333',
    fontFamily: "Almarai-Regular",
  },
  text: {
    fontSize: wp('10%'),
    color: '#FFF',
    fontWeight: 'bold',
    marginTop: hp('5%'),
    fontFamily: "Almarai-Regular",
  },
  emergencyOption: {
    alignItems: 'center',
    marginTop: hp('2%'),
  },
  ellipse: {
    width: wp('15%'),
    height: wp('15%'),
  },
  iconWrapper: {
    position: 'absolute',
    top: hp('2%'),
  },
  icon: {
    width: wp('8%'),
    height: wp('8%'),
  },
  optionText: {
    fontSize: wp('4%'),
    color: '#fff',
    fontWeight: 'bold',
    marginTop: hp('1%'),
    fontFamily: "Almarai-Regular",
  },
  emergencyRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: wp('100%'),
    marginTop: hp('4%'),
  },
});
