import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HighScreen from './screens/High';
import Home from './screens/Home';
import Low from './screens/Low';
import Normal from './screens/Normal';
import Screen from './screens/Screen1';
import Signin from './screens/Signin';
import Signup from './screens/Signup';
import Veryhigh from './screens/Veryhigh';
import Verylow from './screens/Verylow';
import Account from './screens/Account';
import SplashScreen from './screens/Splash';
import Cumulativebloodsugar from './screens/Cumulativebloodsugar';
import Fastingbloodsugar from './screens/Fastingbloodsugar';
import SearchFormeal from './screens/SearchFormeal'

const Stack = createStackNavigator();

const App = () => {
  const [isSplashVisible, setSplashVisible] = useState(true);

  if (isSplashVisible) {
      return <SplashScreen onSplashEnd={() => setSplashVisible(false)} />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Screen">
        {/* <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }}/> */}
        <Stack.Screen name="Screen" component={Screen} options={{ headerShown: false }}/>
        <Stack.Screen name="Signin" component={Signin} options={{ headerShown: false }}/>
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }}/>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
        <Stack.Screen name="Cumulativebloodsugar" component={Cumulativebloodsugar} options={{ headerShown: false }}/>
        <Stack.Screen name="Fastingbloodsugar" component={Fastingbloodsugar} options={{ headerShown: false }}/>
        <Stack.Screen name="HighScreen" component={HighScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Low" component={Low} options={{ headerShown: false }}/>
        <Stack.Screen name="Normal" component={Normal} options={{ headerShown: false }}/>
        <Stack.Screen name="Veryhigh" component={Veryhigh} options={{ headerShown: false }}/>
        <Stack.Screen name="Verylow" component={Verylow} options={{ headerShown: false }}/>
        <Stack.Screen name="Account" component={Account} options={{ headerShown: false }}/>
        <Stack.Screen name="SearchFormeal" component={SearchFormeal} options={{ headerShown: false }}/>
        




      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
