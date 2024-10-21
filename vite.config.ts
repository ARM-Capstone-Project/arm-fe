import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [react(), tsconfigPaths()],
   test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTest.ts',
      // speed up since test don't rely on css
      css: false,
      coverage: {
          provider: 'istanbul',
         reporter: ['text', 'json', 'html'],
      },
   },
});