type ClickHander = (this: HTMLElement, event:MouseEvent) => void;

type addEndpoint_ = (endpoint: string) => void;

// temp types:
type JsOb = Record<string, any>





// declare global {
//   // interface Window { selected_URLs: string[]; }
//   // do not use const or let here, only var!
//   var selected_URLs: string[];
// }


// // window.selected_URLs = window.selected_URLs || [];


// // // other.ts
// // globalThis.selected_URLs = ['strint'] // no error
// // // but other say to do:
// // global.selected_URLs = ['strint']

// export interface global {}

// // Below is for Node v16
// declare module globalThis {
//   // do not use const or let here, only var!
//   var selected_URLs: string[];
// }