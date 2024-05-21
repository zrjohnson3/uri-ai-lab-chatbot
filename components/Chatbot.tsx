import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Button } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { fetchAIResponse } from '../api/ai';
import tw from 'tailwind-react-native-classnames';
import ChatBubble from '../components/ChatBubble';
import { useNavigation } from '@react-navigation/native';


const Chatbot = () => {
    const [messages, setMessages] = useState<{ text: string; type: 'user' | 'admin' }[]>([]); // Array of objects [{role: 'user', content: 'Hello'}, {role: 'system', content: 'Hi!'}
    const [inputMessage, setInputMessage] = useState('');
    const [error, setError] = useState(null);

    const inputRef = useRef(null);

    const navigator = useNavigation();
    // const user = // check if user is logged in
    // // Add your logic here to check if the user is logged in
    // // For example, you can use a state variable or a function to determine the user's login status

    // useEffect(() => {
    //     // Focus on the input field when the component mounts
    //     if (user) {
    //         (navigator.setOptions({ // Replace 'navigation' with 'navigator'
    //             headerLeft: () => (
    //                 <Button title="Go back" onPress={() => navigator.goBack()} /> // Replace 'navigation' with 'navigator'
    //             ),
    //         }), []); // Add the missing closing parenthesis
    //     }
    // })


    // Handle Text Input
    const handleTextInput = (text: string) => {
        setInputMessage(text);
    }

    // Submit Message Button Clicked
    const handleSubmitMessage = async () => {

        if (inputMessage.trim() === '') {
            console.log('Empty Message');
            return; // Don't send empty message 
        }

        // setMessages([...messages, { role: 'user', content: inputMessage }]);
        setMessages(prev => [...prev, { text: inputMessage, type: 'user' }]);
        console.log('Button Clicked, Message sent');
        console.log(inputMessage);
        // Clear the input message state (reset the text input)
        setInputMessage('');

        try {
            const data = await fetchAIResponse(inputMessage);
            console.log(data);
            if (data.choices && data.choices.length > 0) {
                const messageContent = data.choices[0].message.content;
                setMessages(prev => [...prev, { text: messageContent, type: 'admin' }]);
                console.log('Message Content:', messageContent);
                // setOutputMessage(messageContent);
                // Clear the input message state to reset the text input
                setInputMessage('');
            }
            // // Clear the input message state to reset the text input
            // setInputMessage('');
        }
        catch (error: any) {
            setError(error)
            console.error('Error:', error);
        }

    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={tw`flex-1 bg-blue-50`}
            keyboardVerticalOffset={Platform.OS === "ios" ? 78 : 0} // Adjust this value based on navbar height or status bar height
        >
            <ScrollView contentContainerStyle={tw`items-center`}>
                {/* Header and Messages */}
                <Text style={tw`mt-2 pt-8 px-2 text-center text-lg`}>
                    Welcome to Z-Bot!{"\n"}Talk directly to ChatGPT
                </Text>
                <View style={tw`w-full p-4`}>
                    {messages.map((message, index) => (
                        <ChatBubble key={index} text={message.text} type={message.type} style={message.type === 'user' ? styles.userMessage : styles.botMessages} />
                    ))}
                </View>
            </ScrollView>

            {/* Input Section */}
            <View style={tw`flex-row p-4 m-2 items-center border-t border-gray-200`}>

                <TextInput
                    onChangeText={handleTextInput}
                    style={tw`flex-1 mx-2 p-2 border border-black rounded-lg`}
                    value={inputMessage}
                    placeholder='Enter your question!'
                    placeholderTextColor={"grey"}
                />
                <TouchableOpacity onPress={handleSubmitMessage} style={tw`bg-blue-400 rounded-lg px-4 py-2`}>
                    <Text style={tw`text-white`}>Send Message</Text>
                </TouchableOpacity>
            </View>

            <StatusBar style="auto" />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    userMessage: {
        backgroundColor: '#3498db',
        marginLeft: 'auto',
        flexDirection: 'row-reverse',
    },
    botMessages: {
        backgroundColor: '#bdc3c7',
        marginRight: 50,
        flexDirection: 'row',
    },
});

const themeColors = {
    background: 'bg-blue-50',
    button: 'bg-blue-400 rounded-lg text-white px-4 py-2',
    buttonText: 'text-black',
    input: 'bg-black rounded-lg px-4 py-2',
    text: 'text-blue-900'
};

const inputStyle = tw`flex-1 mx-2 p-2 border border-black rounded-lg`;
const buttonStyle = tw`px-4 py-2 rounded-lg ${themeColors.button}`;

const messageContainerStyle = tw`p-4 border-b border-blue-200 w-full`;
const messageTextStyle = tw`${themeColors.text} text-lg`;

export default Chatbot