import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Box,
  Stack,
  Typography,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { action } from '@storybook/addon-actions';

import { AddressInput } from '../../../components/form/AddressInput';
import { Address } from '../../../components/form/AddressInput/types';

// Fetcher functions for Storybook using real API endpoints
const googlePlacesAutocompletePlaces = async (
  input: string,
  signal?: AbortSignal,
): Promise<Response> => {
  return fetch(
    'http://localhost:3070/api/googleapis/places/AutocompletePlaces',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input }),
      signal,
    },
  );
};

const googlePlacesGetPlace = async (
  placeId: string,
  signal?: AbortSignal,
): Promise<Response> => {
  return fetch('http://localhost:3070/api/googleapis/places/GetPlace', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: placeId }),
    signal,
  });
};

// Simple clear adornment component for stories
const ClearAdornment = ({ onClick }: { onClick: () => void }) => (
  <InputAdornment position='end'>
    <IconButton
      aria-label='clear address'
      edge='end'
      size='small'
      onClick={onClick}
    >
      <Close fontSize='small' />
    </IconButton>
  </InputAdornment>
);

// Schema for AddressInput based on Address type structure
const addressSchema = z.object({
  addressField: z.object({
    line1: z.string().min(3, 'Line 1 is required'),
    city: z.string().min(3, 'City is required'),
    state: z.string().min(2, 'State is required'),
    zipCode: z.string().min(3, 'Zip code is required'),
    country: z.string().refine((val) => val === 'US', 'Country must be US'),
  }),
});

type AddressFormValues = {
  addressField: Address;
};

const FormWrapper = ({ addressInputProps }: { addressInputProps: any }) => {
  const methods = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      addressField: addressInputProps.defaultValue || {
        line1: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'US',
      },
    },
  });

  const onSubmit = (data: AddressFormValues) => {
    console.log('Form submitted with:', data);
    action('form-submit')(data);
  };

  return (
    <FormProvider {...methods}>
      <Box
        component='form'
        onSubmit={methods.handleSubmit(onSubmit)}
        sx={{ width: '100%' }}
      >
        <Stack spacing={2}>
          <Controller
            name='addressField'
            control={methods.control}
            render={({ field }) => (
              <AddressInput
                {...addressInputProps}
                name={field.name}
                defaultValue={field.value}
                onChange={(value, changeOptions) => {
                  if (!value) {
                    field.onChange({
                      line1: '',
                      city: '',
                      state: '',
                      zipCode: '',
                      country: 'US',
                    });
                    return;
                  }
                  field.onChange(value);
                  action('field-change')(value, changeOptions);
                  if (addressInputProps.onChange) {
                    addressInputProps.onChange(value, changeOptions);
                  }
                }}
              />
            )}
          />
          <Box display='flex' flexDirection='column' gap={2}>
            <Typography variant='body2' color='text.secondary'>
              Form values (watch):
            </Typography>
            <pre
              style={{
                fontSize: '0.875rem',
                background: '#f5f5f5',
                padding: '8px',
                borderRadius: '4px',
              }}
            >
              {JSON.stringify(methods.watch(), null, 2)}
            </pre>
          </Box>
          <button type='submit'>Submit</button>
        </Stack>
      </Box>
    </FormProvider>
  );
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/form/AddressInput',
  component: AddressInput,
  render: (args: any) => (
    <Stack
      justifyContent='center'
      alignItems='center'
      sx={{ width: 500, minHeight: 400, p: 2 }}
    >
      <FormWrapper addressInputProps={args} />
    </Stack>
  ),
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    size: { control: 'select', options: ['small', 'medium'] },
    variant: { control: 'select', options: ['standard', 'filled', 'outlined'] },
    disabled: { control: 'boolean' },
    helperText: { control: 'text' },
  },
} satisfies Meta<typeof AddressInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    name: 'addressField',
    label: 'Address',
    onChange: (
      value: string | Address | null,
      changeOptions?: { shouldValidate?: boolean },
    ) => {
      action('onChange')(value, changeOptions);
    },
    defaultValue: null,
    disabled: false,
    variant: 'outlined',
    size: 'small',
    helperText: 'Enter your address',
    service: {
      googlePlacesAutocompletePlaces,
      googlePlacesGetPlace,
    },
  },
};

export const WithPrefilled: Story = {
  args: {
    name: 'addressField',
    label: 'Address',
    onChange: (
      value: string | Address | null,
      changeOptions?: { shouldValidate?: boolean },
    ) => {
      action('onChange')(value, changeOptions);
    },
    defaultValue: {
      line1: '1600 Amphitheatre Parkway',
      city: 'Mountain View',
      state: 'CA',
      zipCode: '94043',
      country: 'US',
    },
    disabled: false,
    variant: 'outlined',
    size: 'small',
    helperText: 'Pre-filled address',
    service: {
      googlePlacesAutocompletePlaces,
      googlePlacesGetPlace,
    },
  },
};

export const Disabled: Story = {
  args: {
    name: 'addressField',
    label: 'Address',
    onChange: (
      value: string | Address | null,
      changeOptions?: { shouldValidate?: boolean },
    ) => {
      action('onChange')(value, changeOptions);
    },
    defaultValue: {
      line1: '1600 Amphitheatre Parkway',
      city: 'Mountain View',
      state: 'CA',
      zipCode: '94043',
      country: 'US',
    },
    disabled: true,
    variant: 'outlined',
    size: 'small',
    helperText: 'This field is disabled',
    service: {
      googlePlacesAutocompletePlaces,
      googlePlacesGetPlace,
    },
  },
};

export const WithClearAdornment: Story = {
  args: {
    name: 'addressField',
    label: 'Address',
    onChange: (
      value: string | Address | null,
      changeOptions?: { shouldValidate?: boolean },
    ) => {
      action('onChange')(value, changeOptions);
    },
    defaultValue: {
      line1: '1600 Amphitheatre Parkway',
      city: 'Mountain View',
      state: 'CA',
      zipCode: '94043',
      country: 'US',
    },
    disabled: false,
    variant: 'outlined',
    size: 'small',
    helperText: 'Address with clear button',
    ClearAdornment: ClearAdornment,
    service: {
      googlePlacesAutocompletePlaces,
      googlePlacesGetPlace,
    },
  },
};
