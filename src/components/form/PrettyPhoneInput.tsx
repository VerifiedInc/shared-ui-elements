import { Box, keyframes, useTheme } from '@mui/material';

import { alpha, darken } from '../../utils/color';

import { PhoneInput, PhoneInputProps } from './PhoneInput';

export function PrettyPhoneInput(
  props: Readonly<PhoneInputProps>,
): React.JSX.Element {
  const theme = useTheme();
  const primaryColor = props.error
    ? theme.palette.error.main
    : theme.palette.primary.main;
  const darkPrimaryColor = alpha(darken(primaryColor, 10), 0.4);
  const background = theme.palette.background.paper;

  // Define keyframes for more complex animations
  const rotateAnimation = keyframes`
    0% {
      transform: rotate(0deg);
    }
    20% {
      transform: rotate(80deg);
    }
    25% {
      transform: rotate(90deg);
    }
    45% {
      transform: rotate(170deg);
    }
    50% {
      transform: rotate(180deg);
    }
    70% {
      transform: rotate(260deg);
    }
    75% {
      transform: rotate(270deg);
    }
    95% {
      transform: rotate(350deg);
    }
    100% {
      transform: rotate(360deg);
    }
  `;

  const pulseAnimation = keyframes`
    0% {
      background-size: 100% 100%;
    }
    50% {
      background-size: 110% 110%;
    }
    100% {
      background-size: 100% 100%;
    }
  `;

  // Animation for the background position to create dynamic effect
  const moveAnimation = keyframes`
    0% {
      background-position: 0% 0%;
    }
    25% {
      background-position: 100% 100%;
    }
    50% {
      background-position: 100% 100%;
    }
    75% {
      background-position: 100% 100%;
    }
    100% {
      background-position: 0% 0%;
    }
  `;

  return (
    <Box
      width='100%'
      sx={{
        position: 'relative',
        zIndex: 0,
        '& label.MuiFormLabel-root': {
          // use paper color
          background,
        },
        '& .MuiOutlinedInput-root': {
          position: 'relative',
          overflow: 'hidden',
          // Create the custom border effect
          '&::before': {
            content: '""',
            position: 'absolute',
            width: 'calc(100% + 8px)',
            aspectRatio: 1,
            left: -4,
            zIndex: -1,
            background: `conic-gradient(
              from 45deg,
              ${primaryColor} 0deg, 
              ${primaryColor} 60deg, 
              ${darkPrimaryColor} 95deg,
              rgba(255,255,255,1) 105deg,
              ${darkPrimaryColor} 115deg,
              ${primaryColor} 150deg, 
              ${primaryColor} 360deg
            )`,
            animation: `${rotateAnimation} 8s linear infinite, ${pulseAnimation} 3s linear infinite, ${moveAnimation} 12s linear infinite`,
            backgroundOrigin: 'border-box',
            backgroundPosition: 'center',
            backgroundSize: '100% 100%',
          },
        },
        // Hide the default notched outline completely
        '& .MuiOutlinedInput-notchedOutline': {
          border: 'none',
          zIndex: -1,
          m: 0.25,
          top: 0,
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            backgroundColor: background,
            zIndex: -1,
          },
          '& legend': {
            display: 'none',
          },
        },
        // Ensure hover and focus states don't interfere with our custom styling
        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
          border: 'none',
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
          {
            border: 'none',
          },
      }}
    >
      <PhoneInput {...props} />
    </Box>
  );
}
