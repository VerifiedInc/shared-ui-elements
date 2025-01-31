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
          type: 'StateCredential',
          data: {
            state: 'AK',
          },
          verificationMethod: 'credit_bureau',
          id: 'a831e498-28f2-47f5-9b37-0d5a8adbc04b',
          status: 'active',
          expirationDate: null,
          uuid: '5dd409d0-a886-4631-906b-20edc827d4ba',
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
        {
          type: 'CountryCredential',
          data: {
            country: 'US',
          },
          verificationMethod: 'credit_bureau',
          id: 'd3b3ad6d-7c71-4b4e-975d-cdd6c48f8406',
          status: 'active',
          expirationDate: null,
          uuid: '8b211636-3d5c-49b0-9134-5305868304e4',
        },
      ],
      verificationMethod: 'credit_bureau',
      id: 'ae9bef7b-970e-4475-bb02-a097741d7c14',
      status: 'valid',
      expirationDate: null,
      uuid: 'a3b72ba1-55c4-4dc5-a3be-7d31bc5fab72',
    },
    {
      type: 'AddressCredential',
      data: [
        {
          type: 'Line1Credential',
          data: {
            line1: '9536 Meadow Dr',
          },
          verificationMethod: 'credit_bureau',
          id: '4932894b-ea5f-438d-ad0e-438c44a7bd06',
          status: 'active',
          expirationDate: null,
          uuid: '3b775c96-e3fc-48c8-bb70-c5f409240d02',
        },
        {
          type: 'CityCredential',
          data: {
            city: 'San Francisco',
          },
          verificationMethod: 'credit_bureau',
          id: 'a35a58c3-37aa-45b4-a2e5-afafb7acb8b1',
          status: 'active',
          expirationDate: null,
          uuid: '7a511b64-fce1-44a3-9067-e99040b59467',
        },
        {
          type: 'StateCredential',
          data: {
            state: 'CA',
          },
          verificationMethod: 'credit_bureau',
          id: 'd311d888-f9eb-495d-976d-37bab6863377',
          status: 'active',
          expirationDate: null,
          uuid: 'd26dcf9b-fd42-463d-b58b-de3b7c66a54b',
        },
        {
          type: 'ZipCodeCredential',
          data: {
            zipCode: '94112',
          },
          verificationMethod: 'credit_bureau',
          id: '8c33b996-995f-42ba-84da-a3d5b48d6a05',
          status: 'active',
          expirationDate: null,
          uuid: 'd36f447c-7212-4888-8df4-ee3b56c72f4e',
        },
        {
          type: 'CountryCredential',
          data: {
            country: 'US',
          },
          verificationMethod: 'credit_bureau',
          id: '551cdb1b-dac8-413b-83a5-99328777bb7f',
          status: 'active',
          expirationDate: null,
          uuid: '523aa1a9-ba83-46b4-a883-003a942d48d3',
        },
      ],
      verificationMethod: 'credit_bureau',
      id: '433dc729-d784-4786-a799-1aa60c8ba6a6',
      status: 'valid',
      expirationDate: null,
      uuid: '88259cf0-7cdc-4ab0-88e0-20f2cc927ddd',
    },
    {
      type: 'AddressCredential',
      data: [
        {
          type: 'Line1Credential',
          data: {
            line1: '7292 Hanover St',
          },
          verificationMethod: 'credit_bureau',
          id: 'a59515f0-3493-4da4-b149-803980f7ee46',
          status: 'active',
          expirationDate: null,
          uuid: 'b46b2fd9-2c6d-4896-a49c-31cb92c7831c',
        },
        {
          type: 'CityCredential',
          data: {
            city: 'San Jose',
          },
          verificationMethod: 'credit_bureau',
          id: '0d3b6f1e-ae41-4bed-bf3c-54e9fc5c2629',
          status: 'active',
          expirationDate: null,
          uuid: '476db3de-5f51-4a59-9699-d0f5f192b60b',
        },
        {
          type: 'StateCredential',
          data: {
            state: 'CA',
          },
          verificationMethod: 'credit_bureau',
          id: '81945d91-79c8-4b67-b391-641689a42abd',
          status: 'active',
          expirationDate: null,
          uuid: 'e591a3ef-bcb5-4cc7-bcef-207a14f525e5',
        },
        {
          type: 'ZipCodeCredential',
          data: {
            zipCode: '95122',
          },
          verificationMethod: 'credit_bureau',
          id: '441161a7-f830-47a8-afec-cb812cf6f1fd',
          status: 'active',
          expirationDate: null,
          uuid: '553597fe-2fb1-4a0f-8c37-050894c0cb1f',
        },
        {
          type: 'CountryCredential',
          data: {
            country: 'US',
          },
          verificationMethod: 'credit_bureau',
          id: '87a30a85-9991-40ea-aadb-d975c9fc56e2',
          status: 'active',
          expirationDate: null,
          uuid: 'd33c9317-a9bf-44e3-8791-b6bc80b322a3',
        },
      ],
      verificationMethod: 'credit_bureau',
      id: '9a63adef-ea80-498f-abd9-c0e8b627ba9c',
      status: 'valid',
      expirationDate: null,
      uuid: '22528603-b5e7-49cd-9691-278284429049',
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
