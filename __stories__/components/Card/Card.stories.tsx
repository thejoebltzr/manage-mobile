import {CardProps, Text} from '@rneui/base';
import {ComponentMeta, Story} from '@storybook/react-native';
import React from 'react';

import Card from '@/src/components/card';

export default {
  title: 'components/Card',
  component: Card,
  args: {
    title: 'Title',
    content: 'Content',
  },
} as ComponentMeta<typeof Card>;

type ExtraProps = {
  title: string;
  content: string;
};

const Template: Story<CardProps & ExtraProps> = ({title, content, ...args}) => (
  <Card {...args}>
    <Card.Title>{title}</Card.Title>
    <Card.Divider />
    <Text>{content}</Text>
  </Card>
);

export const CardBasic: Story<CardProps & ExtraProps> = Template.bind({});
