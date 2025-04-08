import { StyleSheet, ScrollView, TextInput, View, Image, TouchableOpacity, Text } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React, { useState } from 'react';

import logo from "../assets/project.png";
import notification from "../assets/notification2.png";
import home from "../assets/home.png";
import notedoctor from "../assets/NoteDoctor.png";
import Menue from "../assets/menuoutline.png";

export default function Doctornote({ navigation }) {
  const [to, setTo] = useState('');
  const [note, setNote] = useState('');

  const handleSave = () => {
    console.log('To:', to);
    console.log('Note:', note);
    // هنا تقدر تبعتهم للـ backend باستخدام fetch أو axios
  };

  return (
    <LinearGradient
      colors={['#1CD3DA', '#0F7074']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Image source={notification} style={styles.notification} />
            <Image source={logo} style={styles.logo} />
          </View>

          <TextInput
            style={styles.search}
            placeholder="To:"
            multiline={true}
            value={to}
            onChangeText={setTo}
          />

          <TextInput
            style={styles.noteToPatient}
            placeholder="Note to Patient:"
            multiline={true}
            textAlignVertical="top"
            value={note}
            onChangeText={setNote}
          />

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Bottom Navbar */}
        <View style={styles.navBar}>
          <TouchableOpacity onPress={() => navigation.navigate('Doctorhome')}>
            <Image source={home} style={styles.navIcon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={notedoctor} style={styles.navIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Account')}>
            <Image source={Menue} style={styles.navIcon} />
          </TouchableOpacity>
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
    justifyContent: 'space-between',
    paddingHorizontal: wp(5),  // استخدام المسافات الجانبية المتوافقة
  },
  scrollContainer: {
    alignItems: 'center',
    paddingVertical: hp(4), // تقليل المسافة العلوية
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(4), // زيادة المسافة بين الشعار والإشعار
  },
  logo: {
    width: wp(22), // تحسين حجم الشعار
    height: wp(22),
  },
  notification: {
    width: wp(9),
    height: wp(9),
    marginTop: hp(3),
  },
  search: {
    width: wp(90), // تحسين عرض مربع البحث
    height: hp(6),
    backgroundColor: "#B0FFF3",
    opacity: 0.6,
    borderRadius: wp(5),
    paddingHorizontal: wp(4),
    fontSize: wp(4),
    marginBottom: hp(2),
  },
  noteToPatient: {
    width: wp(90),
    height: hp(40), // تحديد المساحة بشكل مناسب للهوامش
    backgroundColor: "#B0FFF3",
    opacity: 0.6,
    borderRadius: wp(5),
    paddingHorizontal: wp(4),
    paddingTop: hp(2),
    fontSize: wp(4),
    marginBottom: hp(2),
  },
  saveButton: {
    backgroundColor: '#fff',
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(10),
    borderRadius: wp(5),
    marginTop: hp(2),
  },
  saveButtonText: {
    color: '#000',
    fontSize: wp(4),
    textAlign: 'center',
  },
  navBar: {
    position: 'absolute',
    bottom: 0,
    width: '111%',
    height: hp('10%'),
    backgroundColor: "#B0FFF3",
    borderTopLeftRadius: wp('8%'),
    borderTopRightRadius: wp('8%'),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navIcon: {
    width: wp(7),
    height: wp(7),
    resizeMode: 'contain',
  },
});

