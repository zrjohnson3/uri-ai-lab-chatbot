import React from 'react';
import Chatbot from './components/Chatbot';
import Landing from './components/Landing';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateAccount from './components/CreateAccount';
import Login from './components/Login';
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";

const Stack = createNativeStackNavigator();

if (!process.env.EXPO_PUBLIC_CLERK_SECRET_KEY) {
  throw new Error('Missing EXPO_PUBLIC_CLERK_SECRET_KEY environment variable');
}

const clerkKey = process.env.EXPO_PUBLIC_CLERK_SECRET_KEY;

export default function App() {

  console.log('Clerk Key:', process.env.EXPO_PUBLIC_CLERK_SECRET_KEY)

  return (
    <ClerkProvider
      routerPush={() => { }}
      routerReplace={() => { }}
      publishableKey={clerkKey}
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