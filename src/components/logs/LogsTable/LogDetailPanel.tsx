import { Box, Paper, Stack, Typography } from '@mui/material';

import type { LogEntry } from '../types';

interface LogDetailPanelProps {
  log: LogEntry;
}

function DetailField({
  label,
  value,
  color,
}: {
  label: string;
  value: string | null;
  color?: string;
}) {
  if (!value) {
    return null;
  }

  return (
    <Box sx={{ mb: 0.75 }}>
      <Typography variant='body2' component='span' color='text.secondary'>
        {label}:{' '}
      </Typography>
      <Typography
        variant='body2'
        component='span'
        fontWeight={600}
        fontFamily='monospace'
        color={color ?? 'text.primary'}
      >
        {value}
      </Typography>
    </Box>
  );
}

export function LogDetailPanel({ log }: LogDetailPanelProps) {
  return (
    <Box sx={{ p: 2 }}>
      <Stack direction='row' spacing={4}>
        {/* Left: Details */}
        <Box sx={{ width: 480, flexShrink: 0 }}>
          <Typography
            variant='subtitle2'
            fontWeight={700}
            color='text.primary'
            sx={{ mb: 1 }}
          >
            DETAILS
          </Typography>
          <DetailField label='1-Click UUID' value={log.uuid} />
          {log.sessionUuid && (
            <DetailField label='Session UUID' value={log.sessionUuid} />
          )}
          <DetailField label='Source' value={log.source} />
          <DetailField
            label='Event Type'
            value={log.errorCode ? 'response_error' : 'request'}
          />
          <DetailField
            label='Method'
            value={
              log.source === 'api' ? `${log.method} /${log.path}` : log.path
            }
          />
          {log.source === 'api' && (
            <>
              <DetailField label='HTTP Status' value={String(log.statusCode)} />
              <DetailField
                label='Latency'
                value={log.latencyMs ? `${log.latencyMs}ms` : null}
              />
            </>
          )}
          <DetailField label='Phone' value={log.phone} />
          <DetailField
            label='Error Code'
            value={log.errorCode}
            color='error.main'
          />
          <DetailField
            label='Error'
            value={log.errorMessage}
            color='error.main'
          />
        </Box>

        {/* Right: Metadata */}
        <Box sx={{ flex: 1 }}>
          <Typography
            variant='subtitle2'
            fontWeight={700}
            color='text.primary'
            sx={{ mb: 1 }}
          >
            METADATA
          </Typography>
          <Paper
            variant='outlined'
            sx={{
              p: 2,
              bgcolor: 'grey.100',
              fontFamily: 'monospace',
              fontSize: 13,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              maxHeight: 300,
              overflow: 'auto',
            }}
          >
            {log.metadata
              ? JSON.stringify(log.metadata, null, 2)
              : 'No metadata available'}
          </Paper>
        </Box>
      </Stack>
    </Box>
  );
}
