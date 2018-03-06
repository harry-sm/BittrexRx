import { JsonProperty, Any } from 'json2typescript';

export class Balance {
	@JsonProperty('Currency', String, false)
	public Currency: string = undefined;

	@JsonProperty('Balance', Number, false)
	public Balance: number = undefined;

	@JsonProperty('Available', Number, false)
	public Available: number = undefined;

	@JsonProperty('Pending', Number, false)
	public Pending: number = undefined;

	@JsonProperty('CryptoAddress', Any, false)
	public CryptoAddress: string | null = undefined;

	// Requested?: boolean;
	// Uuid: string | null;
}
