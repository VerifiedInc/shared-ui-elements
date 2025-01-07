import { type ForwardedRef, forwardRef } from 'react';
import { Typography, type ButtonProps } from '@mui/material';
import { Button } from '../Button';

/**
 * A button designed to look like a link
 * indicates an action that is available, but that we don't want to emphasize.
 *
 * LinkButton is an abstraction over the MUI Button component
 * encapsulating props shared by buttons of this type.
 * See the Button component docs for props, options, etc. https://mui.com/components/buttons/
 *
 * @param {ButtonProps} props LinkButton takes the same props as the MUI button component
 */
export const LinkButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      type = 'button',
      variant = 'text',
      size = 'small',
      color = 'secondary',
      ...props
    }: ButtonProps,
    ref: ForwardedRef<HTMLButtonElement>,
  ): JSX.Element => {
    return (
      <Button
        ref={ref}
        type={type}
        variant={variant}
        size={size}
        color={color}
        {...props}
      >
        <Typography variant='button' component='span'>
          {children}
        </Typography>
      </Button>
    );
  },
);
