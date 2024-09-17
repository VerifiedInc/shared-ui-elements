import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Box } from '@mui/material';

import { buildDataFieldValue } from '../../components/CredentialRequestsEditor/utils/buildDataFieldValue';
import { CredentialRequestsEditor } from '../../components/CredentialRequestsEditor';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/CredentialRequestsEditor',
  component: CredentialRequestsEditor,
  render: (args: any, { loaded: { credentialRequests, schemas } }) => (
    <Box width={440}>
      <CredentialRequestsEditor
        {...args}
        credentialRequests={credentialRequests}
        schemas={schemas}
      />
    </Box>
  ),
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
    docs: {
      description: {
        component:
          '⚠️ REQUIRES schema resolver V2 to be running locally in order to fetch schemas.',
      },
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    credentialRequests: {
      description: 'This props is used to populate the credential requests.',
    },
    schemas: {
      description:
        'Schemas are being used to populate the field types, also it maps its children types to the parent.',
    },
    addButtonText: {
      type: 'string',
      description:
        'This props is used to set the text of the button that adds a new credential request.',
    },
  },
} satisfies Meta<typeof CredentialRequestsEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  loaders: [
    async () => {
      const schemas = await (
        await fetch('http://localhost:6061/jsonSchema')
      ).json();

      const credentialRequests = [
        buildDataFieldValue('FullNameCredential', schemas),
        buildDataFieldValue('PhoneCredential', schemas),
        buildDataFieldValue('AddressCredential', schemas),
        buildDataFieldValue('BirthDateCredential', schemas),
        buildDataFieldValue('SsnCredential', schemas),
      ];

      return {
        credentialRequests,
        schemas,
      };
    },
  ],
  args: {
    credentialRequests: [],
    schemas: {},
    onChange: fn() as any,
  },
};
