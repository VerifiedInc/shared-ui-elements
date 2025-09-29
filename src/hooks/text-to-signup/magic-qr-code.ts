import { useStyledQRCode } from '../useStyledQRCode';

import { useTTSMagicQRCodeOptions } from './magic-qr-code-options';

export function useTTSMagicQRCode({
  magicLink,
  brandLogo,
}: {
  magicLink: string;
  brandLogo?: string | undefined;
}) {
  const { options, key } = useTTSMagicQRCodeOptions({ magicLink, brandLogo });
  const qrcode = useStyledQRCode(options);
  return { qrcode, key };
}
