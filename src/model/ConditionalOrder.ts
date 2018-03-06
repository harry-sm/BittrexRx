import { JsonProperty } from 'json2typescript';

export class ConditionalOrder {
	@JsonProperty('OrderId', String, false)
	public OrderId: string = undefined;

	@JsonProperty('MarketName', String, false)
	public MarketName: string = undefined;

	@JsonProperty('MarketCurrency', String, false)
	public MarketCurrency: string = undefined;

	@JsonProperty('BuyOrSell', String, false)
	public BuyOrSell: string = undefined;

	@JsonProperty('OrderType', String, false)
	public OrderType: string = undefined;

	@JsonProperty('Quantity', Number, false)
	public Quantity: number = undefined;

	@JsonProperty('Rate', Number, false)
	public Rate: number = undefined;
}
