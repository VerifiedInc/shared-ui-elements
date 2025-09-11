export const dateFormat = (value: string) => {
  // Format as MM/DD/YYYY in UTC
  const date = new Date(Number(value));
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const year = date.getUTCFullYear();
  return `${month}/${day}/${year}`;
};
