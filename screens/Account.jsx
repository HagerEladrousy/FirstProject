import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { ScrollView, View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

export default function AccountScreen({ navigation }) {
  
  const [user, setUser] = useState({
    image: null,
    name: 'account name',
  });

  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(user.name);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setUser(prevState => ({
        ...prevState,
        image: result.assets[0].uri,
      }));
    }
  };

  const saveName = () => {
    setUser(prevState => ({
      ...prevState,
      name: newName,
    }));
    setIsEditingName(false);
  };

  const handlePress = (screen) => {
    navigation.navigate(screen);
  };
  

  // Static image imports
  const iconImages = {
    moon: require('../assets/moon.png'),
    statusUp: require('../assets/status-up.png'),
    notification: require('../assets/notification.png'),
    documentNormal: require('../assets/document-normal.png'),
    key:require('../assets/Key.png'),
    messages: require('../assets/messages.png'),
    documentText: require('../assets/document-text.png'),
    shieldTick: require('../assets/shield-tick.png'),
    setting: require('../assets/setting-2.png'),
    sync: require('../assets/sync.png'),
    user: require('../assets/user.png'),
    home: require('../assets/home.png'),
    note: require('../assets/note.png'),
    pill: require('../assets/pill.png'),
    menu: require('../assets/menu.png'),
  };

  return (
    <LinearGradient colors={['#1CD3DA', '#0F7074']} style={styles.gradient}>
      <View style={styles.mainContainer}>
        {/* ScrollView for content */}
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.topSection}>
            <Image
              source={user.image ? { uri: user.image } : require('../assets/profile-circle.png')}
              style={styles.profileImage}
            />

            <View style={styles.buttonContainer}>
              <Button title="Change Profile Picture" onPress={pickImage} color="#1E4D6E" />
            </View>

            {isEditingName ? (
              <TextInput
                style={styles.textInput}
                value={newName}
                onChangeText={setNewName}
                onSubmitEditing={saveName}
                autoFocus
              />
            ) : (
              <TouchableOpacity onPress={() => setIsEditingName(true)}>
                <Text style={styles.userName}>{user.name}</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.rectangle}>
            {[
              { icon: 'user', label: 'My Profile',screen: 'Profile' },
              { icon: 'key', label: 'Change password',screen: 'Password' },
              { icon: 'moon', label: 'Sleep' ,screen: 'Password'},
              { icon: 'notification', label: 'Reminders',screen: 'Password' },
              { icon: 'messages', label: 'Chats',screen: 'Password' },
              { icon: 'documentText', label: 'Reports',screen: 'Password' },
              { icon: 'shieldTick', label: 'Privacy Center',screen: 'Password' },
              { icon: 'setting', label: 'Settings',screen: 'Password' },
              { icon: 'sync', label: 'Help Center',screen: 'Password' },
              
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
            { icon: 'home',screen: 'Home' },
            { icon: 'note',screen: 'Doctornote' },
            { icon: 'pill' ,screen: 'Medicines'},
            { icon: 'menu',screen: 'Account' }
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
  scrollContainer: {
    alignItems: 'center',
    paddingBottom: hp(20),
  },
  topSection: {
    alignItems: 'center',
    marginTop: hp(8),
  },
  profileImage: {
    width: wp(25),
    height: wp(25),
    borderRadius: wp(12.5),
    marginBottom: hp(1),
  },
  userName: {
    fontSize: wp(5),
    fontWeight: 'bold',
    color: '#000',
    marginTop: hp(2),
  },
  textInput: {
    fontSize: wp(4),
    borderBottomWidth: 1,
    borderBottomColor: '#007bff',
    width: wp(60),
    padding: hp(1),
    textAlign: 'center',
    marginVertical: hp(1),
  },
  buttonContainer: {
    marginTop: hp(1),
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
