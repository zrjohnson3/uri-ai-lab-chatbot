import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'

const CreateAccount = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = () => {
        console.log('Email:', email)
        console.log('Password:', password)
        console.log('Confirm Password:', confirmPassword)
    }


    return (
        <View style={styles.container}>
            <Text style={styles.header}>Create Account</Text>

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
            <View style={styles.actionCard}>
                <Text style={styles.actionText}>Confirm password</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Password'
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                />
            </View>


            <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit}
            >
                <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
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
        borderRadius: 25,
        width: '100%',
        padding: 15,
        marginBottom: 15,
    },
});

export default CreateAccount