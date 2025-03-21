import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard, Animated, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { fetchAIResponse } from '../api/ai';
import tw from 'tailwind-react-native-classnames';
import ChatBubble from '../components/ChatBubble';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

interface RouteParams {
    userRole?: string;
}

const TypingIndicator = () => {
    const [dots, setDots] = useState('');
    const fadeAnim = useRef(new Animated.Value(0.3)).current;

    useEffect(() => {
        const interval = setInterval(() => {
            setDots(prev => prev.length >= 3 ? '' : prev + '.');
        }, 500);

        // Create a loop animation
        const startAnimation = () => {
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true
                }),
                Animated.timing(fadeAnim, {
                    toValue: 0.3,
                    duration: 500,
                    useNativeDriver: true
                })
            ]).start(() => startAnimation()); // Restart animation when complete
        };

        startAnimation();
        return () => {
            clearInterval(interval);
            fadeAnim.stopAnimation();
        };
    }, []);

    return (
        <View style={[tw`p-4 mx-3 rounded-lg bg-white border border-gray-200`, { width: 100 }]}>
            <View style={tw`flex-row items-center`}>
                <View style={[tw`w-2 h-2 rounded-full bg-blue-500 mr-2`, { opacity: 0.7 }]} />
                <Animated.Text style={[tw`text-gray-500`, { opacity: fadeAnim }]}>
                    {`Typing${dots}`}
                </Animated.Text>
            </View>
        </View>
    );
};

const Chatbot = () => {
    const [messages, setMessages] = useState<{ text: string; type: 'user' | 'admin' }[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [error, setError] = useState(null);
    const [isTyping, setIsTyping] = useState(false);
    const [lastScrollPosition, setLastScrollPosition] = useState(0);
    
    const inputRef = useRef<TextInput>(null);
    const scrollViewRef = useRef<ScrollView>(null);
    const navigation = useNavigation();
    const route = useRoute();
    const { userRole } = route.params as RouteParams;

    // Configure the native header
    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: "URI AI Lab Assistant",
            headerBackTitle: "Back",
            headerTintColor: '#ffffff',
            headerStyle: {
                backgroundColor: '#003DA5',
            },
            headerTitleStyle: {
                fontSize: 17,
                fontWeight: '600',
            },
            headerRight: () => (
                <Text style={[tw`text-white text-sm mr-4`, { opacity: 0.9 }]}>
                    {userRole ? `${userRole.charAt(0).toUpperCase() + userRole.slice(1)}` : ''}
                </Text>
            ),
        });
    }, [navigation, userRole]);

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

    // Track scroll position
    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        setLastScrollPosition(event.nativeEvent.contentOffset.y);
    };

    // Submit Message Button Clicked
    const handleSubmitMessage = async () => {
        if (inputMessage.trim() === '') {
            return;
        }

        // Dismiss keyboard
        Keyboard.dismiss();

        setMessages(prev => [...prev, { text: inputMessage, type: 'user' }]);
        const currentMessage = inputMessage;
        setInputMessage('');
        setIsTyping(true);

        // Scroll to show user's message
        setTimeout(() => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);

        try {
            const data = await fetchAIResponse(
                currentMessage,
                `You are the URI AI Lab's intelligent assistant. The user is a ${userRole || 'visitor'}. Provide responses tailored to their role and interests.`,
                getConversationHistory()
            );

            if (data.choices && data.choices.length > 0) {
                const messageContent = data.choices[0].message.content;
                setMessages(prev => [...prev, { text: messageContent, type: 'admin' }]);
                
                // After adding AI response, scroll appropriately
                setTimeout(() => {
                    if (messageContent.length > 100) {
                        // For longer messages, scroll to show the start of the AI response
                        scrollViewRef.current?.scrollTo({ 
                            y: lastScrollPosition + 100, // Approximate height of user message
                            animated: true 
                        });
                    } else {
                        // For shorter messages, scroll to bottom
                        scrollViewRef.current?.scrollToEnd({ animated: true });
                    }
                }, 100);
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

    // Handle double tap to dismiss keyboard
    const lastTap = useRef(0);
    const handleDoubleTap = () => {
        const now = Date.now();
        const DOUBLE_PRESS_DELAY = 300;
        if (now - lastTap.current < DOUBLE_PRESS_DELAY) {
            Keyboard.dismiss();
        }
        lastTap.current = now;
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={[tw`flex-1`, { backgroundColor: '#f8fafc' }]}
            keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
        >
            <ScrollView 
                ref={scrollViewRef}
                style={tw`flex-1`}
                contentContainerStyle={tw`pb-6`}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                onTouchEnd={handleDoubleTap}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                <View style={tw`flex-1 px-2 pt-2`}>
                    {messages.map((message, index) => (
                        <ChatBubble 
                            key={index} 
                            text={message.text} 
                            type={message.type}
                            style={message.type === 'user' ? styles.userMessage : styles.botMessages} 
                        />
                    ))}
                    {isTyping && <TypingIndicator />}
                </View>
            </ScrollView>

            <View style={[tw`p-4 bg-white`, {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: -2 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
                elevation: 5,
                borderTopWidth: 1,
                borderTopColor: '#f0f0f0',
                paddingBottom: Platform.OS === "ios" ? 24 : 16
            }]}>
                <View style={tw`flex-row items-center`}>
                    <TextInput
                        ref={inputRef}
                        onChangeText={handleTextInput}
                        style={[tw`flex-1 px-4 py-2.5 mr-3 rounded-full bg-gray-50 border border-gray-200`, {
                            fontSize: 15,
                            maxHeight: 100,
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
                            tw`rounded-full p-3 flex items-center justify-center`,
                            { 
                                backgroundColor: (!inputMessage.trim() || isTyping) 
                                    ? '#E5E7EB' 
                                    : '#003DA5',
                                width: 44,
                                height: 44,
                            }
                        ]}
                    >
                        <Ionicons 
                            name="send" 
                            size={20} 
                            color={(!inputMessage.trim() || isTyping) ? '#9CA3AF' : '#ffffff'} 
                        />
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