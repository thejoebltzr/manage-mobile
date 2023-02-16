import {ComponentStory} from '@storybook/react';
import React from 'react';

import {SchoolDivider} from '@/src/components/school';

const Template: ComponentStory<typeof SchoolDivider> = args => (
  <SchoolDivider {...args} />
);

export const SchoolSectionDefault = Template.bind({});
SchoolSectionDefault.args = {
  header: {
    name: 'A',
    type: 'header',
  },
};
