// stories/MySchoolList.stories.tsx
import {ComponentStory} from '@storybook/react';
import React from 'react';

import {SchoolList} from '@/src/components/school';

import {schoolData} from './data';

const Template: ComponentStory<typeof SchoolList> = args => (
  <SchoolList {...args} />
);

export const ListWithData: ComponentStory<typeof SchoolList> = Template.bind(
  {},
);

ListWithData.args = {
  data: [schoolData, {...schoolData, school_id: 0}],
};

export const ListWithError: ComponentStory<typeof SchoolList> = Template.bind(
  {},
);

ListWithError.args = {
  data: [],
  error: true,
};

export const FetchingList: ComponentStory<typeof SchoolList> = Template.bind(
  {},
);

FetchingList.args = {
  data: [],
  fetching: true,
};
