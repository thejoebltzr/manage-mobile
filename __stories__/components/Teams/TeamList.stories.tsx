import {ComponentMeta, ComponentStory} from '@storybook/react-native';
import React from 'react';

import {TeamList} from '@/src/components/team';

import {teamData} from './data';

export default {
  title: 'components/Teams',
  component: TeamList,
} as ComponentMeta<typeof TeamList>;

const Template: ComponentStory<typeof TeamList> = args => (
  <TeamList {...args} />
);

export const TeamListDefault: ComponentStory<typeof TeamList> = Template.bind(
  {},
);
TeamListDefault.args = {
  data: teamData,
};

export * from './TeamDivider.stories';
