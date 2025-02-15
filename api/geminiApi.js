import axios from 'axios';
import { GEMINI_API_KEY } from '@env';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

/**
 * Fetch meal suggestions based on blood sugar level.
 * @param {number} bloodSugar - The entered cumulative blood sugar level.
 * @returns {string[]} Suggested meals.
 */
export const getMealSuggestions = async (bloodSugar) => {
  try {
    const prompt = `A patient has a blood sugar level of ${bloodSugar}. Suggest meals that can help stabilize their condition. Provide a list of meal options.`;

    const response = await axios.post(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      contents: [{ parts: [{ text: prompt }] }],
    });

    return response.data.candidates[0]?.content?.parts[0]?.text || 'No meal suggestions found.';
  } catch (error) {
    console.error('Error fetching meal suggestions:', error);
    return 'Failed to get meal suggestions.';
  }
};
