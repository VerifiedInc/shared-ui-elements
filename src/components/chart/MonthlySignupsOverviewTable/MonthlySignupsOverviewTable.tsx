/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */

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
import { DEFAULT_TIMEZONE } from '../../form/TimezoneInput/timezones';

export type MonthlySignupsOverviewTableData = {
  month: string;
  brandUuid: string;
  brand: string;
  integrationType: string;
  total: number;
  finished: number;
  totalCost?: string;
  riskSignal?: number;
};

export type MonthlySignupsOverviewTableProps = {
  data: MonthlySignupsOverviewTableData[];
  isLoading: boolean;
  isFetching: boolean;
  showTotalCost?: boolean;
  showRiskSignal?: boolean;
  timezone?: string;
};

const EMPTY_CHAR = '';

export const MonthlySignupsOverviewTable: React.FC<
  MonthlySignupsOverviewTableProps
> = ({
  data,
  isLoading,
  isFetching,
  showTotalCost = true,
  showRiskSignal = true,
  timezone = DEFAULT_TIMEZONE,
}) => {
  if (!data?.length && isLoading) {
    return <LoadingChartSection />;
  }

  if (!data?.length) {
    return <EmptyChartSection />;
  }
  return (
    <TableContainer component={Paper} sx={{ opacity: isFetching ? 0.4 : 1 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Month</TableCell>
            <TableCell>Brand</TableCell>
            <TableCell>Integration Type</TableCell>
            <TableCell align='right'>Started</TableCell>
            <TableCell align='right'>Finished</TableCell>
            {showTotalCost && <TableCell align='right'>Total Cost</TableCell>}
            {showRiskSignal && <TableCell align='right'>Risk Signal</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={`${row.brandUuid}-${row.month}`}>
              <TableCell>
                {new Date(row.month).toLocaleDateString(undefined, {
                  month: 'short',
                  year: 'numeric',
                  timeZone: timezone,
                })}
              </TableCell>
              <TableCell>{row.brand}</TableCell>
              <TableCell>{row.integrationType}</TableCell>
              <TableCell align='right'>{row.total || EMPTY_CHAR}</TableCell>
              <TableCell align='right'>{row.finished || EMPTY_CHAR}</TableCell>
              {showTotalCost && (
                <TableCell align='right'>
                  {row.totalCost ?? EMPTY_CHAR}
                </TableCell>
              )}
              {showRiskSignal && (
                // Decision to use || instead of ?? because riskSignal is a number and if it is 0, we don't want to show it
                <TableCell align='right'>
                  {row.riskSignal || EMPTY_CHAR}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
