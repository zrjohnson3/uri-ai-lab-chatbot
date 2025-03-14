import React, { useState } from 'react';
import { TouchableOpacity, Text, ActivityIndicator, ViewStyle } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import * as Speech from 'expo-speech';
import { AntDesign } from '@expo/vector-icons';

interface ExpoSpeechProps {
    text: string;
    style?: ViewStyle;
}

const ExpoSpeech: React.FC<ExpoSpeechProps> = ({ text, style }) => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSpeech = async () => {
        try {
            setIsSpeaking(true);
            setError(null);
            
            // Stop any ongoing speech
            await Speech.stop();
            
            // Check if speech is available
            const isSpeechAvailable = await Speech.getAvailableVoicesAsync();
            if (!isSpeechAvailable) {
                throw new Error('Text-to-speech is not available on this device');
            }

            console.log('Starting speech:', text);
            
            await Speech.speak(text, {
                language: 'en-US',
                rate: 1,
                onStart: () => {
                    console.log('Speech started');
                    setIsSpeaking(true);
                },
                onDone: () => {
                    console.log('Speech finished');
                    setIsSpeaking(false);
                },
                onError: (error) => {
                    console.error('Speech error:', error);
                    setError('Failed to play speech');
                    setIsSpeaking(false);
                }
            });
        } catch (err) {
            console.error('Speech error:', err);
            setError(err instanceof Error ? err.message : 'Failed to play speech');
            setIsSpeaking(false);
        }
    };

    return (
        <TouchableOpacity 
            onPress={handleSpeech} 
            style={[
                tw`rounded-lg px-1 py-1 w-8 h-8 ml-2 flex items-center justify-center`,
                { backgroundColor: error ? '#FEE2E2' : '#003DA5' },
                style
            ]}
            disabled={isSpeaking}
        >
            {isSpeaking ? (
                <ActivityIndicator size={24} color="#FFFFFF" />
            ) : (
                <AntDesign 
                    name={error ? "warning" : "sound"} 
                    size={14} 
                    color="#FFFFFF" 
                />
            )}
        </TouchableOpacity>
    );
};

export default ExpoSpeech;
