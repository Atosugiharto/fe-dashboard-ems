/* eslint-disable no-undef */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // Pastikan modul 'path' diimport

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.png', '**/*.PNG'],
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src'),
    },
  },
});

