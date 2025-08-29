import { Skeleton, Stack } from '@mui/material';

export function CredentialDisplayContextSkeleton() {
  return (
    <Stack spacing={3}>
      {new Array(5).fill(0).map((_, index) => (
        <Stack key={index} direction='row' spacing={1}>
          <Skeleton variant='rounded' width='40%' height={46} />
          <Skeleton variant='rounded' width='60%' height={46} />
        </Stack>
      ))}
      <Stack>
        <Skeleton variant='rounded' height={36} sx={{ mt: 3 }} />
      </Stack>
    </Stack>
  );
}
