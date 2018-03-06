import { JsonProperty, Any } from 'json2typescript';
import { DateTime } from '../converter';
import { OrderType } from '../converter/order-type';
import { OrderTypeValue } from '../enum/OrderTypeValue';

export class OrderHistoryOrderItem {
	@JsonProperty('OrderUuid', String, false)
	public OrderUuid: string = undefined;

	@JsonProperty('Exchange', String, false)
	public Exchange: string = undefined;

	@JsonProperty('TimeStamp', DateTime, false)
	public TimeStamp: Date = undefined;

	@JsonProperty('OrderType', OrderType, false)
	public OrderType: OrderTypeValue = undefined;

	@JsonProperty('Limit', Number, false)
	public Limit: number = undefined;

	@JsonProperty('Quantity', Number, false)
	public Quantity: number = undefined;

	@JsonProperty('QuantityRemaining', Number, false)
	public QuantityRemaining: number = undefined;

	@JsonProperty('Commission', Number, false)
	public Commission: number = undefined;

	@JsonProperty('Price', Number, false)
	public Price: number = undefined;

	@JsonProperty('PricePerUnit', Number, false)
	public PricePerUnit: number = undefined;

	@JsonProperty('IsConditional', Boolean, false)
	public IsConditional: boolean = undefined;

	@JsonProperty('Condition', String, false)
	public Condition: string = undefined;

	@JsonProperty('ConditionTarget', Any, false)
	public ConditionTarget: undefined = undefined;

	@JsonProperty('ImmediateOrCancel', Boolean, false)
	public ImmediateOrCancel: boolean = undefined;

	@JsonProperty('Closed', DateTime, false)
	public Closed: Date = undefined;
}
