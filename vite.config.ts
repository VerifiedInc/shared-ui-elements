import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

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
      external: [
        '@emotion/react',
        '@emotion/styled',
        '@fontsource/lato',
        '@fontsource/material-icons',
        '@mona-health/react-input-mask',
        '@mui/icons-material',
        '@mui/material',
        'jsdom',
        'libphonenumber-js',
        'qrcode',
        'react',
        'react-dnd',
        'react-dnd-html5-backend',
        'react-dom',
        'react-hook-form',
        'react-imask',
        'zod',
      ],
    },
  },
});
