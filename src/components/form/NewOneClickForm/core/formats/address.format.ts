import { toUSaddressPretty } from '../../../../../utils/address';

export const addressFormat = (value: {
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
}): string | null => {
  // Validate required fields
  if (
    !value?.line1?.trim() ||
    !value?.city?.trim() ||
    !value?.state?.trim() ||
    !value?.zipCode?.trim()
  ) {
    return null;
  }

  // Use toUSaddressPretty for consistent formatting
  return toUSaddressPretty({
    line1: value.line1.trim(),
    line2: value.line2?.trim(),
    city: value.city.trim(),
    state: value.state.trim(),
    zipCode: value.zipCode.trim(),
    country: value.country?.trim() ?? 'US',
  });
};
