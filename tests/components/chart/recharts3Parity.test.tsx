import { afterEach, beforeAll, describe, expect, test } from 'vitest';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { createTheme, ThemeProvider } from '@mui/material';
import type { ReactElement } from 'react';

import { DefaultZIndexes } from 'recharts';

import { AreaChart } from '../../../src/components/chart/AreaChart';
import { FunnelChart } from '../../../src/components/chart/FunnelChart';
import { PieChart } from '../../../src/components/chart/PieChart';
import { SimpleBarChart } from '../../../src/components/chart/SimpleBarChart';

// Behaviors that Recharts 3 changed and the charts keep as they were on Recharts 2 (ENG-1025).

const WIDTH = 500;
const HEIGHT = 300;

// jsdom has no layout. Recharts' ResponsiveContainer sizes itself from a ResizeObserver, so report a fixed box.
beforeAll(() => {
  class SizedResizeObserver {
    constructor(private readonly callback: ResizeObserverCallback) {}
    observe(target: Element): void {
      this.callback(
        [
          {
            target,
            contentRect: { width: WIDTH, height: HEIGHT },
          } as unknown as ResizeObserverEntry,
        ],
        this,
      );
    }

    unobserve(): void {}
    disconnect(): void {}
  }
  (globalThis as unknown as { ResizeObserver: unknown }).ResizeObserver =
    SizedResizeObserver;
});

afterEach(() => {
  cleanup();
});

const theme = createTheme({
  palette: {
    neutral: { main: '#999999' },
    neutralContrast: { main: '#cccccc' },
    warningContrast: { main: '#ff9800' },
    infoContrast: { main: '#2196f3' },
    dangerContrast: { main: '#f44336' },
  },
});

const renderInTheme = (ui: ReactElement): ReturnType<typeof render> =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

const svgTexts = (container: HTMLElement): string[] =>
  Array.from(container.querySelectorAll('svg.recharts-surface text')).map(
    (text) => text.textContent ?? '',
  );

const slices = [
  { name: 'Allow', value: 400, color: '#00aa00' },
  { name: 'Flag', value: 300, color: '#eeee00' },
  { name: 'Block', value: 300, color: '#cc0000' },
];

describe('PieChart', () => {
  test('lists the legend in data order, not by name', () => {
    renderInTheme(
      <PieChart
        data={slices}
        pie={{ isAnimationActive: false }}
        sx={{ width: WIDTH, height: HEIGHT }}
      />,
    );

    expect(
      screen
        .getAllByText(/^(Allow|Flag|Block)$/)
        .map((item) => item.textContent),
    ).toEqual(['Allow', 'Flag', 'Block']);
  });

  test('highlights the hovered slice and clears it when the pointer leaves', () => {
    const { container } = renderInTheme(
      <PieChart
        data={slices}
        pie={{ isAnimationActive: false }}
        sx={{ width: WIDTH, height: HEIGHT }}
      />,
    );
    expect(svgTexts(container)).toEqual([]);

    const sector = container.querySelectorAll('.recharts-pie-sector')[1];
    fireEvent.mouseEnter(sector);
    expect(svgTexts(container)).toEqual(['Flag', '300', '30.00% (300)']);

    // The active shape replaces the slice's element, so leave the one now on screen.
    fireEvent.mouseLeave(container.querySelectorAll('.recharts-pie-sector')[1]);
    expect(svgTexts(container)).toEqual([]);
  });

  test('with allActive, labels every slice that has a value, without hovering', () => {
    const { container } = renderInTheme(
      <PieChart
        data={[...slices.slice(0, 2), { name: 'Block', value: 0 }]}
        allActive
        pie={{ isAnimationActive: false }}
        sx={{ width: WIDTH, height: HEIGHT }}
      />,
    );

    expect(svgTexts(container)).toEqual([
      '400',
      '57.14% (400)',
      '300',
      '42.86% (300)',
    ]);
  });
});

