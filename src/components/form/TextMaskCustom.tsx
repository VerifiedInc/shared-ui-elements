import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type ForwardedRef,
} from 'react';
import { IMaskInput } from 'react-imask';
import type { InputMask } from 'imask';

export type ChangeEvent = (
  event: { target: { name: string; value: string } },
  nativeEvent?: InputEvent,
) => void;

interface TextMaskCustomProps {
  onChange: ChangeEvent;
  name: string;
  mask: string;
  definitions?: Record<string, RegExp>;
  // Value to define which event to handle onAccept(default) or onComplete.
  useOnComplete?: boolean;
  enableChromeAutofill?: boolean;
}

/**
 * Component that mask the input with the given mask pattern.
 * Handles Chrome mobile autofill by detecting external value changes
 * and synchronizing the mask accordingly.
 *
 * @param props {TextMaskCustomProps}
 * @param ref {ForwardedRef<HTMLInputElement>}
 */
function TextMaskCustomComponent(
  props: TextMaskCustomProps,
  ref: ForwardedRef<HTMLInputElement>,
): React.JSX.Element {
  const { onChange, useOnComplete, enableChromeAutofill, ...other } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const maskInstanceRef = useRef<InputMask<any> | null>(null);
  const imaskComponentRef = useRef<any>(null);
  const [isMaskInstanceReady, setIsMaskInstanceReady] = useState(false);

  // Forward the ref to the input element
  useEffect(() => {
    if (typeof ref === 'function') {
      ref(inputRef.current);
    } else if (ref) {
      ref.current = inputRef.current;
    }
  });

  // Get mask instance when component is ready
  useEffect(() => {
    if (isMaskInstanceReady) return;

    const getMaskInstance = () => {
      if (!isMaskInstanceReady) {
        const maskInstance = imaskComponentRef.current.maskRef;
        if (maskInstance) {
          setIsMaskInstanceReady(true);
          maskInstanceRef.current = maskInstance;
        }
      }
    };

    // Try to get mask instance immediately and periodically until found
    getMaskInstance();

    const interval = setInterval(() => {
      if (maskInstanceRef.current) {
        clearInterval(interval);
      } else {
        getMaskInstance();
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isMaskInstanceReady]);

  // Handle autofill detection for Chrome mobile
  useEffect(() => {
    if (!enableChromeAutofill) return;

    const inputElement = inputRef.current;
    if (!inputElement) return;

    const handleInputEvent = (): void => {
      const maskInstance = maskInstanceRef.current;
      const currentValue = inputElement.value;

      if (!maskInstance) {
        return;
      }

      const maskValue = maskInstance.value;

      // If DOM value differs from mask value, sync the mask
      if (currentValue !== maskValue && currentValue !== '') {
        maskInstance.updateValue();

        // Trigger onChange with unmasked value
        setTimeout(() => {
          const unmaskedValue = maskInstance.unmaskedValue;
          handleChangeValue(unmaskedValue);
        }, 0);
      }
    };

    // Listen only to input events
    inputElement.addEventListener('input', handleInputEvent);

    // Cleanup
    return () => {
      inputElement.removeEventListener('input', handleInputEvent);
    };
  }, [props.name, onChange, enableChromeAutofill]);

  const handleChangeValue = (value: string, event?: InputEvent) => {
    onChange({ target: { name: props.name, value } }, event);
  };

  const handleAccept = (
    value: string,
    maskInstance: InputMask<any>,
    event?: InputEvent,
  ): void => {
    // Store the mask instance reference for autofill handling
    maskInstanceRef.current = maskInstance;

    if (useOnComplete) return;
    handleChangeValue(value, event);
  };

  const handleComplete = (
    value: string,
    maskInstance: InputMask<any>,
    event?: InputEvent,
  ): void => {
    // Store the mask instance reference for autofill handling
    maskInstanceRef.current = maskInstance;

    if (!useOnComplete) return;
    handleChangeValue(value, event);
  };

  return (
    <IMaskInput
      {...other}
      ref={imaskComponentRef}
      inputRef={inputRef}
      onAccept={handleAccept}
      onComplete={handleComplete}
      overwrite
    />
  );
}

export const TextMaskCustom = forwardRef<HTMLInputElement, TextMaskCustomProps>(
  TextMaskCustomComponent,
);
