import { JsonConverter, JsonCustomConvert } from 'json2typescript';
import { OrderTypeValue } from '..';

@JsonConverter
export class OrderType implements JsonCustomConvert<OrderTypeValue> {
	public serialize(type: OrderTypeValue): string {
		return OrderTypeValue[type].toString();
	}

	public deserialize(type: string): OrderTypeValue {
		return OrderTypeValue[type];
	}
}
