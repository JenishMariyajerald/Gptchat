import React, {useEffect, useState} from 'react';

import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from 'react-native';

//import { createOpenAIInstance, OpenAI } from '../OpenAI/openai';

import {Configuration, OpenAIApi} from 'openai';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const openaiApiKey = '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';

//const openai: OpenAI = createOpenAIInstance(openaiApiKey);

interface Message {
  content: string;

  sender: 'user' | 'ai';
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);

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
        console.log('APIkey', val.apikey);
        setApiKey(val.apikey);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendMessage = async () => {
    getApiKey();
    //try {

    // Send the user's message to OpenAI

    const prompt = inputText;

    const config = new Configuration({apiKey: apiKey});

    const openai = new OpenAIApi(config);

    const completetion = {
      model: 'text-davinci-002',
      prompt: prompt,
      max_tokens: 1024,
      temperature: 0.5,
    };

    const response = await openai.createCompletion(completetion);

    const reply = response.data.choices[0].text;

    console.log('reply', reply); //Update the messages state with the user's input and OpenAI's reply

    setMessages((prevMessages: any) => [
      ...prevMessages,

      {content: inputText, sender: 'user'},

      {content: reply, sender: 'ai'},
    ]);

    setInputText(''); // } catch (error) { //   if (error.response?.status === 429) { //     const retryAfter = error.response.headers['retry-after']; //     const retryAfterSeconds = parseInt(retryAfter, 10); //     // Wait for the specified number of seconds before retrying //     await new Promise((resolve) => setTimeout(resolve, retryAfterSeconds * 2000)); //     // Retry the request //     await handleSendMessage(); // Adjusted to use `await` to wait for the retry //   } else { //     // Handle other errors //   } // }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.messageContainer}>
        {messages.map(message => (
          <View
            key={message.id}
            style={[
              styles.messageBubble,

              message.sender === 'user' ? styles.userBubble : styles.botBubble,
            ]}>
            <Text style={styles.messageText}>{message.content}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
        />
        <Button title="Send" onPress={handleSendMessage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: 'center',

    padding: 16,
  },

  messageContainer: {
    flex: 1,
  },

  messageBubble: {
    paddingHorizontal: 12,

    paddingVertical: 8,

    borderRadius: 8,

    marginBottom: 8,

    maxWidth: '80%',
  },

  userBubble: {
    backgroundColor: 'lightblue',

    alignSelf: 'flex-end',
  },

  botBubble: {
    backgroundColor: 'lightgray',

    alignSelf: 'flex-start',
  },

  messageText: {
    fontSize: 16,
  },

  inputContainer: {
    flexDirection: 'row',

    alignItems: 'center',
  },

  textInput: {
    flex: 1,

    marginRight: 8,

    borderWidth: 1,

    borderRadius: 8,

    paddingVertical: 4,

    paddingHorizontal: 8,
  },
});

export default Chat;
