import React, { Fragment } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  IconButton,
} from '@mui/material';

import { PageSectionHeader } from '../../typographies/PageSectionHeader';

export type MonthlyBillableSignupsTableProps = {
  data?: Array<{
    month: string;
    brand: string;
    integrationType: string;
    total: number;
    finished: number;
    totalCost: string;
  }>;
  isLoading: boolean;
  isFetching: boolean;
  isSuccess: boolean;
  selectedBrands: Array<{ label: string; value: string }>;
  onBrandChange: (brands: Array<{ label: string; value: string }>) => void;
  onRefresh: () => void;
  LoadingComponent: React.ComponentType;
  EmptyStateComponent: React.ComponentType;
  LastUpdatedComponent: React.ComponentType;
  ContentLoaderComponent: React.ComponentType<{
    isLoading: boolean;
    children: React.ReactNode;
  }>;
  RefreshIconComponent: React.ComponentType;
  BrandFilterComponent: React.ComponentType<{
    label: string;
    multiple: boolean;
    value: Array<{ label: string; value: string }>;
    onChange: (value: Array<{ label: string; value: string }>) => void;
  }>;
};

export const MonthlyBillableSignupsTable: React.FC<
  MonthlyBillableSignupsTableProps
> = ({
  data,
  isLoading,
  isFetching,
  isSuccess,
  selectedBrands,
  onBrandChange,
  onRefresh,
  LoadingComponent,
  EmptyStateComponent,
  LastUpdatedComponent,
  ContentLoaderComponent,
  RefreshIconComponent,
  BrandFilterComponent,
}) => {
  const renderTable = () => {
    if (isLoading) {
      return <LoadingComponent />;
    }

    if (!selectedBrands.length || !data?.length || !isSuccess) {
      return <EmptyStateComponent />;
    }

    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Month</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Integration Type</TableCell>
              <TableCell align='right'>Started</TableCell>
              <TableCell align='right'>Finished</TableCell>
              <TableCell align='right'>Total Cost</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row) => (
              <TableRow key={`${row.brand}-${row.month}`}>
                <TableCell>
                  {new Date(row.month).toLocaleDateString(undefined, {
                    month: 'short',
                    year: 'numeric',
                    timeZone: 'UTC',
                  })}
                </TableCell>
                <TableCell>{row.brand}</TableCell>
                <TableCell>{row.integrationType}</TableCell>
                <TableCell align='right'>{row.total}</TableCell>
                <TableCell align='right'>{row.finished}</TableCell>
                <TableCell align='right'>{row.totalCost}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <Stack spacing={4}>
      <Stack>
        <Stack spacing={4}>
          <PageSectionHeader
            title='Monthly Billable Signups'
            titleRightChildren={
              <Fragment key={1}>
                <IconButton
                  data-testid='add-brand'
                  onClick={onRefresh}
                  disabled={isFetching || !selectedBrands.length}
                >
                  <ContentLoaderComponent isLoading={isFetching}>
                    <RefreshIconComponent />
                  </ContentLoaderComponent>
                </IconButton>
              </Fragment>
            }
          />
          <Stack alignSelf='flex-start' sx={{ minWidth: 250 }}>
            <BrandFilterComponent
              label='Brands'
              multiple
              value={selectedBrands}
              onChange={onBrandChange}
            />
          </Stack>
        </Stack>
      </Stack>
      {renderTable()}
      <Stack sx={{ mt: 2 }}>
        <LastUpdatedComponent />
      </Stack>
    </Stack>
  );
};
