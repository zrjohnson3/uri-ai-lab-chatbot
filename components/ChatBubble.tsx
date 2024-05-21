import React from 'react';
import { View, Text } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import ExpoSpeech from './ExpoSpeech';

type BubbleType = 'user' | 'admin';

interface ChatBubbleProps {
    text: string;
    type: BubbleType;
    style: any;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ text, type, style }) => {
    const isUser = type === 'user';
    const bubbleStyle = [
        tw`p-3 rounded-lg m-2 flex-row`,
        isUser ? tw`bg-blue-500 ml-auto ` : tw`bg-gray-300 mr-auto m-2`,
    ];
    const textStyle = tw`p-1 ${isUser ? 'text-white' : 'text-black'}`; // removed text-large - was to big
    const speechButtonStyle = tw`w-8 h-8 bg-gray-500`;

    return (
        <View style={[bubbleStyle, style]}>
            <Text style={textStyle}>{text}</Text>
            {!isUser && <ExpoSpeech text={text} />}
        </View>
    );
};

export default ChatBubble;