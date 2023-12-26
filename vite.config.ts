import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import eslintPlugin from 'vite-plugin-eslint';
import StylelintPlugin from 'vite-plugin-stylelint';
import { viteVConsole } from 'vite-plugin-vconsole';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import AutoImport from 'unplugin-auto-import/vite';
import legacy from '@vitejs/plugin-legacy';

const pathResolve = (dir: string) => resolve(__dirname, dir);
// https://vitejs.dev/config/
export default ({ mode }) => {
  const env: Partial<ImportMetaEnv> = loadEnv(mode, process.cwd());
  return defineConfig({
    define: {
      'process.env': env,
    },
    resolve: {
      alias: {
        '@': pathResolve('src'),
        '@assets': pathResolve('src/assets'),
      },
    },
    plugins: [
      vue(),
      eslintPlugin(),
      legacy({
        targets: ['chrome < 60', 'edge < 15', 'Firefox < 59'],
      }),
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
      outDir: 'dist', // 指定输出路径
      sourcemap: env.VITE_BUILD_SOURCEMAP === 'true',
      minify: 'terser',
      terserOptions: {
        compress: {
          keep_infinity: true, // 防止 Infinity 被压缩成 1/0，这可能会导致 Chrome 上的性能问题
          drop_console: env.VITE_BUILD_DROP_CONSOLE === 'true', // 去除 console
          drop_debugger: true, // 去除 debugger
        },
      },
      cssCodeSplit: true, // 启用 CSS 代码拆分
      emptyOutDir: true, // 构建时清空该目录
      chunkSizeWarningLimit: 500, // chunk 大小警告的限制
      rollupOptions: {
        input: {
          index: pathResolve('index.html'),
        },
        output: {
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name].js',
          // 静态文件位置
          assetFileNames: (assetsInfo) => {
            // css单独拿出来
            const cssPath = ['css', 'ttf', 'woff'];
            const folder =
              cssPath.indexOf(assetsInfo.name?.split('.').pop() || '') > -1
                ? 'css'
                : 'assets';
            if (assetsInfo.name == 'index.css') {
              return `${folder}/[name].[ext]`;
            }
            return `${folder}/[name].[hash].[ext]`;
          },
          // 抽离chunk
          manualChunks: {
            vue: ['vue', 'vue-router'],
            vant: ['vant'],
            'modules-chunks': ['amfe-flexible'],
          },
        },
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          additionalData: `@use '/src/styles/variables.scss' as *;`,
        },
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      open: true,
    },
  });
};
