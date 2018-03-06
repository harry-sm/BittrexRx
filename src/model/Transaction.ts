import { JsonProperty } from 'json2typescript';
import { DateTime } from '../converter';

export class Transaction {
	@JsonProperty('Id', Number, false)
	public Id: number = undefined;

	@JsonProperty('Amount', Number, false)
	public Amount: number = undefined;

	@JsonProperty('Currency', String, false)
	public Currency: string = undefined;

	@JsonProperty('Confirmations', Number, false)
	public Confirmations: number = undefined;

	@JsonProperty('LastUpdated', DateTime, false)
	public LastUpdated: DateTime = undefined;

	@JsonProperty('TxId', String, false)
	public TxId: string | null = undefined;

	@JsonProperty('CryptoAddress', String, false)
	public CryptoAddress: string | null = undefined;
}
