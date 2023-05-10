import * as React from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import { useDispatch } from 'react-redux';
// import { loginActions } from '../../redux/slice/login/actions';
import Input from '../../component/common/Input';
import CustomButton from '../../component/common/Button';
import { RegisterFormValues } from './types';
import loginStyle from '../login/styles';
import { useNavigation } from '@react-navigation/native';

const Signup: React.FC<{}> = () => {
  const navigation = useNavigation();

  const initialValues: RegisterFormValues = {
    name: '',
    email: '',
    password: '',
    apikey: '',
  };
  let addUser = async (values: any) => {
    console.log('val', values);
    try {
      await AsyncStorage.setItem('user', JSON.stringify(values));
      navigation.navigate('Login');
    } catch (error) {
      console.log(error, 'jjjj');
    }
    // database().ref('/user').push({
    //   user: values,
    // });
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().label('name').required('Enter User Name'),
    email: Yup.string()
      .label('email')
      .email('Enter a valid Email')
      .required('Enter Email'),
    password: Yup.string()
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .label('password')
      .required('Enter password'),
    apikey: Yup.string().label('apikey').required('Enter an api key'),
  });

  //   const dispatch = useDispatch();
  //   const signIn = (request: any) =>
  //     dispatch({ type: loginActions.LOGIN, payload: request });
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
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
