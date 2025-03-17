import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';

const Landing = ({ navigation }: { navigation: any }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Welcome to the Z3 AI Chatbot!</Text>

            <View style={styles.actionCard}>
                <Text style={styles.actionText}>
                    Click 'Chat Now' to use for 3 messages
                </Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('URI AI Lab ChatBot')}
                >
                    <Text style={styles.buttonText}>Chat NOW</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.actionCard}>
                <Text style={styles.actionText}>
                    Create an account for unlimited use!
                </Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('SignUp')}
                >
                    <Text style={styles.buttonText}>Create Account</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.actionCard}>
                <Text style={styles.actionText}>Login to your account</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // backgroundColor: '#dbeafe',
        // backgroundColor: '#ebf8ff',
        backgroundColor: '#eff6ff', // light blue / greyish color. Good for background
        padding: 20,
        justifyContent: 'space-evenly',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        // marginBottom: 30,
        textAlign: 'center',
        // make header the very top of the screen
        marginVertical: -50,
        paddingBottom: 50,

    },
    actionCard: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 10,
        padding: 15,
    },
    actionText: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#4a90e2',
        borderRadius: 25,
        width: '100%',
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
    },
});

export default Landing;
