/// <reference types="vite/client" />
declare module '*.vue' {
  import { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
declare module '@/_JsBridge' {
  // 导出模块的类型定义
  export const floatSendMsgToBiz: (data: any) => void;
  export const msAppToast: (message: string) => void;
  export const closeFloatPhoneBar: () => void;
  // 添加其他导出的类型定义...
}
interface Window {
  [key: string]: any;
}
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_API_BASE_URL: string;
  readonly VITE_BUILD_SOURCEMAP: string;
  readonly VITE_BUILD_DROP_CONSOLE: string;
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare const PHONE_BAR_SDK: any;
declare const businessMsgCallBack: any;
