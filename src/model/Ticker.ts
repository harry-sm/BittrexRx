import { JsonProperty } from 'json2typescript';

export class Ticker {
	@JsonProperty('Bid', Number, false)
	public Bid: number = undefined;

	@JsonProperty('Ask', Number, false)
	public Ask: number = undefined;

	@JsonProperty('Last', Number, false)
	public Last: number = undefined;
}
