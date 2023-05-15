import {Key} from 'react';

export interface Message {
  [x: string]: Key | null | undefined;
  content: string;
  sender: 'user' | 'ai';
}
