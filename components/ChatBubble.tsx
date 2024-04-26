import React from 'react';
import { View, Text } from 'react-native';
import tw from 'tailwind-react-native-classnames';

type BubbleType = 'user' | 'admin';

interface ChatBubbleProps {
    text: String;
    type: BubbleType;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ text, type }) => {
    const isUser = type === 'user';
    const bubbleStyle = [
        tw`p-3 rounded-lg m-2`,
        isUser ? tw`bg-blue-500 ml-auto` : tw`bg-gray-300 mr-auto`,
    ];
    const textStyle = tw`text-lg ${isUser ? 'text-white' : 'text-black'}`;

    return (
        <View style={bubbleStyle}>
            <Text style={textStyle}>{text}</Text>
        </View>
    );
};

export default ChatBubble;