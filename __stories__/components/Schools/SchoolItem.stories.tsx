// stories/MySchoolItem.stories.tsx
import {ComponentStory} from '@storybook/react';
import React from 'react';

import SchoolItem from '@/src/components/school/schoolItem';

import {schoolData} from './data';

const Template: ComponentStory<typeof SchoolItem> = args => (
  <SchoolItem {...args} />
);

export const SchoolItemDefault: ComponentStory<typeof SchoolItem> =
  Template.bind({});

SchoolItemDefault.args = {
  school: schoolData,
};
