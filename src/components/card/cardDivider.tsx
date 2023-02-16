import {Divider, DividerProps, RneFunctionComponent} from '@rneui/base';
import React from 'react';
import {StyleSheet} from 'react-native';

export interface CardDividerProps extends DividerProps {}

/** Add divider to the card which acts as a separator between elements.
 * This, Receives all [Divider](divider#props) props. */
export const CardDivider: RneFunctionComponent<CardDividerProps> = ({
  style,
  ...rest
}) => <Divider style={StyleSheet.flatten([styles.divider, style])} {...rest} />;

const styles = StyleSheet.create({
  divider: {
    marginBottom: 15,
  },
});

CardDivider.displayName = 'Card.Divider';
