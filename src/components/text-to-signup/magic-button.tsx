import {
  ForwardedRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Box, Button, Stack } from '@mui/material';
import { AutoAwesome } from '@mui/icons-material';
import * as htmlToImage from 'html-to-image';

import { colors } from '../../styles';
import { contrastColor } from '../../utils/color';
import { wrapPromise } from '../../utils/wrapPromise';
import { PoweredByVerified, PoweredByVerifiedProps } from '../verified';

export type TTSMagicButtonHandle = {
  download(extension: 'png' | 'svg'): Promise<void>;
};

function TTSMagicButtonComponent(
  {
    backgroundColor,
    borderRadius,
    fontFamily,
    magicLink,
    magicText,
    renderAsImage,
    enablePoweredByVerified,
    poweredByVerifiedProps,
  }: {
    magicLink: string;
    magicText: string;
    backgroundColor?: string;
    borderRadius?: string | number;
    fontFamily?: string;
    renderAsImage?: boolean;
    enablePoweredByVerified?: boolean;
    poweredByVerifiedProps?: PoweredByVerifiedProps;
  },
  ref: ForwardedRef<TTSMagicButtonHandle>,
) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [image, setImage] = useState<string | null>(null);
  const [count, setCount] = useState<number>(0);
  const foregroundColor = contrastColor(backgroundColor ?? colors.green);

  const handleDownload = async (extension: 'png' | 'svg') => {
    if (!buttonRef.current) return;

    const methods = {
      png: htmlToImage.toPng,
      svg: htmlToImage.toSvg,
    };

    const [dataUrl, error] = await wrapPromise(
      methods[extension](buttonRef.current, {
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
    downloadLink.download = `magic-button-${magicText.replace(/\s+/g, '-')}.${extension}`;
    downloadLink.click();
  };

  useImperativeHandle(
    ref,
    () => ({
      download: handleDownload,
    }),
    [handleDownload],
  );

  /**
   * HACK ALERT:
   * Force a re-render to create the image with the border correctly
   */
  useEffect(() => {
    if (!buttonRef.current || count > 4) return;

    const interval = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1);

    return () => clearInterval(interval);
  }, [count]);

  // Effect to update the image
  useEffect(() => {
    const storeImage = async () => {
      if (!buttonRef.current) return;

      // Caputre the element node and transform to png image
      try {
        const dataUrl = await htmlToImage.toPng(buttonRef.current, {
          pixelRatio: 4,
        });
        setImage(dataUrl);
      } catch (error) {
        console.error('Failed to generate PNG:', error);
      }
    };

    void storeImage();
  }, [
    backgroundColor,
    borderRadius,
    count,
    fontFamily,
    foregroundColor,
    magicLink,
    magicText,
    enablePoweredByVerified,
    poweredByVerifiedProps,
  ]);

  return (
    <Stack>
      <Box
        className='button-preview-container'
        sx={{
          ...(renderAsImage && {
            position: 'fixed',
            top: -9999,
            left: -9999,
            maxWidth: 9999,
            overflow: 'hidden',
            zIndex: -1,
          }),
        }}
      >
        <Stack
          ref={buttonRef}
          className='canvas-copiable'
          spacing={1}
          sx={{
            display: 'inline-flex',
            minWidth: 'fit-content',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            pt: '3px',
            pb: '6px',
            px: '4px',
          }}
        >
          <Button
            href={magicLink}
            target='_blank'
            variant='contained'
            size='large'
            color={'primary'}
            startIcon={<AutoAwesome />}
            sx={{
              bgcolor: backgroundColor,
              textTransform: 'none',
              fontSize: 16,
              p: 1.5,
              m: 1,
              '&, & >span': {
                wordBreak: 'break-word',
                // lineHeight: 0,
              },
            }}
          >
            <span>{magicText}</span>
          </Button>
          {enablePoweredByVerified && (
            <PoweredByVerified
              {...poweredByVerifiedProps}
              containerProps={{
                pt: 0.5,
                maxWidth: 143,
                ...poweredByVerifiedProps?.containerProps,
              }}
            />
          )}
        </Stack>
      </Box>
      {image && renderAsImage && (
        <Stack
          component='a'
          href={magicLink}
          target='_blank'
          rel='noopener noreferrer'
          flex={1}
          sx={{ overflow: 'visible' }}
        >
          <Box
            component='img'
            src={image}
            alt={magicText}
            draggable={false}
            sx={{
              width: '100%',
              height: 'auto',
            }}
          />
        </Stack>
      )}
    </Stack>
  );
}

export const TTSMagicButton = forwardRef(TTSMagicButtonComponent);
