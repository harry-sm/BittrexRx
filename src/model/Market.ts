import { JsonProperty, Any } from 'json2typescript';
import { DateTime } from '../converter';

export class Market {
    @JsonProperty('MarketCurrency', String, false)
    MarketCurrency: string = undefined;
    
    @JsonProperty('BaseCurrency', String, false)
    BaseCurrency: string = undefined;
    
    @JsonProperty('MarketCurrencyLong', String, false)
    MarketCurrencyLong: string = undefined;
    
    @JsonProperty('BaseCurrencyLong', String, false)
    BaseCurrencyLong: string = undefined;
    
    @JsonProperty('MinTradeSize', Number, false)
    MinTradeSize: number = undefined;
    
    @JsonProperty('MarketName', String, false)
    MarketName: string = undefined;
    
    @JsonProperty('IsActive', Boolean, false)
    IsActive: boolean = undefined;
    
    @JsonProperty('Created', DateTime, false)
    Created: Date = undefined;
    
    @JsonProperty('Notice', Any, false)
    Notice?: any = undefined;
    
    @JsonProperty('IsSponsored', Any, false)
    IsSponsored?: any = undefined;
    
    @JsonProperty('LogoUrl', Any, false)
    LogoUrl: string = undefined;
}