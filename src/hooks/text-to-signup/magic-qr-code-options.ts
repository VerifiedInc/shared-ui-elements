import { useMemo } from 'react';

import { generateKeyFromString } from '../../utils/string';

export function useTTSMagicQRCodeOptions({
  magicLink,
  brandLogo,
}: {
  magicLink: string;
  brandLogo?: string | undefined;
}) {
  const options = useMemo(
    () => ({
      options: {
        type: 'svg' as const,
        shape: 'square' as const,
        width: 1024,
        height: 1024,
        data: magicLink,
        qrOptions: {
          errorCorrectionLevel: 'H' as const,
        },
        image: brandLogo ?? undefined,
        dotsOptions: {
          type: 'dots',
          color: '#000000',
        } as const,
        cornersSquareOptions: {
          type: 'dot',
          color: '#000000',
        } as const,
        cornersDotOptions: {
          type: 'dot',
          color: '#000000',
        } as const,
        backgroundOptions: {
          color: '#00000000',
        } as const,
      },
    }),
    [brandLogo, magicLink],
  );
  // Key representes the QR code options
  const key = useMemo(() => {
    return generateKeyFromString(JSON.stringify(options));
  }, [options]);

  return { options, key };
}
