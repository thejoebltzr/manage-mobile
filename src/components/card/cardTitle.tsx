import {
  CardTitle as RNECardTitle,
  CardTitleProps,
} from '@rneui/base/dist/Card/Card.Title';
import React from 'react';

export const CardTitle = (args: CardTitleProps) => <RNECardTitle {...args} />;

CardTitle.displayName = 'Card.Title';
