import { useEffect, useState } from 'react';
import { makeGoogleFontUrl } from '../utils/makeGoogleFont';

export type FontLoadingStatus = 'idle' | 'loading' | 'loaded' | 'error';

/**
 * Hook to dynamically load Google Fonts by fetching and embedding CSS content
 *
 * @param fontFamily - Google Font family name. When provided, automatically loads the font from Google Fonts
 * @param enableFontLoad - Whether to load the Google Font (default: true)
 * @returns Object containing the font loading status and CSS content
 */
export function useGoogleFont(
  fontFamily?: string,
  enableFontLoad?: boolean,
): {
  status: FontLoadingStatus;
  isLoading: boolean;
  isLoaded: boolean;
  hasError: boolean;
  cssContent: string | null;
} {
  const [status, setStatus] = useState<FontLoadingStatus>('idle');
  const [cssContent, setCssContent] = useState<string | null>(null);

  useEffect(() => {
    if (!fontFamily || !enableFontLoad) {
      setStatus('idle');
      setCssContent(null);
      return;
    }

    const styleId = `google-font-${fontFamily.replace(/\s+/g, '-').toLowerCase()}`;

    // Check if the font CSS is already loaded
    const existingStyle = document.getElementById(styleId) as HTMLStyleElement;
    if (existingStyle) {
      const storedStatus = existingStyle.getAttribute('data-status');
      const storedCssContent = existingStyle.getAttribute('data-css-content');

      if (storedStatus === 'loaded' && storedCssContent) {
        setStatus('loaded');
        setCssContent(storedCssContent);
      } else if (storedStatus === 'error') {
        setStatus('error');
        setCssContent(null);
      } else {
        setStatus('loading');
      }
      return;
    }

    setStatus('loading');
    setCssContent(null);

    // Fetch the CSS content from Google Fonts
    const fetchFontCSS = async () => {
      try {
        const fontUrl = makeGoogleFontUrl(fontFamily);
        const response = await fetch(fontUrl);

        if (!response.ok) {
          throw new Error(`Failed to fetch font CSS: ${response.statusText}`);
        }

        const cssText = await response.text();

        // Create and append the style element with the CSS content
        const styleElement = document.createElement('style');
        styleElement.id = styleId;
        styleElement.textContent = cssText;
        styleElement.setAttribute('data-status', 'loaded');
        styleElement.setAttribute('data-css-content', cssText);

        document.head.appendChild(styleElement);

        setStatus('loaded');
        setCssContent(cssText);
      } catch (error) {
        console.error(`Failed to load Google Font ${fontFamily}:`, error);

        // Create a style element to mark as error
        const errorStyleElement = document.createElement('style');
        errorStyleElement.id = styleId;
        errorStyleElement.setAttribute('data-status', 'error');
        document.head.appendChild(errorStyleElement);

        setStatus('error');
        setCssContent(null);
      }
    };

    void fetchFontCSS();

    // Cleanup function to remove the style element when component unmounts
    return () => {
      const existingStyle = document.getElementById(styleId);
      if (existingStyle) {
        document.head.removeChild(existingStyle);
      }
    };
  }, [fontFamily, enableFontLoad]);

  return {
    status,
    isLoading: status === 'loading',
    isLoaded: status === 'loaded',
    hasError: status === 'error',
    cssContent,
  };
}
