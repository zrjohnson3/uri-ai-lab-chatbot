import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useSignUp } from "@clerk/clerk-expo";
import { useNavigation } from "@react-navigation/native";
import { handleRegister } from '../api/user';

const CreateAccount = () => {
    const { isLoaded, signUp, setActive } = useSignUp();
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [pendingVerification, setPendingVerification] = useState(false);
    const [code, setCode] = useState('');

    const handleSubmit = async () => {
        if (!isLoaded) return;
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            await signUp.create({
                emailAddress: email,
                password,
                firstName,
                lastName,
            });
            await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
            setPendingVerification(true);
        } catch (e: any) {
            setError(e.message);
            console.error('Error:', e);
        } finally {
            setLoading(false);
        }
    };

    const verifyEmail = async () => {
        if (!isLoaded) return;
        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({ code });
            await setActive({ session: completeSignUp.createdSessionId });
            await handleRegister(email, password, firstName, lastName);
            navigation.reset({
                index: 0,
                routes: [{ name: 'ZChat' as never }],
            });
        } catch (e: any) {
            setError(e.message);
            console.error('Verification Error:', e);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Create Account</Text>
            {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
            {success ? <Text style={{ color: 'green' }}>{success}</Text> : null}

            {!pendingVerification ? (
                <>
                    {/* Input fields for registration */}
                    <TextInput
                        style={styles.input}
                        placeholder="First Name"
                        value={firstName}
                        onChangeText={setFirstName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Last Name"
                        value={lastName}
                        onChangeText={setLastName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize='none'
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry value={password}
                        onChangeText={setPassword}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        secureTextEntry value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
                        <Text style={styles.buttonText}>{loading ? 'Creating...' : 'Create Account'}</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <>
                    {/* Verification section */}
                    <TextInput
                        style={styles.input}
                        placeholder="Verification Code"
                        value={code}
                        onChangeText={setCode}
                    />
                    <TouchableOpacity style={styles.button} onPress={verifyEmail}>
                        <Text style={styles.buttonText}>Verify Email</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    input: {
        backgroundColor: '#f9f9f9',
        borderRadius: 50,
        borderColor: '#000',
        borderWidth: 0.25,
        width: '100%',
        padding: 15,
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#4a90e2',
        borderRadius: 25,
        width: '100%',
        padding: 15,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
    },
});

export default CreateAccount;
