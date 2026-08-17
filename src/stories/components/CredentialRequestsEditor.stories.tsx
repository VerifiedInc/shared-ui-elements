import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Box } from '@mui/material';

import { buildDataFieldValue } from '../../components/CredentialRequestsEditor/utils/buildDataFieldValue';
import { CredentialRequestsEditor } from '../../components/CredentialRequestsEditor';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/CredentialRequestsEditor',
  component: CredentialRequestsEditor,
  render: (args: any, { loaded: { credentialRequests } }) => (
    <Box width={440}>
      <CredentialRequestsEditor
        {...args}
        credentialRequests={credentialRequests}
      />
    </Box>
  ),
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
    docs: {},
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    credentialRequests: {
      description: 'This props is used to populate the credential requests.',
    },
    addButtonText: {
      type: 'string',
      description:
        'This props is used to set the text of the button that adds a new credential request.',
    },
    features: {
      control: 'object',
      description: 'This props is used to enable or disable features.',
    },
  },
} satisfies Meta<typeof CredentialRequestsEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

const loadCredentialRequests = async (): Promise<{
  credentialRequests: ReturnType<typeof buildDataFieldValue>[];
}> => ({
  credentialRequests: [
    buildDataFieldValue('FullNameCredential'),
    buildDataFieldValue('PhoneCredential'),
    buildDataFieldValue('AddressCredential'),
    buildDataFieldValue('BirthDateCredential'),
    buildDataFieldValue('SsnCredential'),
  ],
});

const allFeaturesEnabled = {
  allowUserInput: {
    disabled: false,
  },
  description: {
    disabled: false,
  },
  mandatory: {
    disabled: false,
  },
  multi: {
    disabled: false,
  },
  autofillLegalFirstName: {
    disabled: false,
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  loaders: [loadCredentialRequests],
  args: {
    riskSignals: 'on',
    credentialRequests: [],
    onChange: fn() as any,
    features: allFeaturesEnabled,
  },
};

export const WithNoRiskSignals: Story = {
  loaders: [loadCredentialRequests],
  args: {
    riskSignals: 'off',
    credentialRequests: [],
    onChange: fn() as any,
    features: allFeaturesEnabled,
  },
};
