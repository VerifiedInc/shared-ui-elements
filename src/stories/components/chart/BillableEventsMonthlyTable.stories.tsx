import { Meta, StoryObj } from '@storybook/react';
import { BillableEventsProductTable } from '../../../components/chart/BillableEventsProductTable';
import { BillableProduct } from '../../../components/chart/BillableEventsTable/BillableEventsTable.types';

const meta: Meta<typeof BillableEventsProductTable> = {
  title: 'Components/chart/BillableEventsProductTable',
  component: BillableEventsProductTable,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BillableEventsProductTable>;

const mockData = [
  {
    brandUuid: 'c44d24d0-8cef-4fcc-ad37-1fe154d97e57',
    brand: 'Hooli Health',
    integrationType: 'SDK',
    metrics: {
      tts_smsKeywordsReceived: 10,
      tts_verificationsSucceeded: 8,
      verify_smsSent: 7,
      verify_verificationsSucceeded: 5,
      signup_autofillsSucceeded: 12,
      signup_riskSignals: 8,
      health_autofillsStarted: 13,
    },
    raw: {
      brandUuid: 'c44d24d0-8cef-4fcc-ad37-1fe154d97e57',
      brandName: 'Hooli Health',
      overall: {},
    },
  },
  {
    brandUuid: '',
    brand: 'Pied Piper',
    integrationType: 'API',
    metrics: {
      tts_smsKeywordsReceived: 27,
      tts_verificationsSucceeded: 23,
      verify_smsSent: 18,
      verify_verificationsSucceeded: 16,
      signup_autofillsSucceeded: 33,
      signup_riskSignals: 3,
      health_autofillsStarted: 45,
    },
    raw: {
      brandUuid: '',
      brandName: 'Pied Piper',
      overall: {},
    },
  },
  {
    brandUuid: '42f12a06-47a7-46bf-901b-e4a8227266d0',
    brand: 'Aviato',
    integrationType: 'Semi-Hosted',
    metrics: {
      tts_smsKeywordsReceived: 1,
      tts_verificationsSucceeded: 0,
      verify_smsSent: 3,
      verify_verificationsSucceeded: 2,
      signup_autofillsSucceeded: 65,
      signup_riskSignals: 14,
      health_autofillsStarted: 3,
    },
    raw: {
      brandUuid: '42f12a06-47a7-46bf-901b-e4a8227266d0',
      brandName: 'Aviato',
      overall: {},
    },
  },
];

export const TextToSignup: Story = {
  args: {
    data: mockData,
    isLoading: false,
    isFetching: false,
    product: BillableProduct.TEXT_TO_SIGNUP,
  },
};

export const OneClickVerify: Story = {
  args: {
    data: mockData,
    isLoading: false,
    isFetching: false,
    product: BillableProduct.ONE_CLICK_VERIFY,
  },
};

export const OneClickSignup: Story = {
  args: {
    data: mockData,
    isLoading: false,
    isFetching: false,
    product: BillableProduct.ONE_CLICK_SIGNUP,
  },
};

export const OneClickHealth: Story = {
  args: {
    data: mockData,
    isLoading: false,
    isFetching: false,
    product: BillableProduct.ONE_CLICK_HEALTH,
  },
};

export const Loading: Story = {
  args: {
    data: [],
    isLoading: true,
    isFetching: false,
    product: BillableProduct.ONE_CLICK_SIGNUP,
  },
};

export const Empty: Story = {
  args: {
    data: [],
    isLoading: false,
    isFetching: false,
    product: BillableProduct.ONE_CLICK_SIGNUP,
  },
};
