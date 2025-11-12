import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { configDefaults } from 'vitest/config';

import pkg from './package.json';

const resolvePath = (path: string) => resolve(__dirname, path);

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
      babel: {
        plugins: [
          // This helps with fragments and key requirements
          ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }],
        ],
      },
    }),
    dts({ include: ['src'] }),
  ],
  test: {
    environment: 'jsdom',
    exclude: [...configDefaults.exclude, '.trunk', '.storybook'],
  },
  build: {
    lib: {
      entry: {
        index: resolvePath('src/index.ts'),
        components: resolvePath('src/components/index.ts'),
        'components/animation': resolvePath(
          'src/components/animation/index.ts',
        ),
        'components/chart': resolvePath('src/components/chart/index.ts'),
        'components/typographies': resolvePath(
          'src/components/typographies/index.ts',
        ),
        contexts: resolvePath('src/contexts/index.ts'),
        hooks: resolvePath('src/hooks/index.ts'),
        styles: resolvePath('src/styles/index.ts'),
        validations: resolvePath('src/validations/index.ts'),
        utils: resolvePath('src/utils/index.ts'),
        'utils/address': resolvePath('src/utils/address/index.ts'),
        'utils/color': resolvePath('src/utils/color/index.ts'),
        'utils/masks': resolvePath('src/utils/masks/index.ts'),
        'utils/string': resolvePath('src/utils/string/index.ts'),
        'utils/phone': resolvePath('src/utils/phone.ts'),
        'utils/wrapPromise': resolvePath('src/utils/wrapPromise/index.ts'),
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
        // Preserve module structure and ensure proper React key handling
        preserveModules: false,
        // Ensure components aren't unnecessarily duplicated
        manualChunks: undefined,
      },
    },
  },
  esbuild: {
    legalComments: 'none',
  },
});
