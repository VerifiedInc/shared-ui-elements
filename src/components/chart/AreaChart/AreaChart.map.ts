interface Series {
  key: string;
  dataKey: string;
  color?: string;
}

interface AreaChartData {
  series: Series[];
  data: Array<Record<string, number | string>>;
}

export interface MapAreaChartDataOptions<T = any> {
  data: T[];
  seriesConfig: Array<{
    key: string;
    dataKey: string;
    color?: string;
  }>;
  xAxisKey?: string;
}

/**
 * Generic mapper for area chart data.
 * Transforms raw data into a format suitable for the AreaChart component.
 *
 * @param options Configuration options for mapping the data
 * @returns Formatted data ready for the AreaChart component
 */
export function mapAreaChartData<T extends Record<string, any>>(
  options: MapAreaChartDataOptions<T>,
): AreaChartData {
  const { data, seriesConfig } = options;

  return {
    series: seriesConfig,
    data: data as Array<Record<string, number | string>>,
  };
}
