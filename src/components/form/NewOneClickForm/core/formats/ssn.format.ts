export const ssnFormat = (value: string) => {
  // Normalize asterisk-redacted values (***-**-6789) to bullet format
  const normalized = value.replace(/\*/g, '•');
  return normalized.replace(/(\d{3})-?(\d{2})-?(\d{4})/, '•••-••-$3');
};
