import { LogTypeValue } from '../enum/LogTypeValue';

export class BittrexRxSettings {
	public baseUrl?: string;
	public logType?: LogTypeValue;
	public logWriter?: (...args) => any;
}
