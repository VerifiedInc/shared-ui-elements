import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '@mui/material';

import {
  NetworkRulesMetricsTable,
  type NetworkRulesMetricsTableRow,
} from '../../../components/chart/NetworkRulesMetricsTable';

// Counts as a metrics service returns them for the selected period: a busy rule, the rule it
// overlaps with, and quiet rules at 0 / 0.
const exampleRows: NetworkRulesMetricsTableRow[] = [
  {
    uuid: 'a1b2c3d4-0000-4000-8000-000000000001',
    name: 'NY, BCBS - EMPIRE',
    status: 'IN_NETWORK',
    notes: 'Covered under the 2026 agreement',
    conditions: [{}, {}, {}],
    matches: 12480,
    conflicts: 320,
  },
  {
    uuid: '6f1c2a3e-1b2c-4d5e-8f90-0a1b2c3d4e5f',
    name: 'Empire PPO plans',
    status: 'IN_NETWORK',
    notes: null,
    conditions: [{}, {}],
    matches: 964,
    conflicts: 320,
  },
  {
    uuid: '9a8b7c6d-5e4f-4a3b-9c2d-1e0f9a8b7c6d',
    name: 'Medicaid never',
    status: 'OUT_OF_NETWORK',
    notes: 'No self pay',
    conditions: [{}],
    matches: 87,
    conflicts: 0,
  },
  {
    uuid: '0c1d2e3f-4a5b-4c6d-8e9f-0a1b2c3d4e5f',
    name: 'BCBS MN PPO',
    status: 'INDETERMINATE',
    notes: 'Call payer to confirm',
    conditions: [{}, {}, {}],
    matches: 0,
    conflicts: 0,
  },
];

const meta: Meta<typeof NetworkRulesMetricsTable> = {
  title: 'Components/chart/NetworkRulesMetricsTable',
  component: NetworkRulesMetricsTable,
  decorators: [
    (Story) => (
      <Box sx={{ p: 2 }}>
        <Story />
      </Box>
    ),
  ],
  args: {
    data: exampleRows,
  },
};

export default meta;
type Story = StoryObj<typeof NetworkRulesMetricsTable>;

export const Default: Story = {};

export const WithExport: Story = {
  args: { enableExport: true, exportFilename: 'network-rules' },
};

export const WithoutToolbar: Story = {
  args: { showToolbar: false },
};

export const Refetching: Story = {
  args: { isFetching: true },
};

export const Loading: Story = {
  args: { data: [], isLoading: true },
};

export const Empty: Story = {
  args: { data: [] },
};
