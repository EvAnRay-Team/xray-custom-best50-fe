// 自定义 PrimeReact Dialog 类型声明，用于支持文档中的 DialogContentInstance 用法
// 这里只声明我们实际用到的最小字段

declare module '@primereact/types/shared/dialog' {
  export interface DialogContentInstance {
    dialog?: {
      close: () => void;
    };
  }
}


