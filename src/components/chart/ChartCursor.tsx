import { type ReactElement } from 'react';
import { Curve, DefaultZIndexes, ZIndexLayer, type CurveProps } from 'recharts';

interface ChartCursorProps extends CurveProps {
  /** Line colour. `stroke` itself is overwritten by Recharts when it renders a cursor element. */
  color: string;
}

/**
 * The tooltip's cursor line, drawn just above the grid and below the series, where Recharts 2 drew it.
 * Recharts 3 draws the cursor line above everything, so on a bar chart it would cross the hovered bar.
 */
export function ChartCursor({
  color,
  ...props
}: Readonly<ChartCursorProps>): ReactElement {
  return (
    <ZIndexLayer zIndex={DefaultZIndexes.grid + 1}>
      <Curve {...props} stroke={color} strokeWidth={1} />
    </ZIndexLayer>
  );
}
