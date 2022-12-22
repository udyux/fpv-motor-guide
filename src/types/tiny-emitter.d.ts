/* eslint-disable */
type EventCallback = (...args: unknown[]) => void;

declare module 'tiny-emitter/instance' {
  interface TinyEmitter {
    on(event: string, callback: EventCallback): this;
    once(event: string, callback: EventCallback): this;
    emit(event: string, ...args: unknown[]): this;
    off(event: string, callback?: EventCallback): this;
  }

  const emitter: TinyEmitter;
  export default emitter;
}
