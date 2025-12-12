import { useMemo } from 'react';

// Hook to map the brands color, should be used to paint the charts.
export function useColorMap(
  brands: Array<{
    uuid: string;
    primaryColor?: string;
  }>,
): Map<string, string> {
  const brandsKey = useMemo(
    () => brands.map((b) => `${b.uuid}:${b.primaryColor ?? ''}`).join(','),
    [brands],
  );

  return useMemo(
    () =>
      new Map<string, string>(
        brands
          .filter(
            (
              brand,
            ): brand is {
              uuid: string;
              primaryColor: string;
            } => !!brand.primaryColor,
          )
          .map((brand) => [brand.uuid, brand.primaryColor]),
      ),
    [brandsKey],
  );
}
