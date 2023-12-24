import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import eslintPlugin from 'vite-plugin-eslint';
import StylelintPlugin from 'vite-plugin-stylelint';
import { viteVConsole } from 'vite-plugin-vconsole';

const pathResolve = (dir: string) => resolve(__dirname, dir);
// https://vitejs.dev/config/
export default ({ mode }) => {
  // eslint-disable-next-line no-undef
  const env: Partial<ImportMetaEnv> = loadEnv(mode, process.cwd());
  return defineConfig({
    plugins: [
      vue(),
      eslintPlugin(),
      StylelintPlugin({ fix: true }),
      viteVConsole({
        entry: pathResolve('src/main.ts'),
        localEnabled: true,
        enabled: env.VITE_BUILD_VCONSOLE === 'true',
        config: {
          maxLogNumber: 1000,
          theme: 'dark',
        },
      }),
    ],
    server: {
      host: '127.0.0.1',
      port: 9999,
      open: true,
    },
  });
};
