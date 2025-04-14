import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Button, ScrollView, Text, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ip } from "../screens/ip.js";

const ChatScreen = ({ route, navigation }) => {
    const { doctorId, userId, role } = route.params || {}; // استخدم تعبير fallback للتأكد من أن params موجودة
    // if (!doctorId || !userId) {
    //   Alert.alert('Error', 'Missing doctorId or userId');
    //   return;
    // }
  
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState('');
    
   

  // جلب الرسائل من الـ Backend عند تحميل الشاشة
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`${ip}/user/messages?doctorId=${doctorId}`);
        const data = await response.json();
        if (response.ok) {
          setMessages(data.messages);
        } else {
          Alert.alert('Error', 'Unable to fetch messages');
        }
      } catch (error) {
        Alert.alert('Error', 'An error occurred while fetching messages');
      }
    };

    fetchMessages();
  }, [doctorId]); // إعادة الجلب عند تغيير doctorId

  // إرسال رسالة جديدة
  const onSendMessage = async () => {
    if (!messageText.trim()) {
      Alert.alert('Error', 'Please enter a message');
      return;
    }
  
    try {
      const response = await fetch(`${ip}/user/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // تأكد من أن التوكن موجود
        },
        body: JSON.stringify({
          doctorId: doctorId,  // إرسال doctorId
          userId: userId,      // إرسال userId
          message: messageText, // نص الرسالة
        }),
      });
  
      const result = await response.json();
      
      if (response.ok) {
        // إضافة الرسالة الجديدة إلى قائمة الرسائل
        setMessages((prevMessages) => [
          ...prevMessages,
          { _id: result.newMessage._id, text: result.newMessage.message },
        ]);
        setMessageText(''); // مسح محتوى الرسالة
      } else {
        Alert.alert('Error', result.message || 'Error sending message');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while sending the message');
    }
  };
  

  return (
    <LinearGradient
      colors={['#1CD3DA', '#0F7074']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <ScrollView style={styles.messagesContainer}>
          {messages.map(msg => (
            <View key={msg._id} style={styles.messageBubble}>
              <Text>{msg.text}</Text>
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
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
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
