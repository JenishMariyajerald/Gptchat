import { NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';
export interface TextInputProps {
    onChangeText: (newValue: string) => void;
    value?: string;
    placeholder: string;
    onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
}
