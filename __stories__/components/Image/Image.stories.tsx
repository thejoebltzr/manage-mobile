import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';

import Image from '@/src/components/image';

export default {
  title: 'components/Image',
  component: Image,
} as ComponentMeta<typeof Image>;

const ImageTemplate: ComponentStory<typeof Image> = args => <Image {...args} />;

export const ImageDefault: ComponentStory<typeof Image> = ImageTemplate.bind(
  {},
);

ImageDefault.args = {
  source: {uri: 'https://source.unsplash.com/random?sig='},
  style: {width: 400, height: 400},
};
