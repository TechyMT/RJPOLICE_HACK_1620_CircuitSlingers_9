import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(() =>
{

  return {
    plugins: [react()],
    base: './', // Change the base path for development
  };
});
