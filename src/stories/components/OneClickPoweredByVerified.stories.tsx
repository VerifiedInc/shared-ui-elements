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
};

// Since this component accepts variants, we'll create a template for each variant
const Template = (args: any) => <OneClickPoweredByVerified {...args} />;

export const Default = Template.bind({});
Default.args = {};

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
