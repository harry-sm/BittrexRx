import { JsonProperty, Any } from 'json2typescript';
import { DateTime } from '../converter';
import { OrderType } from '../converter/order-type';
import { OrderTypeValue } from '../enum/OrderTypeValue';

export class OpenOrder {
	@JsonProperty('Uuid', Any, false)
	public Uuid: string | undefined = undefined;

	@JsonProperty('OrderUuid', String, false)
	public OrderUuid: string = undefined;

	@JsonProperty('Exchange', String, false)
	public Exchange: string = undefined;

	@JsonProperty('OrderType', OrderType, false)
	public OrderType: OrderTypeValue = undefined;

	@JsonProperty('Quantity', Number, false)
	public Quantity: number = undefined;

	@JsonProperty('QuantityRemaining', Number, false)
	public QuantityRemaining: number = undefined;

	@JsonProperty('Limit', Number, false)
	public Limit: number = undefined;

	@JsonProperty('CommissionPaid', Number, false)
	public CommissionPaid: number = undefined;

	@JsonProperty('Price', Number, false)
	public Price: number = undefined;

	@JsonProperty('PricePerUnit', Any, false)
	public PricePerUnit: number | undefined = undefined;

	@JsonProperty('Opened', DateTime, false)
	public Opened: Date = undefined;

	@JsonProperty('Closed', Any, false)
	public Closed: undefined = undefined;

	@JsonProperty('CancelInitiated', Boolean, false)
	public CancelInitiated: boolean = undefined;

	@JsonProperty('ImmediateOrCancel', Boolean, false)
	public ImmediateOrCancel: boolean = undefined;

	@JsonProperty('IsConditional', Boolean, false)
	public IsConditional: boolean = undefined;

	@JsonProperty('Condition', String, false)
	public Condition: string = undefined;

	@JsonProperty('ConditionTarget', Any, false)
	public ConditionTarget: undefined = undefined;
}
