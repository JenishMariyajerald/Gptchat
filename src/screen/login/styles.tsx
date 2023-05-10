import {StyleSheet} from 'react-native';

const loginStyle = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
  },
  button: {
    height: 40,
    width: '90%',
    borderWidth: 0.5,
    backgroundColor: 'skyblue',
    alignSelf: 'center',
    borderRadius: 12,
  },
  buttonTitle: {
    textAlign: 'center',
    fontSize: 20,
  },
  buttonView: {
    justifyContent: 'center',
    flex: 1,
  },
  padding: {
    paddingTop: 20,
  },
  error: {
    fontSize: 12,
    color: 'red',
    marginLeft: 20,
  },
});
export default loginStyle;
