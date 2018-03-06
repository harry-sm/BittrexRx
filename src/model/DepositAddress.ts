import { JsonProperty, Any } from 'json2typescript';

export class DepositAddress {
	@JsonProperty('Currency', String, false)
	public Currency: string = undefined;

	@JsonProperty('Address', Any, false)
	public Address: string = undefined;
}
