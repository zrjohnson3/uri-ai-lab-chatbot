import React from 'react'
import axios from 'axios';
import OPENAI_API_KEY from '../config';

export const fetchAIResponse = async (inputMessage: string) => {
    try {
        // use axios instead
        console.log(OPENAI_API_KEY)
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'You are chatting with ZenBot, an AI assistant.' },
                { role: 'user', content: inputMessage }
            ]
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + OPENAI_API_KEY
            }
        });
        const data = response.data;
        return data;
    }
    catch (error) {
        console.error('Error:', error);
    }
}