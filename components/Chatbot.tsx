import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Button } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { fetchAIResponse, EXAMPLE_PROMPTS, createConversationContext } from '../api/ai';
import tw from 'tailwind-react-native-classnames';
import ChatBubble from '../components/ChatBubble';
import { useNavigation } from '@react-navigation/native';

// Define chat modes with more appropriate names
const CHAT_MODES = {
    DEFAULT: 'default',
    INFO: 'info',
    TECHNICAL: 'technical',
    COLLABORATION: 'collaboration'
};

const Chatbot = () => {
    const [messages, setMessages] = useState<{ text: string; type: 'user' | 'admin' }[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [error, setError] = useState(null);
    const [chatMode, setChatMode] = useState(CHAT_MODES.DEFAULT);
    
    const inputRef = useRef(null);
    const navigator = useNavigation();

    // Convert messages to ChatMessage format for API
    const getConversationHistory = () => {
        return messages.map(msg => ({
            role: msg.type === 'user' ? 'user' as const : 'assistant' as const,
            content: msg.text
        }));
    };

    // Get the appropriate system prompt based on chat mode
    const getSystemPrompt = () => {
        switch(chatMode) {
            case CHAT_MODES.INFO:
                return EXAMPLE_PROMPTS.customerService;
            case CHAT_MODES.TECHNICAL:
                return EXAMPLE_PROMPTS.technicalSupport;
            case CHAT_MODES.COLLABORATION:
                return EXAMPLE_PROMPTS.salesAssistant;
            default:
                return 'You are the URI AI Lab assistant, ready to help with information about our research, facilities, and collaboration opportunities.';
        }
    };

    // Handle Text Input
    const handleTextInput = (text: string) => {
        setInputMessage(text);
    }

    // Submit Message Button Clicked
    const handleSubmitMessage = async () => {
        if (inputMessage.trim() === '') {
            console.log('Empty Message');
            return;
        }

        setMessages(prev => [...prev, { text: inputMessage, type: 'user' }]);
        const currentMessage = inputMessage;
        setInputMessage('');

        try {
            const data = await fetchAIResponse(
                currentMessage,
                getSystemPrompt(),
                getConversationHistory(),
                { temperature: 0.7 }
            );

            if (data.choices && data.choices.length > 0) {
                const messageContent = data.choices[0].message.content;
                setMessages(prev => [...prev, { text: messageContent, type: 'admin' }]);
            }
        }
        catch (error: any) {
            setError(error);
            console.error('Error:', error);
        }
    }

    // Change chat mode
    const handleChangeChatMode = (mode: string) => {
        setChatMode(mode);
        setMessages([]); // Clear chat history when changing modes
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={[tw`flex-1`, { backgroundColor: '#f8fafc' }]}
            keyboardVerticalOffset={Platform.OS === "ios" ? 78 : 0}
        >
            {/* Mode Selection */}
            <View style={[tw`flex-row justify-around p-3 bg-white`, {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 3,
                borderBottomWidth: 1,
                borderBottomColor: '#f0f0f0'
            }]}>
                {Object.entries(CHAT_MODES).map(([key, mode]) => (
                    <TouchableOpacity 
                        key={mode}
                        onPress={() => handleChangeChatMode(mode)}
                        style={[
                            tw`px-4 py-2 rounded-full`,
                            chatMode === mode 
                                ? { backgroundColor: '#003DA5' }
                                : { backgroundColor: '#f3f4f6' }
                        ]}
                    >
                        <Text style={[
                            tw`text-sm font-medium`,
                            chatMode === mode ? tw`text-white` : tw`text-gray-600`
                        ]}>
                            {key.charAt(0) + key.slice(1).toLowerCase()}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <ScrollView 
                style={tw`flex-1`}
                contentContainerStyle={tw`pb-4`}
                keyboardShouldPersistTaps="handled"
            >
                <View style={tw`px-4 py-6`}>
                    <Text style={tw`text-center text-xl font-bold text-gray-800`}>
                        URI AI Lab Assistant
                    </Text>
                    <Text style={tw`text-center text-sm text-gray-600 mt-2`}>
                        {getModeDescription(chatMode)}
                    </Text>
                </View>

                <View style={tw`flex-1 px-2`}>
                    {messages.map((message, index) => (
                        <ChatBubble 
                            key={index} 
                            text={message.text} 
                            type={message.type}
                            style={message.type === 'user' ? styles.userMessage : styles.botMessages} 
                        />
                    ))}
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
                        placeholder="Type your message..."
                        placeholderTextColor="#9CA3AF"
                        multiline
                    />
                    <TouchableOpacity 
                        onPress={handleSubmitMessage}
                        disabled={!inputMessage.trim()}
                        style={[
                            tw`rounded-full p-3`,
                            { backgroundColor: inputMessage.trim() ? '#003DA5' : '#E5E7EB' }
                        ]}
                    >
                        <Text style={[
                            tw`text-center font-medium`,
                            { color: inputMessage.trim() ? '#ffffff' : '#9CA3AF' }
                        ]}>Send</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <StatusBar style="dark" />
        </KeyboardAvoidingView>
    );
}

// Helper function to get mode descriptions
const getModeDescription = (mode: string) => {
    switch(mode) {
        case CHAT_MODES.INFO:
            return "Ask about our lab, team, and facilities";
        case CHAT_MODES.TECHNICAL:
            return "Technical inquiries and research questions";
        case CHAT_MODES.COLLABORATION:
            return "Explore research partnerships and collaboration";
        default:
            return "How can I assist you today?";
    }
};

// Update styles
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

// Update theme colors to match URI brand
const themeColors = {
    background: 'bg-white',
    button: 'bg-blue-800 rounded-lg text-white px-4 py-2',
    buttonText: 'text-white',
    input: 'bg-white rounded-lg px-4 py-2',
    text: 'text-gray-800'
};

const inputStyle = tw`flex-1 mx-2 p-2 border border-black rounded-lg`;
const buttonStyle = tw`px-4 py-2 rounded-lg ${themeColors.button}`;

const messageContainerStyle = tw`p-4 border-b border-blue-200 w-full`;
const messageTextStyle = tw`${themeColors.text} text-lg`;

export default Chatbot