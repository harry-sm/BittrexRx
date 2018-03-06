import { JsonConverter, JsonCustomConvert } from 'json2typescript';
import { FillTypeValue } from '..';

@JsonConverter
export class FillType implements JsonCustomConvert<FillTypeValue> {
	public serialize(type: FillTypeValue): string {
		return FillTypeValue[type].toString();
	}

	public deserialize(type: string): FillTypeValue {
		return FillTypeValue[type];
	}
}
