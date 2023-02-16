import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';

import {RosterList} from '@/src/components/rosters';

export default {
  title: 'component/Rosters',
  component: RosterList,
} as ComponentMeta<typeof RosterList>;

const Template: ComponentStory<typeof RosterList> = args => (
  <RosterList {...args} />
);

export const RosterListHeader: ComponentStory<typeof RosterList> =
  Template.bind({});

RosterListHeader.args = {
  data: [],
  hasHeader: true,
};
