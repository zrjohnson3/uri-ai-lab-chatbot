import React from 'react';
import Chatbot from './components/Chatbot';
import Landing from './components/Landing';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateAccount from './components/CreateAccount';
import Login from './components/Login';
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { development } from './config';

const Stack = createNativeStackNavigator();

export default function App() {

  console.log('Clerk Key:', development.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY)

  return (
    <ClerkProvider
      routerPush={() => { }}
      routerReplace={() => { }}
      publishableKey={development.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >


      <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen name="Home" component={Landing} navigationKey='Landing' />
          <Stack.Screen name="URI AI Lab ChatBot" component={Chatbot} navigationKey='Chatbot' />
          {/* <SignedIn>
            <Stack.Screen name="ZChat" component={Chatbot} navigationKey='Chatbot' />
          </SignedIn> */}
          <Stack.Screen name="Login" component={Login} navigationKey='Login' />
          <Stack.Screen name="SignUp" component={CreateAccount} navigationKey='SignUpScreen' />
        </Stack.Navigator>
      </NavigationContainer>
    </ClerkProvider >
  );
}