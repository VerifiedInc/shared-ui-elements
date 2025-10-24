import React from 'react';

import { OneClickPoweredByVerified } from '../../components/verified/OneClickPoweredByVerified';

export default {
  title: 'Components/OneClickPoweredByVerified',
  component: OneClickPoweredByVerified,
  parameters: {
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry
  tags: ['autodocs'],
  argTypes: {
    title: {
      options: ['Signup', 'Login', 'Verify', 'Apply', 'Access', 'AutoFill'],
      control: { type: 'select' },
      description: 'The type of 1-Click button to display',
    },
    variant: {
      options: [
        'default',
        'green',
        'gray',
        'white',
        'black',
        'whiteGreen',
        'blackGreen',
      ],
      control: { type: 'select' },
      description: 'The color variant of the button',
    },
  },
};

// Create a template for the component
const Template: any = (args: any) => <OneClickPoweredByVerified {...args} />;

// Default story (Signup with green variant)
export const Default = Template.bind({});
Default.args = {};

// Different variants
export const Gray = Template.bind({});
Gray.args = {
  variant: 'gray',
};

export const White = Template.bind({});
White.args = {
  variant: 'white',
};
White.parameters = {
  backgrounds: {
    default: 'dark',
    values: [
      {
        name: 'dark',
        value: '#333333',
      },
    ],
  },
};

export const Black = Template.bind({});
Black.args = {
  variant: 'black',
};

export const WhiteGreen = Template.bind({});
WhiteGreen.args = {
  variant: 'whiteGreen',
};
WhiteGreen.parameters = {
  backgrounds: {
    default: 'dark',
    values: [
      {
        name: 'dark',
        value: '#333333',
      },
    ],
  },
};

export const BlackGreen = Template.bind({});
BlackGreen.args = {
  variant: 'blackGreen',
};

// Different titles
export const Login = Template.bind({});
Login.args = {
  title: 'Login',
};

export const Verify = Template.bind({});
Verify.args = {
  title: 'Verify',
};

export const Apply = Template.bind({});
Apply.args = {
  title: 'Apply',
};

export const Access = Template.bind({});
Access.args = {
  title: 'Access',
};

export const AutoFill = Template.bind({});
AutoFill.args = {
  title: 'AutoFill',
};
