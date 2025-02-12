import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React from 'react';
import { EmptyChartSection } from '../EmptyChartSection';
import { LoadingChartSection } from '../LoadingChartSection';

export type BillableSignupData = {
  month: string;
  brand: string;
  integrationType: string;
  total: number;
  finished: number;
  totalCost: string;
};

export type MonthlyBillableSignupsTableProps = {
  data: BillableSignupData[];
  isLoading: boolean;
};

const styles = {
  tableWrapper: {
    height: 400,
    alignItems: 'center',
    justifyContent: 'center',
  },
} as const;

export const MonthlyBillableSignupsTable: React.FC<
  MonthlyBillableSignupsTableProps
> = ({ data, isLoading }) => {
  if (isLoading) {
    return <LoadingChartSection />;
  }

  if (!data?.length) {
    return <EmptyChartSection />;
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
          {data.map((row) => (
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
