import { JsonProperty, Any } from 'json2typescript';
import { DateTime } from '../converter';

export class Order {
    @JsonProperty('AccountId', Any, false)
    AccountId: string | null = undefined;
    
    @JsonProperty('OrderUuid', String, false)
    OrderUuid: string | 'LIMIT_BUY' | 'LIMIT_SELL' = undefined;
    
    @JsonProperty('Exchange', String, false)
    Exchange: string = undefined;
    
    @JsonProperty('Type', String, false)
    Type: string = undefined;
    
    @JsonProperty('Quantity', Number, false)
    Quantity: number = undefined;
    
    @JsonProperty('QuantityRemaining', Number, false)
    QuantityRemaining: number = undefined;
    
    @JsonProperty('Limit', Number, false)
    Limit: number = undefined;
    
    @JsonProperty('Reserved', Number, false)
    Reserved: number = undefined;
    
    @JsonProperty('ReserveRemaining', Number, false)
    ReserveRemaining: number = undefined;
    
    @JsonProperty('CommissionReserved', Number, false)
    CommissionReserved: number = undefined;
    
    @JsonProperty('CommissionReserveRemaining', Number, false)
    CommissionReserveRemaining: number = undefined;
    
    @JsonProperty('CommissionPaid', Number, false)
    CommissionPaid: number = undefined;
    
    @JsonProperty('Price', Number, false)
    Price: number = undefined;
    
    @JsonProperty('PricePerUnit', Any, false)
    PricePerUnit: number | null = undefined;
    
    @JsonProperty('Opened', DateTime, false)
    Opened: Date = undefined;
    
    @JsonProperty('Closed', DateTime, false)
    Closed: Date = undefined;
    
    @JsonProperty('IsOpen', Boolean, false)
    IsOpen: boolean = undefined;
    
    @JsonProperty('Sentinel', String, false)
    Sentinel: string = undefined;
    
    @JsonProperty('CancelInitiated', Boolean, false)
    CancelInitiated: boolean = undefined;
    
    @JsonProperty('ImmediateOrCancel', Boolean, false)
    ImmediateOrCancel: boolean = undefined;
    
    @JsonProperty('IsConditional', Boolean, false)
    IsConditional: boolean = undefined;
    
    @JsonProperty('Condition', String, false)
    Condition: string | 'NONE' = undefined;
    
    @JsonProperty('ConditionTarget', Any, false)
    ConditionTarget: null = undefined;
}