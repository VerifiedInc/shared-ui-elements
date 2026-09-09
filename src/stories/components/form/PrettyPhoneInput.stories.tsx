import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Box } from '@mui/material';

import { PrettyPhoneInput } from '../../../components/form/PrettyPhoneInput';
import { Iframe, IframeContent } from '../../../components/__for-stories';

// Wrapper component with black background for color testing
const BlackBoxWrapper = (props: any) => (
  <Box sx={{ bgcolor: '#ff000011', p: 1, borderRadius: 2 }}>
    <PrettyPhoneInput {...props} />
  </Box>
);

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/form/PrettyPhoneInput',
  component: BlackBoxWrapper,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  args: {
    shouldHaveClearButton: true,
    loading: false,
  },
} satisfies Meta<typeof PrettyPhoneInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    name: 'phone',
    label: 'Phone Number',
    onChange: fn(),
    onValidPhone: fn(),
    error: false,
    helperText: 'Enter a valid phone number',
    onBlur: fn(),
  },
};

export const WithInitialValue: Story = {
  args: {
    name: 'phone',
    label: 'Phone Number',
    initialValue: '12065550123',
    onChange: fn(),
    onValidPhone: fn(),
    error: false,
    helperText: 'Example with pre-filled value',
    onBlur: fn(),
  },
};

export const WithError: Story = {
  args: {
    name: 'phone',
    label: 'Phone Number',
    onChange: fn(),
    onValidPhone: fn(),
    error: true,
    helperText: 'Please enter a valid phone number',
    onBlur: fn(),
  },
};

export const WithoutCountrySelector: Story = {
  args: {
    name: 'phone',
    label: 'US Phone Number',
    onChange: fn(),
    onValidPhone: fn(),
    error: false,
    helperText: 'US numbers only',
    shouldHaveSelectCountryButton: false,
    onBlur: fn(),
  },
};

export const WithoutClearButton: Story = {
  args: {
    name: 'phone',
    label: 'Phone Number',
    onChange: fn(),
    onValidPhone: fn(),
    error: false,
    helperText: 'Click the X to clear',
    shouldHaveClearButton: false,
    onBlur: fn(),
  },
};

export const Disabled: Story = {
  args: {
    name: 'phone',
    label: 'Phone Number',
    initialValue: '12065550123',
    onChange: fn(),
    onValidPhone: fn(),
    error: false,
    helperText: 'This field is disabled',
    disabled: true,
    onBlur: fn(),
  },
};

export const Loading: Story = {
  args: {
    name: 'phone',
    label: 'Phone Number',
    initialValue: '12065550123',
    onChange: fn(),
    onValidPhone: fn(),
    error: false,
    helperText: 'Looking up this number…',
    loading: true,
    onBlur: fn(),
  },
};

export const LoadingWithError: Story = {
  args: {
    name: 'phone',
    label: 'Phone Number',
    initialValue: '12065550123',
    onChange: fn(),
    onValidPhone: fn(),
    error: true,
    helperText: 'Retrying…',
    loading: true,
    onBlur: fn(),
  },
};

/**
 * The 1-Click web client renders the input inside a nested iframe with its own Emotion cache
 * (see its `StyledIframe`), so the animation must work when styles land in another document.
 */
export const InsideIframe: Story = {
  args: {
    name: 'phone',
    label: 'Phone Number',
    initialValue: '12065550123',
    onChange: fn(),
    onValidPhone: fn(),
    error: false,
    helperText: 'Rendered inside an iframe',
    loading: true,
    onBlur: fn(),
  },
  render: (args) => (
    <Iframe style={{ width: 400, height: 160 }}>
      <IframeContent>
        <Box sx={{ p: 2 }}>
          <PrettyPhoneInput {...args} />
        </Box>
      </IframeContent>
    </Iframe>
  ),
};
