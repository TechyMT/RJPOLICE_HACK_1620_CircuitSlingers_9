import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ command }) =>
{
  const isProduction = command === 'build';
  return {
    plugins: [react()],
    base: isProduction ? '/dist/' : '/dist/',
  };
});