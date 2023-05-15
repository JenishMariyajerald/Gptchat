import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {ButtonProps} from './types';

const CustomButton: React.FC<ButtonProps> = ({onPress, title, disabled}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={styles.button}>
      <View style={styles.buttonView}>
        <Text style={styles.buttonTitle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    height: 40,
    width: '90%',
    borderWidth: 0.5,
    backgroundColor: 'skyblue',
    alignSelf: 'center',
    borderRadius: 12,
  },
  buttonView: {
    justifyContent: 'center',
    flex: 1,
  },
  buttonTitle: {
    textAlign: 'center',
    fontSize: 20,
  },
});
export default CustomButton;
