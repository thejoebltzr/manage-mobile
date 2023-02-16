import {Linking} from 'react-native';

export const goto = (url?: string) => {
  if (url) {
    Linking.openURL(url);
  }
};
