import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Stack } from '@mui/material';
import React, { useState } from 'react';

import { RadioOption } from '../../../components/form/RadioOption';

const meta = {
  title: 'Components/Form/RadioOption',
  component: RadioOption,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'The title text for the radio option',
    },
    description: {
      control: 'text',
      description: 'Optional description text that appears below the title',
    },
    isDefault: {
      control: 'boolean',
      description:
        'If true, displays a "Default" chip next to the radio option',
    },
    checked: {
      control: 'boolean',
      description: 'If true, the radio button is checked',
    },
    disabled: {
      control: 'boolean',
      description: 'If true, the radio button is disabled',
    },
  },
  args: {
    onChange: fn(),
    title: 'Radio Option',
  },
} satisfies Meta<typeof RadioOption>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic radio option with just a title
export const Basic: Story = {
  args: {
    title: 'Basic Radio Option',
    checked: false,
  },
};

// Radio option with description
export const WithDescription: Story = {
  args: {
    title: 'Radio Option with Description',
    description:
      'This is a detailed description that explains what this option does when selected.',
    checked: false,
  },
};

// Default radio option
export const Default: Story = {
  args: {
    title: 'Default Option',
    description: 'This option is marked as the default choice',
    isDefault: true,
    checked: true,
  },
};

// Disabled radio option
export const Disabled: Story = {
  args: {
    title: 'Disabled Option',
    description: 'This option cannot be selected',
    disabled: true,
  },
};

// Interactive example with multiple options
export const RadioGroup: Story = {
  render: function Render() {
    const [selectedValue, setSelectedValue] = useState('option1');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedValue(event.target.value);
    };

    return (
      <Stack spacing={1} sx={{ width: '400px' }}>
        <RadioOption
          title='Standard Plan'
          description='Basic features for individuals'
          checked={selectedValue === 'option1'}
          value='option1'
          onChange={handleChange}
        />
        <RadioOption
          title='Premium Plan'
          description='Advanced features for professionals'
          checked={selectedValue === 'option2'}
          value='option2'
          onChange={handleChange}
        />
        <RadioOption
          title='Enterprise Plan'
          description='Complete solution for organizations'
          isDefault={true}
          checked={selectedValue === 'option3'}
          value='option3'
          onChange={handleChange}
        />
      </Stack>
    );
  },
};

// Example showing all states together
export const AllStates: Story = {
  render: function Render() {
    return (
      <Stack spacing={2} sx={{ width: '400px' }}>
        <RadioOption
          title='Unchecked Option'
          description='This option is not selected'
          checked={false}
        />
        <RadioOption
          title='Checked Option'
          description='This option is selected'
          checked={true}
        />
        <RadioOption
          title='Default Option'
          description='This is the default option'
          isDefault={true}
          checked={false}
        />
        <RadioOption
          title='Checked Default Option'
          description='This is the selected default option'
          isDefault={true}
          checked={true}
        />
        <RadioOption
          title='Disabled Option'
          description='This option cannot be selected'
          disabled={true}
        />
        <RadioOption
          title='Disabled Checked Option'
          description='This option is selected but cannot be changed'
          disabled={true}
          checked={true}
        />
      </Stack>
    );
  },
};
