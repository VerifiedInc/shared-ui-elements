import {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
  CSSProperties,
  useLayoutEffect,
  useCallback,
} from 'react';
import { createPortal } from 'react-dom';

interface IframeState {
  body: HTMLElement | null;
  head: HTMLElement | null;
  document: Document | null;
  isIOS: boolean;
}

interface IframeProps {
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}

const IframeContext = createContext<IframeState>({
  body: null,
  head: null,
  document: null,
  isIOS: false,
});

const defaultStyle: CSSProperties = {
  border: 'none',
  width: '100%',
  height: '100%',
};

export function Iframe({ children, className, style }: IframeProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Detect if we're on iOS for special handling
  const isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;

  const [iframeState, setIframeState] = useState<IframeState>({
    body: null,
    head: null,
    document: null,
    isIOS,
  });

  // Function to initialize the iframe wrapped in useCallback to avoid recreation on every render
  const initializeIframe = useCallback(
    (iframe: HTMLIFrameElement) => {
      try {
        const iframeWin = iframe.contentWindow;
        if (!iframeWin) {
          console.error('No iframe window');
          return;
        }

        const iframeDoc = iframeWin.document;
        if (!iframeDoc) {
          console.error('No iframe document');
          return;
        }

        // Verify that we have access to the document body
        if (!iframeDoc.body) {
          console.error('No iframe body');
          return;
        }

        // Set styles for the body
        iframeDoc.body.style.margin = '0';
        iframeDoc.body.style.padding = '0';
        iframeDoc.body.style.overflow = 'hidden';

        // Create and append a div element that will serve as our portal target
        if (!iframeDoc.getElementById('portal-root')) {
          const portalRoot = iframeDoc.createElement('div');
          portalRoot.id = 'portal-root';
          portalRoot.style.width = '100%';
          portalRoot.style.height = '100%';
          iframeDoc.body.appendChild(portalRoot);
        }

        // Set state with the iframe document elements
        setIframeState({
          body: iframeDoc.body,
          head: iframeDoc.head,
          document: iframeDoc,
          isIOS,
        });
      } catch (err) {
        console.error('Error initializing iframe:', err);
      }
    },
    [isIOS, setIframeState],
  );

  // Use layout effect to initialize the iframe as soon as possible
  useLayoutEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    // Initialize immediately for iOS
    if (isIOS && iframe.contentWindow?.document) {
      initializeIframe(iframe);
    }
  }, [isIOS, initializeIframe]);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleLoad = () => {
      initializeIframe(iframe);
    };

    // Add load event listener - crucial for Firefox and other browsers
    iframe.addEventListener('load', handleLoad);

    // For iOS, we also need to ensure content is loaded after a small delay
    if (isIOS) {
      const timeoutId = setTimeout(() => {
        initializeIframe(iframe);
      }, 50); // Small delay to ensure iOS WebView has initialized

      return () => {
        clearTimeout(timeoutId);
        iframe.removeEventListener('load', handleLoad);
      };
    }

    // Cleanup
    return () => {
      iframe.removeEventListener('load', handleLoad);
    };
  }, [isIOS, initializeIframe]);

  // Enhanced HTML for srcDoc to improve cross-browser compatibility
  const srcDoc = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <style>
          body { margin: 0; padding: 0; overflow: hidden; width: 100%; height: 100%; }
          #portal-root { width: 100%; height: 100%; }
        </style>
      </head>
      <body>
        <div id="portal-root"></div>
      </body>
    </html>`;

  return (
    <iframe
      ref={iframeRef}
      className={className}
      style={{ ...defaultStyle, ...style }}
      title='Safe frame content'
      security='restricted'
      loading='eager'
      referrerPolicy='no-referrer'
      allow="camera 'none'; microphone 'none'; geolocation 'none'"
      sandbox='allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-top-navigation allow-top-navigation-by-user-activation'
      srcDoc={srcDoc}
    >
      {iframeState.document &&
        iframeState.body &&
        createPortal(
          <IframeContext.Provider value={iframeState}>
            {children}
          </IframeContext.Provider>,
          iframeState.document.getElementById('portal-root') ||
            iframeState.body,
        )}
    </iframe>
  );
}

export const useIframe = () => useContext(IframeContext);
