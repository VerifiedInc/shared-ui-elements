import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

import pkg from './package.json';

export default defineConfig({
  plugins: [react({ jsxRuntime: 'automatic' }), dts({ include: ['src'] })],
  test: {
    environment: 'jsdom',
    exclude: [...configDefaults.exclude, '.trunk', '.storybook'],
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
    },
    rollupOptions: {
      external: Object.keys(pkg.peerDependencies),
    },
  },
});
