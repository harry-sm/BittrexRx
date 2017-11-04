import { JsonProperty, Any } from 'json2typescript';

export class DepositAddress {
    @JsonProperty('Currency', String, false)
    Currency: string = undefined; 
    
    @JsonProperty('Address', Any, false)
    Address: string = undefined;
}