import { JsonProperty, Any } from 'json2typescript';
import { DateTime } from '../converter';

export class MarketHistory {
    @JsonProperty('Id', Number, false)
    Id: number = undefined;
    
    @JsonProperty('TimeStamp', DateTime, false)
    TimeStamp: Date = undefined;
    
    @JsonProperty('Quantity', Number, false)
    Quantity: number = undefined;
    
    @JsonProperty('Price', Number, false)
    Price: number = undefined;
    
    @JsonProperty('Total', Number, false)
    Total: number = undefined;
    
    @JsonProperty('FillType', String, false)
    FillType: 'FILL' | 'PARTIAL_FILL' = undefined;
    
    @JsonProperty('OrderType', String, false)
    OrderType: 'BUY' | 'SELL' = undefined;
}