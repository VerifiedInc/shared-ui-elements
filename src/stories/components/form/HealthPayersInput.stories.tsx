import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box, Stack, Typography } from '@mui/material';
import { action } from '@storybook/addon-actions';

import {
  HealthPayersInput,
  type HealthPayer,
  type FetchHealthPayers,
} from '../../../components/form/HealthPayersInput';

// A static list of payers used to back the in-memory mock fetcher.
const ALL_PAYERS: HealthPayer[] = [
  { verifiedId: 'V1', name: 'Acme Health', logoUrl: null },
  { verifiedId: 'V2', name: 'Acme Insurance', logoUrl: null },
  { verifiedId: 'V3', name: 'Acme Care', logoUrl: null },
];

// In-memory mock that mimics the real payers endpoint: filters by `search`
// and paginates with `limit`/`skip`, with a small artificial delay so the
// loading state is visible.
const mockFetchPayers: FetchHealthPayers = async (params) => {
  const search = (params?.search ?? '').toLowerCase();
  const limit = params?.limit ?? 20;
  const skip = params?.skip ?? 0;

  await new Promise((resolve) => setTimeout(resolve, 400));

  const filtered = search
    ? ALL_PAYERS.filter((payer) => payer.name.toLowerCase().includes(search))
    : ALL_PAYERS;

  return filtered.slice(skip, skip + limit);
};

const HealthPayersInputWithState = (args: any): React.JSX.Element => {
  const [value, setValue] = useState<HealthPayer | null>(args.value ?? null);

  return (
    <Stack spacing={2} sx={{ width: 400 }}>
      <HealthPayersInput
        {...args}
        value={value}
        onChange={(payer) => {
          setValue(payer);
          action('onChange')(payer);
        }}
      />
      <Box>
        <Typography variant='body2' color='text.secondary' gutterBottom>
          Selected payer:
        </Typography>
        <pre
          style={{
            fontSize: '0.875rem',
            background: '#f5f5f5',
            padding: '8px',
            borderRadius: '4px',
            margin: 0,
          }}
        >
          {JSON.stringify(value, null, 2)}
        </pre>
      </Box>
    </Stack>
  );
};

const meta = {
  title: 'Components/form/HealthPayersInput',
  component: HealthPayersInput,
  render: (args) => <HealthPayersInputWithState {...args} />,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    helperText: { control: 'text' },
    placeholder: { control: 'text' },
    size: { control: 'select', options: ['small', 'medium'] },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof HealthPayersInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: null,
    disabled: false,
    fetchPayers: mockFetchPayers,
  },
};

export const Prefilled: Story = {
  args: {
    value: { verifiedId: 'V1', name: 'Acme Health', logoUrl: null },
    disabled: false,
    fetchPayers: mockFetchPayers,
  },
};

export const Disabled: Story = {
  args: {
    value: { verifiedId: 'V2', name: 'Acme Insurance', logoUrl: null },
    disabled: true,
    fetchPayers: mockFetchPayers,
  },
};
