export * from './default';
import {printer as defaultPrinter} from './default';

const state = {...defaultPrinter.state, text: 'Offline'};
export const printer = {...defaultPrinter, state};
