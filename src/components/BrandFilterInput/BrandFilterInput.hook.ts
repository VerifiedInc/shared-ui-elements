import { useEffect, useMemo } from 'react';
import _ from 'lodash';
import { BrandFilter, Brands } from './types';

export const toOption = (brands: Brands[]) => {
  return _.chain(brands)
    .mapValues((value) => ({
      name: value.brandName,
      value: value.brandUuid,
      _raw: value,
    }))
    .toArray()
    .value();
};

interface UseBrandFilterInputProps {
  value: BrandFilter | BrandFilter[] | undefined;
  multiple?: boolean;
  onChange?: (brands: BrandFilter | BrandFilter[]) => void;
  brands?: Brands[];
  maximumSelectedBrands?: number;
}

export function useBrandFilterInput({
  value,
  multiple = false,
  onChange,
  brands,
  maximumSelectedBrands = 10,
}: UseBrandFilterInputProps) {
  const groupedBrands = useMemo(() => {
    return (brands ?? []).map((brand) => brand);
  }, [brands]);

  const brandOptions = useMemo(
    () =>
      _.sortBy(toOption(groupedBrands), [
        (option) => (option._raw as any).live,
      ]),
    [groupedBrands],
  );

  // Reset brands when options change
  // Default to live brands
  useEffect(() => {
    // Skip if brand options are not loaded yet to prevent unnecessary resets
    if (!brandOptions.length) return;

    const liveBrands = brandOptions.filter(
      (brand: any) => brand._raw.isLiveBrand,
    );

    // For multiple selection, check if all selected values exist in current environment
    // If any value is missing, reset to default live brands
    if (multiple && Array.isArray(value)) {
      // If no value is selected, reset to default live brands
      if (!value.length) {
        return onChange?.(liveBrands);
      }

      const liveBrandValues = _.map(liveBrands, 'value');
      const isAllValuesIncluded = value.every((item: any) =>
        liveBrandValues.includes(item.value),
      );
      const liveBrandsSlice = liveBrands.slice(0, maximumSelectedBrands);
      onChange?.(isAllValuesIncluded ? value : liveBrandsSlice);
    } else {
      // For single selection, check if selected value exists in current environment
      // If value is missing or invalid, reset to first live brand
      const firstLiveBrand = liveBrands[0];
      if (firstLiveBrand && !Array.isArray(value)) {
        // If no value is selected, reset to first live brand
        if (!value) {
          return onChange?.(firstLiveBrand);
        }

        const liveBrandValues = _.map(liveBrands, 'value');
        const isValueIncluded = value && liveBrandValues.includes(value.value);
        onChange?.(isValueIncluded ? value : firstLiveBrand);
      }
    }
  }, [brandOptions]);

  return {
    brandOptions,
  };
}
