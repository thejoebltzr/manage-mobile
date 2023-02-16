import React, {FC} from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';

interface DividerProps extends ViewProps {
  children?: JSX.Element | readonly JSX.Element[];
}

const Divider: FC<DividerProps> = ({children, ...rest}) => {
  return (
    <View style={styles.snapDivider} {...rest}>
      <View style={styles.dividerWrapper} />
      <View style={styles.dividerContent}>{children}</View>
      <View style={styles.dividerWrapper} />
    </View>
  );
};

const styles = StyleSheet.create({
  snapDivider: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dividerWrapper: {
    flex: 1,
    height: 1,
    backgroundColor: '#e5e7eb',
  },
  dividerContent: {
    paddingHorizontal: 10,
  },
});

export default Divider;
