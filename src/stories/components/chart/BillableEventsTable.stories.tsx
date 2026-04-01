import { Button, Chip } from '@mui/material';
import { Meta, StoryObj } from '@storybook/react';
import {
  BillableEventsTable,
  BillableEventsTableRow,
  BillableProduct,
  exportBillableEventsToCsv,
} from '../../../components/chart/BillableEventsTable';

const meta: Meta<typeof BillableEventsTable> = {
  title: 'Components/chart/BillableEventsTable',
  component: BillableEventsTable,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BillableEventsTable>;

const mockData: BillableEventsTableRow[] = [
  {
    brandUuid: '101',
    brand: 'Hooli Health',
    integrationType: 'SDK',
    raw: { brandUuid: '101', brandName: 'Hooli Health', overall: {} },
    metrics: {
      tts_smsKeywordsReceived: 4,
      tts_verificationsSucceeded: 3,
      verify_smsSent: 3,
      verify_verificationsSucceeded: 2,
      signup_autofillsSucceeded: 5,
      signup_riskSignals: 5,
      health_autofillsStarted: 5,
    },
  },
  {
    brandUuid: '102',
    brand: 'Pied Piper',
    integrationType: 'API',
    raw: { brandUuid: '102', brandName: 'Pied Piper', overall: {} },
    metrics: {
      tts_smsKeywordsReceived: 12,
      tts_verificationsSucceeded: 10,
      verify_smsSent: 8,
      verify_verificationsSucceeded: 7,
      signup_autofillsSucceeded: 15,
      signup_riskSignals: 2,
      health_autofillsStarted: 20,
    },
  },
  {
    brandUuid: '103',
    brand: 'Aviato',
    integrationType: 'Semi-Hosted',
    raw: { brandUuid: '103', brandName: 'Aviato', overall: {} },
    metrics: {
      tts_smsKeywordsReceived: 0,
      tts_verificationsSucceeded: 0,
      verify_smsSent: 1,
      verify_verificationsSucceeded: 1,
      signup_autofillsSucceeded: 30,
      signup_riskSignals: 8,
      health_autofillsStarted: 0,
    },
  },
];

export const AllProducts: Story = {
  args: {
    data: mockData,
    isLoading: false,
    isFetching: false,
  },
};

export const SingleProduct: Story = {
  args: {
    data: mockData,
    isLoading: false,
    isFetching: false,
    visibleProducts: [BillableProduct.ONE_CLICK_SIGNUP],
  },
};

export const TwoProducts: Story = {
  args: {
    data: mockData,
    isLoading: false,
    isFetching: false,
    visibleProducts: [
      BillableProduct.TEXT_TO_SIGNUP,
      BillableProduct.ONE_CLICK_VERIFY,
    ],
  },
};

export const WithColumnSlots: Story = {
  args: {
    data: mockData,
    isLoading: false,
    isFetching: false,
    columnSlots: {
      signup_autofillsSucceeded: (row: BillableEventsTableRow) => (
        <Chip
          label={row.metrics.signup_autofillsSucceeded}
          color={
            row.metrics.signup_autofillsSucceeded > 10 ? 'success' : 'default'
          }
          size='small'
        />
      ),
      signup_riskSignals: (row: BillableEventsTableRow) => (
        <Chip
          label={row.metrics.signup_riskSignals}
          color={row.metrics.signup_riskSignals > 5 ? 'warning' : 'default'}
          size='small'
        />
      ),
    },
  },
};

export const Loading: Story = {
  args: {
    data: [],
    isLoading: true,
    isFetching: false,
  },
};

export const Empty: Story = {
  args: {
    data: [],
    isLoading: false,
    isFetching: false,
  },
};

export const Fetching: Story = {
  args: {
    data: mockData,
    isLoading: false,
    isFetching: true,
  },
};

export const ExportToCsv: Story = {
  args: {
    data: mockData,
    isLoading: false,
    isFetching: false,
  },
  render: (args) => (
    <>
      <Button
        variant='contained'
        size='small'
        sx={{ mb: 2 }}
        onClick={() =>
          exportBillableEventsToCsv({
            data: mockData,
            filename: 'billable-events-export',
            columnFormatters: {
              signup_autofillsSucceeded: (value) => `${value} signups`,
              signup_riskSignals: (value, row) =>
                `${row.brand}: ${value > 5 ? 'High' : 'Low'}`,
            },
          })
        }
      >
        Export CSV
      </Button>
      <BillableEventsTable {...args} />
    </>
  ),
};
