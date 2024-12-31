import { useEffect, useRef, useState } from 'react';

/**
 * Custom React hook for loading external scripts.
 * @param src
 * @param options
 * @returns
 */
export function useScript(
  src: string,
  options = { removeOnUnmount: false },
): string {
  const [status, setStatus] = useState('loading');
  const optionsRef = useRef(options);

  useEffect(() => {
    let script: HTMLScriptElement | null = document.querySelector(
      `script[src="${src}"]`,
    );

    const domStatus = script?.getAttribute('data-status');
    if (domStatus) {
      setStatus(domStatus);
      return;
    }

    if (script === null) {
      script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.setAttribute('data-status', 'loading');
      document.body.appendChild(script);

      const handleScriptLoad = (): void => {
        script?.setAttribute('data-status', 'ready');
        setStatus('ready');
        removeEventListeners();
      };

      const handleScriptError = (): void => {
        script?.setAttribute('data-status', 'error');
        setStatus('error');
        removeEventListeners();
      };

      const removeEventListeners = (): void => {
        script?.removeEventListener('load', handleScriptLoad);
        script?.removeEventListener('error', handleScriptError);
      };

      script.addEventListener('load', handleScriptLoad);
      script.addEventListener('error', handleScriptError);

      const removeOnUnmount = optionsRef.current.removeOnUnmount;

      return () => {
        if (removeOnUnmount) {
          script?.remove();
          removeEventListeners();
        }
      };
    } else {
      setStatus('unknown');
    }
  }, [src]);

  return status;
}
