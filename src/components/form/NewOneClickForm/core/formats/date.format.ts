const MASKED_YEAR_REGEX = /^•{4}-(\d{2})-(\d{2})$/;
const ISO_DATE_REGEX = /^(\d{4})-(\d{2})-(\d{2})$/;

export const dateFormat = (value: string) => {
  // Server-masked birthDate: ••••-MM-DD → MM/DD/••••
  const maskedMatch = MASKED_YEAR_REGEX.exec(value);
  if (maskedMatch) {
    return `${maskedMatch[1]}/${maskedMatch[2]}/••••`;
  }

  // ISO date string: YYYY-MM-DD → MM/DD/YYYY
  const isoMatch = ISO_DATE_REGEX.exec(value);
  if (isoMatch) {
    return `${isoMatch[2]}/${isoMatch[3]}/${isoMatch[1]}`;
  }

  // Legacy Unix-ms timestamp → MM/DD/YYYY (UTC)
  const date = new Date(Number(value));
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const year = date.getUTCFullYear();
  return `${month}/${day}/${year}`;
};
