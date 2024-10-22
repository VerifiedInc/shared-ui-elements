import type { Meta, StoryObj } from '@storybook/react';

import { Box } from '@mui/material';
import { fn } from '@storybook/test';
import {
  OTPInput,
  type OTPInputInstance,
} from '../../../components/form/OTPInput';
import { useRef } from 'react';
import { Button } from '../../../components';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export

const meta = {
  title: 'Components/OTPInput',

  component: OTPInput,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  args: {
    name: 'otp',
    onChange: fn(),
    disabled: false,
  },
  argTypes: {
    ref: {
      description:
        'Ref to the OTPInput instance. It can be used to control the input from outside. See the example OTPWithControls.',
    },
  },
} satisfies Meta<typeof OTPInput>;

export default meta;
type Story = StoryObj<typeof OTPInput>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {};

interface OTPWithControlsProps {
  name?: string;
  onChange?: (event: { target: { value: string } }) => void;
  disabled?: boolean;
}

/**
 *
 * This is a wrapper component for OTPInput
 * It was needed to demonstrate the focus, blur and clear functionality of OTPInput via useRef
 * It shows the OtpInput wrapped in a Box with 3 buttons to demonstrate focus, blur and clear functionality
 */

export function OTPWithControls(
  OTPWithControlsProps: OTPWithControlsProps,
): React.JSX.Element {
  const oneClickSignupSubmitInputRef = useRef<OTPInputInstance | null>(null);

  return (
    <Box>
      <OTPInput {...OTPWithControlsProps} ref={oneClickSignupSubmitInputRef} />
      <Button
        onClick={() => {
          oneClickSignupSubmitInputRef.current?.focus();
        }}
      >
        Focus
      </Button>

      <Button
        color='secondary'
        onClick={() => {
          oneClickSignupSubmitInputRef.current?.blur();
        }}
      >
        Blur
      </Button>
      <Button
        color='error'
        onClick={() => {
          oneClickSignupSubmitInputRef.current?.clear();
        }}
      >
        Clear
      </Button>
    </Box>
  );
}
