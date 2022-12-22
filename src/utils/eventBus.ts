import { TinyEmitter } from 'tiny-emitter';

export const eventBus = new TinyEmitter();

export const createLocalEventBus = () => new TinyEmitter();
