import { IconButton, Stack } from '@mui/material';
import { PageSectionHeader } from '@verifiedinc-public/shared-ui-elements/components';
import { SeriesChart } from '@verifiedinc-public/shared-ui-elements/components/chart';
import React, { Fragment } from 'react';
import { useStyle } from './OneClickOverTimeChart.style';
import {
  BrandFilter,
  TimeSeriesChartData,
} from '../OneClickTimeSeriesDataMapper';

interface OneClickOverTimeChartProps {
  data: TimeSeriesChartData[];
  isLoading: boolean;
  isFetching: boolean;
  onRefresh: () => void;
  lastUpdated: number;
  filter: { timezone: string; brands: BrandFilter[] };
  LoadingComponent?: React.ComponentType;
  EmptyStateComponent?: React.ComponentType;
  LastUpdatedComponent?: React.ComponentType<{ lastUpdated: number }>;
  ContentLoaderComponent?: React.ComponentType<{
    isLoading: boolean;
    children: React.ReactNode;
  }>;
  RefreshIconComponent?: React.ComponentType;
}

export function OneClickOverTimeChart({
  data,
  isLoading,
  isFetching,
  onRefresh,
  lastUpdated,
  filter,
  LoadingComponent,
  EmptyStateComponent,
  LastUpdatedComponent,
  ContentLoaderComponent,
  RefreshIconComponent,
}: Readonly<OneClickOverTimeChartProps>): React.ReactNode {
  const styles = useStyle();

  const renderChart = () => {
    if (isLoading && LoadingComponent) {
      return <LoadingComponent />;
    }

    if (!data.length && EmptyStateComponent) {
      return <EmptyStateComponent />;
    }

    return (
      <SeriesChart
        label='Uniques'
        data={data}
        filter={filter}
        sx={{ ...styles.chartWrapper, opacity: isFetching ? 0.4 : 1 }}
      />
    );
  };

  const renderRefreshIcon = () => {
    if (ContentLoaderComponent && RefreshIconComponent) {
      return (
        <ContentLoaderComponent isLoading={isFetching}>
          <RefreshIconComponent />
        </ContentLoaderComponent>
      );
    }
    return null;
  };

  return (
    <Stack spacing={2}>
      <Stack>
        <Stack direction='row' alignItems='center' spacing={2}>
          <PageSectionHeader
            title='1-Click Signups'
            titleRightChildren={
              <Fragment key={1}>
                <IconButton
                  data-testid='refresh-one-click-over-time-chart'
                  onClick={onRefresh}
                  disabled={isFetching || !filter?.brands?.length}
                >
                  {renderRefreshIcon()}
                </IconButton>
              </Fragment>
            }
          />
        </Stack>
      </Stack>
      <Stack direction='column' spacing={2}>
        {renderChart()}
      </Stack>
      {LastUpdatedComponent && (
        <Stack sx={{ mt: 2 }}>
          <LastUpdatedComponent lastUpdated={lastUpdated} />
        </Stack>
      )}
    </Stack>
  );
}
