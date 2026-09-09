import { BasePhoneInput } from './BasePhoneInput';
import {
  PrettyPhoneInput,
  type PrettyPhoneInputProps,
} from './PrettyPhoneInput';

export interface PhoneInputProps extends PrettyPhoneInputProps {
  /**
   * Whether to render the phone input in a pretty way (animated gradient border). Defaults to false.
   */
  pretty?: boolean;
}

/**
 * Renders a phone input component.
 *
 * @param props - The props for the phone input component.
 * @param props.pretty - Whether to render the phone input in a pretty way.
 * @param props.loading - Whether to show the loading indicator. Only the pretty variant renders one.
 * @returns The phone input component.
 */
export function PhoneInput({
  pretty = false,
  loading,
  ...props
}: Readonly<PhoneInputProps>): React.JSX.Element {
  if (pretty) {
    return <PrettyPhoneInput {...props} loading={loading} />;
  }
  return <BasePhoneInput {...props} />;
}
