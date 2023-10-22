export const logger =
  (tag: string) =>
  (...args: any) =>
    console.log(tag, ...args);
