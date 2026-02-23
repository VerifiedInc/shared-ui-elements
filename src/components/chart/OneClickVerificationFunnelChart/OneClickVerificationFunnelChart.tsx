import React, { useRef, type ReactElement, type ReactNode } from 'react';
import { useTheme, type SxProps } from '@mui/material';

import { contrastColor, lighten } from '../../../utils/color';

import { EmptyChartSection } from '../EmptyChartSection';
import { LoadingChartSection } from '../LoadingChartSection';
import { FunnelChart } from '../FunnelChart';
import type { OneClickVerificationFunnelStepData } from './OneClickVerificationFunnelChart.map';

const styles = {
  chartWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 500,
  },
} as const;

/** Progressive lighten amounts from lightest (index 0 = Created) to base (index 3 = Verified). */
const SHADE_AMOUNTS = [40, 25, 10, 0] as const;

export interface OneClickVerificationFunnelChartProps {
  data: OneClickVerificationFunnelStepData[];
  isLoading: boolean;
  isSuccess: boolean;
  isFetching: boolean;
  sx?: SxProps;
}

export function OneClickVerificationFunnelChart({
  data,
  isLoading,
  isFetching,
  isSuccess,
  sx,
}: Readonly<OneClickVerificationFunnelChartProps>): ReactNode {
  const theme = useTheme();

  if (!data.length && isLoading) {
    return <LoadingChartSection />;
  }

  if (!data.length || !isSuccess) {
    return <EmptyChartSection />;
  }

  if (data.every((step) => step.value === 0)) {
    return <EmptyChartSection />;
  }

  // Filter zero-value steps and preserve original index for colour mapping
  const visibleWithIndex = data
    .map((step, originalIndex) => ({ step, originalIndex }))
    .filter(({ step }) => step.value > 0);

  if (visibleWithIndex.length < 2) {
    return <EmptyChartSection />;
  }

  const base = theme.palette.primary.main;
  const centerXRef = useRef(0);
  const rightEdgeRef = useRef(0);

  // Build funnel data: recalculate drop-off against previous VISIBLE step
  const funnelData = visibleWithIndex.map(({ step, originalIndex }, i) => {
    const prevVisible = i > 0 ? visibleWithIndex[i - 1].step : null;
    let dropOffPercent: number | null = null;

    if (prevVisible !== null && prevVisible.value > 0) {
      const percent =
        ((prevVisible.value - step.value) / prevVisible.value) * 100;
      dropOffPercent = percent > 0 ? percent : null;
    }

    return {
      name: step.name,
      value: step.value,
      dropOffPercent,
      fill: lighten(base, SHADE_AMOUNTS[originalIndex]),
    };
  });

  function InsideLabel(props: any): ReactElement | null {
    const { x, y, width, height, value, index } = props;
    if (value == null) return null;

    // Ensure all labels are centralized by the first (largest) one
    if (index === 0) centerXRef.current = x + width / 2;
    const fill = funnelData[index]?.fill ?? base;
    return (
      <text
        x={centerXRef.current}
        y={y + height / 2}
        textAnchor='middle'
        dominantBaseline='middle'
        fontSize={14}
        fontWeight={600}
        fill={contrastColor(fill)}
      >
        {Number(value).toLocaleString()}
      </text>
    );
  }

  function RightLabel(props: any): ReactElement | null {
    const { x, y, width, height, index } = props;
    const step = funnelData[index];
    if (!step) return null;

    // Ensure all labels are centralized by the first (largest) one
    if (index === 0) rightEdgeRef.current = x + width;
    const labelX = rightEdgeRef.current + 8;
    const hasDropOff = step.dropOffPercent !== null && step.dropOffPercent > 0;
    const centerY = y + height / 2;

    return (
      <g>
        <text
          x={labelX}
          y={hasDropOff ? centerY - 8 : centerY}
          textAnchor='start'
          dominantBaseline='middle'
          fontSize={16}
          fill={theme.palette.text.primary}
        >
          {step.name}
        </text>
        {hasDropOff && (
          <text
            x={labelX}
            y={centerY + 10}
            textAnchor='start'
            dominantBaseline='middle'
            fontSize={11}
            fill={theme.palette.text.secondary}
          >
            {`Drop-off ${step.dropOffPercent?.toFixed(1)}%`}
          </text>
        )}
      </g>
    );
  }

  return (
    <FunnelChart
      data={funnelData}
      insideLabel={{ content: InsideLabel, dataKey: 'value' }}
      outsideLabel={{ content: RightLabel }}
      sx={{ ...styles.chartWrapper, opacity: isFetching ? 0.4 : 1, ...sx }}
    />
  );
}
