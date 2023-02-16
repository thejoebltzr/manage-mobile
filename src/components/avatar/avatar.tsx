import {Avatar as RNEAvatar} from '@rneui/themed';
import {AvatarProps as RNEAvatarProps} from '@rneui/themed';
import React from 'react';
import {TextStyle} from 'react-native';

import TextAvatar from './textAvatar';

export interface AvatarProps extends RNEAvatarProps {
  name?: string;
  backgroundColor?: string;
  textColor?: string;
  textStyle?: TextStyle;
}

const Avatar = ({name, ...args}: AvatarProps) => {
  if (name) {
    // by passing name to avatar
    // it will detect that you will use this
    // as avatar with text
    return <TextAvatar name={name} {...args} />;
  }
  return <RNEAvatar {...args} />;
};

export default Avatar;
