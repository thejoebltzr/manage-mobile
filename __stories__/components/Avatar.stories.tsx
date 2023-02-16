import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';

import Avatar from '@/src/components/avatar';

export default {
  title: 'components/Avatar',
  component: Avatar,
} as ComponentMeta<typeof Avatar>;

const AvatarTemplate: ComponentStory<typeof Avatar> = args => (
  <Avatar {...args} />
);

export const AvatarSmall: ComponentStory<typeof Avatar> = AvatarTemplate.bind(
  {},
);

AvatarSmall.args = {
  source: {
    uri: 'https://images.pexels.com/photos/13522034/pexels-photo-13522034.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  size: 'small',
};

export const AvatarMedium: ComponentStory<typeof Avatar> = AvatarTemplate.bind(
  {},
);

AvatarMedium.args = {
  source: {
    uri: 'https://images.pexels.com/photos/13522034/pexels-photo-13522034.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  size: 'medium',
};

export const AvatarLarge: ComponentStory<typeof Avatar> = AvatarTemplate.bind(
  {},
);

AvatarLarge.args = {
  source: {
    uri: 'https://images.pexels.com/photos/13522034/pexels-photo-13522034.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  size: 'large',
};

export const AvatarXlarge: ComponentStory<typeof Avatar> = AvatarTemplate.bind(
  {},
);

AvatarXlarge.args = {
  source: {
    uri: 'https://images.pexels.com/photos/13522034/pexels-photo-13522034.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  size: 'xlarge',
};

export const AvatarRounded: ComponentStory<typeof Avatar> = AvatarTemplate.bind(
  {},
);

AvatarRounded.args = {
  source: {
    uri: 'https://images.pexels.com/photos/13522034/pexels-photo-13522034.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  size: 'medium',
  rounded: true,
};
