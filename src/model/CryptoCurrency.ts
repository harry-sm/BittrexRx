import { JsonProperty, Any } from 'json2typescript';

export class Currency {
    @JsonProperty('Currency', String, false)
    Currency: string = undefined;
    
    @JsonProperty('CurrencyLong', String, false)
    CurrencyLong: string = undefined;
    
    @JsonProperty('MinConfirmation', Number, false)
    MinConfirmation: number = undefined;
    
    @JsonProperty('TxFee', Number, false)
    TxFee: number = undefined;
    
    @JsonProperty('IsActive', Boolean, false)
    IsActive: boolean = undefined;
    
    @JsonProperty('CoinType', String, false)
    CoinType: string = undefined;
    
    @JsonProperty('BaseAddress', Any, true)
    BaseAddress: string | null = undefined;
    
    @JsonProperty('Notice', Any, true)
    Notice?: any = undefined;
}
