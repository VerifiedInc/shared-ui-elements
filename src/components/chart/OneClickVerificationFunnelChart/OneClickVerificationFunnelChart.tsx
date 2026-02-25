import React, { type ReactElement, type ReactNode } from 'react';
import { useTheme, type SxProps } from '@mui/material';

import { mix } from '../../../utils/color';

import { EmptyChartSection } from '../EmptyChartSection';
import { LoadingChartSection } from '../LoadingChartSection';
import { FunnelChart } from '../FunnelChart';
import type { OneClickVerificationFunnelStepData } from './OneClickVerificationFunnelChart.map';
import { useStyle } from '../styles';
import { lightGreen, lightGrey } from '../../../../src/styles/';

/** Total number of funnel steps — used to compute gradient ratios. */
const TOTAL_STEPS = 4;

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

  // "Verified" is the last step — a funnel without any verified events is meaningless.
  if (data[data.length - 1]?.value === 0) {
    return <EmptyChartSection />;
  }

  // Filter zero-value steps and preserve original index for colour mapping
  const visibleWithIndex = data
    .map((step, originalIndex) => ({ step, originalIndex }))
    .filter(({ step }) => step.value > 0);

  if (visibleWithIndex.length < 2) {
    return <EmptyChartSection />;
  }

  // const gray = theme.palette.grey[400];
  // const green = theme.palette.primary.main;
  const gray = lightGrey;
  const green = lightGreen;

  // Build funnel data: recalculate drop-off against previous VISIBLE step
  const funnelData = visibleWithIndex.map(({ step, originalIndex }, i) => {
    const prevVisible = i > 0 ? visibleWithIndex[i - 1].step : null;
    let dropOffPercent: number | null = null;

    if (prevVisible !== null && prevVisible.value > 0) {
      const percent =
        ((prevVisible.value - step.value) / prevVisible.value) * 100;
      dropOffPercent = percent > 0 ? percent : null;
    }

    // Gradient from gray (top) to green (bottom), tied to the step's
    // original position so each step keeps a consistent colour.
    const ratio = (originalIndex / (TOTAL_STEPS - 1)) * 100;

    return {
      name: step.name,
      value: step.value,
      dropOffPercent,
      fill: mix(gray, green, ratio),
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
    const { y, height, value, viewBox } = props as FunnelLabelProps;
    if (value == null) return null;

    const cx = viewBox.x + viewBox.width / 2;

    return (
      <text
        x={cx}
        y={y + height / 2}
        textAnchor='middle'
        dominantBaseline='middle'
        fontSize={14}
        fontWeight={600}
        fill={theme.palette.text.primary}
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
