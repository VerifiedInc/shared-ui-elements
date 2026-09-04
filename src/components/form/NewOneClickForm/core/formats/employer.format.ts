import { EmployerValue } from '../validations';

export const employerFormat = (value: EmployerValue) => {
  if (!value?.employer?.name) return null;
  return [value.employer.name, value.employer.legalName]
    .filter(Boolean)
    .join(' — ');
};
