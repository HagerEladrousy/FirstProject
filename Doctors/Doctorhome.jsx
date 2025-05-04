import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import RNPickerSelect from 'react-native-picker-select';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import logo from "../assets/project.png";
import notification from "../assets/notification2.png";
import home from "../assets/homeinline.png";
import chatoutline from "../assets/chatoutline.png";
import Menue from "../assets/menuoutline.png";
import profile from "../assets/profile-circle.png";
import deleteIcon from "../assets/delete.png";
import { ip } from "../screens/ip.js";
//import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; // استيراد مكتبة AsyncStorage

// Replace with your actual image paths

// import Menu from './my-new-app/assets/images/menu.png';

const screenWidth = Dimensions.get('window').width;

export default function DoctorHomeScreen({ navigation }) {
  //const navigation = useNavigation();

  const [selectedYear, setSelectedYear] = useState('2025');
  const [doctorId, setDoctorId] = useState(null);
  //const [totalUsers, setTotalUsers] = useState(120); // Replace with API call in production
  const [years, setYears] = useState([2025, 2026, 2027]); // Replace with API call in production
  const [approvedCount, setApprovedCount] = useState(0);
  const [genderStats, setGenderStats] = useState({ male: 0, female: 0 });
  const [chartData, setChartData] = useState([]);


  useEffect(() => {
    const fetchApprovedPatients = async () => {
      try {
        // جلب doctorId من AsyncStorage
        const doctorId = await AsyncStorage.getItem('doctorId');
        if (!doctorId) {
          console.error("Doctor ID is missing");
          setDoctorId(doctorId);
          return;
        }
        // إرسال الطلب مع doctorId في الـ URL
        const response = await fetch(`${ip}/request/approved-patients-count/${doctorId}`, {
          method: 'GET',
        });
  
        const json = await response.json();
        if (json.success) {
          setApprovedCount(json.count);
        }
      } catch (error) {
        console.error("Error fetching approved patients count:", error);
      }
    };
  
    fetchApprovedPatients();
  }, []);
  



  useEffect(() => {
    const fetchGenderStats = async () => {
      try {
        const doctorId = await AsyncStorage.getItem('doctorId');
        console.log("doctorId from storage:", doctorId);

        if (!doctorId) return;
  
        const response = await fetch(`${ip}/request/gender-stats/${doctorId}`);
        const json = await response.json();
  
        if (json.success) {
          setGenderStats({ male: json.male, female: json.female });
          console.log("Gender Stats API Result:", json);
          setChartData([
            {
              name: 'Male',
              population: json.male,
              color: '#077A7D',
              legendFontColor: '#077A7D',
              legendFontSize: 14,
            },
            {
              name: 'Female',
              population: json.female,
              color: '#00CED1',
              legendFontColor: '#00CED1',
              legendFontSize: 14,
            },
          ]);
        }
      } catch (error) {
        console.error('Error fetching gender stats:', error);
      }
    };
  
    fetchGenderStats();
  }, []);

  return (
    <LinearGradient colors={['#1CD3DA', '#0F7074']} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={logo} style={styles.logo} />
        {/* Total Users Card */}
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ListofPatients')}>
          <Text style={styles.cardLabel}>👨‍⚕️ Total Users</Text>
          <Text style={styles.cardValue}>{approvedCount}</Text>
        </TouchableOpacity>

        {/* Pie Chart */}
        <View style={styles.chartContainer}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>Users in</Text>
            <RNPickerSelect
              onValueChange={(value) => setSelectedYear(value)}
              value={selectedYear}
              items={years.map((year) => ({
                label: year.toString(),
                value: year.toString(),
              }))}
              style={{
                inputIOS: styles.pickerInput,
                inputAndroid: styles.pickerInput,
              }}
              useNativeAndroidPickerStyle={false}
              placeholder={{
                label: 'Select Year...',
                value: null,
                color: '#9EA0A4',
              }}
            />
          </View>

          <PieChart
            data={chartData}
            width={screenWidth * 0.9}
            height={220}
            chartConfig={{
              color: () => `#000`,
              labelColor: () => `#000`,
              backgroundColor: 'transparent',
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              propsForLabels: { fontSize: 14 },
            }}
            accessor={'population'}
            backgroundColor={'transparent'}
            paddingLeft={'10'}
            center={[0, 0]}
            absolute
          />
        </View>
      </ScrollView>

      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Doctorhome')}>
          <Image source={home} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ChatListUsers')}>
          <Image source={chatoutline} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('AccountDocror')}>
          <Image source={Menue} style={styles.navIcon} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    flexGrow: 1,
    paddingBottom: hp(12), // avoid overlap with navbar
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#B0FFF3',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
    marginTop: 100,
    opacity: 0.8
  },
  logo: {
    width: wp('20%'),
    height: wp('20%'),
    //marginBottom: hp('1%'),
    top: hp('3%'),
    left: wp('38%'),
  },
  cardLabel: {
    fontSize: 18,
    color: '#077A7D',
    marginBottom: 10,
  },
  cardValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#077A7D',
  },
  chartContainer: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#B0FFF3',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 40,
    marginTop: 40,
    opacity: 0.8
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#077A7D',
  },
  pickerInput: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#077A7D',
    borderRadius: 8,
    color: '#077A7D',
    backgroundColor: 'white',
    width: 150,
    textAlign: 'center',
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

