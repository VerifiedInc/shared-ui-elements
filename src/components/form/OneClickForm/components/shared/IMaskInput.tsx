import { forwardRef, Ref } from 'react';
import { IMaskInput as RIMaskInput } from 'react-imask';

export type ChangeEvent = (
  event: { target: { name: string; value: string } },
  nativeEvent?: InputEvent,
) => void;

interface InputMaskProps {
  onChange: ChangeEvent;
  name: string;
  mask: string;
  definitions?: Record<string, RegExp>;
  // Value to define which event to handle onAccept(default) or onComplete.
  useOnComplete?: boolean;
}

/**
 * Component that mask the input with the given mask pattern.
 * @param props {InputMaskProps}
 * @param ref {Ref<HTMLInputElement>}
 * @constructor
 */
function IMaskInputComponent(
  props: InputMaskProps,
  ref: Ref<HTMLInputElement>,
) {
  const { onChange, useOnComplete, ...other } = props;
  return (
    <RIMaskInput
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

export const IMaskInput = forwardRef<HTMLInputElement, InputMaskProps>(
  IMaskInputComponent,
);
