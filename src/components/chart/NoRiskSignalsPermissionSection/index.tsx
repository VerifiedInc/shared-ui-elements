import { type ReactElement } from 'react';

import { useStyle } from '../styles';
import { SectionDescription } from '../../typographies/SectionDescription';
import { SectionTitle } from '../../typographies/SectionTitle';
import { Stack } from '@mui/material';

export function NoRiskSignalsPermissionSection(): ReactElement {
  const styles = useStyle();
  return (
    <Stack sx={styles.smallChartWrapper}>
      <SectionTitle>
        No data available for the selected period and brands
      </SectionTitle>
      <SectionDescription>
        Please change the Risk Signals setting for your brands to enable risk
        signals metadata
      </SectionDescription>
    </Stack>
  );
}
