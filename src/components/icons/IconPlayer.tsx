import {
  DotLottieCommonPlayer,
  DotLottiePlayer,
  PlayerState,
} from '@dotlottie/react-player';
import { Box, SxProps, Theme } from '@mui/material';
import { CSSProperties, useEffect, useRef } from 'react';

export type IconPlayerProps = {
  animationPublicPath: string;
  speed?: number;
  autoPlay?: boolean;
  loop?: boolean;
  color?: string;
  paintFill?: boolean;
  paintStroke?: boolean;
  rotate?: number;
  additionalSx?: SxProps<Theme>;
  style?: CSSProperties;
  buttonRef?: React.RefObject<HTMLButtonElement>;
};

export const IconPlayer = ({
  animationPublicPath,
  speed = 0.5,
  autoPlay = true,
  loop,
  color = 'inherit',
  paintFill = true,
  paintStroke = true,
  rotate,
  additionalSx,
  style,
  buttonRef,
  ...props
}: IconPlayerProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const lottie = useRef<DotLottieCommonPlayer | null>(null);

  const animate = () => {
    if (lottie.current?.currentState === PlayerState.Playing) return;

    lottie.current?.goToAndPlay(0);
  };

  useEffect(() => {
    const container = ref.current;

    if (!container) return;

    // Find the closest button parent if it exists
    const buttonParent = buttonRef?.current || container.closest('button');
    const targetElement = buttonParent || container;

    targetElement.addEventListener('mouseenter', animate);

    return () => {
      targetElement.removeEventListener('mouseenter', animate);
    };
  }, [autoPlay, buttonRef]);

  return (
    <Box
      ref={ref}
      {...props}
      sx={{
        ...additionalSx,
        color,
        aspectRatio: 1 / 1,
        overflow: 'hidden',
        transform: `rotate(${rotate}deg)`,

        '& svg path[fill]': {
          fill: paintFill ? 'currentColor' : undefined,
        },
        '& svg path[stroke]': {
          stroke: paintStroke ? 'currentColor' : undefined,
        },
      }}
    >
      <DotLottiePlayer
        ref={lottie}
        src={animationPublicPath}
        autoplay={autoPlay}
        loop={loop}
        speed={speed}
        style={{ width: 24, height: 24, lineHeight: 'normal', ...style }}
      />
    </Box>
  );
};
