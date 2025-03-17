import React from 'react';
import { View, Text, Animated, Dimensions } from 'react-native';
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
    const screenWidth = Dimensions.get('window').width;
    
    const bubbleStyle = [
        tw`p-4 rounded-2xl my-1 mx-3`,
        {
            maxWidth: screenWidth * 0.75,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.18,
            shadowRadius: 1.00,
            elevation: 1,
        },
        isUser ? [
            tw`bg-blue-600 ml-auto`,
            { marginLeft: 50 }
        ] : [
            tw`bg-gray-100`,
            { marginRight: 50 }
        ],
    ];
    
    const textStyle = [
        tw`${isUser ? 'text-white' : 'text-gray-800'}`,
        { fontSize: 16, lineHeight: 22 }
    ];

    return (
        <View style={[bubbleStyle, style]}>
            <Text style={textStyle}>{text}</Text>
            {!isUser && <ExpoSpeech text={text} style={tw`mt-2`} />}
        </View>
    );
};

export default ChatBubble;