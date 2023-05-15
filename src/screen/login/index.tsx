import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Formik} from 'formik';
import Input from '../../component/Input';
import CustomButton from '../../component/Button';
import {MyFormValues, LoginProps} from './types';
import loginStyle from '../../utils/styles/login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {loginValidationSchema} from '../../utils/validationSchema/index';

const Login: React.FC<LoginProps> = ({navigation}) => {
  const [invalidCredential, setInvalidCredential] = React.useState(false);
  const validateUser = async (req: any) => {
    try {
      const validCredential = await AsyncStorage.getItem('user');
      if (validCredential !== null) {
        const val = JSON.parse(validCredential);
        console.log(typeof val);
        if (req.email === val.email && req.password === val.password) {
          navigation.navigate('Chat');
        } else {
          setInvalidCredential(true);
          setTimeout(() => {
            setInvalidCredential(false);
          }, 3000);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const initialValues: MyFormValues = {email: '', password: ''};

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginValidationSchema}
      onSubmit={values => {
        validateUser(values);
      }}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        isValid,
        touched,
      }) => (
        <View style={loginStyle.container}>
          <Input
            placeholder={'Email'}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
          />
          {errors.email && touched.email && (
            <Text style={loginStyle.error}>{errors.email}</Text>
          )}
          <Input
            placeholder={'Password'}
            secureTextEntry={true}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
          />
          {errors.password && touched.password && (
            <Text style={loginStyle.error}>{errors.password}</Text>
          )}

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Signup');
            }}
            style={loginStyle.createContainer}>
            <Text style={loginStyle.createAccount}>Create an account</Text>
          </TouchableOpacity>
          {invalidCredential && (
            <Text style={loginStyle.invalid}>Invalid Credential</Text>
          )}
          <View style={loginStyle.padding}>
            <CustomButton
              title="Login"
              onPress={handleSubmit}
              disabled={!isValid}
            />
          </View>
        </View>
      )}
    </Formik>
  );
};

export default Login;
