import { Stack, StackProps } from '@mui/material';

type DataFieldStackProps = StackProps;

/**
 * This component renders a sequence of data field atomic/composite credentials and spaces them.
 * @param props
 * @constructor
 */
export function DataFieldStack(props: DataFieldStackProps) {
  return (
    <Stack
      direction='column'
      spacing={1.25}
      sx={{ width: '100%' }}
      {...props}
    />
  );
}
