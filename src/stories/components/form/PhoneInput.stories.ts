import type { Meta, StoryObj } from '@storybook/react';

import { PhoneInput } from '../../../components/form/PhoneInput';
import { fn } from '@storybook/test';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/PhoneInput',
  component: PhoneInput,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  args: {
    shouldShowOnlyNorthAmericanCountries: true,
    shouldHaveClearButton: true,
  },
  argTypes: {
    shouldShowOnlyNorthAmericanCountries: {
      description:
        'When true, Brazil is removed from the list of countries, allowing only North American numbers',
    },
  },
} satisfies Meta<typeof PhoneInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    name: 'date',
    label: 'Label',
    onChange: fn(),
    onValidPhone: fn(),
    error: false,
    helperText: 'Helper text',
  },
};
