import { ip } from "./ip.js";
import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Image, 
  TouchableOpacity, 
  Text, 
  ScrollView, 
  ActivityIndicator,
  RefreshControl
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import logo from "../assets/project.png";
import notification from "../assets/notification2.png";
import home from "../assets/homeinline.png";
import Menue from "../assets/menuoutline.png";
import Note from "../assets/note.png";
import Pill from "../assets/pill.png";
import add from "../assets/add-square.png";

export default function Home({ navigation }) {
  const [latestReadings, setLatestReadings] = useState({
    fasting: '--', 
    cumulative: '--'  
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const id = await AsyncStorage.getItem('userId');
        if (id) {
          setUserId(id);  
          fetchLatestReadings(id);  
        }
      } catch (error) {
        console.error('Error fetching userId:', error);
      }
    };
    
    fetchUserId(); 
  }, []);

  const fetchLatestReadings = async (userId) => {
    try {
      setRefreshing(true);
      
      const fastingResponse = await fetch(
        `${ip}/user/latestFasting?userId=${userId}`
      );
      const fastingData = await fastingResponse.json();
      
      const cumulativeResponse = await fetch(
        `${ip}/user/latestCumulative?userId=${userId}`
      );
      const cumulativeData = await cumulativeResponse.json();

      setLatestReadings({
        fasting: fastingData.data?.value || '--',  
        cumulative: cumulativeData.data?.value || '--' 
      });
    } catch (error) {
      console.error('Error fetching readings:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const refreshData = () => {
    if (userId) {
      fetchLatestReadings(userId);  
    }
  };

  return (
    <LinearGradient
      colors={['#1CD3DA', '#0F7074']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <View style={styles.header}>
        <TouchableOpacity>
          <Image source={notification} style={styles.notification} />
        </TouchableOpacity>
        <Image source={logo} style={styles.logo} />
      </View>

      <ScrollView 
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refreshData}
            colors={['#FFFFFF']}
            tintColor={'#FFFFFF'}
          />
        }
      >
        {/* عرض قراءات السكر */}
        <View style={styles.mainBox}>
          <Text style={styles.sectionTitle}>Glucose reads</Text>
          
          {loading ? (
            <ActivityIndicator size="large" color="#0F7074" />
          ) : (
            <Text style={styles.glucoseValue}>
              {latestReadings.cumulative}
              {"\n"}
              {latestReadings.fasting}
            </Text>
          )}

          <TouchableOpacity style={styles.addButton}
          onPress={() => navigation.navigate('Glucosereads')}>
            <Image source={add} style={styles.addIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.bottomContainer}>
          <View style={styles.column}>
            <View style={styles.smallBox}>
              <Text style={styles.boxTitle}>Fasting sugar</Text>
              <TouchableOpacity 
                style={styles.boxAddButton}
                onPress={() => navigation.navigate('Fastingbloodsugar')}
              >
                <Image source={add} style={styles.addIcon} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.smallBox}>
              <Text style={styles.boxTitle}>Cumulative sugar</Text>
              <TouchableOpacity 
                style={styles.boxAddButton}
                onPress={() => navigation.navigate('Cumulativebloodsugar')}
              >
                <Image source={add} style={styles.addIcon} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.column}>
            <View style={styles.smallBox}>
              <Text style={styles.boxTitle}>Medicines</Text>
              <TouchableOpacity style={styles.boxAddButton}
              onPress={() => navigation.navigate('Addmedicine')}>
                <Image source={add} style={styles.addIcon} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.smallBox}>
              <Text style={styles.boxTitle}>Meals</Text>
              <TouchableOpacity 
                style={styles.boxAddButton}
                onPress={() => navigation.navigate('SearchFormeal')}
              >
                <Image source={add} style={styles.addIcon} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.navButton} 
        onPress={() => navigation.navigate('Home')}
        >
          <Image source={home} style={styles.navIcon} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navButton}
        onPress={() => navigation.navigate('Doctornote')}>
          <Image source={Note} style={styles.navIcon} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => navigation.navigate('Medicines')}
        >
          <Image source={Pill} style={styles.navIcon} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => navigation.navigate('Account')}
        >
          <Image source={Menue} style={styles.navIcon} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(5), // responsive padding
    paddingTop: hp(2), // responsive padding
    //paddingBottom: hp(0),
  },
  logo: {
    width: wp(30), // responsive width
    height: wp(30), // responsive height
    resizeMode: 'contain',
    left:wp(8)
  },
  notification: {
    width: wp(8), // responsive width
    height: wp(8), // responsive height
    resizeMode: 'contain',
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: wp(5),
    paddingBottom: hp(15), // responsive padding
  },
  mainBox: {
    backgroundColor: '#B0FFF3',
    borderRadius: 30,
    padding: wp(5), // responsive padding
    marginBottom: hp(3),
    alignItems: 'center',
    justifyContent: 'center',
    height: hp(30), // responsive height
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: wp(4.5), // responsive font size
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  glucoseValue: {
    fontSize: wp(20), // responsive font size
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: wp(20), // responsive line height
  },
  addButton: {
    position: 'absolute',
    top: hp(2), // responsive top margin
    right: wp(5), // responsive right margin
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    width: '48%',
  },
  smallBox: {
    backgroundColor: '#B0FFF3',
    borderRadius: 30,
    padding: wp(4), // responsive padding
    marginBottom: hp(2),
    height: hp(18), // responsive height
  },
  boxTitle: {
    fontWeight: 'bold',
    fontSize: wp(3.5), // responsive font size
    marginBottom: 10,
  },
  boxAddButton: {
    position: 'absolute',
    bottom: hp(2), // responsive bottom margin
    right: wp(3), // responsive right margin
  },
  addIcon: {
    width: wp(6), // responsive width
    height: wp(6), // responsive height
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#B0FFF3',
    // borderRadius: wp(8), // responsive border radius
    borderTopLeftRadius: wp(8),
    borderTopRightRadius: wp(8),
    paddingVertical: hp(2), // responsive padding
    position: 'absolute',
    bottom: 0, // responsive bottom margin
    left: wp(0), // يجعل اليسار يبدأ من بداية الشاشة
    right: wp(0), // يجعل اليمين يبدأ من نهاية الشاشة
    width: '100%', // يضمن أن البار يأخذ العرض الكامل للشاشة
  },
  navButton: {
    padding: wp(2), // responsive padding
  },
  navIcon: {
    width: wp(7), // responsive width
    height: wp(7), // responsive height
    resizeMode: 'contain',
  },
});
