import React from 'react'

export const handleRegister = async (email: string, password: string, firstName: string, lastName: string) => {
    const url = 'http://localhost:3000/users/register';
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, firstName, lastName })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

export const handleLogin = async (email: string, password: string) => {
    const url = 'http://localhost:3000/users/login';
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}