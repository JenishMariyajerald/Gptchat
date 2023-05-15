import {RouteProp, NavigationProp} from '@react-navigation/native';

export interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  apikey: string;
}

type RootStackParamList = {
  Chat: undefined;
  Signup: undefined;
  // Other screen names and their params
};
type SignupScreenRouteProp = RouteProp<RootStackParamList, 'Signup'>;
type SignupScreenNavigationProp = NavigationProp<RootStackParamList, 'Signup'>;

export interface SignupProps {
  route: SignupScreenRouteProp;
  navigation: SignupScreenNavigationProp;
}
