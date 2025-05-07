import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Dimensions,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { Ionicons, FontAwesome, Entypo } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Audio } from 'expo-av';

import { GoogleGenerativeAI } from '@google/generative-ai';
import logo from '../assets/project.png';

// Hard-coded API key (replace with your key)
const GEMINI_API_KEY = "AIzaSyAp5ZmYxtlj3Vytxc4raOcSjPAF_61at7A";
const { width, height } = Dimensions.get('window');
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export default function MealSearchScreen() {
  const [selectedMeal, setSelectedMeal] = useState('Breakfast');
  const [textQuery, setTextQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [recording, setRecording] = useState(null);
  const [audioUri, setAudioUri] = useState(null);
  const [statusText, setStatusText] = useState('');
  const [analysis, setAnalysis] = useState('');

  // Request permissions
  useEffect(() => {
    (async () => {
      const camPerm = await ImagePicker.requestCameraPermissionsAsync();
      const libPerm = await ImagePicker.requestMediaLibraryPermissionsAsync();
      const audioPerm = await Audio.requestPermissionsAsync();
      if (
        camPerm.status !== 'granted' ||
        libPerm.status !== 'granted' ||
        audioPerm.status !== 'granted'
      ) {
        Alert.alert(
          'Permissions Required',
          'Camera, media library, and audio recording permissions are all needed.'
        );
      }
    })();
  }, []);

  // Image pick / camera
  const handleImage = async (mode) => {
    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    };
    let result;
    if (mode === 'camera') result = await ImagePicker.launchCameraAsync(options);
    else result = await ImagePicker.launchImageLibraryAsync(options);

    if (!result.canceled && result.assets?.length > 0) {
      setSelectedImage(result.assets[0].uri);
      setAudioUri(null);
      setTextQuery('');
      setStatusText('');
      setAnalysis('');
    }
  };
  const pickImage = () => handleImage('library');
  const takePhoto = () => handleImage('camera');

  // Audio recording
  const startRecording = async () => {
    try {
      setStatusText('Recording audio…');
      await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
      const rec = new Audio.Recording();
      await rec.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await rec.startAsync();
      setRecording(rec);
      setSelectedImage(null);
      setAudioUri(null);
      setTextQuery('');
      setAnalysis('');
    } catch (err) {
      console.error(err);
      setStatusText('Could not start recording.');
    }
  };
  const stopRecording = async () => {
    try {
      setStatusText('Stopping recording…');
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(null);
      setAudioUri(uri);
      setStatusText('');
    } catch (err) {
      console.error(err);
      setStatusText('Could not stop recording.');
    }
  };

  // Analyze text or media
  const analyseMedia = async () => {
    if (!textQuery && !selectedImage && !audioUri) {
      setStatusText('Please enter a search, select an image, or record audio first.');
      return;
    }
    try {
      setStatusText('Analyzing…');
      let promptItems;
      if (textQuery) {
        // text-only query: estimate sugar from description
        promptItems = [
          'Estimate the sugar content in grams for the meal described in this text. Return only a short estimate with explanation.',
          textQuery
        ];
      } else {
        const fileUri = selectedImage || audioUri;
        const isAudio = !!audioUri;
        const base64 = await FileSystem.readAsStringAsync(fileUri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        const ask = isAudio
          ? 'Estimate the sugar content in grams for the meal described in this audio. Return only a short estimate with explanation.'
          : 'Estimate the sugar content in grams for the food shown in this image. Return only a short estimate with explanation.';
        promptItems = [ask, { inlineData: { data: base64, mimeType: isAudio ? 'audio/m4a' : 'image/jpeg' } }];
      }
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
      const result = await model.generateContent(promptItems);
      setAnalysis(result.response.text());
      setStatusText('');
    } catch (err) {
      console.error(err);
      setStatusText('Failed to analyze.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <Image source={logo} style={styles.logo} />

          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedMeal}
              onValueChange={setSelectedMeal}
              style={styles.picker}
            >
              <Picker.Item label="Breakfast" value="Breakfast" />
              <Picker.Item label="Lunch" value="Lunch" />
              <Picker.Item label="Dinner" value="Dinner" />
            </Picker>
          </View>

          <View style={styles.searchBar}>
            <TextInput
              placeholder={
                textQuery
                  ? textQuery
                  : selectedImage
                  ? 'Image selected'
                  : audioUri
                  ? 'Audio recorded'
                  : `You selected: ${selectedMeal}`
              }
              style={styles.searchInput}
              value={textQuery}
              onChangeText={(text) => {
                setTextQuery(text);
                setSelectedImage(null);
                setAudioUri(null);
                setAnalysis('');
                setStatusText('');
              }}
            />
            <Entypo name="dot-single" size={22} color="#444" />
            <TouchableOpacity onPress={pickImage}>
              <FontAwesome name="image" size={20} color="#444" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={takePhoto}>
              <FontAwesome name="camera" size={20} color="#444" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={recording ? stopRecording : startRecording}>
              <FontAwesome
                name={recording ? 'stop-circle' : 'microphone'}
                size={22}
                color={recording ? 'red' : '#444'}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.contentBox}>
            {!!analysis && <Text style={styles.resultText}>{analysis}</Text>}
            <TouchableOpacity style={styles.sendButton} onPress={analyseMedia}>
              <Text style={styles.sendButtonText}>SEND</Text>
            </TouchableOpacity>
            {!!statusText && <Text style={styles.statusText}>{statusText}</Text>}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#00B8C4',
    paddingTop: Platform.OS === 'android' ? 40 : 0,
  },
  scrollContent: { flexGrow: 1 },
  container: { flex: 1, alignItems: 'center', paddingHorizontal: '5%' },
  logo: { width: '40%', height: height * 0.18, resizeMode: 'contain', marginVertical: 20 },
  pickerWrapper: {
    width: '60%',
    backgroundColor: '#b5f4f4',
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
  },
  picker: { height: 50, color: '#000' },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#89E6E0',
    borderRadius: 20,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: '4%',
    paddingVertical: '2%',
    marginBottom: 20,
  },
  searchInput: { flex: 1, fontSize: 16, color: '#000' },
  icon: { marginLeft: 12 },
  contentBox: {
    backgroundColor: '#7EE0DE',
    width: '100%',
    borderRadius: 20,
    padding: '4%',
    alignItems: 'center',
  },
  sendButton: {
    marginTop: 15,
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  sendButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  statusText: { fontSize: 16, color: '#333', textAlign: 'center', marginVertical: 10 },
  resultText: { fontSize: 16, color: '#2a2', marginTop: 10, textAlign: 'center', paddingHorizontal: 10 },
});









// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   Image,
//   Dimensions,
//   SafeAreaView,
//   Platform,
//   TouchableOpacity,
//   Alert,
// } from 'react-native';
// import { Ionicons, FontAwesome, MaterialIcons, Entypo } from '@expo/vector-icons';
// import { Picker } from '@react-native-picker/picker';
// import * as ImagePicker from 'expo-image-picker';
// import { Audio } from 'expo-av';
// import logo from '../assets/logo.png';
// import aigen from '../assets/search.png';

// const { width, height } = Dimensions.get('window');

// export default function MealSearchScreen() {
//   const [selectedMeal, setSelectedMeal] = useState('Breakfast');
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [recording, setRecording] = useState(null);
//   const [recordingStatus, setRecordingStatus] = useState('');

//   useEffect(() => {
//     (async () => {
//       const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
//       const mediaStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
//       const audioStatus = await Audio.requestPermissionsAsync();

//       if (!cameraStatus.granted || !mediaStatus.granted || !audioStatus.granted) {
//         Alert.alert('Permissions Required', 'Camera, media, and microphone permissions are needed.');
//       }
//     })();
//   }, []);

//   const takePhoto = async () => {
//     const result = await ImagePicker.launchCameraAsync({
//       allowsEditing: true,
//       quality: 1,
//     });
//     if (!result.canceled) {
//       setSelectedImage(result.assets[0].uri);
//     }
//   };

//   const pickImage = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       allowsEditing: true,
//       quality: 1,
//     });
//     if (!result.canceled) {
//       setSelectedImage(result.assets[0].uri);
//     }
//   };

