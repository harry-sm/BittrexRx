import { JsonProperty, Any } from 'json2typescript';
// import { DateTime } from '../converter';

export class Ticker {
    @JsonProperty('Bid', Number, false)
    Bid: number = undefined;
    
    @JsonProperty('Ask', Number, false)
    Ask: number = undefined;
    
    @JsonProperty('Last', Number, false)
    Last: number = undefined;
}