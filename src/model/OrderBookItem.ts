import { JsonProperty, JsonConverter, JsonCustomConvert, JsonConvert } from 'json2typescript';

@JsonConverter
class OrderItemConverter implements JsonCustomConvert<OrderBookOrderItem[]> {

	private jsc: JsonConvert = new JsonConvert();

	public serialize(data: OrderBookOrderItem[]): any {
		return data;
	}

	public deserialize(data: any[]): OrderBookOrderItem[] {
		return data.map((item: any) => {
			return this.jsc.deserialize(item, OrderBookOrderItem);
		});
	}
}

export class OrderBook {
	@JsonProperty('buy', OrderItemConverter, false)
	public buy?: OrderBookOrderItem[] = undefined;

	@JsonProperty('sell', OrderItemConverter, false)
	public sell?: OrderBookOrderItem[] = undefined;
}

export class OrderBookOrderItem {
	@JsonProperty('Quantity', Number, false)
	public Quantity: number = undefined;

	@JsonProperty('Rate', Number, false)
	public Rate: number = undefined;
}
