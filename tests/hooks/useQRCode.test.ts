import { describe, expect, test } from 'vitest';
import { renderHook } from '@testing-library/react';

import { useQRCode } from '../../src/hooks/useQRCode';

const render = (fill?: string): string =>
  renderHook(() =>
    useQRCode({ data: 'https://verified.inc', size: 100, imageSize: 0, fill }),
  ).result.current;

describe('useQRCode', () => {
  test('paints with the given fill, or black by default', () => {
    expect(render('#ff0000')).toContain("fill='#ff0000'");
    expect(render()).toContain("fill='#000000'");
  });

  test('escapes the fill so it cannot break out of the attribute', () => {
    const svg = render("red' onload='alert(1)");
    expect(svg).not.toContain("onload='");
    expect(svg).toContain("fill='red&apos; onload=&apos;alert(1)'");
  });
});
