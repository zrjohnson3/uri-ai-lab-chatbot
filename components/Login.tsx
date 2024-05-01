import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Button } from 'react-native'
import { handleLogin } from '../api/user'
import { useNavigation } from '@react-navigation/native';
import Chatbot from './Chatbot';
import { useSignIn } from '@clerk/clerk-expo';

const Login = () => {
    const { signIn } = useSignIn();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const navigation = useNavigation()

    const handleSubmit = async () => {
        setLoading(true);
        setError('');
        try {
            // First sign in with Clerk
            const response = await signIn?.create({
                identifier: email,
                password: password,
            });


            console.log('Email:', email)
            console.log('Password:', password)
            const user = handleLogin(email, password)
            if (!user) {
                setError('Invalid email or password')
            }
            else {
                setError('')
                // navigation.reset({
                //     index: 1, // This sets the active route in the stack to 'ZChat'
                //     routes: [
                //         { name: 'Landing' as never }, // This will be at the bottom of the stack
                //         { name: 'ZChat' as never },   // This will be the visible screen
                //     ],
                // });

                navigation.reset({
                    index: 1,
                    routes: [{ name: 'ZChat' as never }],
                    history: ['Landing', 'ZChat',],
                    key: 'ZChat'

                });
                // navigation.navigate('ZChat' as never)

            }
        } catch (error: any) {
            setError(error.message)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Login</Text>

            <View style={styles.actionCard}>
                <Text style={styles.actionText}>Enter your email</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Email'
                    value={email}
                    onChangeText={setEmail}
                />

            </View>
            <View style={styles.actionCard}>
                <Text style={styles.actionText}>Enter your password</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Password'
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
            </View>


            <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit}
            >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eff6ff',
        padding: 20,
        justifyContent: 'space-evenly',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
    },
    actionCard: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 15,
        padding: 15,
    },
    actionText: {
        fontSize: 18,
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
    input: {
        backgroundColor: '#f9f9f9',
        borderRadius: 50,
        borderColor: '#000000',
        borderWidth: 0.25,
        width: '100%',
        padding: 15,
        marginBottom: 15,
    },
});

export default Login