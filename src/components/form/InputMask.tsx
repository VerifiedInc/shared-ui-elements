import { type ChangeEventHandler, type ReactNode } from 'react';
import RInputMask from '@mona-health/react-input-mask';

interface Selection {
  start: string;
  end: string;
}

interface State {
  value: string;
  selection: Selection;
}

interface BeforeMaskedStateChangeOptions {
  previousState: State;
  currentState: State;
  nextState: State;
}

interface InputMaskProps {
  // Custom render function for integration with other input components.
  children: ReactNode;
  // Mask format.
  mask: string | Array<RegExp | string>;
  // Input value.
  value: string;
  // Change event handler.
  onChange: ChangeEventHandler<HTMLInputElement>;
  // Function to modify value and selection before applying mask.
  onBlur?: ChangeEventHandler<HTMLInputElement>;
  beforeMaskedStateChange?: (options: BeforeMaskedStateChangeOptions) => void;
  // Placeholder to cover unfilled parts of the mask, null to remove the default "_" placeholder.
  maskPlaceholder?: string | null;
  // Whether mask prefix and placeholder should be displayed when input is empty and has no focus.
  alwaysShowMask?: boolean;
  disabled?: boolean;
}

export function InputMask(props: Readonly<InputMaskProps>): React.JSX.Element {
  return <RInputMask {...props} />;
}
