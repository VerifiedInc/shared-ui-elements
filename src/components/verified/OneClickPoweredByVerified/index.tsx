import { useMemo, type ReactElement } from 'react';
import { Box, type SxProps } from '@mui/material';

import * as Login from './components/1-Click Login powered by Verified';
import * as Signup from './components/1-Click Signup powered by Verified';
import * as Verify from './components/1-Click Verify powered by Verified';
import * as Apply from './components/1-Click Apply powered by Verified';
import * as Access from './components/1-Click Access powered by Verified';
import * as AutoFill from './components/1-Click AutoFill powered by Verified';

export interface OneClickPoweredByVerifiedProps {
  variant?:
    | 'default'
    | 'green' // @deprecated - use whiteGreen instead
    | 'gray'
    | 'white'
    | 'black'
    | 'whiteGreen'
    | 'blackGreen';
  title?: 'Signup' | 'Login' | 'Verify' | 'Apply' | 'Access' | 'AutoFill';
  sx?: SxProps;
}

export function OneClickPoweredByVerified(
  props: OneClickPoweredByVerifiedProps,
): ReactElement {
  const { variant = 'green', title = 'Signup' } = props;
  const variantCapitalized =
    variant?.charAt(0).toUpperCase() + variant?.slice(1);

  const Component = useMemo(() => {
    let component;

    switch (title) {
      case 'Login':
        component = Login[variantCapitalized as keyof typeof Login];
        break;
      case 'Signup':
        component = Signup[variantCapitalized as keyof typeof Signup];
        break;
      case 'Verify':
        component = Verify[variantCapitalized as keyof typeof Verify];
        break;
      case 'Apply':
        component = Apply[variantCapitalized as keyof typeof Apply];
        break;
      case 'Access':
        component = Access[variantCapitalized as keyof typeof Access];
        break;
      case 'AutoFill':
        component = AutoFill[variantCapitalized as keyof typeof AutoFill];
        break;
    }

    if (!component) return Signup.Green;

    return component;
  }, [title, variantCapitalized]);

  return (
    <Box
      component='a'
      href='https://www.verified.inc'
      target='_blank'
      rel='noopener noreferrer'
      display='flex'
    >
      <Component
        sx={{
          textAlign: 'center',
          width: '100%',
          maxWidth: '226px',
          height: '16px',
          mx: 'auto',
          ...props.sx,
        }}
      />
    </Box>
  );
}
