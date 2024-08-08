import React, { useContext } from 'react';
import Message from './Message';
import InputField from './InputField';
import axios from 'axios';
import { ChatContext } from './ChatContext';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Replace these with the actual values from Gemini AI
const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
const ENDPOINT = 'https://api.gemini.ai/v1/completions'; // Update with actual Gemini API endpoint

const ChatWindow = () => {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  
  const { messages, addMessage } = useContext(ChatContext);

  const handleSend = async (userMessage) => {
    addMessage(userMessage, true); // Add user message to context

    try {
      const response = await getBotResponse(userMessage);
      addMessage(response, false); // Add bot response to context
    } catch (error) {
      console.error('Error fetching bot response:', error);
      addMessage(
        'Sorry, there was an error with the response. Please try again.',
        false
      );
    }
  };

  const getBotResponse = async (message) => {
    const response = await axios.post(
      ENDPOINT,
      {
        query: message, // Update key according to Gemini AI's API documentation
        max_tokens: 150, // Adjust as per Gemini AI's documentation if needed
        temperature: 0.7, // Adjust as per Gemini AI's documentation if needed
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.result.trim(); // Update key according to Gemini AI's response structure
  };

  return (
    <div className="flex flex-col h-4/5 max-w-lg mx-auto bg-gray-100 border border-gray-200 rounded-lg shadow-lg">
      <div className="bg-blue-500 text-white text-center py-2 rounded-t-lg">
        <h1 className="text-xl font-semibold">PrimeCare Support</h1>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          <Message text="Welcome to PrimeCare Support. How can I help you today?" isUser={false} />
          {messages.map((msg, index) => (
            <Message key={index} text={msg.text} isUser={msg.isUser} />
          ))}
        </div>
      </div>
      <InputField onSend={handleSend} />
    </div>
  );
};

export default ChatWindow;
