import { type ReactElement } from 'react';
import { Sector } from 'recharts';

export const renderActiveShape = (props: any): ReactElement => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
    valuePrefix,
    valuePercentage,
    needleVisible,
    customText,
  } = props;

  // Calculate positions for the line and text
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 5) * cos;
  const sy = cy + (outerRadius + 5) * sin;
  const mx = cx + (outerRadius + 15) * cos;
  const my = cy + (outerRadius + 15) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 15;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  const valueFormatted = value.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return (
    <g>
      {!needleVisible && (
        <text
          x={cx}
          y={cy}
          dy={8}
          textAnchor='middle'
          fill='#333'
          fontSize={14}
        >
          {payload.name}
        </text>
      )}
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 2}
        outerRadius={outerRadius + 6}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill='none'
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke='none' />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 8}
        y={ey}
        textAnchor={textAnchor}
        fill='#333'
        fontSize={12}
      >
        {customText ||
          (valuePrefix ? `${valuePrefix} ${valueFormatted}` : valueFormatted)}
      </text>
      {valuePercentage && (
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 8}
          y={ey}
          dy={16}
          textAnchor={textAnchor}
          fill='#999'
          fontSize={11}
        >
          {`${(percent * 100).toFixed(1)}%`}
        </text>
      )}
    </g>
  );
};
