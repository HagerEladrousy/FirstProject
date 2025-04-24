import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, TextInput, Keyboard, Alert } from 'react-native';
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ip } from './ip.js';

const SearchFormeal = ({ route, navigation }) => {
  const [userData, setUserData] = useState(null);
  const [meals, setMeals] = useState({
    breakfast: null,
    lunch: null,
    dinner: null
  });
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mealBudget, setMealBudget] = useState('15');

  const GEMINI_API_KEY = "AIzaSyBkjlQOMXkGpGZqpGXg1jp1PxYdhXWi36s";
  const GEMINI_MODEL = "gemini-1.5-flash";

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userId = route.params?.patientId || await AsyncStorage.getItem('userId');
        if (!userId) throw new Error('User ID not found');

        const response = await fetch(`${ip}/user/profile?userId=${userId}`);
        const data = await response.json();
        
        if (response.ok && data.success) {
          setUserData(data.data);
        } else {
          throw new Error(data.message || 'Failed to fetch profile data');
        }
      } catch (error) {
        console.error('Profile fetch error:', error);
        Alert.alert('Error', 'Failed to load profile data. Using default values.');
        // Fallback to default data if profile fetch fails
        setUserData({
          age: 45,
          weight: 70,
          diabetesType: 2,
          fastingSugar: 120,
          cumulativeSugar: 6.5
        });
      } finally {
        setProfileLoading(false);
        // Fetch initial recommendations after profile loads
        fetchRecommendations();
      }
    };

    fetchUserProfile();
  }, []);

  const fetchRecommendations = async () => {
    if (profileLoading || !userData) return;
    
    Keyboard.dismiss();
    setLoading(true);
    setError(null);
    
    try {
      const budget = parseInt(mealBudget) || 15;

      // Prepare comprehensive prompt
      const prompt = 
      `Create a full day meal plan (breakfast, lunch, dinner) for an Egyptian diabetic patient with:
      - Age: ${userData.age}
      - Weight: ${userData.weight} kg
      - Diabetes Type: ${userData.diabetesType}
      - Fasting Sugar: ${userData.fastingSugar} mg/dL
      - A1C: ${userData.cumulativeSugar}%
      - Budget: ${budget} EGP per meal
      ${searchQuery ? '- Preferences: ' + searchQuery : ''}

      Requirements:
      1. Each meal must cost exactly ${budget} EGP (±2 EGP)
      2. Use only affordable local ingredients available in Egyptian markets
      3. Ensure meals are diabetic-friendly (low glycemic index)
      4. Include traditional Egyptian foods when possible
      5. Provide simple preparation instructions
      6. List exact ingredient costs

      Format as JSON with these keys for each meal:
      {
        "breakfast": {
          "name": "English/Arabic name",
          "description": "Simple description",
          "ingredients": ["1 cup fava beans (3 EGP)", "1 tbsp oil (2 EGP)"],
          "steps": "1. Soak beans\n2. Cook with spices",
          "cost": ${budget},
          "carbs": 30,
          "calories": 350,
          "benefits": "High fiber, low sugar"
        },
        "lunch": { ... },
        "dinner": { ... }
      }`;

      // Call Gemini API
      const geminiResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { 
              responseMimeType: "application/json",
              temperature: 0.7
            }
          }),
        }
      );

      const geminiData = await geminiResponse.json();
      const textResponse = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || '';

      // Parse response
      try {
        const jsonStart = textResponse.indexOf('{');
        const jsonEnd = textResponse.lastIndexOf('}') + 1;
        const parsedMeals = JSON.parse(textResponse.substring(jsonStart, jsonEnd));
        
        // Validate costs
        Object.keys(parsedMeals).forEach(mealType => {
          if (!parsedMeals[mealType]?.cost) {
            parsedMeals[mealType].cost = budget;
          }
        });
        
        setMeals(parsedMeals);
      } catch (err) {
        console.error("Parse error:", err);
        setError("Couldn't process meals. Please try again.");
      }

    } catch (err) {
      console.error("API error:", err);
      setError("Connection problem. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (mealBudget && !isNaN(mealBudget)) {
      fetchRecommendations();
    }
  };

  const renderMealSection = (mealType) => {
    const meal = meals[mealType];
    if (!meal) return null;

    return (
      <View style={styles.mealSection}>
        <Text style={styles.mealSectionTitle}>
          {mealType.toUpperCase()} ({meal.cost || '?'} EGP)
        </Text>
        <View style={styles.mealCard}>
          <Text style={styles.mealName}>{meal.name?.split('/')[0].trim() || mealType}</Text>
          <Text style={styles.mealDescription}>{meal.description}</Text>
          
          <View style={styles.mealFacts}>
            <View style={styles.factBox}>
              <Text style={styles.factNumber}>{meal.carbs || '?'}g</Text>
              <Text style={styles.factLabel}>carbs</Text>
            </View>
            <View style={styles.factBox}>
              <Text style={styles.factNumber}>{meal.calories || '?'}</Text>
              <Text style={styles.factLabel}>calories</Text>
            </View>
          </View>

          {meal.ingredients?.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Ingredients:</Text>
              {meal.ingredients.map((item, i) => (
                <Text key={i} style={styles.ingredientItem}>- {item}</Text>
              ))}
            </>
          )}
          
          {meal.steps && (
            <>
              <Text style={styles.sectionTitle}>Preparation:</Text>
              <Text style={styles.preparationText}>{meal.steps}</Text>
            </>
          )}
          
          {meal.benefits && (
            <>
              <Text style={styles.sectionTitle}>Health Benefits:</Text>
              <Text style={styles.nutritionText}>{meal.benefits}</Text>
            </>
          )}
        </View>
      </View>
    );
  };

  if (profileLoading) {
    return (
      <LinearGradient colors={['#1CD3DA', '#0F7074']} style={styles.gradient}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFFFFF" />
          <Text style={styles.loadingText}>Loading profile data...</Text>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={['#1CD3DA', '#0F7074']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <ScrollView style={styles.scrollContainer} keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingBottom: 30 }}>
        <Text style={styles.header}>Diabetic Meal Planner</Text>
        
        {/* User Profile */}
        {userData && (
          <View style={styles.userDataContainer}>
            <Text style={styles.userDataText}>Personalized for:</Text>
            <Text style={styles.userDataText}>• {userData.age} years</Text>
            <Text style={styles.userDataText}>• {userData.weight} kg</Text>
            <Text style={styles.userDataText}>• Type {userData.diabetesType} diabetes</Text>
            {userData.fastingSugar && (
              <Text style={styles.userDataText}>• Glucose: {userData.fastingSugar} mg/dL</Text>
            )}
            {userData.cumulativeSugar && (
              <Text style={styles.userDataText}>• A1C: {userData.cumulativeSugar}%</Text>
            )}
          </View>
        )}

        {/* Budget Input */}
        <View style={styles.budgetContainer}>
          <Text style={styles.budgetLabel}>Budget per meal (EGP):</Text>
          <TextInput
            style={styles.budgetInput}
            keyboardType="numeric"
            value={mealBudget}
            onChangeText={text => setMealBudget(text.replace(/[^0-9]/g, ''))}
            onSubmitEditing={handleSearch}
          />
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Food preferences (optional)"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>SEARCH</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4A90E2" />
            <Text style={styles.loadingText}>Creating {mealBudget} EGP meals...</Text>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.refreshButton} onPress={fetchRecommendations}>
              <Text style={styles.refreshButtonText}>TRY AGAIN</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {/* Daily Total */}
            {meals.breakfast?.cost && meals.lunch?.cost && meals.dinner?.cost && (
              <View style={styles.totalContainer}>
                <Text style={styles.totalText}>
                  DAILY TOTAL: {meals.breakfast.cost + meals.lunch.cost + meals.dinner.cost} EGP
                </Text>
              </View>
            )}

            {/* Meal Sections */}
            {renderMealSection("breakfast")}
            {renderMealSection("lunch")}
            {renderMealSection("dinner")}
          </>
        )}

        <TouchableOpacity style={styles.refreshButton} onPress={fetchRecommendations}>
          <Text style={styles.refreshButtonText}>GENERATE NEW PLAN</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    padding: 15,
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f9ff',
    padding: 15,
  },
  header: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: hp('2%'),
    textAlign: 'center',
  },
  userDataContainer: {
    backgroundColor: 'rgba(230, 242, 255, 0.7)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  userDataText: {
    fontSize: 15,
    color: '#333',
    marginBottom: 5,
  },
  budgetContainer: {
    backgroundColor: 'rgba(230, 242, 255, 0.7)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  budgetLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  budgetInput: {
    backgroundColor: '#fff',
    borderRadius: wp('2%'),
    padding: wp('3%'),
    fontSize: wp('4.5%'),
    borderWidth: 1,
    borderColor: '#ccc',
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: wp('2%'),
    padding: wp('3%'),
    marginRight: wp('2.5%'),
    fontSize: wp('4%'),
    borderWidth: 1,
    borderColor: '#ccc',
  },
  searchButton: {
    backgroundColor: '#4A90E2',
    borderRadius: wp('2%'),
    padding: wp('3%'),
    width: wp('22%'),
    alignItems: 'center',
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#FFFFFF',
  },
  errorContainer: {
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
  },
  totalContainer: {
    backgroundColor: '#2a5885',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  totalText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  mealSection: {
    marginBottom: 20,
  },
  mealSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00000',
    marginBottom: 10,
  },
  mealCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  mealName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2a5885',
    marginBottom: 8,
  },
  mealDescription: {
    fontSize: 15,
    color: '#555',
    marginBottom: 15,
    lineHeight: 22,
  },
  mealFacts: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  factBox: {
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    padding: 8,
    borderRadius: 8,
    minWidth: 100,
  },
  factNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2a5885',
  },
  factLabel: {
    fontSize: 12,
    color: '#666',
    textTransform: 'uppercase',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2a5885',
    marginTop: 10,
    marginBottom: 5,
  },
  ingredientItem: {
    fontSize: 14,
    color: '#555',
    marginBottom: 3,
    marginLeft: 5,
  },
  preparationText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  nutritionText: {
    fontSize: 14,
    color: '#27ae60',
    lineHeight: 20,
  },
  refreshButton: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  refreshButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SearchFormeal;