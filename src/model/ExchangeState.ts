import { JsonProperty, JsonConverter, JsonCustomConvert, JsonConvert } from 'json2typescript';
import { DateTime } from '../converter';

@JsonConverter
class OrderBookConverter implements JsonCustomConvert<OrderBookStream[]> {

	private jsc: JsonConvert = new JsonConvert();

	public serialize(data: OrderBookStream[]): any {
		return data;
	}

	public deserialize(data: any): OrderBookStream[] {
		return data.map((item: any) => {
			return this.jsc.deserialize(item, OrderBookStream);
		});
	}
}

@JsonConverter
class OrderBookOrderConverter implements JsonCustomConvert<OrderBookOrderStream[]> {

	private jsc: JsonConvert = new JsonConvert();

	public serialize(data: OrderBookOrderStream[]): any {
		return data;
	}

	public deserialize(data: any): OrderBookOrderStream[] {
		return data.map((item: any) => {
			return this.jsc.deserialize(item, OrderBookOrderStream);
		});
	}
}

@JsonConverter
class OrderBookOrderFillsConverter implements JsonCustomConvert<OrderBookOrderFillsStream[]> {

	private jsc: JsonConvert = new JsonConvert();

	public serialize(data: OrderBookOrderFillsStream[]): any {
		return data;
	}

	public deserialize(data: any): OrderBookOrderFillsStream[] {
		return data.map((item: any) => {
			return this.jsc.deserialize(item, OrderBookOrderFillsStream);
		});
	}
}

export class ExchangeState {
	@JsonProperty('H', String, false)
	public H: string = undefined; // Hub

	@JsonProperty('M', String, false)
	public M: string = undefined; // MethodName

	@JsonProperty('A', OrderBookConverter, false)
	public A: OrderBookStream[] = undefined;
}

export class OrderBookStream {
	@JsonProperty('MarketName', String, false)
	public MarketName: string = undefined;

	@JsonProperty('Nounce', Number, false)
	public Nounce: number = undefined;

	@JsonProperty('Buys', OrderBookOrderConverter, false)
	public Buys: OrderBookOrderStream[] = undefined;

	@JsonProperty('Sells', OrderBookOrderConverter, false)
	public Sells: OrderBookOrderStream[] = undefined;

	@JsonProperty('Fills', OrderBookOrderFillsConverter, false)
	public Fills: OrderBookOrderFillsStream[] = undefined;
}

export class OrderBookOrderStream {
	@JsonProperty('Type', Number, false)
	public Type: number = undefined;

	@JsonProperty('Quantity', Number, false)
	public Quantity: number = undefined;

	@JsonProperty('Rate', Number, false)
	public Rate: number = undefined;
}
export class OrderBookOrderFillsStream {

	@JsonProperty('OrderType', String, false)
	public OrderType: string = undefined;

	@JsonProperty('Quantity', Number, false)
	public Quantity: number = undefined;

	@JsonProperty('Rate', Number, false)
	public Rate: number = undefined;

	@JsonProperty('TimeStamp', DateTime, false)
	public TimeStamp: Date = undefined;
}
