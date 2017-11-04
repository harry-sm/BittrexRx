import { JsonProperty, Any } from 'json2typescript';

export class Balance {
    @JsonProperty('Currency', String, false)
    Currency: string = undefined;
    
    @JsonProperty('Balance', Number, false)
    Balance: number = undefined;
    
    @JsonProperty('Available', Number, false)
    Available: number = undefined;
    
    @JsonProperty('Pending', Number, false)
    Pending: number = undefined;
    
    @JsonProperty('CryptoAddress', Any, false)
    CryptoAddress: string | null = undefined;
    // Requested?: boolean;
    // Uuid: string | null;
}