import { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import { useReducedMotion } from 'framer-motion';

import {
  createMorph,
  type MeasureWidth,
  type Morph,
  type MorphTiming,
} from './morph';

export type DiffusiveTextTiming = MorphTiming;

/** The timing `DiffusiveText` uses for anything its `timing` prop leaves out. */
export const defaultDiffusiveTextTiming: DiffusiveTextTiming = {
  swapMs: 40,
  lockMs: 600,
  monoEaseMs: 2000,
};

// Keyed by font family and weight.
const widths = new Map<string, MeasureWidth>();

// Lato widths at a weight, from a canvas: the font's default instance is `MONO 0`, exactly Lato.
// Measured before that weight has loaded, they're the fallback font's, so they're dropped (once)
// when it loads and measured again.
function latoWidths(fontFamily: string, weight: string): MeasureWidth {
  const key = `${fontFamily}|${weight}`;
  const known = widths.get(key);
  if (known) return known;
  const font = `${weight} 100px ${fontFamily}`;
  const ctx = document.createElement('canvas').getContext('2d');
  const cache = new Map<string, number>();
  const measure: MeasureWidth = (g) => {
    if (!ctx) return 1;
    const w = cache.get(g) ?? ctx.measureText(g).width;
    cache.set(g, w);
    return w;
  };
  if (ctx) ctx.font = font;
  widths.set(key, measure);
  if (document.fonts && !document.fonts.check(font))
    void document.fonts.load(font).then(() => {
      if (widths.get(key) === measure) widths.delete(key);
    });
  return measure;
}

/** The family `fonts/verified-morph.css` declares. */
export const verifiedMorphFontFamily = '"Verified Morph"';

export type DiffusiveTextProps = {
  /** `X` an uppercase letter, `x` a lowercase one, `#` a digit; anything else shows as is (`##/##/####`). */
  template: string;
  value: string | undefined;
  /**
   * Verified Morph's CSS family: `verifiedMorphFontFamily` once the app imports
   * `@verifiedinc-public/shared-ui-elements/fonts/verified-morph.css`, or the family a framework
   * font loader (`next/font/local`) gives it.
   */
  fontFamily: string;
  /** Overrides part of `defaultDiffusiveTextTiming`. Read when the scramble starts. */
  timing?: Partial<DiffusiveTextTiming>;
};

// Text that scrambles in its value's shape while `value` is undefined and resolves into it on arrival.
// A value present at mount just shows. It's wider than Lato until `MONO` reaches 0, so text that
// must stay on one line sets `nowrap` itself.
export function DiffusiveText({
  template,
  value,
  fontFamily,
  timing,
}: Readonly<DiffusiveTextProps>): React.ReactElement {
  const ref = useRef<HTMLSpanElement>(null);
  const morph = useRef<{ run: number; morph: Morph } | null>(null);
  const reduce = useReducedMotion();
  // A value there at mount just shows; only one that is loading scrambles.
  const [settled, setSettled] = useState(value !== undefined);
  // Each time the value goes back to loading (a refetch), it scrambles afresh.
  const [run, setRun] = useState(0);
  if (settled && value === undefined) {
    setSettled(false);
    setRun((r) => r + 1);
  }

  useEffect(() => {
    if (settled || reduce) return undefined;
    if (morph.current?.run !== run)
      morph.current = {
        run,
        morph: createMorph(template, performance.now(), {
          ...defaultDiffusiveTextTiming,
          ...timing,
        }),
      };
    // Lookalikes are measured at the weight the text renders in.
    const weight = ref.current
      ? getComputedStyle(ref.current).fontWeight
      : '400';
    let raf = 0;
    const tick = (now: number) => {
      const el = ref.current;
      const m = morph.current?.morph;
      if (!el || !m) return;
      const frame = m.frame(now, latoWidths(fontFamily, weight));
      // The text node React rendered, so React and the animation never fight over the span.
      if (el.firstChild) el.firstChild.nodeValue = frame.text;
      el.style.setProperty('--mono', frame.mono.toFixed(4));
      if (frame.done) {
        // Lato from this frame on: removing it would show the loading style's MONO 1 for the one
        // frame before React re-renders the settled value.
        el.style.setProperty('--mono', '0');
        setSettled(true);
      } else raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [settled, reduce, template, fontFamily, run]);

  useEffect(() => {
    if (value !== undefined)
      morph.current?.morph.arrive(value, performance.now());
  }, [value]);

  const showValue = settled || (reduce === true && value !== undefined);
  return (
    <Box
      component='span'
      ref={ref}
      aria-hidden={showValue ? undefined : true}
      sx={{
        fontFamily,
        fontVariationSettings: '"MONO" var(--mono, 0)',
        fontVariantLigatures: 'none',
        // Aligned to the line's top, not the baseline: two fonts on one line would otherwise make the
        // line box taller than its line height, and it'd shrink back when the text settles.
        verticalAlign: 'top',
        // Monospace only serves the scramble; with reduced motion the still placeholder is Lato.
        '--mono': showValue || reduce === true ? 0 : 1,
        opacity: !showValue && reduce ? 0.3 : undefined,
      }}
    >
      {/* Before the first frame (and on the server) the template itself holds the shape. */}
      {showValue ? value : template.replace(/#/g, '0')}
    </Box>
  );
}
