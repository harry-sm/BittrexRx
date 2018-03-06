import { JsonProperty } from 'json2typescript';
import { DateTime } from '../converter';

export class WithdrawalTransaction {
	@JsonProperty('PaymentUuid', String, false)
	public PaymentUuid: string = undefined;

	@JsonProperty('Currency', String, false)
	public Currency: string = undefined;

	@JsonProperty('Amount', Number, false)
	public Amount: number = undefined;

	@JsonProperty('Address', String, false)
	public Address: string = undefined;

	@JsonProperty('Opened', DateTime, false)
	public Opened: Date = undefined;

	@JsonProperty('Authorized', Boolean, false)
	public Authorized: boolean = undefined;

	@JsonProperty('PendingPayment', Boolean, false)
	public PendingPayment: boolean = undefined;

	@JsonProperty('TxCost', Number, false)
	public TxCost: number = undefined;

	@JsonProperty('TxId', String, false)
	public TxId: string | null = undefined;

	@JsonProperty('Canceled', Boolean, false)
	public Canceled: boolean = undefined;

	@JsonProperty('InvalidAddress', Boolean, false)
	public InvalidAddress: boolean = undefined;
}
