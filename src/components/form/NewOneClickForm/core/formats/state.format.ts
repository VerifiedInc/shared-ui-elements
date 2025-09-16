import { US_STATES_RECORD } from '../shared/us-states';

export const stateFormat = (value: string) => {
  return (
    US_STATES_RECORD[value.toUpperCase() as keyof typeof US_STATES_RECORD] ||
    value
  );
};
