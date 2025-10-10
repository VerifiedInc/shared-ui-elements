import {
  ForwardedRef,
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
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
    brandLogo64,
    magicLink,
    enablePoweredByVerified,
    poweredByVerifiedProps,
    sx,
  }: {
    brandLogo?: string;
    brandLogo64?: string;
    magicLink: string;
    sx?: SxProps;
    enablePoweredByVerified?: boolean;
    poweredByVerifiedProps?: PoweredByVerifiedProps;
  },
  ref: ForwardedRef<TTSMagicQRCodeHandle>,
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [brandLogoData, setBrandLogoData] = useState<string | undefined>(
    brandLogo64,
  );
  const {
    qrcode: { Component },
  } = useTTSMagicQRCode({ magicLink, brandLogo: brandLogoData });

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

  // Effect to fetch brand logo as base64
  useEffect(() => {
    // No need to fetch if we already have a base64 logo
    if (brandLogo64) return;

    const handle = async () => {
      if (!brandLogo) return;
      try {
        const img = new Image();
        img.crossOrigin = 'anonymous'; // Request CORS
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0);
          setBrandLogoData(canvas.toDataURL('image/png'));
        };
        img.onerror = () => console.error('Error loading brand logo');
        img.src = brandLogo;
      } catch (error) {
        console.error('Error fetching brand logo:', error);
      }
    };

    void handle();
  }, [brandLogo, brandLogo64]);

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
