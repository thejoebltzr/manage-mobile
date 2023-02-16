import {Theme} from '@rneui/base';
import {Card as RNECard, CardProps as RENCardProps} from '@rneui/themed';
import React, {ReactNode} from 'react';

interface CardProps extends RENCardProps {
  theme?: Theme;
  children?: ReactNode;
}

export const CardBase = (args: CardProps) => <RNECard {...args} />;

CardBase.displayName = 'Card';
