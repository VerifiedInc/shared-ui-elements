import { Meta, StoryObj } from '@storybook/react';
import { BillableEventsMonthlyTable } from '../../../components/chart/BillableEventsMonthlyTable';
import { BillableProduct } from '../../../components/chart/BillableEventsTable/BillableEventsTable.types';

const meta: Meta<typeof BillableEventsMonthlyTable> = {
  title: 'Components/chart/BillableEventsMonthlyTable',
  component: BillableEventsMonthlyTable,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BillableEventsMonthlyTable>;

const makeMonthlyMockData = (metricKeys: Record<string, number[]>) => {
  const months = ['2026-01-01T00:00:00.000Z', '2026-02-01T00:00:00.000Z'];
  const brands = [
    { brandUuid: '101', brand: 'Hooli Health', integrationType: 'SDK' },
    { brandUuid: '102', brand: 'Pied Piper', integrationType: 'API' },
    { brandUuid: '103', brand: 'Aviato', integrationType: 'SEMI HOSTED' },
  ];

  return brands.flatMap((brand, bIdx) =>
    months.map((month, mIdx) => ({
      month,
      ...brand,
      metrics: Object.fromEntries(
        Object.entries(metricKeys).map(([key, values]) => [
          key,
          values[bIdx * 2 + mIdx],
        ]),
      ),
    })),
  );
};

const ttsData = makeMonthlyMockData({
  tts_smsKeywordsReceived: [4, 6, 12, 15, 0, 1],
  tts_verificationsSucceeded: [3, 5, 10, 13, 0, 0],
});

const verifyData = makeMonthlyMockData({
  verify_smsSent: [3, 4, 8, 10, 1, 2],
  verify_verificationsSucceeded: [2, 3, 7, 9, 1, 1],
});

const signupData = makeMonthlyMockData({
  signup_autofillsSucceeded: [5, 7, 15, 18, 30, 35],
  signup_riskSignals: [5, 3, 2, 1, 8, 6],
});

const healthData = makeMonthlyMockData({
  health_autofillsStarted: [5, 8, 20, 25, 0, 3],
});

export const TextToSignup: Story = {
  args: {
    data: ttsData,
    isLoading: false,
    isFetching: false,
    product: BillableProduct.TEXT_TO_SIGNUP,
  },
};

export const OneClickVerify: Story = {
  args: {
    data: verifyData,
    isLoading: false,
    isFetching: false,
    product: BillableProduct.ONE_CLICK_VERIFY,
  },
};

export const OneClickSignup: Story = {
  args: {
    data: signupData,
    isLoading: false,
    isFetching: false,
    product: BillableProduct.ONE_CLICK_SIGNUP,
  },
};

export const OneClickHealth: Story = {
  args: {
    data: healthData,
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
