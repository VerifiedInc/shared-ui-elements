import type { Meta, StoryObj } from '@storybook/react';
import { LogsTable } from '../../../components/logs/LogsTable';
import type { LogsResponse } from '../../../components/logs/types';

const meta: Meta<typeof LogsTable> = {
  title: 'Components/logs/LogsTable',
  component: LogsTable,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof LogsTable>;

const mockData: LogsResponse = {
  data: [
    {
      brandUuid: 'brand-1',
      phone: '+14155550001',
      uuid: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      product: 'verify',
      sessionUuid: 'sess-uuid-1',
      method: 'POST',
      path: 'one-click/verify',
      statusCode: 200,
      latencyMs: 143,
      errorCode: null,
      errorMessage: null,
      source: 'api',
      metadata: {
        requestBody: { phone: '+14155550001' },
        responseBody: { token: 'tok_123' },
      },
      eventTimestamp: '2026-04-07T10:00:00.000Z',
    },
    {
      brandUuid: 'brand-1',
      phone: '+14155550002',
      uuid: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
      product: 'signup',
      sessionUuid: 'sess-uuid-2',
      method: 'POST',
      path: 'one-click/signup',
      statusCode: 400,
      latencyMs: 87,
      errorCode: 'phone_number_invalid',
      errorMessage: 'The phone number provided is invalid.',
      source: 'api',
      metadata: {
        requestBody: { phone: 'bad-number' },
        responseBody: { error: 'phone_number_invalid' },
      },
      eventTimestamp: '2026-04-07T10:01:00.000Z',
    },
    {
      brandUuid: 'brand-1',
      phone: '+14155550003',
      uuid: null,
      product: 'signup',
      sessionUuid: null,
      method: 'autofill',
      path: 'autofill_started',
      statusCode: 200,
      latencyMs: null,
      errorCode: null,
      errorMessage: null,
      source: 'sdk',
      metadata: null,
      eventTimestamp: '2026-04-07T10:02:00.000Z',
    },
    {
      brandUuid: 'brand-1',
      phone: null,
      uuid: 'c3d4e5f6-a7b8-9012-cdef-123456789012',
      product: 'verify',
      sessionUuid: 'sess-uuid-3',
      method: 'GET',
      path: 'one-click/session',
      statusCode: 404,
      latencyMs: 55,
      errorCode: 'session_not_found',
      errorMessage: 'Session not found.',
      source: 'api',
      metadata: {
        requestBody: null,
        responseBody: { error: 'session_not_found' },
      },
      eventTimestamp: '2026-04-07T10:03:00.000Z',
    },
  ],
  cursors: { older: 'cursor-older', newer: null },
  hasOlder: true,
  hasNewer: false,
};

export const Default: Story = {
  args: {
    data: mockData,
    isLoading: false,
    hasOlder: true,
    hasNewer: false,
    isLoadingOlder: false,
    isLoadingNewer: false,
    onLoadNewer: () => {},
    onLoadOlder: () => {},
  },
};

export const Loading: Story = {
  args: {
    data: undefined,
    isLoading: true,
    onLoadNewer: () => {},
    onLoadOlder: () => {},
  },
};

export const Empty: Story = {
  args: {
    data: {
      data: [],
      cursors: { older: null, newer: null },
      hasOlder: false,
      hasNewer: false,
    },
    isLoading: false,
    onLoadNewer: () => {},
    onLoadOlder: () => {},
  },
};

export const LoadingOlder: Story = {
  args: {
    ...Default.args,
    isLoadingOlder: true,
  },
};

export const LoadingNewer: Story = {
  args: {
    ...Default.args,
    isLoadingNewer: true,
  },
};
