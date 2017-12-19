import {JsonConverter, JsonCustomConvert} from 'json2typescript';

@JsonConverter
export class DateTime implements JsonCustomConvert<Date> {
    serialize(date: Date): any {
        return date.toTimeString();
    }

    deserialize(date: string): Date {
        return new Date(date + 'Z');
    }
}
