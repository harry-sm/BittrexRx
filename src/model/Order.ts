import { JsonProperty, Any } from 'json2typescript';
import { DateTime } from '../converter';
import { OrderType } from '../converter/order-type';
import { OrderTypeValue } from '../enum/OrderTypeValue';

export class Order {
	@JsonProperty('AccountId', Any, false)
	public AccountId: string | null = undefined;

	@JsonProperty('OrderUuid', String, false)
	public OrderUuid: string = undefined;

	@JsonProperty('Exchange', String, false)
	public Exchange: string = undefined;

	@JsonProperty('Type', OrderType, false)
	public Type: OrderTypeValue = undefined;

	@JsonProperty('Quantity', Number, false)
	public Quantity: number = undefined;

	@JsonProperty('QuantityRemaining', Number, false)
	public QuantityRemaining: number = undefined;

	@JsonProperty('Limit', Number, false)
	public Limit: number = undefined;

	@JsonProperty('Reserved', Number, false)
	public Reserved: number = undefined;

	@JsonProperty('ReserveRemaining', Number, false)
	public ReserveRemaining: number = undefined;

	@JsonProperty('CommissionReserved', Number, false)
	public CommissionReserved: number = undefined;

	@JsonProperty('CommissionReserveRemaining', Number, false)
	public CommissionReserveRemaining: number = undefined;

	@JsonProperty('CommissionPaid', Number, false)
	public CommissionPaid: number = undefined;

	@JsonProperty('Price', Number, false)
	public Price: number = undefined;

	@JsonProperty('PricePerUnit', Any, false)
	public PricePerUnit: number | null = undefined;

	@JsonProperty('Opened', DateTime, false)
	public Opened: Date = undefined;

	@JsonProperty('Closed', DateTime, false)
	public Closed: Date = undefined;

	@JsonProperty('IsOpen', Boolean, false)
	public IsOpen: boolean = undefined;

	@JsonProperty('Sentinel', String, false)
	public Sentinel: string = undefined;

	@JsonProperty('CancelInitiated', Boolean, false)
	public CancelInitiated: boolean = undefined;

	@JsonProperty('ImmediateOrCancel', Boolean, false)
	public ImmediateOrCancel: boolean = undefined;

	@JsonProperty('IsConditional', Boolean, false)
	public IsConditional: boolean = undefined;

	@JsonProperty('Condition', String, false)
	public Condition: string | 'NONE' = undefined;

	@JsonProperty('ConditionTarget', Any, false)
	public ConditionTarget: undefined = undefined;
}
