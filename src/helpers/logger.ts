import { LogTypeValue } from '../enum';

export type CallbackFunction = (...arg) => any;

export class Logger {
	private static instance: Logger;

	private logType: LogTypeValue;
	private logWriter: CallbackFunction;

	private constructor(logType: LogTypeValue = 3, logWriter?: CallbackFunction) {
		this.logType = logType;
		this.logWriter = logWriter;
	}

	public static create(logType: LogTypeValue = LogTypeValue.None, logWriter?: CallbackFunction) {
		this.instance = new Logger(logType, logWriter);
	}

	public static get Stream() {
		if (!this.instance) {
			this.create(LogTypeValue.Error, console.log);
		}

		return this.instance;
	}

	public write(logType: LogTypeValue, message: string) {
		const output: string = `${LogTypeValue[logType].toString()} : ${message}`;

		if (this.logType !== LogTypeValue.None) {
			if (logType === this.logType || this.logType === LogTypeValue.Debug) {
				this.logWriter(output);
			}
		}

	}
}
