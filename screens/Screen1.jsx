import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import image from "../assets/Layer1.png";
import image2 from "../assets/Ellipse 1.png";
import image3 from "../assets/Sign_up_circle.png";
import Sign_in_circle from "../assets/Sign_in_circle.png";
import language from "../assets/language.png";
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useState } from 'react';

export default function Screen1({ navigation }) {
  const [role, setRole] = useState('User');

  return (
    <LinearGradient
      colors={['#1CD3DA', '#0F7074']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <View style={styles.container}>
        
        <Image source={image2} style={styles.circleImage} />
        <Image source={image} style={styles.dnaImage} />

        <TouchableOpacity style={styles.Button} onPress={() => navigation.navigate('Signin')}>
          <Text style={styles.buttonText}>Sign In</Text>
          <Image source={Sign_in_circle} style={styles.image}></Image>
        </TouchableOpacity>
    
        <TouchableOpacity style={styles.Button2} onPress={() => navigation.navigate('Signup')}>
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

        <View style={styles.toggleContainer}>
          {/* Doctor Toggle */}
          <TouchableOpacity
            style={[
              styles.toggleButton,
              role === 'Doctor' && styles.toggleActive,
              { borderTopLeftRadius: wp('7%'), borderBottomLeftRadius: wp('7%') }
            ]}
            onPress={() => {
              setRole('Doctor');
              navigation.navigate('Screen2'); 
            }}
          >
            <Text style={[styles.toggleText, role === 'Doctor' && styles.toggleTextActive]}>
              Doctor
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.toggleButton,
              role === 'User' && styles.toggleActive,
              { borderTopRightRadius: wp('7%'), borderBottomRightRadius: wp('7%') }
            ]}
            onPress={() => {
              setRole('User');
              navigation.navigate('Screen1'); 
            }}
          >
            <Text style={[styles.toggleText, role === 'User' && styles.toggleTextActive]}>
              User
            </Text>
          </TouchableOpacity>
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
    alignItems: "center",
    justifyContent: "center",
    padding: wp('5%'),
  },
  text: {
    position: 'absolute',
    top: hp('5%'),
    left: wp('9%'),
    fontSize: wp('9%'),
    fontFamily: "Almarai-Regular",
    fontWeight: 'bold',
    color: '#FFF',
  },
  text2: {
    position: 'absolute',
    top: hp('10%'),
    left: wp('22%'),
    fontSize: wp('8%'),
    fontFamily: "Almarai-Regular",
    fontWeight: 'bold',
    color: '#FFF',
  },
  colorlitter: {
    color: "#1E4D6E",
  },
  circleImage: {
    width: wp('50%'),
    height: wp('50%'),
    position: 'absolute',
    top: hp('26%'), 
  },
  dnaImage: {
    width: wp('90%'),
    height: wp('90%'),
    position: 'absolute',
    top: hp('18%'), 
  },
  Button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('5%'),
    borderRadius: wp('7%'),
    elevation: 5,
    position: 'absolute',
    bottom: hp('15%'), 
    left: wp('9%'),
  },
  Button2: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('6%'),
    borderRadius: wp('7%'),
    elevation: 5,
    position: 'absolute',
    bottom: hp('15%'),
    right: wp('8%'),
  },
  Button3: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('6%'),
    borderRadius: wp('7%'),
    elevation: 5,
    position: 'absolute',
    bottom: hp('5%'),
  },
  image: {
    width: wp('5%'),
    height: wp('5%'),
    marginLeft: wp('1%'),
  },
  buttonText: {
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
    color: '#000',
  },
  toggleContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: hp('20%'),
    left: wp('5%'),
    backgroundColor: '#fff',
    borderRadius: wp('7%'),
    overflow: 'hidden',
    elevation: 5,
  },
  toggleButton: {
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('6%'),
    backgroundColor: '#fff',
  },
  toggleActive: {
    backgroundColor: '#1CD3DA',
  },
  toggleText: {
    fontSize: wp('4.5%'),
    color: '#000',
    fontWeight: 'bold',
  },
  toggleTextActive: {
    color: '#fff',
  },
});
