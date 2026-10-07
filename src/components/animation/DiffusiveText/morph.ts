// The scramble-to-Lato effect as a pure state machine (no DOM, no timers). On arrival `MONO` snaps
// to 0 and unlocked letters are width lookalikes, so the text has the value's width and wraps like it.

export type MorphTiming = {
  /** How often a scrambling letter changes, in ms. */
  swapMs: number;
  /** Once the value arrives, every letter locks in within this window, in ms, most of them early. */
  lockMs: number;
  /** About how long `MONO` takes to ease from monospace toward Lato while waiting, in ms. */
  monoEaseMs: number;
};

/** While waiting, `MONO` eases from 1 toward this. */
const MONO_FLOOR = 0.1;

const sets = {
  U: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  L: 'abcdefghijklmnopqrstuvwxyz',
  D: '0123456789',
} as const;
type GlyphClass = keyof typeof sets;

// A template's placeholders: `X` an uppercase letter, `x` a lowercase one, `#` a digit.
const templateClass: Record<string, GlyphClass> = {
  X: 'U',
  x: 'L',
  '#': 'D',
};

/** A character's class; spaces, punctuation and symbols (`•`) never scramble. */
export function classOf(c: string): GlyphClass | null {
  if (/\d/.test(c)) return 'D';
  if (c.toLowerCase() !== c.toUpperCase())
    return c === c.toUpperCase() ? 'U' : 'L';
  return null;
}

/** Glyph widths in Lato, for picking lookalikes. */
export type MeasureWidth = (c: string) => number;

// Per width function: a new one (another weight, or the font once it has loaded) measures afresh.
const pools = new WeakMap<MeasureWidth, Map<string, string[]>>();

type Phase = 'waiting' | 'arrived';

// While waiting, a placeholder letter swaps with same-class letters within 6% of its Lato width (at
// least three), so the line doesn't jitter. Once the value is here, a letter only swaps with ones
// within 2% of the real letter's width (or shows the real letter when none is that close), so the
// line is the value's width.
const tolerances: Record<Phase, number> = { waiting: 0.06, arrived: 0.02 };

function pool(
  c: string,
  cls: GlyphClass,
  width: MeasureWidth,
  phase: Phase,
): string[] {
  const key = c + cls + phase;
  const tolerance = tolerances[phase];
  let byWidth = pools.get(width);
  if (!byWidth) {
    byWidth = new Map();
    pools.set(width, byWidth);
  }
  const cached = byWidth.get(key);
  if (cached) return cached;
  const target = width(c);
  const byDistance = [...sets[cls]].sort(
    (a, b) => Math.abs(width(a) - target) - Math.abs(width(b) - target),
  );
  const close = byDistance.filter(
    (g) => Math.abs(width(g) - target) <= target * tolerance,
  );
  let result = close;
  if (phase === 'waiting' && close.length < 3) result = byDistance.slice(0, 3);
  else if (close.length === 0) result = [c];
  byWidth.set(key, result);
  return result;
}

type Random = () => number;
const pick = (s: string[] | string, random: Random) =>
  s[Math.floor(random() * s.length)];

/** A plausible fake value in the template's shape: placeholders become random glyphs. */
export function fakeFrom(template: string, random: Random): string[] {
  return [...template].map((c) => {
    const cls = templateClass[c];
    return cls ? pick(sets[cls], random) : c;
  });
}

export type MorphFrame = { text: string; mono: number; done: boolean };

export type Morph = {
  /** The value arrived at `now` (ms): the text takes its width, and the letters lock in. */
  arrive: (value: string, now: number) => void;
  /** The text and `MONO` at `now` (ms); `done` once it shows the value in plain Lato. */
  frame: (now: number, width: MeasureWidth) => MorphFrame;
};

// A critically damped spring, stepped in 4 ms slices: `MONO`'s velocity never jumps.
function stepSpring(
  s: { x: number; v: number },
  target: number,
  w: number,
  dtMs: number,
) {
  for (let k = 0; k < dtMs; k += 4) {
    const h = Math.min(4, dtMs - k) / 1000;
    s.v += (w * w * (target - s.x) - 2 * w * s.v) * h;
    s.x += s.v * h;
  }
}

/** Starts scrambling `template` at `start` (ms). */
export function createMorph(
  template: string,
  start: number,
  timing: MorphTiming,
  random: Random = Math.random,
): Morph {
  const fake = fakeFrom(template, random);
  // Only the template's placeholders scramble while waiting; its literal letters and digits
  // (`+1 (###)`) stay as they are.
  const placeholders = [...template].map((c) => templateClass[c] ?? null);
  const shown = [...fake];
  const { swapMs, lockMs, monoEaseMs } = timing;
  // A critically damped spring is ~settled after 4.4 / ω seconds.
  const monoW = 4400 / monoEaseMs;
  const next = fake.map(() => start + random() * swapMs);
  const mono = { x: 1, v: 0 };
  let last = start;
  let arrival: { at: number; real: string[]; lock: number[] } | null = null;

  const swap = (
    i: number,
    c: string,
    cls: GlyphClass,
    now: number,
    width: MeasureWidth,
  ) => {
    if (shown[i] === undefined || now >= next[i]) {
      shown[i] = pick(
        pool(c, cls, width, arrival ? 'arrived' : 'waiting'),
        random,
      );
      next[i] = now + swapMs * (0.7 + 0.6 * random());
    }
    return shown[i];
  };

  return {
    arrive(value, now) {
      const real = [...value];
      // Every letter swaps to a lookalike of its real letter on the next frame, then locks in at a
      // random moment in the window.
      shown.length = 0;
      next.length = 0;
      // Squaring a uniform draw skews it early: half the letters lock in the first quarter.
      arrival = {
        at: now,
        real,
        lock: real.map(() => random() ** 2 * lockMs),
      };
    },
    frame(now, width) {
      if (!arrival) {
        stepSpring(
          mono,
          MONO_FLOOR,
          monoW,
          Math.min(50, Math.max(0, now - last)),
        );
        last = now;
        const text = fake.map((c, i) => {
          const cls = placeholders[i];
          return cls ? swap(i, c, cls, now, width) : c;
        });
        return { text: text.join(''), mono: mono.x, done: false };
      }

      const { at, real, lock } = arrival;
      const e = now - at;
      let busy = false;
      const text = real.map((c, i) => {
        const cls = classOf(c);
        if (!cls || e >= lock[i]) return c;
        busy = true;
        return swap(i, c, cls, now, width);
      });
      if (!busy) return { text: real.join(''), mono: 0, done: true };
      return { text: text.join(''), mono: 0, done: false };
    },
  };
}
