import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import * as Speech from 'expo-speech';
import { AntDesign } from '@expo/vector-icons';

const ExpoSpeech = ({ text }: { text: string }) => {
    const handleSpeech = () => {
        Speech.stop(); // Stop any ongoing speech
        console.log('Speech:', text);
        Speech.speak(text, { language: 'en-US', rate: 1 });
    };

    return (
        <TouchableOpacity onPress={handleSpeech} style={tw`bg-blue-400 rounded-lg px-1 py-1 w-6 h-6`}>
            <Text style={tw`text-white`}><Text style={tw`text-white`}><AntDesign name="sound" size={14} color="black" /></Text></Text>
        </TouchableOpacity>
    );
};

export default ExpoSpeech;
