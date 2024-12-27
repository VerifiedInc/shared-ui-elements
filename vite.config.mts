import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { configDefaults } from 'vitest/config';

import pkg from './package.json';

export default defineConfig({
  plugins: [react({ jsxRuntime: 'automatic' }), dts({ include: ['src'] })],
  test: {
    environment: 'jsdom',
    exclude: [...configDefaults.exclude, '.trunk', '.storybook'],
  },
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        components: resolve(__dirname, 'src/components/index.ts'),
        hooks: resolve(__dirname, 'src/hooks/index.ts'),
        styles: resolve(__dirname, 'src/styles/index.ts'),
        validations: resolve(__dirname, 'src/validations/index.ts'),
        'utils/masks': resolve(__dirname, 'src/utils/masks/index.ts'),
        'utils/string': resolve(__dirname, 'src/utils/string/index.ts'),
      },
      formats: ['es'],
      fileName: (format, entryName) => {
        if (entryName === 'index') {
          return `${entryName}.mjs`;
        }
        return `${entryName}/index.mjs`;
      },
    },
    rollupOptions: {
      external: Object.keys(pkg.peerDependencies),
      output: {
        chunkFileNames: 'shared/[name]-[hash].mjs',
      },
    },
  },
  esbuild: {
    legalComments: 'none',
  },
});
