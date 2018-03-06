import { JsonProperty } from 'json2typescript';
import { DateTime } from '../converter';

export class MarketSummary {
	@JsonProperty('MarketName', String, false)
	public MarketName: string = undefined;

	@JsonProperty('High', Number, false)
	public High: number = undefined;

	@JsonProperty('Low', Number, false)
	public Low: number = undefined;

	@JsonProperty('Volume', Number, false)
	public Volume: number = undefined;

	@JsonProperty('Last', Number, false)
	public Last: number = undefined;

	@JsonProperty('BaseVolume', Number, false)
	public BaseVolume: number = undefined;

	@JsonProperty('Created', DateTime, false)
	public TimeStamp: Date = undefined;

	@JsonProperty('Bid', Number, false)
	public Bid: number = undefined;

	@JsonProperty('Ask', Number, false)
	public Ask: number = undefined;

	@JsonProperty('OpenBuyOrders', Number, false)
	public OpenBuyOrders: number = undefined;

	@JsonProperty('OpenSellOrders', Number, false)
	public OpenSellOrders: number = undefined;

	@JsonProperty('PrevDay', Number, false)
	public PrevDay: number = undefined;

	@JsonProperty('Created', DateTime, false)
	public Created: Date = undefined;

	// @JsonProperty('DisplayMarketName', Any, true)
	// DisplayMarketName: string | null = undefined;
}
