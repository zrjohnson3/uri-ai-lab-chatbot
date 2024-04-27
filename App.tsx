import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { fetchAIResponse } from './api/ai';
import tw from 'tailwind-react-native-classnames';
import ChatBubble from './components/ChatBubble';
import Chatbot from './components/Chatbot';

export default function App() {

  return (
    <>
      <Chatbot />
    </>
  );
}