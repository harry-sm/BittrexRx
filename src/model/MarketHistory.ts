import { JsonProperty } from 'json2typescript';
import { DateTime } from '../converter';
import { OrderType } from '../converter/order-type';
import { OrderTypeValue } from '../enum/OrderTypeValue';
import { FillType } from '../converter/fill-type';
import { FillTypeValue } from '../enum/FillTypeValue';

export class MarketHistory {
	@JsonProperty('Id', Number, false)
	public publicId: number = undefined;

	@JsonProperty('TimeStamp', DateTime, false)
	public publicTimeStamp: Date = undefined;

	@JsonProperty('Quantity', Number, false)
	public publicQuantity: number = undefined;

	@JsonProperty('Price', Number, false)
	public Price: number = undefined;

	@JsonProperty('Total', Number, false)
	public Total: number = undefined;

	@JsonProperty('FillType', FillType, false)
	public FillType: FillTypeValue = undefined;

	@JsonProperty('OrderType', OrderType, false)
	public OrderType: OrderTypeValue = undefined;
}
