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
  {
    brandUuid: '5',
    brandName: 'Another Live Brand',
    customerUuid: 'c5',
    integrationType: 'SDK',
    isLiveBrand: true,
    isApproved: true,
  },
  {
    brandUuid: '6',
    brandName: 'Another Live Brand',
    customerUuid: 'c6',
    integrationType: 'SDK',
    isLiveBrand: true,
    isApproved: true,
  },
  {
    brandUuid: '7',
    brandName: 'Another Live Brand',
    customerUuid: 'c7',
    integrationType: 'SDK',
    isLiveBrand: true,
    isApproved: true,
  },
];

// Extended mock data with many brands in different groups
const extendedMockBrands: Brands[] = [
  // API Integration - Live Brands
  {
    brandUuid: '101',
    brandName: 'API Live Brand 1',
    customerUuid: 'c101',
    integrationType: 'API',
    isLiveBrand: true,
    isApproved: true,
  },
  {
    brandUuid: '102',
    brandName: 'API Live Brand 2',
    customerUuid: 'c102',
    integrationType: 'API',
    isLiveBrand: true,
    isApproved: true,
  },
  {
    brandUuid: '103',
    brandName: 'API Live Brand 3',
    customerUuid: 'c103',
    integrationType: 'API',
    isLiveBrand: true,
    isApproved: true,
  },

  // API Integration - Not Live Brands
  {
    brandUuid: '104',
    brandName: 'API Not Live Brand 1',
    customerUuid: 'c104',
    integrationType: 'API',
    isLiveBrand: false,
    isApproved: true,
  },
  {
    brandUuid: '105',
    brandName: 'API Not Live Brand 2',
    customerUuid: 'c105',
    integrationType: 'API',
    isLiveBrand: false,
    isApproved: false,
  },

  // SDK Integration - Live Brands
  {
    brandUuid: '201',
    brandName: 'SDK Live Brand 1',
    customerUuid: 'c201',
    integrationType: 'SDK',
    isLiveBrand: true,
    isApproved: true,
  },
  {
    brandUuid: '202',
    brandName: 'SDK Live Brand 2',
    customerUuid: 'c202',
    integrationType: 'SDK',
    isLiveBrand: true,
    isApproved: true,
  },
  {
    brandUuid: '203',
    brandName: 'SDK Live Brand 3',
    customerUuid: 'c203',
    integrationType: 'SDK',
    isLiveBrand: true,
    isApproved: false,
  },

  // SDK Integration - Not Live Brands
  {
    brandUuid: '204',
    brandName: 'SDK Not Live Brand 1',
    customerUuid: 'c204',
    integrationType: 'SDK',
    isLiveBrand: false,
    isApproved: true,
  },
  {
    brandUuid: '205',
    brandName: 'SDK Not Live Brand 2',
    customerUuid: 'c205',
    integrationType: 'SDK',
    isLiveBrand: false,
    isApproved: false,
  },

  // Web Integration - Live Brands
  {
    brandUuid: '301',
    brandName: 'Web Live Brand 1',
    customerUuid: 'c301',
    integrationType: 'Web',
    isLiveBrand: true,
    isApproved: true,
  },
  {
    brandUuid: '302',
    brandName: 'Web Live Brand 2',
    customerUuid: 'c302',
    integrationType: 'Web',
    isLiveBrand: true,
    isApproved: false,
  },

  // Web Integration - Not Live Brands
  {
    brandUuid: '303',
    brandName: 'Web Not Live Brand 1',
    customerUuid: 'c303',
    integrationType: 'Web',
    isLiveBrand: false,
    isApproved: true,
  },
  {
    brandUuid: '304',
    brandName: 'Web Not Live Brand 2',
    customerUuid: 'c304',
    integrationType: 'Web',
    isLiveBrand: false,
    isApproved: false,
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
  defaultBrandUuids: ['1'],
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
  defaultBrandUuids: ['1', '2'],
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
  defaultBrandUuids: ['1', '2', '3'],
  groupConfig: {
    key: 'isLiveBrand',
    transform: (value: boolean) => (value ? 'Live Brands' : 'Not Live Yet'),
    sortGroups: (a, b) => (a === 'Live Brands' ? -1 : 1),
  },
};

// Multi select with many brands grouped by integration type (no max limit)
export const MultiSelectManyBrandsGroupedByIntegrationType = Template.bind({});
MultiSelectManyBrandsGroupedByIntegrationType.args = {
  value: [],
  label: 'Select Multiple Brands (Grouped by Integration Type)',
  multiple: true,
  brands: extendedMockBrands,
  isLoading: false,
  groupConfig: {
    key: 'integrationType',
    transform: (value: string) => `${value} Integration`,
    sortGroups: (a, b) => a.localeCompare(b),
  },
};

// Multi select with many brands grouped by live status (no max limit)
export const MultiSelectManyBrandsGroupedByLiveStatus = Template.bind({});
MultiSelectManyBrandsGroupedByLiveStatus.args = {
  value: [],
  label: 'Select Multiple Brands (Grouped by Live Status)',
  multiple: true,
  brands: extendedMockBrands,
  isLoading: false,
  groupConfig: {
    key: 'isLiveBrand',
    transform: (value: boolean) => (value ? 'Live Brands' : 'Not Live Yet'),
    sortGroups: (a, b) => (a === 'Live Brands' ? -1 : 1),
  },
};

// Multi select with many brands grouped by approval status (no max limit)
export const MultiSelectManyBrandsGroupedByApprovalStatus = Template.bind({});
MultiSelectManyBrandsGroupedByApprovalStatus.args = {
  value: [],
  label: 'Select Multiple Brands (Grouped by Approval Status)',
  multiple: true,
  brands: extendedMockBrands,
  isLoading: false,
  groupConfig: {
    key: 'isApproved',
    transform: (value: boolean) =>
      value ? 'Approved Brands' : 'Pending Approval',
    sortGroups: (a, b) => (a === 'Approved Brands' ? -1 : 1),
  },
};
