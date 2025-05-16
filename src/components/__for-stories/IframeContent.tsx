import React, { useRef } from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

import { useIframe } from './Iframe';

/**
 *
 * This is a wrapper component for OTPInput
 * It was needed to demonstrate the focus, blur and clear functionality of OTPInput via useRef
 * It shows the OtpInput wrapped in a Box with 3 buttons to demonstrate focus, blur and clear functionality
 */
export function IframeContent(props: { children: React.ReactNode }) {
  const iframe = useIframe();
  const cacheRef = useRef(
    createCache({
      key: 'safe-frame',
      container: iframe.document?.head,
      prepend: true,
    }),
  );

  return (
    <CacheProvider value={cacheRef.current}>{props.children}</CacheProvider>
  );
}
