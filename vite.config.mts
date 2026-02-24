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
        constants: resolvePath('src/constants/index.ts'),
        utils: resolvePath('src/utils/index.ts'),
        'utils/address': resolvePath('src/utils/address/index.ts'),
        'utils/color': resolvePath('src/utils/color/index.ts'),
        'utils/masks': resolvePath('src/utils/masks/index.ts'),
        'utils/string': resolvePath('src/utils/string/index.ts'),
        'utils/phone': resolvePath('src/utils/phone.ts'),
        'utils/logo': resolvePath('src/utils/logo/index.ts'),
        'utils/wrapPromise': resolvePath('src/utils/wrapPromise/index.ts'),
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: (id) => {
        const peerDeps = Object.keys(pkg.peerDependencies || {});
        return peerDeps.some((dep) => id === dep || id.startsWith(`${dep}/`));
      },
      output: {
        // Each source file gets its own output file so consumers can
        // tree-shake individual components (e.g. drop ExportToPdfButton
        // and its react-to-pdf dynamic import when not used).
        preserveModules: true,
        preserveModulesRoot: 'src',
        // Named entries (index, components, utils/phone, …) keep the
        // /index.mjs convention expected by package.json exports.
        // Every other preserved module file uses its source path + .mjs.
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.isEntry) {
            if (chunkInfo.name === 'index') return 'index.mjs';
            return `${chunkInfo.name}/index.mjs`;
          }
          return `${chunkInfo.name}.mjs`;
        },
      },
    },
  },
  publicDir: false,
  esbuild: {
    legalComments: 'none',
  },
});
