export interface LogEntry {
  brandUuid: string;
  phone: string | null;
  uuid: string | null;
  product: 'signup' | 'verify';
  sessionUuid: string | null;
  method: string;
  path: string;
  statusCode: number;
  latencyMs: number | null;
  errorCode: string | null;
  errorMessage: string | null;
  source: 'api' | 'sdk';
  metadata: {
    requestBody: any;
    responseBody: any;
  } | null;
  eventTimestamp: string;
}

export interface LogsResponse {
  data: LogEntry[];
  cursors: {
    older: string | null;
    newer: string | null;
  };
  hasOlder: boolean;
  hasNewer: boolean;
}
