import React from 'react'
import MUIButton, { ButtonProps as MUIButtonProps } from '@mui/material/Button';

export type ButtonProps = MUIButtonProps;

export function Button(props: ButtonProps) {
  return <MUIButton {...props} />;
}
