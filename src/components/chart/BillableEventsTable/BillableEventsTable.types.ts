import React from 'react';
import { ChartData } from '../BillableEventsProductTable';

export enum BillableProduct {
  TEXT_TO_SIGNUP = 'TEXT_TO_SIGNUP',
  ONE_CLICK_VERIFY = 'ONE_CLICK_VERIFY',
  ONE_CLICK_SIGNUP = 'ONE_CLICK_SIGNUP',
  ONE_CLICK_HEALTH = 'ONE_CLICK_HEALTH',
}

export type BillableEventColumn = {
  key: string;
  label: string;
  metricKey: string;
};

export type BillableProductConfig = {
  product: BillableProduct;
  label: string;
  columns: BillableEventColumn[];
};

export const BILLABLE_PRODUCTS: BillableProductConfig[] = [
  {
    product: BillableProduct.TEXT_TO_SIGNUP,
    label: 'Text to Signup',
    columns: [
      {
        key: 'tts_smsKeywordsReceived',
        label: 'SMS Keywords Received',
        metricKey: 'ttsSent',
      },
      {
        key: 'tts_verificationsSucceeded',
        label: 'Verifications Succeeded',
        metricKey: 'ttsVerified',
      },
    ],
  },
  {
    product: BillableProduct.ONE_CLICK_VERIFY,
    label: '1-Click Verify',
    columns: [
      {
        key: 'verify_smsSent',
        label: 'SMS Sent',
        metricKey: 'oneClickVerificationSending',
      },
      {
        key: 'verify_verificationsSucceeded',
        label: 'Verifications Succeeded',
        metricKey: 'oneClickVerificationVerified',
      },
    ],
  },
  {
    product: BillableProduct.ONE_CLICK_SIGNUP,
    label: '1-Click Signup',
    columns: [
      {
        key: 'signup_autofillsSucceeded',
        label: 'Autofills Succeeded',
        metricKey: 'oneClickSuccess',
      },
      {
        key: 'signup_riskSignalsReturned',
        label: 'Risk Signals Returned',
        metricKey: 'riskSignal',
      },
    ],
  },
  {
    product: BillableProduct.ONE_CLICK_HEALTH,
    label: '1-Click Health',
    columns: [
      {
        key: 'health_autofillsStarted',
        label: 'Autofills Started',
        metricKey: 'oneClickHealthCreated',
      },
    ],
  },
];

export type BillableEventsTableRow = {
  brandUuid: string;
  brand: string;
  integrationType: string;
  metrics: Record<string, number>;
  raw: ChartData;
};

export type BillableEventsTableProps = {
  data: BillableEventsTableRow[];
  isLoading: boolean;
  isFetching: boolean;
  visibleProducts?: BillableProduct[];
  onSortedDataChange?: (sortedData: BillableEventsTableRow[]) => void;
  columnSlots?: Record<
    string,
    (row: BillableEventsTableRow) => React.ReactNode
  >;
  topLevelColumns?: BillableEventColumn[];
};

export type BillableEventsProductTableProps = {
  data: BillableEventsTableRow[];
  isLoading: boolean;
  isFetching: boolean;
  product: BillableProduct;
  columnSlots?: Record<
    string,
    (row: BillableEventsTableRow) => React.ReactNode
  >;
};