describe('AreaChart', () => {
  test('lists tooltip rows in the order the series are declared, not by name', () => {
    const { container } = renderInTheme(
      <AreaChart
        data={[
          { page: 'A', uv: 4000, pv: 2400 },
          { page: 'B', uv: 3000, pv: 1398 },
        ]}
        series={[
          { key: 'UV', dataKey: 'uv' },
          { key: 'PV', dataKey: 'pv' },
        ]}
        xAxis={{ dataKey: 'page' }}
        tooltip={{ defaultIndex: 1, active: true }}
        sx={{ width: WIDTH, height: HEIGHT }}
      />,
    );

    expect(
      Array.from(container.querySelectorAll('.recharts-tooltip-item-name')).map(
        (name) => name.textContent,
      ),
    ).toEqual(['UV', 'PV']);
  });
});

describe('FunnelChart', () => {
  // The widest segment's top-left corner and size, read from its path (`M x,y L x+width,y ...`).
  const widestSegment = (container: HTMLElement) => {
    const path = container.querySelector('.recharts-funnel-trapezoid path');
    const numbers =
      (path?.getAttribute('d') ?? '').match(/-?\d+(\.\d+)?/g)?.map(Number) ??
      [];
    return { x: numbers[0], y: numbers[1], width: numbers[2] - numbers[0] };
  };

  test('draws the funnel where Recharts 2 drew it for the default margin', () => {
    const { container } = renderInTheme(
      <FunnelChart
        data={[
          { name: 'Created', value: 100 },
          { name: 'Verified', value: 50 },
        ]}
        sx={{ width: WIDTH, height: HEIGHT }}
      />,
    );

    // Recharts 2 placed it at (margin.top + 25, margin.left) with width - 2 * (left + right) - 50.
    expect(widestSegment(container)).toEqual({
      x: 35,
      y: 0,
      width: WIDTH - 2 * 90 - 50,
    });
  });

  test('keeps the Recharts 2 placement for a custom margin', () => {
    const { container } = renderInTheme(
      <FunnelChart
        data={[
          { name: 'Created', value: 100 },
          { name: 'Verified', value: 50 },
        ]}
        margin={{ top: 20, right: 40, left: 10, bottom: 0 }}
        sx={{ width: WIDTH, height: HEIGHT }}
      />,
    );

    expect(widestSegment(container)).toEqual({
      x: 45,
      y: 10,
      width: WIDTH - 2 * (10 + 40) - 50,
    });
  });
});

describe('SimpleBarChart', () => {
  // The layer each reference area was drawn into, from its `recharts-zIndex-layer_<n>` ancestor.
  const layerOf = (container: HTMLElement, fill: string): number => {
    const area = container.querySelector(
      `.recharts-reference-area [fill="${fill}"]`,
    );
    const layer =
      area
        ?.closest('[class*="recharts-zIndex-layer_"]')
        ?.getAttribute('class') ?? '';
    return Number(/recharts-zIndex-layer_(-?\d+)/.exec(layer)?.[1]);
  };

  test('draws references behind the bars unless they set isFront, above even an active bar', async () => {
    const { container } = renderInTheme(
      <SimpleBarChart
        data={[
          { key: 'a', value: 10 },
          { key: 'b', value: 20 },
        ]}
        series={[{ key: 'Value', dataKey: 'value', color: '#123456' }]}
        xAxis={{ dataKey: 'key' }}
        referenceAreas={[
          { x1: 'a', x2: 'b', fill: '#aaaaaa' },
          { x1: 'a', x2: 'b', fill: '#bbbbbb', isFront: true },
        ]}
        sx={{ width: WIDTH, height: HEIGHT }}
      />,
    );

    await waitFor(() => {
      expect(layerOf(container, '#aaaaaa')).toBeLessThan(DefaultZIndexes.bar);
      expect(layerOf(container, '#bbbbbb')).toBeGreaterThan(
        DefaultZIndexes.activeBar,
      );
    });
  });
});
