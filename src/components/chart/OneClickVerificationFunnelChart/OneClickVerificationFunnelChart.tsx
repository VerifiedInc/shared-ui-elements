import React, { type ReactElement, type ReactNode } from 'react';
import { useTheme, type SxProps } from '@mui/material';

import { contrastColor, lighten } from '../../../utils/color';

import { EmptyChartSection } from '../EmptyChartSection';
import { LoadingChartSection } from '../LoadingChartSection';
import { FunnelChart } from '../FunnelChart';
import type { OneClickVerificationFunnelStepData } from './OneClickVerificationFunnelChart.map';
import { useStyle } from '../styles';

/** Progressive lighten amounts from lightest (index 0 = Created) to base (index 3 = Verified). */
const SHADE_AMOUNTS = [40, 25, 10, 0] as const;

/** Subset of props recharts passes to a LabelList `content` function inside a Funnel. */
interface FunnelLabelProps {
  x: number;
  y: number;
  width: number;
  height: number;
  value: number;
  index: number;
  viewBox: { x: number; y: number; width: number; height: number };
}

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
  const style = useStyle();
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

  const maxValue =
    funnelData[
      funnelData.reduce(
        (maxIdx, step, i) =>
          step.value > funnelData[maxIdx].value ? i : maxIdx,
        0,
      )
    ].value;

  /**
   * Recharts internally computes a `labelViewBox` for each funnel segment
   * whose center (`viewBox.x + viewBox.width / 2`) is always the chart's
   * true horizontal centre — regardless of whether the funnel is monotonic.
   *
   * From that centre we can also derive the widest segment's right edge
   * algebraically:  `cx + (cx - x) * maxValue / segmentValue`
   */

  function InsideLabel(props: object): ReactElement | null {
    const { y, width, height, value, index, viewBox } =
      props as FunnelLabelProps;
    if (value == null) return null;

    const cx = viewBox.x + viewBox.width / 2;
    const fill = funnelData[index]?.fill ?? base;

    // When the segment is narrower than this threshold the label overflows
    // onto the white background — switch to a dark colour so it stays legible.
    const MIN_FILL_WIDTH = 60;
    const textColor =
      width >= MIN_FILL_WIDTH
        ? contrastColor(fill)
        : theme.palette.text.primary;

    return (
      <text
        x={cx}
        y={y + height / 2}
        textAnchor='middle'
        dominantBaseline='middle'
        fontSize={14}
        fontWeight={600}
        fill={textColor}
      >
        {Number(value).toLocaleString()}
      </text>
    );
  }

  function RightLabel(props: object): ReactElement | null {
    const { x, y, height, index, viewBox } = props as FunnelLabelProps;
    const step = funnelData[index];
    if (!step) return null;

    // Derive the widest segment's right edge from any segment's geometry.
    const cx = viewBox.x + viewBox.width / 2;
    const labelX = cx + ((cx - x) * maxValue) / step.value + 8;

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
      sx={{
        ...style.regularChartWrapper,
        opacity: isFetching ? 0.4 : 1,
        ...sx,
      }}
    />
  );
}
