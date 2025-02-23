import { StyleSheet, ScrollView, Text, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  return (
    <LinearGradient
      colors={['#1CD3DA', '#0F7074']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        nestedScrollEnabled={true}  // Important for Android
        //showsVerticalScrollIndicator={false} // Hide scroll bar
      >
       
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 50,
  },
  
});
