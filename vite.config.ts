import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import eslintPlugin from 'vite-plugin-eslint';
import StylelintPlugin from 'vite-plugin-stylelint';
import { viteVConsole } from 'vite-plugin-vconsole';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import AutoImport from 'unplugin-auto-import/vite';

const pathResolve = (dir: string) => resolve(__dirname, dir);
// https://vitejs.dev/config/
export default ({ mode }) => {
  // eslint-disable-next-line no-undef
  const env: Partial<ImportMetaEnv> = loadEnv(mode, process.cwd());
  return defineConfig({
    define: {
      'process.env': env,
    },
    resolve: {
      alias: {
        '@': pathResolve('src'),
      },
    },
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
      Components({
        resolvers: [VantResolver()],
      }),
      AutoImport({
        imports: ['vue', 'vue-router'],
        dts: 'src/auto-import.d.ts',
        eslintrc: {
          enabled: true,
        },
      }),
    ],
    build: {
      outDir: 'dist', // 指定打包路径，默认为项目根目录下的 dist 目录
      sourcemap: env.VITE_BUILD_SOURCEMAP === 'true',
      // minify默认esbuild，esbuild模式下terserOptions将失效
      // vite3变化：Terser 现在是一个可选依赖，如果你使用的是 build.minify: 'terser'，你需要手动安装它 `npm add -D terser`
      minify: 'terser',
      terserOptions: {
        compress: {
          keep_infinity: true, // 防止 Infinity 被压缩成 1/0，这可能会导致 Chrome 上的性能问题
          drop_console: env.VITE_BUILD_DROP_CONSOLE === 'true', // 去除 console
          drop_debugger: true, // 去除 debugger
        },
      },
      chunkSizeWarningLimit: 1500, // chunk 大小警告的限制（以 kbs 为单位）
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          additionalData: `@import "${pathResolve('src/styles/index.less')}";`,
        },
      },
    },
    server: {
      host: true,
      open: true,
    },
  });
};
