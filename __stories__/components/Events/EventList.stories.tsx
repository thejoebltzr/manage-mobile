import {NavigationContainer} from '@react-navigation/native';
import {ComponentMeta, ComponentStory} from '@storybook/react-native';
import React from 'react';

import {EventList} from '@/src/components/event';

import {eventData} from './data';

export default {
  title: 'components/Events',
  component: EventList,
  decorators: [
    Story => (
      <NavigationContainer>
        <Story />
      </NavigationContainer>
    ),
  ],
} as ComponentMeta<typeof EventList>;

const Template: ComponentStory<typeof EventList> = args => (
  <EventList {...args} />
);

export const EventListDefault: ComponentStory<typeof EventList> = Template.bind(
  {},
);

EventListDefault.args = {
  data: eventData,
};

export const EventListLoading: ComponentStory<typeof EventList> = Template.bind(
  {},
);

EventListLoading.args = {
  fetching: true,
};

export const EventListError: ComponentStory<typeof EventList> = Template.bind(
  {},
);

EventListError.args = {
  error: true,
};
