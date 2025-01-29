import { ChangeEventHandler, ReactNode } from 'react';
import RInputMask from '@mona-health/react-input-mask';

type Selection = {
  start: string;
  end: string;
};

type State = {
  value: string;
  selection: Selection;
};

type BeforeMaskedStateChangeOptions = {
  previousState: State;
  currentState: State;
  nextState: State;
};

type InputMaskProps = {
  // Custom render function for integration with other input components.
  children: ReactNode;
  // Mask format.
  mask: string | (RegExp | string)[];
  // Input value.
  value: string;
  // Change event handler.
  onChange: ChangeEventHandler<HTMLInputElement>;
  // Function to modify value and selection before applying mask.
  beforeMaskedStateChange?: (options: BeforeMaskedStateChangeOptions) => void;
  // Placeholder to cover unfilled parts of the mask, null to remove the default "_" placeholder.
  maskPlaceholder?: string | null;
  // Whether mask prefix and placeholder should be displayed when input is empty and has no focus.
  alwaysShowMask?: boolean;
  // Whether the input is disabled.
  disabled?: boolean;
};

export function InputMask(props: Readonly<InputMaskProps>) {
  return <RInputMask {...props} />;
}
