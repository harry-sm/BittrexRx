import {JsonConverter, JsonCustomConvert} from 'json2typescript';

@JsonConverter
export class DateTime implements JsonCustomConvert<Date> {
	public serialize(date: Date): any {
		return date.toTimeString();
	}

	public deserialize(date: string): Date {
		return new Date(date + 'Z');
	}
}
