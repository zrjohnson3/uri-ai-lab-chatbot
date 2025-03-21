import React from 'react';
import { View, Text, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { Dimensions } from 'react-native';
import ExpoSpeech from './ExpoSpeech';

interface ChatBubbleProps {
    text: string;
    type: 'user' | 'admin';
    style?: ViewStyle;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ text, type, style }) => {
    const screenWidth = Dimensions.get('window').width;
    const maxWidth = type === 'admin' ? screenWidth * 0.92 : screenWidth * 0.75;

    const bubbleStyle: StyleProp<ViewStyle> = [
        styles.bubble,
        type === 'user' ? styles.userBubble : styles.adminBubble,
        { maxWidth },
        style
    ];

    const textStyle = type === 'user' ? styles.userText : styles.adminText;

    return (
        <View style={[
            styles.container,
            type === 'user' ? styles.userContainer : styles.adminContainer
        ]}>
            <View style={bubbleStyle}>
                <Text style={textStyle}>{text}</Text>
                {type !== 'user' && <ExpoSpeech text={text} style={styles.speech} />}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 6,
        paddingHorizontal: 12,
        width: '100%',
    },
    userContainer: {
        alignItems: 'flex-end',
    },
    adminContainer: {
        alignItems: 'flex-start',
        paddingRight: 24,
    },
    bubble: {
        padding: 14,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    userBubble: {
        backgroundColor: '#003DA5',
        borderBottomRightRadius: 4,
    },
    adminBubble: {
        backgroundColor: '#ffffff',
        borderBottomLeftRadius: 4,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    userText: {
        color: '#ffffff',
        fontSize: 15,
        lineHeight: 22,
    },
    adminText: {
        color: '#1f2937',
        fontSize: 15,
        lineHeight: 22,
    },
    speech: {
        marginTop: 6,
    }
});

export default ChatBubble;