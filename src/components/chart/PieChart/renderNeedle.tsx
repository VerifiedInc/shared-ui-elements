import { type ReactElement } from 'react';

interface DataPoint {
  value: number;
}

interface NeedleOptions {
  value: number;
  data: DataPoint[];
  color: string;
  innerRadius: string | number;
  outerRadius: string | number;
  boxDimensions?: DOMRectReadOnly;
  legendDimensions: DOMRectReadOnly;
  valuePrefix?: string;
}

export const renderNeedle = (options: NeedleOptions): ReactElement => {
  const {
    value,
    data,
    color,
    innerRadius,
    outerRadius,
    boxDimensions,
    legendDimensions,
    valuePrefix,
  } = options;
  const RADIAN = Math.PI / 180;

  let total = 0;

  data.forEach((v: DataPoint) => {
    total += v.value;
  });

  const cx = boxDimensions ? boxDimensions.width / 2 : 150;
  const cy =
    (boxDimensions ? boxDimensions.height / 2 : 200) -
    legendDimensions.height / 2;

  // Clamp angle between 0 and 180 degrees
  const ratio = Math.max(0, Math.min(1, value / total));
  const ang = 180.0 * (1 - ratio);

  const length = (Number(innerRadius) + 2 * Number(outerRadius)) / 3;
  const sin = Math.sin(-RADIAN * ang);
  const cos = Math.cos(-RADIAN * ang);
  const r = 5;
  const x0 = cx - r;
  const y0 = cy;
  const xba = x0 + r * sin;
  const yba = y0 - r * cos;
  const xbb = x0 - r * sin;
  const ybb = y0 + r * cos;
  const xp = x0 + length * cos;
  const yp = y0 + length * sin;

  const valueFormatted = value.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  let _valuePrefix = valuePrefix;
  const matchTemplate = valuePrefix?.match(/{{needleValue}}/);
  if (matchTemplate) {
    _valuePrefix = valuePrefix?.replace('{{needleValue}}', valueFormatted);
  }
  const needleText = matchTemplate
    ? (_valuePrefix ?? valueFormatted)
    : valueFormatted;

  return (
    <>
      <circle
        key='needle-circle'
        cx={x0}
        cy={y0}
        r={r}
        fill={color}
        stroke='none'
      />

      <path
        key='needle-path'
        d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`}
        stroke='none'
        fill={color}
      />

      <text
        key='needle-value'
        x={x0 + r}
        y={y0 + 26}
        textAnchor='middle'
        fill='#333'
        fontSize={12}
      >
        {needleText}
      </text>
    </>
  );
};
