import { TextInput, TextInputProps, StyleSheet } from 'react-native';
const Input = (props: TextInputProps) => {
  return (
    <TextInput
      {...props}
      style={[styles.input, props.style]}
      blurOnSubmit
      autoCorrect={false}
    />
  );
};
export default Input;

const styles = StyleSheet.create({
  input: {
    height: 50,
    width: '90%',
    borderWidth: 0.5,
    padding: 10,
    margin: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    alignSelf: 'center',
  },
});
