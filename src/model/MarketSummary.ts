import { JsonProperty, Any } from 'json2typescript';
import { DateTime } from '../converter';

export class MarketSummary {
    @JsonProperty('MarketName', String, false)
    MarketName: string = undefined;

    @JsonProperty('High', Number, false)
    High: number = undefined;

    @JsonProperty('Low', Number, false)
    Low: number = undefined;

    @JsonProperty('Volume', Number, false)
    Volume: number = undefined;

    @JsonProperty('Last', Number, false)
    Last: number = undefined;

    @JsonProperty('BaseVolume', Number, false)
    BaseVolume: number = undefined;

    @JsonProperty('Created', DateTime, false)
    TimeStamp: Date = undefined; 

    @JsonProperty('Bid', Number, false)
    Bid: number = undefined;

    @JsonProperty('Ask', Number, false)
    Ask: number = undefined;

    @JsonProperty('OpenBuyOrders', Number, false) 
    OpenBuyOrders: number = undefined;

    @JsonProperty('OpenSellOrders', Number, false)
    OpenSellOrders: number = undefined;

    @JsonProperty('PrevDay', Number, false)
    PrevDay: number = undefined;

    @JsonProperty('Created', DateTime, false)
    Created: Date = undefined;

    // @JsonProperty('DisplayMarketName', Any, true)
    // DisplayMarketName: string | null = undefined;
}
