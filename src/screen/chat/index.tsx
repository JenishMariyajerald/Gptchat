import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Button, ScrollView} from 'react-native';
import {Configuration, OpenAIApi} from 'openai';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Message} from './types';
import ChatStyle from '../../utils/styles/chat';

const Chat: React.FC<{}> = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [apiKey, setApiKey] = useState('');
  useEffect(() => {
    getApiKey();
  }, []);
  const getApiKey = async () => {
    try {
      const apiKeyResponse = await AsyncStorage.getItem('user');
      if (apiKeyResponse !== null) {
        const API_KEY = JSON.parse(apiKeyResponse);
        console.log('APIkey', API_KEY.apikey);
        setApiKey(API_KEY.apikey);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendMessage = async () => {
    const config = new Configuration({apiKey: apiKey});
    const openai = new OpenAIApi(config);
    const completetion = {
      model: 'text-davinci-002',
      prompt: inputText,
      max_tokens: 1024,
      temperature: 0.5,
    };

    const response = await openai.createCompletion(completetion);
    const reply = response.data.choices[0].text;
    setMessages((prevMessages: any) => [
      ...prevMessages,
      {content: inputText, sender: 'user'},
      {content: reply, sender: 'ai'},
    ]);
    setInputText('');
  };

  return (
    <View style={ChatStyle.container}>
      <ScrollView style={ChatStyle.messageContainer}>
        {messages.map(message => (
          <View
            key={message.id}
            style={[
              ChatStyle.messageBubble,
              message.sender === 'user'
                ? ChatStyle.userBubble
                : ChatStyle.botBubble,
            ]}>
            <Text style={ChatStyle.messageText}>{message.content}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={ChatStyle.inputContainer}>
        <TextInput
          style={ChatStyle.textInput}
          value={inputText}
          onChangeText={setInputText}
        />
        <Button title="Send" onPress={handleSendMessage} />
      </View>
    </View>
  );
};

export default Chat;
