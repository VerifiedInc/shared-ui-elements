import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFormContext, FormProvider } from 'react-hook-form';
import { Stack } from '@mui/material';

import { OneClickForm } from '../../../components/form/oneClickForm';
import { Button } from '../../../components/Button';

const mockData = {
  brand: {
    uuid: '6cbbfc8b-cd97-44b2-af08-f531d741910b',
    createdAt: 1734704783696,
    updatedAt: 1734704783696,
    name: 'Google',
    customerUuid: '7009d113-dbf0-4657-aa85-682109292697',
    integrationType: 'hosted',
    credentialRequests: [
      {
        type: 'FullNameCredential',
        multi: false,
        children: [
          {
            type: 'FirstNameCredential',
            mandatory: 'no',
            allowUserInput: true,
          },
          {
            type: 'MiddleNameCredential',
            mandatory: 'no',
            allowUserInput: true,
          },
          {
            type: 'LastNameCredential',
            mandatory: 'no',
            allowUserInput: true,
          },
        ],
        mandatory: 'no',
        allowUserInput: true,
      },
      {
        type: 'PhoneCredential',
        multi: false,
        mandatory: 'no',
        allowUserInput: true,
      },
      {
        type: 'AddressCredential',
        multi: true,
        children: [
          {
            type: 'Line1Credential',
            mandatory: 'no',
            allowUserInput: true,
          },
          {
            type: 'Line2Credential',
            mandatory: 'no',
            allowUserInput: true,
          },
          {
            type: 'CityCredential',
            mandatory: 'no',
            allowUserInput: true,
          },
          {
            type: 'CountryCredential',
            mandatory: 'no',
            allowUserInput: true,
          },
          {
            type: 'StateCredential',
            mandatory: 'no',
            allowUserInput: true,
          },
          {
            type: 'ZipCodeCredential',
            mandatory: 'no',
            allowUserInput: true,
          },
        ],
        mandatory: 'no',
        allowUserInput: true,
      },
      {
        type: 'BirthDateCredential',
        multi: false,
        mandatory: 'no',
        allowUserInput: true,
      },
      {
        type: 'SsnCredential',
        multi: false,
        mandatory: 'no',
        allowUserInput: true,
      },
    ],
    credentialFormats: null,
    isCredentialsTemp: false,
    primaryColor: '#fbbc05',
    homepageUrl: 'https://gmail.com',
    termsUrl: 'https://gmail.com',
    privacyUrl: 'https://gmail.com',
    redirectUrl: 'https://gmail.com',
    createdBy: 'dashboard',
    isOnWatchList: true,
    metadata: {
      credentials: {
        verificationMethod: true,
      },
      identifiers: {
        riskSignals: {
          email: {
            reasonCodes: true,
          },
          phone: {
            reasonCodes: true,
          },
          overall: {
            level: true,
            score: true,
            reasonCodes: true,
            recommendation: true,
          },
          ipAddress: {
            reasonCodes: true,
          },
        },
        verificationMethod: true,
      },
    },
    logoUrl:
      'https://core-service-media-dev-account.s3.us-west-2.amazonaws.com/brands/logos/6804ea02-876e-4cee-a261-89f8f47ff0cd?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAV6AVTUVUENTCCVUG%2F20250129%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250129T193252Z&X-Amz-Expires=1800&X-Amz-Signature=9e6c6b317253ab784c09267aa19ec315e49bd4c85df808d38adf98ca64ecdc30&X-Amz-SignedHeaders=host&x-id=GetObject',
  },
  credentialRequests: [
    {
      type: 'FullNameCredential',
      multi: false,
      children: [
        {
          type: 'FirstNameCredential',
          mandatory: 'no',
          allowUserInput: true,
        },
        {
          type: 'MiddleNameCredential',
          mandatory: 'no',
          allowUserInput: true,
        },
        {
          type: 'LastNameCredential',
          mandatory: 'yes',
          allowUserInput: true,
        },
      ],
      mandatory: 'no',
      allowUserInput: true,
    },
    {
      type: 'PhoneCredential',
      multi: false,
      mandatory: 'no',
      allowUserInput: true,
    },
    {
      type: 'AddressCredential',
      multi: false,
      children: [
        {
          type: 'Line1Credential',
          mandatory: 'no',
          allowUserInput: true,
        },
        {
          type: 'Line2Credential',
          mandatory: 'no',
          allowUserInput: true,
        },
        {
          type: 'CityCredential',
          mandatory: 'no',
          allowUserInput: true,
        },
        {
          type: 'CountryCredential',
          mandatory: 'no',
          allowUserInput: true,
        },
        {
          type: 'StateCredential',
          mandatory: 'yes',
          allowUserInput: true,
        },
        {
          type: 'ZipCodeCredential',
          mandatory: 'no',
          allowUserInput: true,
        },
      ],
      mandatory: 'no',
      allowUserInput: true,
    },
    {
      type: 'BirthDateCredential',
      multi: false,
      mandatory: 'no',
      allowUserInput: true,
    },
    {
      type: 'SsnCredential',
      multi: false,
      mandatory: 'no',
      allowUserInput: true,
    },
  ],
  status: 'WAITING_SHARED_CREDENTIALS',
  uuid: 'fb7c6fe2-152c-4579-a4cc-c7472d0e2c45',
  content: {
    title: 'Signup',
    description: '',
  },
  credentials: [
    {
      type: 'PhoneCredential',
      data: {
        phone: '+10123456789',
      },
      verificationMethod: 'credit_bureau',
      id: 'a57cb3bf-60ea-4a0f-a2bc-861272846b1c',
      status: 'valid',
      expirationDate: null,
      uuid: '9a659318-11b1-4de1-b911-3f6cce652785',
    },
    {
      type: 'AddressCredential',
      data: [
        {
          type: 'Line1Credential',
          data: {
            line1: 'P.o. Box 8672',
          },
          verificationMethod: 'credit_bureau',
          id: 'd9c1e512-b926-41f8-a33b-897a40cc6553',
          status: 'active',
          expirationDate: null,
          uuid: '43bbad2e-2059-4bab-a0f4-a80e869dccfe',
        },
        {
          type: 'CityCredential',
          data: {
            city: 'Ketchikan',
          },
          verificationMethod: 'credit_bureau',
          id: '875cce7e-a192-431e-992a-2e43c4b93637',
          status: 'active',
          expirationDate: null,
          uuid: 'e6ab95a8-2bc4-446a-a00d-ffa2a918dfd5',
        },
        {
          type: 'ZipCodeCredential',
          data: {
            zipCode: '99901',
          },
          verificationMethod: 'credit_bureau',
          id: '0b2c26e0-d9b3-4735-8177-5c0ae4b456c7',
          status: 'active',
          expirationDate: null,
          uuid: '1715d0fe-c583-4083-8ea1-b99669864f39',
        },
      ],
      verificationMethod: 'credit_bureau',
      id: 'ae9bef7b-970e-4475-bb02-a097741d7c14',
      status: 'valid',
      expirationDate: null,
      uuid: 'a3b72ba1-55c4-4dc5-a3be-7d31bc5fab72',
    },
    {
      type: 'SsnCredential',
      data: {
        ssn: '123456789',
      },
      verificationMethod: 'credit_bureau',
      id: 'ef760fb5-5f5a-4a9b-8b9d-2f6a801cf700',
      status: 'valid',
      expirationDate: null,
      uuid: 'bd73625a-6419-45db-afa4-3401f5c1cd5b',
    },
    {
      type: 'BirthDateCredential',
      data: {
        birthDate: '617976000000',
      },
      verificationMethod: 'credit_bureau',
      id: '0bd20f34-fdd3-475b-b83b-e6a8ac9685d7',
      status: 'valid',
      expirationDate: null,
      uuid: '8d83b5ef-2055-4116-bed6-31563695944d',
    },
    {
      type: 'FullNameCredential',
      data: [
        {
          type: 'FirstNameCredential',
          data: {
            firstName: 'Richard',
          },
          verificationMethod: 'credit_bureau',
          id: 'ab8e92be-a3b9-4725-997b-c34be9ced906',
          status: 'active',
          expirationDate: null,
          uuid: '7784bf7e-c11c-495f-8b28-574d2de01004',
        },
        {
          type: 'LastNameCredential',
          data: {
            lastName: 'Hendricks',
          },
          verificationMethod: 'credit_bureau',
          id: '56033738-a547-4560-b18e-dd2598643089',
          status: 'active',
          expirationDate: null,
          uuid: '45ded86f-70d3-46eb-a77d-99cadeaae36a',
        },
      ],
      verificationMethod: 'credit_bureau',
      id: '39aede77-63da-49ba-9462-e91c8514f609',
      status: 'valid',
      expirationDate: null,
      uuid: '7b176176-fb5d-4682-ab46-398207e7f0c2',
    },
  ],
};

