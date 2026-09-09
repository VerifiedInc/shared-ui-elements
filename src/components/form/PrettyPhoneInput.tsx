import { useEffect, useRef, useState } from 'react';
import { Box, keyframes, useTheme } from '@mui/material';

import { alpha, darken } from '../../utils/color';

import { BasePhoneInput, type BasePhoneInputProps } from './BasePhoneInput';

export interface PrettyPhoneInputProps extends BasePhoneInputProps {
  /**
   * Whether the input is waiting on something (e.g. a lookup triggered by the typed number).
   * The beam lapping the border speeds up while true so it reads as a loading indicator. Defaults to false.
   */
  loading?: boolean;
}

/**
 * Seconds the beam takes to lap the border.
 */
const idleLapDuration = 8;
const loadingLapDuration = 0.8;

/**
 * Registered custom property that drives the beam: 0 → 1 is one full lap around the border.
 * Registering it (see `registerProgressProperty`) is what lets the browser interpolate it smoothly.
 */
const progressProperty = '--ppi-progress';

/**
 * Length of the beam along the border, in px.
 */
const beamLength = 160;

/**
 * Length of the bright core of the beam (dark shoulder to dark shoulder) along the border, in px.
 */
const beamCoreLength = 36;

/**
 * Gradient stops of the beam, as offsets in px along the border from the beam center.
 * Every stop goes through the perimeter → angle math (not just the ends), otherwise the core would drift
 * toward the corners between the ends and look like it speeds up there.
 */
const beamStops = {
  start: -beamLength / 2,
  'start-shoulder': -beamCoreLength / 2,
  core: 0,
  'end-shoulder': beamCoreLength / 2,
  end: beamLength / 2,
} as const;

type BeamStop = keyof typeof beamStops;

/**
 * One lap of the beam around the border.
 */
const lapAnimation = keyframes`
  from {
    ${progressProperty}: 0;
  }
  to {
    ${progressProperty}: 1;
  }
`;

/**
 * Fallback for browsers without registered custom properties: a plain rotation of the gradient.
 * Its speed is only uniform in angle, so on a wide input the beam visibly slows down mid-edge.
 */
const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

/**
 * Documents where the progress property is already registered. Registration is per document, so an input
 * rendered into an iframe (the 1-Click web client does this) must register it on the iframe's document,
 * not on the document running this code.
 */
const registeredDocuments = new WeakSet<Document>();

/**
 * Registers the progress property on the element's document and reports whether the browser supports it.
 * Unregistered custom properties are not interpolated, they just flip between keyframes.
 */
function registerProgressProperty(element: HTMLElement): boolean {
  const doc = element.ownerDocument;
  const win = doc.defaultView;

  if (
    !win ||
    typeof win.CSS === 'undefined' ||
    typeof win.CSS.registerProperty !== 'function'
  ) {
    return false;
  }

  if (registeredDocuments.has(doc)) return true;

  try {
    win.CSS.registerProperty({
      name: progressProperty,
      syntax: '<number>',
      inherits: false,
      initialValue: '0',
    });
  } catch (error) {
    // Already registered on that document by another copy of this module: still supported.
    // Checked by name, not `instanceof`, because the error comes from the element's realm.
    if ((error as { name?: string }).name !== 'InvalidModificationError')
      return false;
  }

  registeredDocuments.add(doc);
  return true;
}

/**
 * CSS math that places one gradient stop of the beam: from its distance along the border (`--ppi-d-<stop>`,
 * clockwise from the top center, in px) to the angle of that point as seen from the center of the input
 * (`--ppi-t-<stop>`), and to that angle measured from the start of the beam (`--ppi-s-<stop>`).
 *
 * A rotating conic gradient moves at a constant angular speed, which along the edges of a wide, short
 * rectangle looks slow in the middle and fast near the corners, and stretches the beam near the corners
 * too. Driving every stop from a perimeter distance instead keeps the speed and the size uniform.
 *
 * Inputs: `--ppi-a` / `--ppi-b` are the half width / half height and `--ppi-p` the perimeter, all unitless px.
 */
