import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
} from 'react-native';
import { Configuration, OpenAIApi } from 'openai';
import AsyncStorage from '@react-native-async-storage/async-storage';
import chatStyle from './styles';
import { MessageProps } from './types'

const Chat = () => {
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [inputText, setInputText] = useState('');
  const [apiKey, setApiKey] = useState('');
  useEffect(() => {
    getApiKey();
  }, []);
  const getApiKey = async () => {
    try {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        const val = JSON.parse(value);
        setApiKey(val.apikey);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendMessage = async () => {  
    const prompt = inputText;
    const config = new Configuration({ apiKey: apiKey });
    const openai = new OpenAIApi(config);
    const completetion = {
      model: 'text-davinci-002',
      prompt: prompt,
      max_tokens: 1024,
      temperature: 0.5,
    };

    const response = await openai.createCompletion(completetion);
    const reply = response.data.choices[0].text;
    setMessages((prevMessages: any) => [
      ...prevMessages,
      { content: inputText, sender: 'user' },
      { content: reply, sender: 'ai' },
    ]);
    setInputText('');
  };

  return (
    <View style={chatStyle.container}>
      <ScrollView style={chatStyle.messageContainer}>
        {messages.map(message => (
          <View
            key={message.id}
            style={[
              chatStyle.messageBubble,

              message.sender === 'user' ? chatStyle.userBubble : chatStyle.botBubble,
            ]}>
            <Text style={chatStyle.messageText}>{message.content}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={chatStyle.inputContainer}>
        <TextInput
          style={chatStyle.textInput}
          value={inputText}
          onChangeText={setInputText}
        />
        <Button title="Send" onPress={handleSendMessage} />
      </View>
    </View>
  );
};



export default Chat;
