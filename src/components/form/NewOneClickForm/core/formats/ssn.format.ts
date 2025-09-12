export const ssnFormat = (value: string) => {
  return value.replace(/(\d{3})-?(\d{2})-?(\d{4})/, '•••-••-$3');
};
