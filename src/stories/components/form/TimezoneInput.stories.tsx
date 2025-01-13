import React, { type Meta, type StoryObj } from '@storybook/react';
import { useState } from 'react';

import { TimezoneInput } from '../../../components/form';

function Story() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [value, setValue] = useState('Europe/London');
  return (
    <div style={{ margin: '10px auto', maxWidth: '200px' }}>
      <TimezoneInput
        value={value}
        onChange={(newValue) => setValue(newValue)}
      />
    </div>
  );
}

const meta = {
  title: 'components/form/TimezoneInput',
  component: TimezoneInput,
  parameters: {
    layout: {
      width: '400px',
    },
    docs: {
      story: {
        height: '600px',
      },
    },
  },
  argTypes: {
    value: {
      description:
        'The currently selected timezone code (e.g., "Europe/London", "America/New_York"). Must be a valid IANA timezone identifier.',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    onChange: {
      description:
        'Callback fired when the timezone selection changes. Receives the new timezone code as a string parameter.',
      table: {
        type: { summary: '(value: string) => void' },
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TimezoneInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Story />,
};
