import {
  ForwardedRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Box, Stack } from '@mui/material';
import { AutoAwesome } from '@mui/icons-material';
import * as htmlToImage from 'html-to-image';

import { contrastColor } from '../../utils/color';
import { wrapPromise } from '../../utils/wrapPromise';

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
  }: {
    backgroundColor: string;
    borderRadius: string | number;
    fontFamily: string;
    magicLink: string;
    magicText: string;
  },
  ref: ForwardedRef<TTSMagicButtonHandle>,
) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [image, setImage] = useState<string | null>(null);
  const [count, setCount] = useState<number>(0);
  const foregroundColor = contrastColor(backgroundColor);

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
  ]);

  return (
    <Stack
      component='a'
      href={magicLink}
      target='_blank'
      rel='noopener noreferrer'
      flex={1}
      sx={{ overflow: 'visible' }}
    >
      <Box
        className='button-preview-container'
        sx={{
          position: 'fixed',
          top: -9999,
          left: -9999,
          overflow: 'hidden',
          zIndex: -1,
        }}
      >
        <Stack
          ref={buttonRef}
          className='canvas-copiable'
          direction='row'
          spacing={1}
          sx={{
            display: 'inline-flex',
            minWidth: 'fit-content',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            bgcolor: backgroundColor,
            color: foregroundColor,
            fontFamily,
            fontWeight: 700,
            lineHeight: 0,
            borderRadius: `${borderRadius}px`,
            p: 1.5,
            textAlign: 'center',
            m: 0,
            mr: 'auto',
            whiteSpace: 'nowrap',
          }}
        >
          <AutoAwesome />
          <span>{magicText}</span>
        </Stack>
      </Box>
      {image && (
        <Box
          component='img'
          src={image}
          sx={{
            width: '100%',
            height: 'auto',
          }}
        />
      )}
    </Stack>
  );
}

export const TTSMagicButton = forwardRef(TTSMagicButtonComponent);
