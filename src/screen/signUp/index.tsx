import * as React from 'react';
import {View, Text} from 'react-native';
import {Formik} from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from '../../component/Input';
import CustomButton from '../../component/Button';
import {RegisterFormValues, SignupProps} from './types';
import loginStyle from '../../utils/styles/login';
import {signupValidationSchema} from '../../utils/validationSchema';

const Signup: React.FC<SignupProps> = ({navigation}) => {
  const initialValues: RegisterFormValues = {
    name: '',
    email: '',
    password: '',
    apikey: '',
  };
  const addUser = async (values: any) => {
    console.log('val', values);
    try {
      await AsyncStorage.setItem('user', JSON.stringify(values));
      navigation.navigate('Chat');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signupValidationSchema}
      onSubmit={values => {
        addUser(values);
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
            placeholder={'Name'}
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            value={values.name}
          />
          {errors.name && touched.name && (
            <Text style={loginStyle.error}>{errors.name}</Text>
          )}
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
            placeholder={'password'}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
          />
          {errors.password && touched.password && (
            <Text style={loginStyle.error}>{errors.password}</Text>
          )}
          <Input
            placeholder={'apikey'}
            onChangeText={handleChange('apikey')}
            onBlur={handleBlur('apikey')}
            value={values.apikey}
          />
          {errors.apikey && touched.apikey && (
            <Text style={loginStyle.error}>{errors.apikey}</Text>
          )}
          <View style={loginStyle.padding}>
            <CustomButton
              title="Register"
              onPress={handleSubmit}
              disabled={!isValid}
            />
          </View>
        </View>
      )}
    </Formik>
  );
};

export default Signup;
