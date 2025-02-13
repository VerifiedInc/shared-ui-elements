import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { MonthlyBillableSignupsTable } from '../../../components/chart/monthly-billable-signups/MonthlyBillableSignupsTable';

const meta: Meta<typeof MonthlyBillableSignupsTable> = {
  title: 'Components/chart/MonthlyBillableSignupsTable',
  component: MonthlyBillableSignupsTable,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MonthlyBillableSignupsTable>;

const mockData = [
  {
    month: '2025-01-01T00:00:00.000Z',
    brand: 'Example Brand 1',
    integrationType: 'Hosted',
    total: 150,
    finished: 145,
    totalCost: '$725.00',
  },
  {
    month: '2025-01-01T00:00:00.000Z',
    brand: 'Example Brand 2',
    integrationType: 'Semi Hosted',
    total: 200,
    finished: 198,
    totalCost: '$990.00',
  },
  {
    month: '2025-01-01T00:00:00.000Z',
    brand: 'Example Brand 3',
    integrationType: 'Non Hosted',
    total: 180,
    finished: 175,
  },
  {
    month: '2025-02-01T00:00:00.000Z',
    brand: 'Example Brand 1',
    integrationType: 'Hosted',
    total: 175,
    finished: 170,
    totalCost: '$850.00',
  },
  {
    month: '2025-02-01T00:00:00.000Z',
    brand: 'Example Brand 2',
    integrationType: 'Semi Hosted',
    total: 225,
    finished: 220,
    totalCost: '$1100.00',
  },
  {
    month: '2025-02-01T00:00:00.000Z',
    brand: 'Example Brand 3',
    integrationType: 'Non Hosted',
    total: 195,
    finished: 190,
    totalCost: '$950.00',
  },
];

export const WithTotalCost: Story = {
  args: {
    data: mockData,
    isLoading: false,
    showTotalCost: true,
  },
};

export const WithoutTotalCost: Story = {
  args: {
    data: mockData,
    isLoading: false,
    showTotalCost: false,
  },
};

export const Loading: Story = {
  args: {
    data: [],
    isLoading: true,
  },
};

export const Empty: Story = {
  args: {
    data: [],
    isLoading: false,
  },
};
