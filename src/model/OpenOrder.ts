import { JsonProperty, Any } from 'json2typescript';
import { DateTime } from '../converter';
import { OrderType } from '../converter/order-type';
import { OrderTypeValue } from '../enum/OrderTypeValue';

export class OpenOrder {
    @JsonProperty('Uuid', Any, false)
    Uuid: string | null = undefined;

    @JsonProperty('OrderUuid', String, false)
    OrderUuid: string = undefined;

    @JsonProperty('Exchange', String, false)
    Exchange: string = undefined;

    @JsonProperty('OrderType', OrderType, false)
    OrderType: OrderTypeValue = null;

    @JsonProperty('Quantity', Number, false)
    Quantity: number = undefined;

    @JsonProperty('QuantityRemaining', Number, false)
    QuantityRemaining: number = undefined;

    @JsonProperty('Limit', Number, false)
    Limit: number = undefined;

    @JsonProperty('CommissionPaid', Number, false)
    CommissionPaid: number = undefined;

    @JsonProperty('Price', Number, false)
    Price: number = undefined;

    @JsonProperty('PricePerUnit', Any, false)
    PricePerUnit: number | null = undefined;

    @JsonProperty('Opened', DateTime, false)
    Opened: Date = undefined;

    @JsonProperty('Closed', Any, false)
    Closed: null = undefined;

    @JsonProperty('CancelInitiated', Boolean, false)
    CancelInitiated: boolean = undefined;

    @JsonProperty('ImmediateOrCancel', Boolean, false)
    ImmediateOrCancel: boolean = undefined;

    @JsonProperty('IsConditional', Boolean, false)
    IsConditional: boolean = undefined;

    @JsonProperty('Condition', String, false)
    Condition: string = undefined;

    @JsonProperty('ConditionTarget', Any, false)
    ConditionTarget: null = undefined;
}
