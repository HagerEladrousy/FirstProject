import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity, ScrollView, Alert, RefreshControl, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ip } from "../screens/ip.js";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ChatScreen = ({ route, navigation }) => {
  const { doctorId, userId, role } = route.params || {};

  if (!doctorId || !userId) {
    Alert.alert('Error', 'Missing doctorId or userId');
    return null;
  }

  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const scrollViewRef = useRef();

  // جلب الرسائل من السيرفر
  const fetchMessages = async () => {
    try {
      const response = await fetch(`${ip}/chat/messages?doctorId=${doctorId}&userId=${userId}`);
      const data = await response.json();

      if (response.ok) {
        setMessages(data.messages);
      } else {
        Alert.alert('Error', data.message || 'Unable to fetch messages');
      }
    } catch (error) {
      console.error('Fetching messages error:', error);
      Alert.alert('Error', 'An error occurred while fetching messages');
    }
  };

  useEffect(() => {
    fetchMessages();

    // التحديث التلقائي للرسائل كل 5 ثواني
    const intervalId = setInterval(() => {
      fetchMessages();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [doctorId, userId]);

  // إرسال رسالة جديدة
  const onSendMessage = async () => {
    if (!messageText.trim()) {
      Alert.alert('Error', 'Please enter a message');
      return;
    }

    try {
      const doctorIdFromStorage = await AsyncStorage.getItem('doctorId');
      const userIdFromStorage = await AsyncStorage.getItem('userId');

      let senderId = null;

      if (doctorIdFromStorage) {
        senderId = doctorIdFromStorage;
      } else if (userIdFromStorage) {
        senderId = userIdFromStorage;
      } else {
        Alert.alert('Error', 'Cannot determine sender');
        return;
      }

      const response = await fetch(`${ip}/chat/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          doctorId,
          userId,
          senderId,
          content: messageText,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            _id: result.note._id,
            content: result.note.content,
            senderId: senderId,
          },
        ]);
        setMessageText('');
      } else {
        Alert.alert('Error', result.message || 'Error sending message');
      }
    } catch (error) {
      console.error('Sending message error:', error);
      Alert.alert('Error', error.message || 'An error occurred while sending the message');
    }
  };

  // بعد إضافة رسالة جديدة، نقوم بالتمرير لأسفل
  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  // تحديث الصفحة عند السحب
  const onRefresh = async () => {
    setIsRefreshing(true);
    await fetchMessages();
    setIsRefreshing(false);
  };

  return (
    <LinearGradient
      colors={['#1CD3DA', '#0F7074']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined} // Adjusted for Android
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
            />
          }
        >
          {messages.map((msg) => (
            <View
              key={msg._id}
              style={[
                styles.messageBubble,
                msg.senderId === userId ? styles.doctorBubble : styles.patientBubble,
              ]}
            >
              <Text style={styles.messageText}>{msg.content}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your message"
            value={messageText}
            onChangeText={setMessageText}
          />

          {/* زر إرسال باستخدام TouchableOpacity */}
          <TouchableOpacity style={styles.sendButton} onPress={onSendMessage}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: hp('2%'),
  },
  messagesContainer: {
    flex: 1,
    padding: wp('3%'),
  },
  messageBubble: {
    maxWidth: wp('70%'),
    marginBottom: hp('1.5%'),
    padding: wp('3%'),
    borderRadius: wp('3%'),
  },
  doctorBubble: {
    backgroundColor: '#ffffff',
    alignSelf: 'flex-start',
    borderTopLeftRadius: 0,
  },
  patientBubble: {
    backgroundColor: '#d1f7f5',
    alignSelf: 'flex-end',
    borderTopRightRadius: 0,
  },
  messageText: {
    fontSize: wp('4%'),
  },
  inputContainer: {
    flexDirection: 'row',
    padding: wp('2%'),
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  input: {
    flex: 1,
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('3%'),
    borderRadius: wp('5%'),
    backgroundColor: '#fff',
    fontSize: wp('4%'),
    marginRight: wp('2%'),
    // shadow effect for both iOS and Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  sendButton: {
    backgroundColor: '#1CD3DA',
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('6%'),
    borderRadius: wp('5%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
});

export default ChatScreen;

