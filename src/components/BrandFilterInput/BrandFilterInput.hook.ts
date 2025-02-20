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
  defaultBrandUuids?: string[];
}

export function useBrandFilterInput({
  value,
  multiple = false,
  onChange,
  brands,
  maximumSelectedBrands,
  defaultBrandUuids,
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

  // Reset brands when options change or use default brand UUIDs
  useEffect(() => {
    // Skip if brand options are not loaded yet to prevent unnecessary resets
    if (!brandOptions.length) return;

    const defaultBrands = defaultBrandUuids
      ? brandOptions.filter((brand) => defaultBrandUuids.includes(brand.value))
      : [];

    // For multiple selection, check if all selected values exist in current environment
    if (multiple && Array.isArray(value)) {
      // If no value is selected and we have default brands, use them
      if (!value.length && defaultBrands.length) {
        return onChange?.(defaultBrands.slice(0, maximumSelectedBrands));
      }

      const availableBrandValues = _.map(brandOptions, 'value');
      const isAllValuesIncluded = value.every((item: any) =>
        availableBrandValues.includes(item.value),
      );

      if (!isAllValuesIncluded && defaultBrands.length) {
        onChange?.(defaultBrands.slice(0, maximumSelectedBrands));
      }
    } else {
      // For single selection, check if selected value exists in current environment
      const firstDefaultBrand = defaultBrands[0];
      if (!Array.isArray(value)) {
        // If no value is selected and we have a default brand, use it
        if (!value && firstDefaultBrand) {
          return onChange?.(firstDefaultBrand);
        }

        const availableBrandValues = _.map(brandOptions, 'value');
        const isValueIncluded =
          value && availableBrandValues.includes(value.value);

        if (!isValueIncluded && firstDefaultBrand) {
          onChange?.(firstDefaultBrand);
        }
      }
    }
  }, [brandOptions]);

  return {
    brandOptions,
  };
}