function beamStopGeometry(stop: BeamStop): Record<string, string> {
  const offset = beamStops[stop];
  const d = `var(--ppi-d-${stop})`;
  const p = 'var(--ppi-p)';

  const styles: Record<string, string> = {
    [`--ppi-d-${stop}`]: `calc(var(${progressProperty}) * ${p} ${offset < 0 ? '-' : '+'} ${Math.abs(offset)})`,
    // x is a triangle wave clamped to ±a: it grows along the top edge, holds on the right edge,
    // shrinks along the bottom edge and holds on the left edge.
    [`--ppi-x-${stop}`]: `clamp(-1 * var(--ppi-a), abs(mod(${d} + ${p} * 0.75, ${p}) - ${p} / 2) - ${p} / 4, var(--ppi-a))`,
    // y is the same wave a quarter lap behind, clamped to ±b. CSS y grows downwards, so the top edge is -b.
    [`--ppi-y-${stop}`]: `clamp(-1 * var(--ppi-b), ${p} / 4 - abs(mod(${d}, ${p}) - ${p} / 2), var(--ppi-b))`,
    // Angle of that point from the center, clockwise from 12 o'clock: the conic-gradient convention.
    [`--ppi-t-${stop}`]: `atan2(var(--ppi-x-${stop}), -1 * var(--ppi-y-${stop}))`,
  };

  if (stop !== 'start') {
    // Position of the stop inside the gradient, which starts at the beam start.
    // `mod` keeps it positive when the beam crosses the ±180deg seam at the bottom center.
    styles[`--ppi-s-${stop}`] =
      `mod(var(--ppi-t-${stop}) - var(--ppi-t-start), 360deg)`;
  }

  return styles;
}

/**
 * Geometry of the beam for the current progress, from the measured input size (`--ppi-w` / `--ppi-h`).
 */
const beamGeometry: Record<string, string> = {
  '--ppi-a': 'calc(var(--ppi-w) / 2)',
  '--ppi-b': 'calc(var(--ppi-h) / 2)',
  '--ppi-p': 'calc(4 * (var(--ppi-a) + var(--ppi-b)))',
  ...Object.assign(
    {},
    ...(Object.keys(beamStops) as BeamStop[]).map(beamStopGeometry),
  ),
};

/**
 * Renders the phone input wrapped in a gradient border with a beam of light lapping it at a constant
 * speed: slowly while idle, quickly while loading.
 *
 * @param loading - Whether to show the loading indicator (the beam laps the border quickly). Defaults to false.
 * @param props - Every other prop is forwarded to `BasePhoneInput`.
 */
