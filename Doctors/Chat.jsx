import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TextInput, Button, ScrollView, Text, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ip } from "../screens/ip.js";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChatScreen = ({ route, navigation }) => {
  const { doctorId, userId, role } = route.params || {};

  if (!doctorId || !userId) {
    Alert.alert('Error', 'Missing doctorId or userId');
    return null; // مهم: لازم return null بدل return بس
  }

  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const scrollViewRef = useRef(); // هنا نعمل مرجع للـ ScrollView

  // جلب الرسائل من السيرفر
  const fetchMessages = async () => {
    try {
      const response = await fetch(`${ip}/doc/messages?doctorId=${doctorId}&userId=${userId}`);
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

    // تنظيف التايمر عند الخروج من الشاشة
    return () => clearInterval(intervalId);
  }, [doctorId, userId]);

  // إرسال رسالة جديدة
  const onSendMessage = async () => {
    if (!messageText.trim()) {
      Alert.alert('Error', 'Please enter a message');
      return;
    }

    try {
      const response = await fetch(`${ip}/doc/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          doctorId,   // تأكد من أن doctorId موجود
          userId,     // تأكد من أن userId موجود
          content: messageText, // تأكد من أن content يحتوي على النص المرسل
        }),
      });

      const result = await response.json();
      console.log('Send response:', result);

      if (response.ok) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            _id: result.note._id,
            content: result.note.content,  // استخدم content هنا
            senderId: userId,
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

  return (
    <LinearGradient
      colors={['#1CD3DA', '#0F7074']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <ScrollView
          ref={scrollViewRef} // نربط الـ ScrollView بالـ ref
          style={styles.messagesContainer}
        >
          {messages.map((msg) => (
            <View
              key={msg._id}
              style={[
                styles.messageBubble,
                msg.senderId === userId ? styles.patientBubble : styles.doctorBubble
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
          <Button title="Send" onPress={onSendMessage} />
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 20,
  },
  messagesContainer: {
    flex: 1,
    padding: 10,
  },
  messageBubble: {
    maxWidth: '70%',
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    alignSelf: 'flex-start',  // هذا هو التعديل لجعل الرسائل تظهر عموديًا
  },
  doctorBubble: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 0,
  },
  patientBubble: {
    backgroundColor: '#d1f7f5',
    alignSelf: 'flex-start', // كلها تظهر بنفس الجهة
    borderTopRightRadius: 0,
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  input: {
    flex: 1,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
  },
});

export default ChatScreen;
