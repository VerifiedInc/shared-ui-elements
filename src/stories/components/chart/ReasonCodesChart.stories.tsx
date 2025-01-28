import type { Meta, StoryObj } from '@storybook/react';

import { ReasonCodesChart } from '../../../components/chart';

const meta = {
  title: 'components/chart/ReasonCodesChart',
  component: ReasonCodesChart,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ReasonCodesChart>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockData = {
  OCR001: 150,
  OCR002: 75,
  OCR003: 200,
  OCR004: 50,
  OCR005: 125,
  OCR006: 100,
  OCR007: 80,
  OCR008: 60,
};

export const Default: Story = {
  args: {
    data: mockData,
    sx: {
      width: 800,
      height: 400,
    },
  },
};

export const NoData: Story = {
  args: {
    data: undefined,
    sx: {
      width: 800,
      height: 400,
    },
  },
};

export const SingleReason: Story = {
  args: {
    data: {
      OCR001: 300, // Document Verification Failed - Invalid or Unreadable Document
    },
    sx: {
      width: 800,
      height: 400,
    },
  },
};
