import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { fetchAIResponse } from './api/ai';
import tw from 'tailwind-react-native-classnames';
import ChatBubble from './components/ChatBubble';

export default function App() {

  const [messages, setMessages] = useState<{ text: String; type: 'user' | 'admin' }[]>([]); // Array of objects [{role: 'user', content: 'Hello'}, {role: 'system', content: 'Hi!'}
  const [inputMessage, setInputMessage] = useState('');
  // const [outputMessage, setOutputMessage] = useState('');
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   outputMessage;
  // }, [outputMessage]);

  // Handle Text Input
  const handleTextInput = (text: string) => {
    setInputMessage(text);
  }

  // Submit Message Button Clicked
  const handleSubmitMessage = async () => {
    // setMessages([...messages, { role: 'user', content: inputMessage }]);
    setMessages(prev => [...prev, { text: inputMessage, type: 'user' }]);
    console.log('Button Clicked, Message sent');
    console.log(inputMessage);

    try {
      const data = await fetchAIResponse(inputMessage);
      console.log(data);
      if (data.choices && data.choices.length > 0) {
        const messageContent = data.choices[0].message.content;
        setMessages(prev => [...prev, { text: messageContent, type: 'admin' }]);
        console.log('Message Content:', messageContent);
        // setOutputMessage(messageContent);
      }
    }
    catch (error: any) {
      setError(error)
      console.error('Error:', error);
    }

  }


  // type BubbleType = 'user' | 'admin';

  // interface ChatBubbleProps {
  //   text: string;
  //   type: BubbleType;
  // }

  // const ChatBubble: React.FC<ChatBubbleProps> = ({ text, type }) => {
  //   const isUser = type === 'user';
  //   const bubbleStyle = tw`max-w-3/4 p-3 rounded-lg m-2 ${isUser ? 'bg-blue-500 ml-auto' : 'bg-gray-300 mr-auto'
  //     }`;
  //   const textStyle = tw`text-lg ${isUser ? 'text-white' : 'text-black'}`;

  //   return (
  //     <View style={bubbleStyle} >
  //       <Text style={textStyle}> {text} </Text>
  //     </View>
  //   );
  // };


  return (
    <View style={tw`flex-1 justify-center items-center bg-blue-100`}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
        <Text style={{ paddingTop: '8%', justifyContent: 'center' }}>Welcome to ZenBot! Ask me anything :)</Text>
        <Text style={{ padding: '5%', justifyContent: 'center' }}>Results will be shown here</Text>
        {/* <Text style={{ paddingBottom: '5%', justifyContent: 'center' }}>{outputMessage}</Text> */}

        <View style={tw`w-full p-4`}>
          {messages.map((message, index) => (
            <ChatBubble key={index} text={message.text} type={message.type} />
          ))}
        </View>
        {/* 
        <ChatBubble text={outputMessage} type='admin' /> */}
        {/* <ChatBubble text={inputMessage} type='user' /> */}
      </ScrollView>


      <View style={{ flexDirection: "row", padding: '2%', margin: '2%', alignItems: 'center', alignContent: 'space-between', borderTopWidth: 1 }}>
        <TextInput
          onChangeText={handleTextInput}
          style={inputStyle}
          value={inputMessage}
          placeholder='Enter your question!'
          placeholderTextColor={"grey"}
        />
        <TouchableOpacity onPress={handleSubmitMessage}>
          <Text style={tw`${themeColors.button}`}>Send Message</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
