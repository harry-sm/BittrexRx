import { JsonProperty, Any } from 'json2typescript';
import { DateTime } from '../converter';

export class Market {
	@JsonProperty('MarketCurrency', String, false)
	public MarketCurrency: string = undefined;

	@JsonProperty('BaseCurrency', String, false)
	public BaseCurrency: string = undefined;

	@JsonProperty('MarketCurrencyLong', String, false)
	public MarketCurrencyLong: string = undefined;

	@JsonProperty('BaseCurrencyLong', String, false)
	public BaseCurrencyLong: string = undefined;

	@JsonProperty('MinTradeSize', Number, false)
	public MinTradeSize: number = undefined;

	@JsonProperty('MarketName', String, false)
	public MarketName: string = undefined;

	@JsonProperty('IsActive', Boolean, false)
	public IsActive: boolean = undefined;

	@JsonProperty('Created', DateTime, false)
	public Created: Date = undefined;

	@JsonProperty('Notice', Any, false)
	public Notice?: any = undefined;

	@JsonProperty('IsSponsored', Any, false)
	public IsSponsored?: any = undefined;

	@JsonProperty('LogoUrl', Any, false)
	public LogoUrl: string = undefined;
}
