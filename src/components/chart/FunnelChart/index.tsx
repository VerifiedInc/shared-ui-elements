import { type ComponentProps, type ReactElement } from 'react';
import { Box, useTheme, type SxProps } from '@mui/material';
import {
  FunnelChart as RechartsFunnelChart,
  Funnel,
  LabelList,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export interface FunnelChartData {
  name: string;
  value: number;
  fill?: string;
}

interface FunnelChartProps {
  data: FunnelChartData[];
  /** Fallback fill color for items without a `fill`. Defaults to `theme.palette.primary.main`. */
  color?: string;
  /** The data key used for segment size. @default 'value' */
  dataKey?: string;
  /** Override props for the Tooltip component. */
  tooltip?: ComponentProps<typeof Tooltip>;
  /** LabelList rendered at the center of each segment (e.g. count). */
  insideLabel?: ComponentProps<typeof LabelList>;
  /** LabelList rendered to the right of each segment (e.g. name + drop-off). */
  outsideLabel?: ComponentProps<typeof LabelList>;
  /** Override props applied to the Funnel element. */
  funnel?: Omit<ComponentProps<typeof Funnel>, 'data' | 'dataKey'>;
  /** Override the chart margin. Merged over the default `{ top: 10, right: 160, left: 10, bottom: 10 }`. */
  margin?: { top?: number; right?: number; left?: number; bottom?: number };
  sx?: SxProps;
  /** Enable chart animation. @default false */
  isAnimationActive?: boolean;
}

export function FunnelChart({
  data,
  color,
  dataKey = 'value',
  tooltip,
  insideLabel,
  outsideLabel,
  funnel,
  margin,
  sx,
  isAnimationActive = false,
}: FunnelChartProps): ReactElement {
  const theme = useTheme();
  const defaultColor = color ?? theme.palette.primary.main;

  const mergedData = data.map((item) => ({
    ...item,
    fill: item.fill ?? defaultColor,
  }));

  return (
    <Box sx={{ width: '100%', height: '100%', ...sx }}>
      <ResponsiveContainer>
        <RechartsFunnelChart
          margin={{ top: 10, right: 90, left: 0, bottom: 10, ...margin }}
        >
          <Funnel
            dataKey={dataKey}
            data={mergedData}
            isAnimationActive={isAnimationActive}
            {...(funnel as any)}
          >
            {insideLabel && <LabelList {...insideLabel} />}
            {outsideLabel && <LabelList {...outsideLabel} />}
          </Funnel>
          {tooltip && <Tooltip {...tooltip} />}
        </RechartsFunnelChart>
      </ResponsiveContainer>
    </Box>
  );
}
