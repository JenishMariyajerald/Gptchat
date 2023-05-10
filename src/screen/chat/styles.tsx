import { StyleSheet } from 'react-native';

const chatStyle = StyleSheet.create({
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
  export default chatStyle;