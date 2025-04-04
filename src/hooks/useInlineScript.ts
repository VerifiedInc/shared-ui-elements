import { useEffect, useRef } from 'react';

/**
 * Custom React hook for loading external inline scripts.
 * @param name
 * @param script
 * @param options
 * @returns
 */
export function useInlineScript(
  name: string,
  scriptString: string,
  options: {
    addToHead?: boolean;
    removeOnUnmount?: boolean;
    nonce?: string;
  } = { addToHead: false, removeOnUnmount: false, nonce: undefined },
) {
  const optionsRef = useRef(options);

  useEffect(() => {
    let script: HTMLScriptElement | null = document.querySelector(
      `script[data-script-name="${name}"]`,
    );

    if (script === null) {
      script = document.createElement('script');
      script.innerText = scriptString;
      script.async = true;
      script.setAttribute('data-script-name', name);

      // Set nonce if provided
      optionsRef.current.nonce &&
        script.setAttribute('nonce', optionsRef.current.nonce);

      // Add script to head or body based on options
      if (optionsRef.current.addToHead) {
        document.head.appendChild(script);
      } else {
        document.body.appendChild(script);
      }

      const removeOnUnmount = optionsRef.current.removeOnUnmount;

      return () => {
        if (removeOnUnmount) {
          script?.remove();
        }
      };
    }
  }, [name, scriptString, options.addToHead, options.removeOnUnmount]);
}
