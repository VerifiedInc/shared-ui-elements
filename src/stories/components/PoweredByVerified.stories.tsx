import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Box } from '@mui/material';

import { PoweredByVerified } from '../../components/verified/powered-by-verified';

export default {
  title: 'Components/PoweredByVerified',
  component: PoweredByVerified,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'default',
        'green',
        'gray',
        'white',
        'black',
        'whiteGreen',
        'blackGreen',
      ],
      description: 'The color variant of the PoweredByVerified component',
    },
    containerProps: {
      description: 'Props passed to the container Box component',
      control: { type: 'object' },
    },
  },
} as Meta<typeof PoweredByVerified>;

// Create a template for the component
const Template: StoryFn<typeof PoweredByVerified> = (args) => (
  <PoweredByVerified {...args} />
);

// Default story
export const Default = Template.bind({});
Default.args = {
  variant: 'default',
  containerProps: {},
};

// Green variant story
export const Green = Template.bind({});
Green.args = {
  variant: 'green',
  containerProps: {},
};

// Gray variant story
export const Gray = Template.bind({});
Gray.args = {
  variant: 'gray',
  containerProps: {},
};

// White variant story
export const White = Template.bind({});
White.args = {
  variant: 'white',
  containerProps: {},
};
White.parameters = {
  backgrounds: { default: 'dark' },
};

// Black variant story
export const Black = Template.bind({});
Black.args = {
  variant: 'black',
  containerProps: {},
};

// WhiteGreen variant story
export const WhiteGreen = Template.bind({});
WhiteGreen.args = {
  variant: 'whiteGreen',
  containerProps: {},
};
WhiteGreen.parameters = {
  backgrounds: { default: 'dark' },
};

// BlackGreen variant story
export const BlackGreen = Template.bind({});
BlackGreen.args = {
  variant: 'blackGreen',
  containerProps: {},
};