//   const startRecording = async () => {
//     try {
//       await Audio.setAudioModeAsync({
//         allowsRecordingIOS: true,
//         playsInSilentModeIOS: true,
//       });

//       const { recording } = await Audio.Recording.createAsync(
//         Audio.RecordingOptionsPresets.HIGH_QUALITY
//       );
//       setRecording(recording);
//       setRecordingStatus('Recording...');
//     } catch (err) {
//       console.error('Failed to start recording', err);
//     }
//   };

//   const stopRecording = async () => {
//     setRecordingStatus('Recording stopped');
//     await recording.stopAndUnloadAsync();
//     const uri = recording.getURI();
//     console.log('Recording saved at', uri);
//     setRecording(null);
//   };

//   const toggleRecording = async () => {
//     if (recording) {
//       await stopRecording();
//     } else {
//       await startRecording();
//     }
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <View style={styles.container}>
//         {/* Logo */}
//         <Image source={logo} style={styles.logo} />

//         {/* Dropdown */}
//         <View style={styles.pickerWrapper}>
//           <Picker
//             selectedValue={selectedMeal}
//             onValueChange={(itemValue) => setSelectedMeal(itemValue)}
//             style={styles.picker}
//             mode="dropdown"
//             dropdownIconColor="#000"
//           >
//             <Picker.Item label="Breakfast" value="Breakfast" />
//             <Picker.Item label="Lunch" value="Lunch" />
//             <Picker.Item label="Dinner" value="Dinner" />
//           </Picker>
//         </View>

//         {/* Search Bar */}
//         <View style={styles.searchBar}>
//           <TextInput
//             placeholder="Search for meals"
//             style={styles.searchInput}
//             placeholderTextColor="#555"
//           />
//           <Entypo name="dot-single" size={22} color="#444" />
//           <TouchableOpacity onPress={pickImage}>
//             <FontAwesome name="image" size={20} color="#444" style={styles.icon} />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={takePhoto}>
//             <FontAwesome name="camera" size={20} color="#444" style={styles.icon} />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={toggleRecording}>
//             <MaterialIcons name="keyboard-voice" size={20} color={recording ? 'red' : '#444'} style={styles.icon} />
//           </TouchableOpacity>
//         </View>

//         {/* Content Area */}
//         <View style={styles.contentBox}>
//           {selectedImage ? (
//             <Image source={{ uri: selectedImage }} style={styles.previewImage} />
//           ) : (
//             <Text style={styles.statusText}>
//               {recordingStatus ? recordingStatus : `You selected: ${selectedMeal}`}
//             </Text>
//           )}
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#00B8C4',
//     paddingTop: Platform.OS === 'android' ? 40 : 0,
//   },
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     paddingHorizontal: '5%',
//   },
//   logo: {
//     width: '40%',
//     height: undefined,
//     aspectRatio: 1,
//     resizeMode: 'contain',
//     marginBottom: height * 0.02,
//   },
//   pickerWrapper: {
//     width: '60%',
//     backgroundColor: '#b5f4f4',
//     borderRadius: 20,
//     marginBottom: height * 0.02,
//     overflow: 'hidden',
//   },
//   picker: {
//     height: 50,
//     color: '#000',
//     width: '100%',
//   },
//   searchBar: {
//     flexDirection: 'row',
//     backgroundColor: '#89E6E0',
//     borderRadius: 20,
//     width: '100%',
//     alignItems: 'center',
//     paddingHorizontal: '4%',
//     paddingVertical: '2%',
//     marginBottom: height * 0.03,
//   },
//   searchInput: {
//     flex: 1,
//     fontSize: 16,
//     color: '#000',
//   },
//   icon: {
//     marginLeft: 10,
//   },
//   contentBox: {
//     backgroundColor: '#7EE0DE',
//     width: '100%',
//     flex: 1,
//     borderRadius: 20,
//     padding: '4%',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   previewImage: {
//     width: '100%',
//     height: undefined,
//     aspectRatio: 1.6,
//     borderRadius: 15,
//     resizeMode: 'cover',
//   },
//   statusText: {
//     fontSize: 16,
//     color: '#333',
//     textAlign: 'center',
//   },
// });
