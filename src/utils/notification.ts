export type PrepareNotificationOptions = {
  event: string;
  clientSalt: string;
};

export type SignedNotification = {
  timestamp: number;
  signature: string;
  clientSalt: string;
};

/**
 * Prepares a notification by creating a unique signature and timestamp.
 * @param options - The notification payload containing event and clientSalt.
 * @returns A promise that resolves to the prepared notification object.
 */
export async function prepareNotification({
  event,
  clientSalt,
}: PrepareNotificationOptions): Promise<SignedNotification> {
  const timestamp = Date.now();
  const raw = `${event}:${timestamp}:${clientSalt}`;
  const hashBuffer = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(raw),
  );
  const signature = Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return {
    timestamp,
    signature,
    clientSalt,
  };
}
