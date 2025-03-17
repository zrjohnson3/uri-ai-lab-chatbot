import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState, useRef } from 'react';
import { fetchAIResponse } from '../api/ai';
import tw from 'tailwind-react-native-classnames';
import ChatBubble from '../components/ChatBubble';
import { useNavigation } from '@react-navigation/native';

const Chatbot = () => {
    const [messages, setMessages] = useState<{ text: string; type: 'user' | 'admin' }[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [error, setError] = useState(null);
    const [isTyping, setIsTyping] = useState(false);
    
    const inputRef = useRef<TextInput>(null);
    const scrollViewRef = useRef<ScrollView>(null);
    const navigator = useNavigation();

    // Convert messages to ChatMessage format for API
    const getConversationHistory = () => {
        return messages.map(msg => ({
            role: msg.type === 'user' ? 'user' as const : 'assistant' as const,
            content: msg.text
        }));
    };

    // Handle Text Input
    const handleTextInput = (text: string) => {
        setInputMessage(text);
    }

    // Submit Message Button Clicked
    const handleSubmitMessage = async () => {
        if (inputMessage.trim() === '') {
            return;
        }

        setMessages(prev => [...prev, { text: inputMessage, type: 'user' }]);
        const currentMessage = inputMessage;
        setInputMessage('');
        setIsTyping(true);

        try {
            const data = await fetchAIResponse(
                currentMessage,
                undefined, // Using default unified context
                getConversationHistory()
            );

            if (data.choices && data.choices.length > 0) {
                const messageContent = data.choices[0].message.content;
                setMessages(prev => [...prev, { text: messageContent, type: 'admin' }]);
                // Scroll to bottom after new message
                scrollViewRef.current?.scrollToEnd({ animated: true });
            }
        }
        catch (error: any) {
            setError(error);
            console.error('Error:', error);
        }
        finally {
            setIsTyping(false);
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={[tw`flex-1`, { backgroundColor: '#f8fafc' }]}
            keyboardVerticalOffset={Platform.OS === "ios" ? 78 : 0}
        >
            <View style={[tw`p-4 bg-white`, {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 3,
                borderBottomWidth: 1,
                borderBottomColor: '#f0f0f0'
            }]}>
                <Text style={tw`text-center text-xl font-bold text-gray-800`}>
                    URI AI Lab Assistant
                </Text>
                <Text style={tw`text-center text-sm text-gray-600 mt-2`}>
                    Ask me anything about our lab, research, or services
                </Text>
            </View>

            <ScrollView 
                ref={scrollViewRef}
                style={tw`flex-1`}
                contentContainerStyle={tw`pb-4`}
                keyboardShouldPersistTaps="handled"
            >
                <View style={tw`flex-1 px-2`}>
                    {messages.map((message, index) => (
                        <ChatBubble 
                            key={index} 
                            text={message.text} 
                            type={message.type}
                            style={message.type === 'user' ? styles.userMessage : styles.botMessages} 
                        />
                    ))}
                    {isTyping && (
                        <View style={[tw`p-2 mx-3 rounded-lg bg-gray-100`, { width: 60 }]}>
                            <Text style={tw`text-gray-500`}>...</Text>
                        </View>
                    )}
                </View>
            </ScrollView>

            <View style={[tw`p-4 bg-white`, {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: -2 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
                elevation: 5,
                borderTopWidth: 1,
                borderTopColor: '#f0f0f0'
            }]}>
                <View style={tw`flex-row items-center`}>
                    <TextInput
                        ref={inputRef}
                        onChangeText={handleTextInput}
                        style={[tw`flex-1 px-4 py-3 mr-3 rounded-full bg-gray-100`, {
                            fontSize: 16
                        }]}
                        value={inputMessage}
                        placeholder="Ask about our research, facilities, or services..."
                        placeholderTextColor="#9CA3AF"
                        multiline
                    />
                    <TouchableOpacity 
                        onPress={handleSubmitMessage}
                        disabled={!inputMessage.trim() || isTyping}
                        style={[
                            tw`rounded-full p-3`,
                            { 
                                backgroundColor: (!inputMessage.trim() || isTyping) 
                                    ? '#E5E7EB' 
                                    : '#003DA5'
                            }
                        ]}
                    >
                        <Text style={[
                            tw`text-center font-medium`,
                            { 
                                color: (!inputMessage.trim() || isTyping)
                                    ? '#9CA3AF'
                                    : '#ffffff'
                            }
                        ]}>Send</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <StatusBar style="dark" />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    userMessage: {
        backgroundColor: '#003DA5',
    },
    botMessages: {
        backgroundColor: '#f3f4f6',
    }
});

export default Chatbot;