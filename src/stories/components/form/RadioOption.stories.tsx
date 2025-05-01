import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Stack } from '@mui/material';
import React from 'react';

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

// Create a wrapper component that handles state
const RadioOptionWithState = (args: any) => {
  const [isChecked, setIsChecked] = React.useState(args.checked || false);

  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  return <RadioOption {...args} checked={isChecked} onChange={handleChange} />;
};

// Basic radio option with just a title
export const Basic: Story = {
  args: {
    title: 'Basic Radio Option',
    checked: false,
  },
  render: (args) => <RadioOptionWithState {...args} />,
};

// Radio option with description
export const WithDescription: Story = {
  args: {
    title: 'Radio Option with Description',
    description:
      'This is a detailed description that explains what this option does when selected.',
    checked: false,
  },
  render: (args) => <RadioOptionWithState {...args} />,
};

// Default radio option
export const Default: Story = {
  args: {
    title: 'Default Option',
    description: 'This option is marked as the default choice',
    isDefault: true,
    checked: true,
  },
  render: (args) => <RadioOptionWithState {...args} />,
};

// Disabled radio option
export const Disabled: Story = {
  args: {
    title: 'Disabled Option',
    description: 'This option cannot be selected',
    disabled: true,
    checked: false,
  },
  render: (args) => <RadioOptionWithState {...args} />,
};

// Interactive example with multiple options
export const RadioGroup: Story = {
  render: () => {
    // This is a story function, so it's safe to use hooks here
    const [selectedValue, setSelectedValue] = React.useState('option1');

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
  render: () => {
    // This is a story function, so it's safe to use hooks here
    const [states, setStates] = React.useState({
      option1: false,
      option2: true,
      option3: false,
      option4: true,
      option5: false,
      option6: true,
    });

    const handleChange = (option: keyof typeof states) => {
      setStates((prev) => ({
        ...prev,
        [option]: !prev[option],
      }));
    };

    return (
      <Stack spacing={2} sx={{ width: '400px' }}>
        <RadioOption
          title='Unchecked Option'
          description='This option is not selected'
          checked={states.option1}
          onChange={() => handleChange('option1')}
        />
        <RadioOption
          title='Checked Option'
          description='This option is selected'
          checked={states.option2}
          onChange={() => handleChange('option2')}
        />
        <RadioOption
          title='Default Option'
          description='This is the default option'
          isDefault={true}
          checked={states.option3}
          onChange={() => handleChange('option3')}
        />
        <RadioOption
          title='Checked Default Option'
          description='This is the selected default option'
          isDefault={true}
          checked={states.option4}
          onChange={() => handleChange('option4')}
        />
        <RadioOption
          title='Disabled Option'
          description='This option cannot be selected'
          disabled={true}
          checked={states.option5}
          onChange={() => handleChange('option5')}
        />
        <RadioOption
          title='Disabled Checked Option'
          description='This option is selected but cannot be changed'
          disabled={true}
          checked={states.option6}
          onChange={() => handleChange('option6')}
        />
      </Stack>
    );
  },
};
