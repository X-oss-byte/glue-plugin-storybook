import React from 'react';
import type { ComponentMeta } from '@storybook/react-native';
import { Button } from './Button';

const MyButtonMeta: ComponentMeta<typeof Button> = {
  title: 'COMPONENTS/Stories/Button',
  component: Button,
  args: {
    text: 'Button Text',
    variant: 'solid',
    size: 'md',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'subtle', 'outline', 'ghost', 'link'],
      description: 'The variant of the button style to use.',
      table: {
        defaultValue: { summary: 'solid' },
      },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'The size of the button.',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
  },
};

export default MyButtonMeta;

export { Basic } from './BasicStories';

export { Variants } from './VariantsStories';

export { Sizes } from './SizesStories';
