import { type ButtonProps } from '@mui/material';
import { type ForwardedRef, forwardRef } from 'react';

import { Button } from '../Button';

/**
 * A button designed to look like grey text
 * subtly indicates an available action
 *
 * TextButton is an abstraction over the MUI Button component
 * encapsulating props shared by buttons of this type.
 * See the Button component docs for props, options, etc. https://mui.com/components/buttons/
 *
 * @param children
 * @param type
 * @param variant
 * @param size
 * @param color
 * @param {ButtonProps} props TextButton takes the same props as the MUI button component
 * @param ref
 */
const TextButtonComponent = (
  {
    children,
    type = 'button',
    variant = 'text',
    size = 'small',
    color = 'secondary',
    ...props
  }: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>,
) => {
  return (
    <Button
      ref={ref}
      type={type}
      variant={variant}
      size={size}
      color={color}
      {...props}
    >
      {children}
    </Button>
  );
};

export const TextButton = forwardRef(TextButtonComponent);
