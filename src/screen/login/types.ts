import {RouteProp, NavigationProp} from '@react-navigation/native';

export interface MyFormValues {
  email: string;
  password: string;
}

type RootStackParamList = {
  Login: undefined;
  Chat: undefined;
  Signup: undefined;
  // Other screen names and their params
};
type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;
type LoginScreenNavigationProp = NavigationProp<RootStackParamList, 'Login'>;

export interface LoginProps {
  route: LoginScreenRouteProp;
  navigation: LoginScreenNavigationProp;
}
