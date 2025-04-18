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
      allowUserInput: true,
      mandatory: 'if_available',
      multi: false,
      type: 'FullNameCredential',
      children: [
        {
          type: 'FirstNameCredential',
          mandatory: 'if_available',
          // allowUserInput: false,
        },
        // { type: 'MiddleNameCredential', mandatory: 'no', allowUserInput: false },
        {
          type: 'LastNameCredential',
          mandatory: 'if_available',
          // allowUserInput: false,
        },
      ],
    },
    {
      allowUserInput: false,
      mandatory: 'if_available',
      multi: false,
      type: 'PhoneCredential',
    },
    {
      allowUserInput: false,
      mandatory: 'if_available',
      multi: true,
      type: 'AddressCredential',
      children: [
        {
          type: 'Line1Credential',
          // mandatory: 'no',
          allowUserInput: false,
        },
        {
          type: 'Line2Credential',
          mandatory: 'no',
          allowUserInput: false,
          description: 'Apt, Unit, etc.',
        },
        {
          type: 'CityCredential',
          // mandatory: 'no',
          allowUserInput: false,
        },
        {
          type: 'CountryCredential',
          // mandatory: 'no',
          allowUserInput: false,
        },
        {
          type: 'StateCredential',
          // mandatory: 'no',
          allowUserInput: false,
        },
        {
          type: 'ZipCodeCredential',
          // mandatory: 'no',
          allowUserInput: false,
        },
      ],
    },
    {
      allowUserInput: false,
      mandatory: 'if_available',
      multi: false,
      type: 'BirthDateCredential',
      description: 'MM/DD/YYYY',
    },
    {
      allowUserInput: false,
      mandatory: 'if_available',
      multi: false,
      type: 'SsnCredential',
    },
    // {
    //   allowUserInput: true,
    //   mandatory: 'no',
    //   multi: false,
    //   type: 'EmployerCredential',
    // },
  ],
  status: 'WAITING_SHARED_CREDENTIALS',
  uuid: 'fb7c6fe2-152c-4579-a4cc-c7472d0e2c45',
  content: {
    title: 'Signup',
    description: '',
  },
  credentials: [
    {
      id: '53dc7187-cefc-46eb-ab1f-2a23ec570c09',
      uuid: 'a06ba8fb-19d3-474a-ac79-453cc6c43588',
      createdAt: '1738698702792',
      updatedAt: '1738698702792',
      type: 'PhoneCredential',
      issuanceDate: '1738698702792',
      expirationDate: null,
      issuerUuid: '387d4812-91bf-45ae-99cb-2fe12a463ced',
      data: {
        phone: '+10123456789',
      },
    },
    {
      id: '4c316119-93ef-44b5-81d2-120ea3baa3cb',
      uuid: '1cec8ac1-7341-4b3a-b822-ad0c34429a6e',
      createdAt: '1738698702792',
      updatedAt: '1738698702792',
      type: 'AddressCredential',
      issuanceDate: '1738698702792',
      expirationDate: null,
      issuerUuid: '4f243ce0-1148-4a6a-8290-516ea10606a4',
      data: [
        {
          id: '7b5da728-d94f-4310-857e-d3fcb2ba5dbe',
          uuid: '7204e529-2041-4e81-ae33-ee9fcf15f03a',
          createdAt: '1738698702792',
          updatedAt: '1738698702792',
          type: 'Line1Credential',
          issuanceDate: '1738698702792',
          expirationDate: null,
          issuerUuid: 'dcb2ded6-9618-4d93-9026-ff5e2eb583c5',
          data: {
            line1: '5320 Newell Rd',
          },
        },
        // {
        //   id: '7b5da728-d94f-4310-857e-d3fcb2ba5dbk',
        //   uuid: '7204e529-2041-4e81-ae33-ee9fcf15f03s',
        //   createdAt: '1738698702792',
        //   updatedAt: '1738698702792',
        //   type: 'Line2Credential',
        //   issuanceDate: '1738698702792',
        //   expirationDate: null,
        //   issuerUuid: 'dcb2ded6-9618-4d93-9026-ff5e2eb583c5',
        //   data: {
        //     line2: 'Apt 606',
        //   },
        // },
        {
          id: 'f0cec9b6-9664-447d-b073-6f7c7862ceaa',
          uuid: '3e8a489e-c1a1-4a56-a6fd-dd4caa4f8df6',
          createdAt: '1738698702792',
          updatedAt: '1738698702792',
          type: 'CityCredential',
          issuanceDate: '1738698702792',
          expirationDate: null,
          issuerUuid: '2967dc9a-1fbd-4a19-944b-177289abe186',
          data: {
            city: 'Palo Alto',
          },
        },
        {
          id: '4d92980b-85d6-4536-9921-94435cff754c',
          uuid: '5880e70f-bcc4-4ac0-a1ad-1336b266c152',
          createdAt: '1738698702792',
          updatedAt: '1738698702792',
          type: 'StateCredential',
          issuanceDate: '1738698702792',
          expirationDate: null,
          issuerUuid: '3d4fef6b-23f9-4e83-87e9-4cce85da6a25',
          data: {
            state: 'CA',
          },
        },
        {
          id: '4d92980b-85d6-4536-9921-94435cff754d',
          uuid: '5880e70f-bcc4-4ac0-a1ad-1336b266c153',
          createdAt: '1738698702792',
          updatedAt: '1738698702792',
          type: 'CountryCredential',
          issuanceDate: '1738698702792',
          expirationDate: null,
          issuerUuid: '3d4fef6b-23f9-4e83-87e9-4cce85da6a25',
          data: {
            state: 'US',
          },
        },
        {
          id: '02c0e740-ea16-42c6-9231-fbd3b2b02828',
          uuid: '085fde67-81e8-471a-badd-a4e693282a52',
          createdAt: '1738698702792',
          updatedAt: '1738698702792',
          type: 'ZipCodeCredential',
          issuanceDate: '1738698702792',
          expirationDate: null,
          issuerUuid: 'b0290f34-d009-4b16-a3ee-26f33f79fd12',
          data: {
            zipCode: '94303',
          },
        },
      ],
    },
    {
      id: '99fb267d-c1d0-4b12-a296-5533317dc5c1',
      uuid: '10a9e718-e20a-4179-8774-54a25f73eab5',
      createdAt: '1738698702792',
      updatedAt: '1738698702792',
      type: 'SsnCredential',
      issuanceDate: '1738698702792',
      expirationDate: null,
      issuerUuid: '2f842399-4220-434d-920d-8b41319cf5db',
      data: {
        ssn: '•••-••-6789',
      },
    },
    {
      id: '99fb267d-c1d0-4b12-a296-5533317dc5c2',
      uuid: '10a9e718-e20a-4179-8774-54a25f73eab6',
      createdAt: '1738698702792',
      updatedAt: '1738698702792',
      type: 'SsnCredential',
      issuanceDate: '1738698702792',
      expirationDate: null,
      issuerUuid: '2f842399-4220-434d-920d-8b41319cf5db',
      data: {
        ssn: '•••-••-6788',
      },
    },
    {
      id: '3c145728-0df2-4207-94a2-7fad69b74f04',
      uuid: '27c6504c-25c2-46e2-90ff-bd5a8064b51c',
      createdAt: '1738698702792',
      updatedAt: '1738698702792',
      type: 'BirthDateCredential',
      issuanceDate: '1738698702792',
      expirationDate: null,
      issuerUuid: '4af49021-7264-4f3d-80ee-901c32405422',
      data: {
        birthDate: '617976000000',
      },
    },
    {
      id: '174714b4-b2d3-4369-a44d-b5f940d935eb',
      uuid: 'b59becd7-5269-4d6d-a234-179613923339',
      createdAt: '1738698702792',
      updatedAt: '1738698702792',
      type: 'FullNameCredential',
      issuanceDate: '1738698702792',
      expirationDate: null,
      issuerUuid: 'e68875fa-1e38-4ffe-8e21-e72d1b16685c',
      data: [
        {
          id: '9da2dad4-714a-4381-bd1f-f6294b1301dd',
          uuid: 'e26d3a0d-7f0c-49fb-a9b4-a9c9e98db169',
          createdAt: '1738698702792',
          updatedAt: '1738698702792',
          type: 'FirstNameCredential',
          issuanceDate: '1738698702792',
          expirationDate: null,
          issuerUuid: 'cd4f73f3-b110-4d68-9ba6-4f9e114c8933',
          data: {
            firstName: 'Richard',
          },
        },
        {
          id: 'beb2685a-1e12-4c15-9984-0cbab71b9b94',
          uuid: '4c79402a-195c-41b8-8b21-690b193387a5',
          createdAt: '1738698702792',
          updatedAt: '1738698702792',
          type: 'LastNameCredential',
          issuanceDate: '1738698702792',
          expirationDate: null,
          issuerUuid: 'c6fbc6bc-162d-4903-96e4-f0b7a711a516',
          data: {
            lastName: 'Hendricks',
          },
        },
      ],
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
    <Stack width={362} flex={1} mt={1}>
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
            // datePickerClickOutsideBoundaryElement: document.body,
          },
          servicePaths: {
            credentialImagePath: '/api/credential-image-search',
            googlePlacesAutocompletePlaces:
              'http://localhost:3070/api/googleapis/places/AutocompletePlaces',
            googlePlacesGetPlace:
              'http://localhost:3070/api/googleapis/places/GetPlace',
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
