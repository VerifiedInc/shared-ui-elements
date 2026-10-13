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

// Glyph widths in a font at a weight, from a canvas; Verified Morph's default instance is `MONO 0`,
// exactly Lato. Measured before that weight has loaded, they're the fallback font's, so they're
// dropped (once) when it loads and measured again.
function glyphWidths(fontFamily: string, weight: string): MeasureWidth {
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
    void document.fonts
      .load(font)
      .then(() => {
        if (widths.get(key) === measure) widths.delete(key);
      })
      // The font didn't load: keep measuring with the fallback it renders in.
      .catch(() => undefined);
  return measure;
}

/** The family `fonts/verified-morph.css` declares. */
export const verifiedMorphFontFamily = '"Verified Morph"';

export type DiffusiveTextProps = {
  /** `X` an uppercase letter, `x` a lowercase one, `#` a digit; anything else shows as is (`##/##/####`). */
  template: string;
  value: string | undefined;
  /**
   * Verified Morph's CSS family for the loading scramble's monospace look: `verifiedMorphFontFamily`
   * once the app imports `@verifiedinc-public/shared-ui-elements/fonts/verified-morph.css`, or the
   * family a framework font loader (`next/font/local`) gives it. Without it the text inherits its
   * font, which is enough for a known value with a `delay`; a loading scramble then isn't monospaced.
   */
  fontFamily?: string;
  /** Overrides part of `defaultDiffusiveTextTiming`. Read when the scramble starts. */
  timing?: Partial<DiffusiveTextTiming>;
  /**
   * Ms the scramble keeps going once the value is there, before the letters lock in. With it, a
   * value present at mount scrambles in its own width instead of just showing.
   */
  delay?: number;
};

// Text that scrambles in its value's shape while `value` is undefined and resolves into it on arrival.
// A value present at mount just shows, unless `delay` is set. It's wider than Lato until `MONO`
// reaches 0, so text that must stay on one line sets `nowrap` itself.
export function DiffusiveText({
  template,
  value,
  fontFamily,
  timing,
  delay = 0,
}: Readonly<DiffusiveTextProps>): React.ReactElement {
  const ref = useRef<HTMLSpanElement>(null);
  const morph = useRef<{ run: number; morph: Morph } | null>(null);
  const reduce = useReducedMotion();
  // A value there at mount just shows, unless it has a delay to scramble through.
  const [settled, setSettled] = useState(value !== undefined && !delay);
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
    // Lookalikes are measured in the font and weight the text renders in.
    const style = ref.current ? getComputedStyle(ref.current) : null;
    const weight = style?.fontWeight ?? '400';
    const family = fontFamily ?? style?.fontFamily ?? 'sans-serif';
    let raf = 0;
    const tick = (now: number) => {
      const el = ref.current;
      const m = morph.current?.morph;
      if (!el || !m) return;
      const frame = m.frame(now, glyphWidths(family, weight));
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
      morph.current?.morph.arrive(value, performance.now() + delay);
  }, [value, delay]);

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
        // Lookalikes are picked by single-glyph widths, so pair kerning would make a line wider than measured.
        fontKerning: 'none',
        // Aligned to the line's top, not the baseline: two fonts on one line would otherwise make the
        // line box taller than its line height, and it'd shrink back when the text settles.
        verticalAlign: 'top',
        // Monospace only serves the loading scramble; with reduced motion the still placeholder is Lato.
        '--mono': showValue || reduce === true || value !== undefined ? 0 : 1,
        opacity: !showValue && reduce ? 0.3 : undefined,
      }}
    >
      {/* Before the first frame (and on the server) the template itself holds the shape. */}
      {showValue ? value : (value ?? template.replaceAll('#', '0'))}
    </Box>
  );
}
