import Constants from 'expo-constants';

const getLocalIP = () => {
  const debuggerHost = Constants.expoConfig?.hostUri?.split(':').shift();
  return `http://${debuggerHost}:5500`;
};

export const ip = getLocalIP();
