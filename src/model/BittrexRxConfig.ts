import { LogTypeValue } from '../enum/LogTypeValue';

export class BittrexRxConfig {
    baseUrl?: string;
    logType?: LogTypeValue;
    logWriter?: Function
}
