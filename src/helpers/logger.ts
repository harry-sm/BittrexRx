import { LogTypeValue } from '../enum';

export class Logger {
    private logType: LogTypeValue;
    private logWriter: Function;
    private static instance: Logger;

    private constructor(logType: LogTypeValue = 3, logWriter?: Function) {
        this.logType = logType;
        this.logWriter = logWriter;
    }

    static create(logType: LogTypeValue = LogTypeValue.None, logWriter?: Function) {
        this.instance = new Logger(logType, logWriter);
    }

    static get Stream() {
        if (!this.instance) {
            // console.log('Creating logger with default settings');
            this.create(LogTypeValue.Error, console.log);
        }

        return this.instance;
    }

    write(logType: LogTypeValue, message: string) {
        let output: string = `${LogTypeValue[logType].toString()} : ${message}`;

        if (this.logType !== LogTypeValue.None) {
            if (logType === this.logType || this.logType === LogTypeValue.Debug){
                this.logWriter(output)
            }
        }

    }
}

