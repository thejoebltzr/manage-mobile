import React from 'react';
import {ScrollViewProps, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {GST} from '@/src/theme/globalStyles';

interface ContainerProps extends ScrollViewProps {
  insetBottom?: boolean;
  insetTop?: boolean;
  insetRight?: boolean;
  insetLeft?: boolean;
  shouldScroll?: boolean;
}

const Container = (props: ContainerProps) => {
  const {
    style,
    insetBottom = true,
    insetTop = false,
    insetRight = true,
    insetLeft = true,
    shouldScroll,
  } = props;
  const insets = useSafeAreaInsets();
  const insetStyle = {
    paddingBottom: insetBottom ? insets.bottom : undefined,
    paddingTop: insetTop ? insets.top : undefined,
    paddingRight: insetRight ? insets.right : undefined,
    paddingLeft: insetLeft ? insets.left : undefined,
  };

  if (shouldScroll) {
    return (
      <ScrollView contentContainerStyle={[style, insetStyle]} {...props} />
    );
  }
  return <View style={[style, GST.MAIN_CONTAINER, insetStyle]} {...props} />;
};

export default Container;
