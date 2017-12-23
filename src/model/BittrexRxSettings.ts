import { LogTypeValue } from '../enum/LogTypeValue';

export class BittrexRxSettings {
    baseUrl?: string;
    logType?: LogTypeValue;
    logWriter?: Function
}
