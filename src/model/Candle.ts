import { JsonProperty } from 'json2typescript';
import { DateTime } from '../converter';

export class Candle {
	@JsonProperty('O', Number, false)
	public O: number = undefined; // open

	@JsonProperty('H', Number, false)
	public H: number = undefined; // high

	@JsonProperty('L', Number, false)
	public L: number = undefined; // low

	@JsonProperty('C', Number, false)
	public C: number = undefined; // close

	@JsonProperty('V', Number, false)
	public V: number = undefined; // volume

	@JsonProperty('T', DateTime, false)
	public T: Date = undefined; // time

	@JsonProperty('BV', Number, false)
	public BV: number = undefined; // bitcoin value
}
