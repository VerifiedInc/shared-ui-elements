import { describe, expect, it } from 'vitest';

import {
  classOf,
  createMorph,
  fakeFrom,
} from '../../src/components/animation/DiffusiveText/morph';

const timing = { swapMs: 40, lockMs: 600, monoEaseMs: 2000 };

// Every glyph equally wide, so every same-class letter is a lookalike.
const width = () => 10;

// A seeded random, so the scramble is the same on every run.
const seeded = (seed: number) => () => {
  seed = (seed * 16807) % 2147483647;
  return seed / 2147483647;
};

describe('morph', () => {
  it('classes digits and letters, and leaves the rest alone', () => {
    expect(['7', 'Q', 'q', ' ', '/', '•', '-'].map(classOf)).toEqual([
      'D',
      'U',
      'L',
      null,
      null,
      null,
      null,
    ]);
  });

  it('fakes a value in the template shape, keeping punctuation in place', () => {
    const fake = fakeFrom('Xx ##/•', seeded(1));
    expect(fake).toHaveLength(7);
    expect(fake[0]).toMatch(/[A-Z]/);
    expect(fake[1]).toMatch(/[a-z]/);
    expect(fake.slice(2).join('')).toMatch(/^ \d\d\/•$/);
  });

  it('scrambles in the template shape while waiting, starting monospaced', () => {
    const morph = createMorph('##/##/####', 0, timing, seeded(2));
    const first = morph.frame(16, width);
    expect(first.text).toMatch(/^\d\d\/\d\d\/\d{4}$/);
    expect(first.done).toBe(false);
    expect(first.mono).toBeGreaterThan(0.9);
    // MONO drifts toward its floor, never to Lato, while the value hasn't arrived.
    let frame = first;
    for (let t = 32; t <= 5000; t += 16) frame = morph.frame(t, width);
    expect(frame.done).toBe(false);
    expect(frame.mono).toBeGreaterThan(0.05);
    expect(frame.mono).toBeLessThan(0.2);
  });

  it("keeps the template's literal letters and digits while waiting", () => {
    const morph = createMorph('+1 (###) Xx A', 0, timing, seeded(4));
    for (let t = 16; t <= 1000; t += 16) {
      expect(morph.frame(t, width).text).toMatch(
        /^\+1 \(\d{3}\) [A-Z][a-z] A$/,
      );
    }
  });

  it.each([
    ['longer than', 'Xxx', 'Richard Hendricks'],
    ['shorter than', 'Xxxxxxx Xxxxxxxx', 'Al Wu'],
    ['as long as', '##/##/####', '08/01/••••'],
  ])(
    'takes a value %s its template at once, and locks it in within lockMs',
    (_, template, value) => {
      const morph = createMorph(template, 0, timing, seeded(3));
      morph.frame(16, width);
      morph.arrive(value, 1000);
      let t = 1000;
      let frame = morph.frame(t, width);
      while (!frame.done) {
        // The value's length in plain Lato from the arrival frame on: it wraps like the value.
        expect([...frame.text]).toHaveLength([...value].length);
        expect(frame.mono).toBe(0);
        t += 16;
        frame = morph.frame(t, width);
      }
      expect(frame).toEqual({ text: value, mono: 0, done: true });
      expect(t - 1000).toBeLessThanOrEqual(timing.lockMs + 16);
    },
  );
});
