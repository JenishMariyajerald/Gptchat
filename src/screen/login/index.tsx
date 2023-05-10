import * as React from 'react';
import {View, Text, Button, TouchableOpacity} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Input from '../../component/common/Input';
import CustomButton from '../../component/common/Button';
import {MyFormValues} from './types';
import loginStyle from './styles';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login: React.FC<{}> = () => {
  const navigation = useNavigation();
  const getUser = async (req: any) => {
    try {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        const val = JSON.parse(value);
        console.log(typeof val);
        if (req.email === val.email && req.password === val.password) {
          navigation.navigate('Chat');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  // React.useEffect(() => {
  //   getUser();
  // }, []);
  const initialValues: MyFormValues = {email: '', password: ''};
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .label('Email')
      .email('Enter a valid User Name')
      .required('Enter User Name'),
    password: Yup.string()
      .min(8, ({min}) => `Password must be at least ${min} characters`)
      .label('password')
      .required('Enter password'),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={values => {
        console.log('final', values);
        getUser(values);
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
            placeholder={'UserName'}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
          />
          {errors.email && touched.email && (
            <Text style={loginStyle.error}>{errors.email}</Text>
          )}
          <Input
            placeholder={'Password'}
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
            style={{paddingRight: 20}}>
            <Text style={{textAlign: 'right', color: 'blue'}}>
              Don't have an account
            </Text>
          </TouchableOpacity>
          <View style={loginStyle.padding}>
            <CustomButton
              title="Login"
              onPress={handleSubmit}
              disabled={!isValid}
            />
          </View>
          <View style={loginStyle.padding}>
            <Button title="Login with Google" />
          </View>
          <View>
            <Button title="Login with Facebook" />
          </View>
        </View>
      )}
    </Formik>
  );
};

export default Login;
