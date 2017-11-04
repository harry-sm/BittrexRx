import { JsonProperty, Any } from 'json2typescript';
import { DateTime } from '../converter';

export class ConditionalOrder {
    @JsonProperty('OrderId', String, false)
    OrderId: string = undefined;
    
    @JsonProperty('MarketName', String, false)
    MarketName: string = undefined;
    
    @JsonProperty('MarketCurrency', String, false)
    MarketCurrency: string = undefined;
    
    @JsonProperty('BuyOrSell', String, false)
    BuyOrSell: string = undefined;
    
    @JsonProperty('OrderType', String, false)
    OrderType: string = undefined;
    
    @JsonProperty('Quantity', Number, false)
    Quantity: number = undefined;
    
    @JsonProperty('Rate', Number, false)
    Rate: number = undefined;
}