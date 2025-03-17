import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { fetchAIResponse } from '../api/ai';
import tw from 'tailwind-react-native-classnames';
import ChatBubble from '../components/ChatBubble';
import { useNavigation, useRoute } from '@react-navigation/native';

interface RouteParams {
    userRole?: string;
}

const Chatbot = () => {
    const [messages, setMessages] = useState<{ text: string; type: 'user' | 'admin' }[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [error, setError] = useState(null);
    const [isTyping, setIsTyping] = useState(false);
    
    const inputRef = useRef<TextInput>(null);
    const scrollViewRef = useRef<ScrollView>(null);
    const navigation = useNavigation();
    const route = useRoute();
    const { userRole } = route.params as RouteParams;

    // Set initial welcome message based on user role
    useEffect(() => {
        const welcomeMessage = getWelcomeMessage();
        setMessages([{ text: welcomeMessage, type: 'admin' }]);
    }, [userRole]);

    const getWelcomeMessage = () => {
        switch (userRole) {
            case 'student':
                return "Welcome! I'm here to help you explore our research projects, access learning materials, and find opportunities to get involved in AI research. What would you like to know about?";
            case 'faculty':
                return "Welcome! I can help you with research collaboration opportunities, lab resources, and connecting with other faculty members. How can I assist you today?";
            case 'industry':
                return "Welcome! I'm here to help you explore partnership opportunities, learn about our research capabilities, and discuss potential collaborations. What interests you?";
            case 'public':
                return "Welcome! I can help you learn about our AI research initiatives, public programs, and how our work impacts the community. What would you like to know?";
            default:
                return "Welcome to the URI AI Lab! I'm here to help you learn about our research, facilities, and services. What would you like to know?";
        }
    };

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
                `You are the URI AI Lab's intelligent assistant. The user is a ${userRole || 'visitor'}. Provide responses tailored to their role and interests.`,
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
            <View style={[tw`py-2 bg-white`, {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 3,
                borderBottomWidth: 1,
                borderBottomColor: '#f0f0f0'
            }]}>
                <Text style={tw`text-center text-base font-medium text-gray-800`}>
                    URI AI Lab Assistant
                </Text>
                <Text style={tw`text-center text-xs text-gray-600`}>
                    {userRole ? `Welcome, ${userRole.charAt(0).toUpperCase() + userRole.slice(1)}!` : 'Welcome!'}
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