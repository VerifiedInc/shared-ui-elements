import { EmployerValue } from '../validations';

export const employerFormat = (value: EmployerValue) => {
  const details = value?.employer;
  if (!details?.name) return null;
  return [details.name, details.address?.state].filter(Boolean).join(' — ');
};
