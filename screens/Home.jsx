import { ip } from "./ip.js";

import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Image, 
  TouchableOpacity, 
  Text, 
  ScrollView, 
  Dimensions,
  ActivityIndicator,
  RefreshControl
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logo from "../assets/project.png";
import notification from "../assets/notification2.png";
import home from "../assets/homeinline.png";
import Menue from "../assets/menuoutline.png";
import Note from "../assets/note.png";
import Pill from "../assets/pill.png";
import add from "../assets/add-square.png";

const { width, height } = Dimensions.get('window');

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
        <TouchableOpacity style={styles.navButton}>
          <Image source={home} style={styles.navIcon} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navButton}>
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
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.05,
    paddingBottom: height * 0.02,
  },
  logo: {
    width: width * 0.2,
    height: width * 0.2,
    resizeMode: 'contain',
  },
  notification: {
    width: width * 0.08,
    height: width * 0.08,
    resizeMode: 'contain',
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: width * 0.05,
    paddingBottom: height * 0.15,
  },
  mainBox: {
    backgroundColor: '#B0FFF3',
    opacity: 0.6,
    borderRadius: 30,
    padding: 20,
    marginBottom: height * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.25,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: width * 0.045,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  glucoseValue: {
    fontSize: width * 0.2,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: width * 0.2,
  },
  addButton: {
    position: 'absolute',
    top: 20,
    right: 20,
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
    opacity: 0.6,
    borderRadius: 30,
    padding: 15,
    marginBottom: height * 0.02,
    height: height * 0.18,
  },
  boxTitle: {
    fontWeight: 'bold',
    fontSize: width * 0.035,
    marginBottom: 10,
  },
  boxAddButton: {
    position: 'absolute',
    bottom: 15,
    right: 15,
  },
  addIcon: {
    width: width * 0.06,
    height: width * 0.06,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#B0FFF3',
    opacity: 0.9,
    borderRadius: 40,
    paddingVertical: height * 0.02,
    position: 'absolute',
    bottom: height * 0.02,
    left: width * 0.05,
    right: width * 0.05,
  },
  navButton: {
    padding: 10,
  },
  navIcon: {
    width: width * 0.08,
    height: width * 0.08,
    resizeMode: 'contain',
  },
});
