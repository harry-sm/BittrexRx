import { JsonProperty, Any, JsonConverter, JsonCustomConvert, JsonConvert } from 'json2typescript';
import { DateTime } from '../converter';


@JsonConverter
class OrderBookConverter implements JsonCustomConvert<OrderBookStream[]> {

	private jsc: JsonConvert = new JsonConvert();

	serialize(data: OrderBookStream[]): any {
		return data;
	}

	deserialize(data: any): OrderBookStream[] {
		return data.map((item) => {
			return this.jsc.deserialize(item, OrderBookStream);
		});
	}
}

@JsonConverter
class OrderBookOrderConverter implements JsonCustomConvert<OrderBookOrderStream[]> {

	private jsc: JsonConvert = new JsonConvert();

	serialize(data: OrderBookOrderStream[]): any {
		return data;
	}

	deserialize(data: any): OrderBookOrderStream[] {
		return data.map((item) => {
			return this.jsc.deserialize(item, OrderBookOrderStream);
		});
	}
}

@JsonConverter
class OrderBookOrderFillsConverter implements JsonCustomConvert<OrderBookOrderFillsStream[]> {

	private jsc: JsonConvert = new JsonConvert();

	serialize(data: OrderBookOrderFillsStream[]): any {
		return data;
	}

	deserialize(data: any): OrderBookOrderFillsStream[] {
		return data.map((item) => {
			return this.jsc.deserialize(item, OrderBookOrderFillsStream);
		});
	}
}

// export interface ExchangeState {  
//     H: string;
//     M: string;
//     A: OrderBookStream[];
// }

export class ExchangeState {
    @JsonProperty('H', String, false)
    H: string = undefined; // Hub
    @JsonProperty('M', String, false)
    M: string = undefined; // MethodName
    @JsonProperty('A', OrderBookConverter, false)
    A: OrderBookStream[] = undefined;
}

export class OrderBookStream {
    @JsonProperty('MarketName', String, false)
    MarketName: string = undefined;
    
    @JsonProperty('Nounce', Number, false)
    Nounce: number = undefined;
    
    @JsonProperty('Buys', OrderBookOrderConverter, false)
    Buys: OrderBookOrderStream[] = undefined;
    
    @JsonProperty('Sells', OrderBookOrderConverter, false)
    Sells: OrderBookOrderStream[] = undefined;
    
    @JsonProperty('Fills', OrderBookOrderFillsConverter, false)
    Fills: OrderBookOrderFillsStream[] = undefined;
}

export class OrderBookOrderStream {
    @JsonProperty('Type', Number, false)
    Type: number = undefined;
    
    @JsonProperty('Quantity', Number, false)
    Quantity: number = undefined;
    
    @JsonProperty('Rate', Number, false)
    Rate: number = undefined;
}
export class OrderBookOrderFillsStream {
    
    @JsonProperty('OrderType', String, false)
    OrderType: string = undefined;
    
    @JsonProperty('Quantity', Number, false)
    Quantity: number = undefined;
    
    @JsonProperty('Rate', Number, false)
    Rate: number = undefined;
    
    @JsonProperty('TimeStamp', DateTime, false)
    TimeStamp: Date = undefined;
}