import React from 'react';
import {Text, TextStyle, View, ViewStyle} from 'react-native';

type TextAvatarProps = {
  name: string;
  size?: ('small' | 'medium' | 'large' | 'xlarge') | number;
  rounded?: boolean;
  backgroundColor?: string;
  textColor?: string;
  textStyle?: TextStyle;
};

export const avatarSizes = {
  small: 34,
  medium: 50,
  large: 75,
  xlarge: 150,
};

const TextAvatar = ({
  name,
  size = 'small',
  rounded,
  backgroundColor,
  textColor,
  textStyle,
}: TextAvatarProps) => {
  const width =
    typeof size === 'number' ? size : avatarSizes[size] || avatarSizes.small;

  const textContainerStyle: ViewStyle = {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -(width / 20),
    height: width,
    width,
    borderRadius: rounded ? width : 0,
    backgroundColor,
  };

  return (
    <View style={textContainerStyle}>
      {!!name && (
        <Text
          style={[
            {
              color: textColor,
              fontSize: width / 2.5,
            },
            textStyle,
          ]}
          adjustsFontSizeToFit={true}>
          {name.slice(0, 2)}
        </Text>
      )}
    </View>
  );
};

export default TextAvatar;
