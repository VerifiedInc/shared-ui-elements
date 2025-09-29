import React from 'react';

import { PoweredByVerified } from '../../components/verified/powered-by-verified';

export default {
  title: 'Components/PoweredByVerified',
  component: PoweredByVerified,
  parameters: {
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry
  tags: ['autodocs'],
  argTypes: {
    containerProps: {
      description: 'Props passed to the container Box component',
      control: { type: 'object' },
    },
  },
};

// Create a template for the component
const Template = (args: any) => <PoweredByVerified {...args} />;

// Default story
export const Default = Template.bind({});
Default.args = {
  containerProps: {},
};
