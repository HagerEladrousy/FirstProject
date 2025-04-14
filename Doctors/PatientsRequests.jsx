import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import 'react-native-url-polyfill/auto';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function PatientRequestsScreen() {
  return (
    <LinearGradient
      colors={['#00C9C8', '#74D3D3']}
      style={styles.container}
    >
      {/* Top Icons */}
      <View style={styles.headerIcons}>
        <Ionicons name="notifications-outline" size={wp('6%')} color="black" />
        <Image source={require('../assets/project.png')} style={styles.logo} />
      </View>

      {/* Card */}
      <View style={styles.card}>
        <Text style={styles.title}>Patients Requests</Text>

        {/* Request 1 */}
        <View style={styles.requestBox}>
          <View style={styles.requestHeader}>
            <Text style={styles.username}>Username</Text>
            <Ionicons name="person" size={wp('5%')} color="black" />
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.buttonText}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.buttonText}>Decline</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Request 2 */}
        <View style={styles.requestBox}>
          <View style={styles.requestHeader}>
            <Text style={styles.username}>Username</Text>
            <Ionicons name="person" size={wp('5%')} color="black" />
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.buttonText}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.buttonText}>Decline</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp('6%'),
    paddingHorizontal: wp('5%'),
  },
  headerIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('2%'),
  },
  logo: {
    width: wp('10%'),
    height: wp('10%'),
    resizeMode: 'contain',
  },
  card: {
    backgroundColor: '#A8F3F2',
    borderRadius: wp('5%'),
    padding: wp('5%'),
    height: hp('75%'),
    width: '100%',
  },
  title: {
    fontSize: wp('5.5%'),
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: hp('3%'),
  },
  requestBox: {
    backgroundColor: '#C5F7F7',
    borderRadius: wp('4%'),
    padding: wp('4%'),
    marginBottom: hp('2.5%'),
  },
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('1.5%'),
  },
  username: {
    fontWeight: 'bold',
    fontSize: wp('4.5%'),
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    backgroundColor: 'white',
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('6%'),
    borderRadius: wp('3%'),
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: wp('3.5%'),},
  });