import {
  ForwardedRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { type ButtonProps, Box, Button, Stack } from '@mui/material';
import { AutoAwesome } from '@mui/icons-material';
import * as htmlToImage from 'html-to-image';

import { wrapPromise } from '../../utils/wrapPromise';
import { useGoogleFont } from '../../hooks/useGoogleFont';
import { PoweredByVerified, PoweredByVerifiedProps } from '../verified';

export type TTSMagicButtonHandle = {
  download(extension: 'png' | 'svg'): Promise<void>;
};

/**
 * TTSMagicButton component that renders a magic button with optional Google Fonts support
 *
 * @param magicLink - URL that the button links to
 * @param magicText - Text displayed on the button
 * @param buttonProps - Additional props to pass to the MUI Button component
 * @param renderAsImage - Whether to render the button as an image for download
 * @param enablePoweredByVerified - Whether to display the Powered by Verified logo
 * @param poweredByVerifiedProps - Props for the PoweredByVerified component
 * @param fontFamily - Google Font family name. When provided, automatically loads the font from Google Fonts
 * @param enableGoogleFontLoad - Whether to load the Google Font
 */
function TTSMagicButtonComponent(
  {
    magicLink,
    magicText,
    buttonProps,
    renderAsImage,
    enablePoweredByVerified,
    poweredByVerifiedProps,
    fontFamily,
    enableGoogleFontLoad,
  }: {
    magicLink: string;
    magicText: string;
    buttonProps?: ButtonProps;
    renderAsImage?: boolean;
    enablePoweredByVerified?: boolean;
    poweredByVerifiedProps?: PoweredByVerifiedProps;
    fontFamily?: string;
    enableGoogleFontLoad?: boolean;
  },
  ref: ForwardedRef<TTSMagicButtonHandle>,
) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [image, setImage] = useState<string | null>(null);
  const [minifiedDataUrlState, setMinifiedDataUrl] = useState<string | null>(
    null,
  );
  const [count, setCount] = useState<number>(0);
  const [successCount, setSuccessCount] = useState<number>(0);

  // Load Google Font if fontFamily is provided
  const fontLoadingStatus = useGoogleFont(fontFamily, enableGoogleFontLoad);

  const handleDownload = async (extension: 'png' | 'svg') => {
    if (!buttonRef.current) return;

    const methods = {
      png: htmlToImage.toPng,
      svg: htmlToImage.toSvg,
    };

    let tempStyleElement: HTMLStyleElement | null = null;

    try {
      // If we have CSS content from Google Fonts, inject it temporarily
      if (fontLoadingStatus.cssContent) {
        tempStyleElement = document.createElement('style');
        tempStyleElement.id = 'temp-font-style-for-download';
        tempStyleElement.textContent = fontLoadingStatus.cssContent;
        document.head.appendChild(tempStyleElement);
      }

      const [dataUrl, error] = await wrapPromise(
        methods[extension](buttonRef.current, {
          pixelRatio: 4,
        }),
      );

      // Clean up temporary style element
      if (tempStyleElement) {
        document.head.removeChild(tempStyleElement);
        tempStyleElement = null;
      }

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
    } catch (downloadError) {
      // Clean up temporary style element in case of error
      if (tempStyleElement) {
        document.head.removeChild(tempStyleElement);
      }
      console.error('Failed to generate magic button:', downloadError);
    }
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
    // Reset count when is not rendering as image,
    // so it can count when it renders as image.
    if (!renderAsImage) {
      setCount(0);
      return;
    }

    if (!buttonRef.current || count > 10) return;

    setCount((prev) => prev + 1);

    const interval = setInterval(
      () => {
        setCount((prev) => prev + 1);
      },
      count + 1 * 500,
    );

    return () => clearInterval(interval);
  }, [count, renderAsImage, fontLoadingStatus.isLoaded]);

  // Effect to maange style tag
  useEffect(() => {
    let tempStyleElement: HTMLStyleElement | null = null;

    // If we have CSS content from Google Fonts, inject it temporarily
    if (fontLoadingStatus.cssContent) {
      tempStyleElement = document.createElement('style');
      tempStyleElement.id = 'temp-font-style-for-image';
      tempStyleElement.textContent = fontLoadingStatus.cssContent;
      document.head.appendChild(tempStyleElement);
    }

    return () => {
      // Clean up temporary style element
      if (tempStyleElement) {
        document.head.removeChild(tempStyleElement);
      }
    };
  }, [fontLoadingStatus.cssContent]);

  // Effect to update the image
  useEffect(() => {
    if (!renderAsImage) return;

    // Wait for font to load before generating image if a custom font is specified
    if (fontFamily && enableGoogleFontLoad && fontLoadingStatus.isLoading) {
      return;
    }

    const storeImage = async () => {
      if (!buttonRef.current) return;
      if (enableGoogleFontLoad && !fontLoadingStatus.isLoaded) return;

      // Caputre the element node and transform to png image
      try {
        const minifiedDataUrl = await htmlToImage.toPng(buttonRef.current, {
          pixelRatio: 0.5,
        });

        // HACK ALERT:
        // If the minified data url is the same as the previous one, no need to generate the full data url
        if (minifiedDataUrl === minifiedDataUrlState) {
          if (successCount === 0) {
            setSuccessCount((prev) => prev + 1);
          }
          return;
        }

        setMinifiedDataUrl(minifiedDataUrl);

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
    successCount,
    count,
    magicLink,
    magicText,
    buttonProps,
    enablePoweredByVerified,
    poweredByVerifiedProps,
    renderAsImage,
    fontFamily,
    fontLoadingStatus.isLoaded,
    minifiedDataUrlState,
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
            ...(renderAsImage && {
              pt: '3px',
              pb: '6px',
              px: '4px',
            }),
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
              fontFamily: fontFamily ? `"${fontFamily}"` : undefined,
              textTransform: 'none',
              fontSize: 16,
              p: 1.5,
              m: 1,
              '&, & >span': {
                wordBreak: 'break-word',
                lineHeight: renderAsImage ? 0 : undefined,
              },
              ...buttonProps?.sx,
            }}
            {...(buttonProps as unknown as any)}
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