function Footer() {
  const form = useFormContext();
  return (
    <form
      onSubmit={form.handleSubmit((data) => {
        console.log(data);
      })}
    >
      <FormProvider {...form}>
        <Button type='submit' variant='contained' fullWidth sx={{ mt: 2 }}>
          Submit
        </Button>
      </FormProvider>
    </form>
  );
}

function Component({ data, schemas }: any) {
  return (
    <Stack flex={1} mt={1} justifyContent='space-between'>
      <OneClickForm
        credentials={data.credentials}
        schema={schemas}
        credentialRequests={data.credentialRequests}
        options={{
          features: {
            fillEmptyByQueryParam: ['*'],
            selectableCredentials: false,
            phoneCredentialWhitelist: [],
            phoneCredentialRegexWhitelist:
              '^\\+1[-.\\s]?0\\d{2}[-.\\s]?\\d{3}[-.\\s]?\\d{4}$',
          },
          servicePaths: {
            credentialImagePath: '/api/credential-image-search',
          },
        }}
        renderExtra={<Footer />}
      />
    </Stack>
  );
}

const meta = {
  title: 'components/form/OneClickForm',
  component: OneClickForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A form component that allows users to fill out and submit data. It supports various input fields, such as text fields, select menus, and date pickers, and provides a clear and intuitive interface for users to interact with.',
      },
    },
  },
  tags: ['autodocs'],
  render: (args: any, { loaded: { getOneClickData, schemas } }) => (
    <QueryClientProvider client={new QueryClient()}>
      <Component data={getOneClickData.data} schemas={schemas} />
    </QueryClientProvider>
  ),
} satisfies Meta<typeof OneClickForm>;

export default meta;
type Story = StoryObj<typeof OneClickForm>;

export const Default: Story = {
  loaders: [
    async () => {
      const schemas = await (
        await fetch('http://localhost:6061/jsonSchema')
      ).json();

      return {
        schemas,
        getOneClickData: {
          data: mockData,
        },
      };
    },
  ],
};
