import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';

import Calendar from '@/src/components/calendar';

export default {
  title: 'components/Calendar',
  component: Calendar,
} as ComponentMeta<typeof Calendar>;

const Template: ComponentStory<typeof Calendar> = args => (
  <Calendar {...args} />
);

export const CalendarDefault: ComponentStory<typeof Calendar> = Template.bind(
  {},
);

CalendarDefault.args = {
  initialDate: '2022-10-10',
};
