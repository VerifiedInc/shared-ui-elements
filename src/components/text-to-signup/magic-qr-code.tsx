import {
  ForwardedRef,
  forwardRef,
  memo,
  useImperativeHandle,
  useRef,
} from 'react';
import { Stack, SxProps } from '@mui/material';
import * as htmlToImage from 'html-to-image';
import isEqual from 'lodash/isEqual';

import { useTTSMagicQRCode } from '../../hooks';
import { wrapPromise } from '../../utils/wrapPromise';
import { PoweredByVerified, PoweredByVerifiedProps } from '../verified';

export type TTSMagicQRCodeHandle = {
  download(
    filename: string | undefined,
    extension: 'png' | 'svg',
  ): Promise<void>;
};

function TTSMagicQRCodeComponent(
  {
    brandLogo,
    magicLink,
    enablePoweredByVerified,
    poweredByVerifiedProps,
    sx,
  }: {
    brandLogo?: string;
    magicLink: string;
    sx?: SxProps;
    enablePoweredByVerified?: boolean;
    poweredByVerifiedProps?: PoweredByVerifiedProps;
  },
  ref: ForwardedRef<TTSMagicQRCodeHandle>,
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    qrcode: { Component },
  } = useTTSMagicQRCode({ magicLink, brandLogo });

  const handleDownload = async (
    filename: string | undefined,
    extension: 'png' | 'svg',
  ) => {
    if (!containerRef.current) return;

    const methods = {
      png: htmlToImage.toPng,
      svg: htmlToImage.toSvg,
    };

    const [dataUrl, error] = await wrapPromise(
      methods[extension](containerRef.current, {
        pixelRatio: 4,
      }),
    );

    if (error) {
      console.error('Failed to generate magic button:', error);
      return;
    }

    if (!dataUrl) return;

    // Create download link
    const downloadLink = document.createElement('a');
    downloadLink.href = dataUrl;
    downloadLink.download = `${filename ?? 'magic-qr-code'}.${extension}`;
    downloadLink.click();
  };

  useImperativeHandle(
    ref,
    () => ({
      download: handleDownload,
    }),
    [handleDownload],
  );

  return (
    <Stack
      ref={containerRef}
      alignItems='center'
      justifyContent='center'
      sx={{
        '& a': {
          m: 0,
          mx: 'auto',
        },
        '& > div': {
          display: 'flex',
        },
        '& > div > svg, & > div > img': {
          maxWidth: 220,
          width: '100%',
          height: 'auto',
          aspectRatio: 1,
          p: 1,
        },
        aspectRatio: 1,
        ...sx,
      }}
    >
      <Component />
      {enablePoweredByVerified && (
        <PoweredByVerified
          {...poweredByVerifiedProps}
          containerProps={{
            pt: 1,
            maxWidth: 143,
            ...poweredByVerifiedProps?.containerProps,
          }}
        />
      )}
    </Stack>
  );
}

export const TTSMagicQRCode = memo(
  forwardRef(TTSMagicQRCodeComponent),
  isEqual,
);
