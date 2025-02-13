import { Meta, StoryFn } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { BrandFilterInput } from '../../../components/BrandFilterInput/index';
import { Brands } from '../../../components/BrandFilterInput/types';
import React from 'react';

const meta: Meta<typeof BrandFilterInput> = {
  title: 'Components/form/BrandFilterInput',
  component: BrandFilterInput,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

// Mock data for brands
const mockBrands: Brands[] = [
  {
    brandUuid: '1',
    brandName: 'Live Brand 1',
    customerUuid: 'c1',
    integrationType: 'API',
    isLiveBrand: true,
    isApproved: true,
  },
  {
    brandUuid: '2',
    brandName: 'Live Brand 2',
    customerUuid: 'c2',
    integrationType: 'SDK',
    isLiveBrand: true,
    isApproved: false,
  },
  {
    brandUuid: '3',
    brandName: 'Not Live Brand',
    customerUuid: 'c3',
    integrationType: 'API',
    isLiveBrand: false,
    isApproved: true,
  },
  {
    brandUuid: '4',
    brandName: 'Another Live Brand',
    customerUuid: 'c4',
    integrationType: 'SDK',
    isLiveBrand: true,
    isApproved: true,
  },
];

const Template: StoryFn<typeof BrandFilterInput> = (args) => {
  const [_, updateArgs] = useArgs();

  const handleChange = (newValue: any) => {
    updateArgs({ value: newValue });
  };

  return (
    <div style={{ width: '400px' }}>
      <BrandFilterInput {...args} onChange={handleChange} />
    </div>
  );
};

// Single select without grouping
export const SingleSelect = Template.bind({});
SingleSelect.args = {
  value: undefined,
  label: 'Select Brand',
  multiple: false,
  brands: mockBrands,
  isLoading: false,
  groupConfig: null,
};

// Multi select without grouping
export const MultiSelect = Template.bind({});
MultiSelect.args = {
  value: [],
  label: 'Select Multiple Brands',
  multiple: true,
  brands: mockBrands,
  isLoading: false,
  maximumSelectedBrands: 3,
  groupConfig: null,
};

// Grouped by live status
export const GroupedByLiveStatus = Template.bind({});
GroupedByLiveStatus.args = {
  value: undefined,
  label: 'Select Brand (Grouped by Live Status)',
  multiple: false,
  brands: mockBrands,
  isLoading: false,
  groupConfig: {
    key: 'isLiveBrand',
    transform: (value: boolean) => (value ? 'Live Brands' : 'Not Live Yet'),
    sortGroups: (a, b) => (a === 'Live Brands' ? -1 : 1),
  },
};

// Grouped by approval status
export const GroupedByApprovalStatus = Template.bind({});
GroupedByApprovalStatus.args = {
  value: undefined,
  label: 'Select Brand (Grouped by Approval)',
  multiple: false,
  brands: mockBrands,
  isLoading: false,
  groupConfig: {
    key: 'isApproved',
    transform: (value: boolean) => (value ? 'Approved' : 'Pending Approval'),
    sortGroups: (a, b) => (a === 'Approved' ? -1 : 1),
  },
};

// Loading state
export const Loading = Template.bind({});
Loading.args = {
  value: undefined,
  label: 'Loading State',
  multiple: false,
  brands: mockBrands,
  isLoading: true,
  groupConfig: null,
};

// Multi select grouped by live status
export const MultiSelectGroupedByLiveStatus = Template.bind({});
MultiSelectGroupedByLiveStatus.args = {
  value: [],
  label: 'Select Multiple Brands (Grouped by Live Status)',
  multiple: true,
  brands: mockBrands,
  isLoading: false,
  maximumSelectedBrands: 3,
  groupConfig: {
    key: 'isLiveBrand',
    transform: (value: boolean) => (value ? 'Live Brands' : 'Not Live Yet'),
    sortGroups: (a, b) => (a === 'Live Brands' ? -1 : 1),
  },
};
