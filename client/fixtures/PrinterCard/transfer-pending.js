import {printer as defaultPrinter} from './default';
export * from './default';

export const printer = Object.assign({}, defaultPrinter, {
    transferPending: true
});
