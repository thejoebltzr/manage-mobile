import {ComponentStory} from '@storybook/react';
import React from 'react';

import {TeamDivider} from '@/src/components/team';

const Template: ComponentStory<typeof TeamDivider> = args => (
  <TeamDivider {...args} />
);

export const TeamDividerDefault = Template.bind({});
TeamDividerDefault.args = {
  name: 'Sports',
};
