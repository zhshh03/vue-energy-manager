/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<object, object, unknown>
  export default component
}

declare module 'mockjs' 
// {
//   interface Mockjs {
//     setup(options: { timeout?: string | number }): void
//   }
//   const mock: Mockjs
//   export default mock
// }
