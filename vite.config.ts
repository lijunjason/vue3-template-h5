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
import babel from '@rollup/plugin-babel';
import simpleHtmlPlugin from 'vite-plugin-simple-html';
import { visualizer } from 'rollup-plugin-visualizer';
import vueSetupExtend from 'vite-plugin-vue-setup-extend';
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
      vueSetupExtend(),
      simpleHtmlPlugin({
        minify: true,
        inject: {
          data: {
            title: env.VITE_APP_TITLE,
          },
        },
      }),
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
      // 解决低版本chrome报错问题 开发环境如果需要debug ，则注释掉 babel 配置
      babel({
        babelHelpers: 'bundled',
        plugins: ['@babel/plugin-transform-optional-chaining'],
        include: [/\.vue$/, /\.ts$/],
        extensions: ['.vue', '.ts'],
      }),
      visualizer({
        emitFile: false,
        filename: 'visualizer.html', //分析图生成的文件名
        open: true, //如果存在本地服务端口，将在打包后自动展示
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
          // 入口文件 TODO:项目原因不加hash
          entryFileNames: 'js/[name].js',
          // chunk文件 一般指js
          chunkFileNames: 'js/[name].[hash].js',
          // 静态文件位置
          assetFileNames: (assetInfo) => {
            // TODO:项目原因不加hash
            if (assetInfo.name == 'index.css') {
              return `[ext]/[name].[ext]`;
            }
            return '[ext]/[name].[hash].[ext]';
          },
          // 抽离chunk
          manualChunks: {
            vue: ['vue', 'vue-router', 'pinia'],
            vant: ['vant'],
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
