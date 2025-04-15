import { BasePhoneInput, PrettyPhoneInput, type BasePhoneInputProps } from '.';

/**
 * Renders a phone input component.
 *
 * @param props - The props for the phone input component.
 * @param props.pretty - Whether to render the phone input in a pretty way.
 * @returns The phone input component.
 */
export function PhoneInput(
  props: Readonly<BasePhoneInputProps & { pretty?: boolean }>,
) {
  if (props.pretty) {
    return <PrettyPhoneInput {...props} />;
  }
  return <BasePhoneInput {...props} />;
}
