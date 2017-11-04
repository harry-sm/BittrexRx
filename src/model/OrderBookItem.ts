import { JsonProperty, Any, JsonConverter, JsonCustomConvert, JsonConvert } from 'json2typescript';

@JsonConverter
class OrderItemConverter implements JsonCustomConvert<OrderBookOrderItem[]> {

	private jsc: JsonConvert = new JsonConvert();

	serialize(data: OrderBookOrderItem[]): any {
		return data;
	}

	deserialize(data: any[]): OrderBookOrderItem[] {
		return data.map((item) => {
			return this.jsc.deserialize(item, OrderBookOrderItem);
		});
	}
}

export class OrderBook {
    @JsonProperty('buy', OrderItemConverter, false)
    buy?: OrderBookOrderItem[] = null;

    @JsonProperty('sell', OrderItemConverter, false)    
    sell?: OrderBookOrderItem[] = null;
}

export class OrderBookOrderItem {
    @JsonProperty('Quantity', Number, false)
    Quantity: number = undefined;
    
    @JsonProperty('Rate', Number, false)
    Rate: number = undefined;
}


