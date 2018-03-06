import { JsonProperty, Any } from 'json2typescript';

export class Currency {
	@JsonProperty('Currency', String, false)
	public Currency: string = undefined;

	@JsonProperty('CurrencyLong', String, false)
	public CurrencyLong: string = undefined;

	@JsonProperty('MinConfirmation', Number, false)
	public MinConfirmation: number = undefined;

	@JsonProperty('TxFee', Number, false)
	public TxFee: number = undefined;

	@JsonProperty('IsActive', Boolean, false)
	public IsActive: boolean = undefined;

	@JsonProperty('CoinType', String, false)
	public CoinType: string = undefined;

	@JsonProperty('BaseAddress', Any, true)
	public BaseAddress: string | null = undefined;

	@JsonProperty('Notice', Any, true)
	public Notice?: any = undefined;
}
