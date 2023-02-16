import {ComponentMeta} from '@storybook/react';

import {SchoolList} from '@/src/components/school';

export default {
  title: 'components/Schools',
  component: SchoolList,
  argTypes: {onPress: {action: 'onPress'}},
} as ComponentMeta<typeof SchoolList>;

export * from './SchoolDivider.stories';
export * from './SchoolItem.stories';
export * from './SchoolList.stories';
