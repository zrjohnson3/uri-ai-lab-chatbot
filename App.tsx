import React from 'react';
import Chatbot from './components/Chatbot';
import Landing from './components/Landing';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateAccount from './components/CreateAccount';
import Login from './components/Login';
const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <>
//       <Landing />
//       {/* <Chatbot /> */}
//     </>
//   );
// }

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name="Home" component={Landing} navigationKey='Landing' />
        <Stack.Screen name="ZChat" component={Chatbot} navigationKey='Chatbot' />
        <Stack.Screen name="Login" component={Login} navigationKey='Login' />
        <Stack.Screen name="SignUp" component={CreateAccount} navigationKey='CreateAccount' />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const themeColors = {
  background: 'bg-blue-50',
  button: 'bg-blue-400 rounded-lg text-white px-4 py-2',
  buttonText: 'text-black',
  input: 'bg-black rounded-lg px-4 py-2',
  text: 'text-blue-900'
};