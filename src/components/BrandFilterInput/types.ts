export interface Brands {
  brandUuid: string;
  brandName: string;
  customerUuid: string;
  integrationType: string;
  oneClickCreated?: number;
  oneClickSuccess?: number;
  isLiveBrand?: boolean;
  isApproved?: boolean;
  additionalData?: any;
}

export type BrandFilter = {
  name: string;
  value: string;
  _raw: Brands;
};

/**
 * Type representing the display value for a group in the dropdown.
 * This is what users will see as the group header.
 */
export type GroupDisplayValue = string;

/**
 * Configuration for grouping brands in the dropdown.
 *
 * @template K - The specific key from the Brands type that we want to group by.
 *              TypeScript will ensure type safety based on this key.
 *
 * @example
 * // Group by live status
 * const liveConfig: BrandGroupConfig<'isLiveBrand'> = {
 *   key: 'isLiveBrand',
 *   transform: (value) => value ? 'Live Brands' : 'Not Live',
 *   sortGroups: (a, b) => a === 'Live Brands' ? -1 : 1
 * };
 *
 * // Group by integration type
 * const integrationConfig: BrandGroupConfig<'integrationType'> = {
 *   key: 'integrationType',
 *   transform: (value) => `${value} Integration`
 * };
 *
 * // No grouping
 * const noGrouping: BrandGroupConfig = null;
 */
export type BrandGroupConfig<K extends keyof Brands = keyof Brands> = {
  /**
   * The key from the Brands object to group by.
   * TypeScript will ensure this is a valid key from the Brands type.
   */
  key: K;

  /**
   * Optional function to transform the raw brand value into a display string.
   * The input type is automatically inferred from the key.
   * For example, if key is 'isLiveBrand', value will be boolean | undefined.
   *
   * If not provided, the raw value will be converted to a string.
   */
  transform?: (value: Brands[K]) => GroupDisplayValue;

  /**
   * Optional function to customize the order of groups in the dropdown.
   * Takes two group display values and returns:
   * - Negative number if a should come before b
   * - Positive number if b should come before a
   * - Zero if the order doesn't matter
   *
   * If not provided, groups will be ordered alphabetically.
   */
  sortGroups?: (a: GroupDisplayValue, b: GroupDisplayValue) => number;
} | null;
