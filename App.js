
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//user
import HighScreen from './screens/High';
import Home from './screens/Home';
import Low from './screens/Low';
import Normal from './screens/Normal';
import Screen1 from './screens/Screen1';
import Screen2 from './screens/Screen2';
import Signin from './screens/Signin';
import Signup from './screens/Signup';
import Veryhigh from './screens/Veryhigh';
import Verylow from './screens/Verylow';
import Account from './screens/Account';
import SplashScreen from './screens/Splash';
import Cumulativebloodsugar from './screens/Cumulativebloodsugar';
import Fastingbloodsugar from './screens/Fastingbloodsugar';
import SearchFormeal from './screens/SearchFormeal'
import Medicines from './screens/medicines'
import Addmedicine from './screens/Addmedicine'
import Password from './screens/Password'
import Profile from './screens/Profile'
import Glucosereads from './screens/Glucosereads'
import Cumulativenormal from './screens/Cumulativenormal'
import Prediabetes from './screens/Pre-diabetes.jsx'
import Diabeticpatient from './screens/Diabeticpatient'
import forgotpassword from './screens/ForgotPassword.jsx'
import ChatListDoctors from './screens/ChatListDoctors'
import Reports from './screens/Reports.jsx';
import EditProfile from './screens/EditProfile.jsx'
import ListOfDoctors from './screens/ListOfDoctors.jsx'

//doctor
import Doctorhome from './Doctors/Doctorhome'
import Doctornote from './Doctors/Doctornote'
import Doctorsignup from './Doctors/Doctorsignup'
import Doctorsignin from './Doctors/Doctorsignin'
import PatientsRequests from './Doctors/PatientsRequests'
import Chat from './Doctors/Chat'
import HelpUs from './screens/HelpUs'
import ChatListUsers from './Doctors/ChatListUsers.jsx'
import AccountDocror from './Doctors/AccountDoctor.jsx';
import DoctorProfile from './Doctors/ProfileDoctor.jsx';
import ChangepasswordDoctor from './Doctors/ChangepasswordDoctor.jsx'


//Admin
import AdminSignIn from './admin/Signinadmin.jsx'









const Stack = createStackNavigator();

const App = () => {
  
  const [isSplashVisible, setSplashVisible] = useState(true);

  if (isSplashVisible) {
      return <SplashScreen onSplashEnd={() => setSplashVisible(false)} />;
  }

  return (
    

    <NavigationContainer>
      <Stack.Navigator initialRouteName="Screen1">
        {/* <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }}/> */}
        <Stack.Screen name="Screen1" component={Screen1}options={{ headerShown: false }}/>
        <Stack.Screen name="Screen2" component={Screen2} options={{ headerShown: false }}/>
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
        <Stack.Screen name="Medicines" component={Medicines} options={{ headerShown: false }}/>
        <Stack.Screen name="Addmedicine" component={Addmedicine} options={{ headerShown: false }}/>
        <Stack.Screen name="Password" component={Password} options={{ headerShown: false }}/>
        <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
        <Stack.Screen name="Cumulativenormal" component={Cumulativenormal} options={{ headerShown: false }}/>
        <Stack.Screen name="Prediabetes" component={Prediabetes} options={{ headerShown: false }}/>
        <Stack.Screen name="Diabeticpatient" component={Diabeticpatient} options={{ headerShown: false }}/>
        <Stack.Screen name="forgotpassword" component={forgotpassword} options={{ headerShown: false }}/>   
        <Stack.Screen name="Glucosereads" component={Glucosereads} options={{ headerShown: false }}/>
        <Stack.Screen name="ChatListDoctors" component={ChatListDoctors} options={{ headerShown: false }}/>
        <Stack.Screen name="Reports" component={Reports} options={{ headerShown: false }}/>
        <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }}/>
        <Stack.Screen name="ListOfDoctors" component={ListOfDoctors} options={{ headerShown: false }}/>







        <Stack.Screen name="Doctorsignup" component={Doctorsignup} options={{ headerShown: false }}/>
        <Stack.Screen name="Doctorsignin" component={Doctorsignin} options={{ headerShown: false }}/>
        <Stack.Screen name="Doctorhome" component={Doctorhome} options={{ headerShown: false }}/>
        <Stack.Screen name="Doctornote" component={Doctornote} options={{ headerShown: false }}/>
        <Stack.Screen name="PatientsRequests" component={PatientsRequests} options={{ headerShown: false }}/>
        <Stack.Screen name="Chat" component={Chat} options={{ headerShown: false }}/>
        <Stack.Screen name="ChatListUsers" component={ChatListUsers} options={{ headerShown: false }}/>
        <Stack.Screen name="HelpUs" component={HelpUs} options={{ headerShown: false }}/>
        <Stack.Screen name="AccountDocror" component={AccountDocror} options={{ headerShown: false }}/>
        <Stack.Screen name="DoctorProfile" component={DoctorProfile} options={{ headerShown: false }}/>
        <Stack.Screen name="ChangepasswordDoctor" component={ChangepasswordDoctor} options={{ headerShown: false }}/>



       
        

        <Stack.Screen name="AdminSignIn" component={AdminSignIn} options={{ headerShown: false }}/>















        




      </Stack.Navigator>
    </NavigationContainer>
    
  );
};

export default App;
