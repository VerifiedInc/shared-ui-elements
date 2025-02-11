import { Stack } from '@mui/material';
import { useStyle } from './styles';
import { SectionTitle } from '../typographies/SectionTitle';
import { SectionDescription } from '../typographies/SectionDescription';

export function EmptyChartSection(): React.ReactNode {
  const styles = useStyle();
  return (
    <Stack sx={styles.smallChartWrapper}>
      <SectionTitle>
        No data available for the selected period and brands
      </SectionTitle>
      <SectionDescription>
        Please select a different period or brand
      </SectionDescription>
    </Stack>
  );
}
