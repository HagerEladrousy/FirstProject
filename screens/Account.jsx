import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';


export default function AccountScreen({ navigation }) {

  const handlePress = (screen) => {
    navigation.navigate(screen);
  };

  // Static image imports
  const iconImages = {
    moon: require('../assets/moon.png'),
    statusUp: require('../assets/status-up.png'),
    notification: require('../assets/notification.png'),
    documentNormal: require('../assets/document-normal.png'),
    key: require('../assets/Key.png'),
    messages: require('../assets/messages.png'),
    documentText: require('../assets/document-text.png'),
    shieldTick: require('../assets/shield-tick.png'),
    setting: require('../assets/setting-2.png'),
    logout: require('../assets/logout.png'),
    sync: require('../assets/sync.png'),
    user: require('../assets/user.png'),
    home: require('../assets/home.png'),
    chatoutline: require('../assets/chatoutline.png'),
    pill: require('../assets/pill.png'),
    menu: require('../assets/menu.png'),
    addfriend:require('../assets/add-friend.png'),
    list: require('../assets/to-do-list.png')
  };

  return (
    <LinearGradient colors={['#1CD3DA', '#0F7074']} style={styles.gradient}>
      <View style={styles.mainContainer}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* مسافة علوية بسيطة */}
          <View style={{ marginTop: hp(8) }} />
          <Image source={require('../assets/notification2.png')} style={styles.notification} />
          <Image source={require('../assets/project.png')} style={styles.logo} />

          <View style={styles.rectangle}>
            {[
              { icon: 'user', label: 'My Profile', screen: 'Profile' },
              { icon: 'key', label: 'Change password', screen: 'Password' },
               { icon: 'moon', label: 'Sleep', screen: 'Password' },
               { icon: 'list', label: 'List Of Doctors', screen: 'ListOfDoctors' },
              { icon: 'notification', label: 'Reminders', screen: 'Password' },
              { icon: 'messages', label: 'Chats', screen: 'ChatListDoctors' },
              { icon: 'documentText', label: 'Reports', screen: 'Reports' },
              // { icon: 'shieldTick', label: 'Privacy Center', screen: 'Password' },
              { icon: 'setting', label: 'Settings', screen: 'EditProfile' },
              { icon: 'sync', label: 'Help Center', screen: 'HelpUs' },
              { icon: 'logout', label: 'Log out', screen: 'Screen1' },
            ].map((item, index) => (
              <TouchableOpacity key={index} style={styles.Button} onPress={() => handlePress(item.screen)}>
                <Text style={styles.buttonText}>
                  <Image source={iconImages[item.icon]} style={styles.icon} /> {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Bottom Navbar */}
        <View style={styles.navBar}>
          {[
            { icon: 'home', screen: 'Home' },
            { icon: 'chatoutline', screen: 'ChatListDoctors' },
            { icon: 'pill', screen: 'Medicines' },
            { icon: 'menu', screen: 'Account' }
          ].map((item, index) => (
            <TouchableOpacity key={index} onPress={() => handlePress(item.screen)}>
              <Image source={iconImages[item.icon]} style={styles.navIcon} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  logo: {
    width: wp(20),
    height: wp(20),
    left:wp(40),
    bottom:wp(12)
  },
  notification: {
    width: wp(8),
    height: wp(8),
    right:wp(40)
  },
  scrollContainer: {
    alignItems: 'center',
    paddingBottom: hp(20),
  },
  rectangle: {
    width: wp(90),
    backgroundColor: '#B0FFF3',
    opacity: 0.9,
    borderRadius: wp(5),
    marginTop: hp(4),
    paddingVertical: hp(2),
    alignItems: 'center',
  },
  Button: {
    width: wp(80),
    height: hp(6),
    backgroundColor: '#B0FFF3',
    borderRadius: wp(4),
    justifyContent: 'center',
    marginVertical: hp(1),
  },
  buttonText: {
    color: '#000',
    fontSize: wp(4),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  icon: {
    width: wp(5),
    height: wp(5),
    //marginTop:wp(1)
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#B0FFF3',
    width: '100%',
    paddingVertical: hp(2),
    borderTopLeftRadius: wp(8),
    borderTopRightRadius: wp(8),
    position: 'absolute',
    bottom: 0,
  },
  navIcon: {
    width: wp(7),
    height: wp(7),
    resizeMode: 'contain',
  },
});
