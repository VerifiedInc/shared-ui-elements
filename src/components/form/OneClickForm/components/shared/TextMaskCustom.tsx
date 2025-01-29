import { forwardRef, Ref } from 'react';
import { IMaskInput } from 'react-imask';

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
}

/**
 * Component that mask the input with the given mask pattern.
 * @param props {TextMaskCustomProps}
 * @param ref {Ref<HTMLInputElement>}
 * @constructor
 */
function TextMaskCustomComponent(
  props: TextMaskCustomProps,
  ref: Ref<HTMLInputElement>,
) {
  const { onChange, useOnComplete, ...other } = props;
  return (
    <IMaskInput
      {...other}
      inputRef={ref}
      onAccept={(value, _, event) => {
        if (useOnComplete) return;
        onChange({ target: { name: props.name, value } }, event);
      }}
      onComplete={(value, _, event) => {
        if (!useOnComplete) return;
        onChange({ target: { name: props.name, value } }, event);
      }}
      overwrite
    />
  );
}

export const TextMaskCustom = forwardRef<HTMLInputElement, TextMaskCustomProps>(
  TextMaskCustomComponent,
);
