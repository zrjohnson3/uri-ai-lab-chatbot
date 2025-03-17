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
          <Stack.Screen 
            name="Landing" 
            component={Landing} 
            options={{ 
              title: 'URI AI Lab',
              headerStyle: {
                backgroundColor: '#003DA5',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              }
            }}
          />
          <Stack.Screen 
            name="Chatbot" 
            component={Chatbot} 
            options={{ 
              title: 'URI AI Lab Assistant',
              headerStyle: {
                backgroundColor: '#003DA5',
              },
              headerTintColor: '#fff',
            }}
          />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={CreateAccount} />
        </Stack.Navigator>
      </NavigationContainer>
    </ClerkProvider>
  );
}