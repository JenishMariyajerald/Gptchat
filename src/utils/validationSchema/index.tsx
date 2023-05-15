import * as Yup from 'yup';

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .label('Email')
    .email('Enter a valid Email')
    .required('Enter Email'),
  password: Yup.string()
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .label('password')
    .required('Enter password'),
});

export const signupValidationSchema = Yup.object().shape({
  name: Yup.string().label('name').required('Enter User Name'),
  email: Yup.string()
    .label('email')
    .email('Enter a valid Email')
    .required('Enter Email'),
  password: Yup.string()
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .label('password')
    .required('Enter password'),
  apikey: Yup.string().label('apikey').required('Enter an api key'),
});
