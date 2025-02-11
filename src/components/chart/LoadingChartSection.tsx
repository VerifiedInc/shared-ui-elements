import { Stack } from '@mui/material';

import { useStyle } from './styles';
import { SectionTitle } from '../typographies/SectionTitle';
import { SectionDescription } from '../typographies/SectionDescription';

export function LoadingChartSection(): React.ReactNode {
  const styles = useStyle();
  return (
    <Stack sx={styles.smallChartWrapper}>
      <SectionTitle>Loading...</SectionTitle>
      <SectionDescription>Preparing your chart data</SectionDescription>
    </Stack>
  );
}