export function PrettyPhoneInput({
  loading = false,
  ...props
}: Readonly<PrettyPhoneInputProps>): React.JSX.Element {
  const theme = useTheme();
  const rootRef = useRef<HTMLDivElement>(null);
  const [uniformBeam, setUniformBeam] = useState(false);
  const lapDuration = loading ? loadingLapDuration : idleLapDuration;
  const previousLapDuration = useRef(lapDuration);

  const primaryColor = props.error
    ? theme.palette.error.main
    : theme.palette.primary.main;
  const darkPrimaryColor = alpha(darken(primaryColor, 10), 0.4);
  const background = theme.palette.background.paper;

  useEffect(() => {
    const wrapper = rootRef.current;
    if (wrapper) setUniformBeam(registerProgressProperty(wrapper));
  }, []);

  // Keep the border size in sync so the beam math works on the real input geometry.
  // Everything comes from the element's own window: it may live in an iframe.
  useEffect(() => {
    const wrapper = rootRef.current;
    const input = wrapper?.querySelector<HTMLElement>('.MuiOutlinedInput-root');
    const win = wrapper?.ownerDocument.defaultView;

    if (
      !wrapper ||
      !input ||
      !win ||
      typeof win.ResizeObserver === 'undefined'
    ) {
      return;
    }

    const observer = new win.ResizeObserver(() => {
      const { width, height } = input.getBoundingClientRect();
      wrapper.style.setProperty('--ppi-w', String(width));
      wrapper.style.setProperty('--ppi-h', String(height));
    });
    observer.observe(input);

    return () => {
      observer.disconnect();
    };
  }, []);

  // A new lap duration keeps the animation's elapsed time, which would move the beam to another spot.
  // Rescale the elapsed time so the beam keeps its place and only changes speed.
  useEffect(() => {
    const previous = previousLapDuration.current;
    previousLapDuration.current = lapDuration;

    const input = rootRef.current?.querySelector<HTMLElement>(
      '.MuiOutlinedInput-root',
    );

    if (
      previous === lapDuration ||
      !input ||
      typeof input.getAnimations !== 'function'
    ) {
      return;
    }

    for (const animation of input.getAnimations({ subtree: true })) {
      // Duck-typed: the animation may come from an iframe's realm, where `instanceof KeyframeEffect` fails.
      const effect = animation.effect as KeyframeEffect | null;

      if (
        effect?.pseudoElement !== '::before' ||
        typeof animation.currentTime !== 'number'
      ) {
        continue;
      }

      const previousMs = previous * 1000;
      const progress = (animation.currentTime % previousMs) / previousMs;
      animation.currentTime = progress * lapDuration * 1000;
    }
  }, [lapDuration]);

  // Beam shape: primary → dark → white core → dark → primary, with every stop pinned to its own spot on the border.
  const beamGradient = `conic-gradient(
    from var(--ppi-t-start),
    ${primaryColor} 0deg,
    ${darkPrimaryColor} var(--ppi-s-start-shoulder),
    rgba(255,255,255,1) var(--ppi-s-core),
    ${darkPrimaryColor} var(--ppi-s-end-shoulder),
    ${primaryColor} var(--ppi-s-end),
    ${primaryColor} 360deg
  )`;

  // Same shape in fixed angles, for the rotation fallback.
  const spinGradient = `conic-gradient(
    from 45deg,
    ${primaryColor} 0deg,
    ${primaryColor} 60deg,
    ${darkPrimaryColor} 95deg,
    rgba(255,255,255,1) 105deg,
    ${darkPrimaryColor} 115deg,
    ${primaryColor} 150deg,
    ${primaryColor} 360deg
  )`;

  const borderStyles: Record<string, string> = uniformBeam
    ? {
        ...beamGeometry,
        background: beamGradient,
        animation: `${lapAnimation} ${lapDuration}s linear infinite`,
      }
    : {
        background: spinGradient,
        animation: `${spinAnimation} ${lapDuration}s linear infinite`,
      };

  return (
    <Box
      ref={rootRef}
      width='100%'
      aria-busy={loading || undefined}
      sx={{
        position: 'relative',
        zIndex: 0,
        // Border size used by the beam math, overwritten with the measured size once mounted.
        '--ppi-w': '320',
        '--ppi-h': '56',
        '& label.MuiFormLabel-root': {
          // use paper color
          background,
        },
        '& .MuiOutlinedInput-root': {
          position: 'relative',
          overflow: 'hidden',
          // Create the custom border effect: a square, centered on the input by the flex container
          // (its static position), that shows through the 2px ring left around the notched outline.
          '&::before': {
            content: '""',
            position: 'absolute',
            width: 'calc(100% + 8px)',
            aspectRatio: 1,
            left: -4,
            zIndex: -1,
            backgroundOrigin: 'border-box',
            backgroundPosition: 'center',
            backgroundSize: '100% 100%',
            ...borderStyles,
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
      <BasePhoneInput {...props} />
    </Box>
  );
}
