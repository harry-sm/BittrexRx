import { JsonObject, JsonProperty, Any } from 'json2typescript';
import { DateTime } from '../converter';
import { OrderType } from '../converter/order-type';
import { OrderTypeValue } from '../enum/OrderTypeValue';

export class OrderHistoryOrderItem {
    @JsonProperty('OrderUuid', String, false)
    OrderUuid: string = undefined;

    @JsonProperty('Exchange', String, false)
    Exchange: string = undefined;

    @JsonProperty('TimeStamp', DateTime, false)
    TimeStamp: Date = undefined;

    @JsonProperty('OrderType', OrderType, false)
    OrderType: OrderTypeValue = undefined;

    @JsonProperty('Limit', Number, false)
    Limit: number = undefined;

    @JsonProperty('Quantity', Number, false)
    Quantity: number = undefined;

    @JsonProperty('QuantityRemaining', Number, false)
    QuantityRemaining: number = undefined;

    @JsonProperty('Commission', Number, false)
    Commission: number = undefined;

    @JsonProperty('Price', Number, false)
    Price: number = undefined;

    @JsonProperty('PricePerUnit', Number, false)
    PricePerUnit: number = undefined;

    @JsonProperty('IsConditional', Boolean, false)
    IsConditional: boolean = undefined;

    @JsonProperty('Condition', String, false)
    Condition: string = undefined;

    @JsonProperty('ConditionTarget', Any, false)
    ConditionTarget: null = undefined;

    @JsonProperty('ImmediateOrCancel', Boolean, false)
    ImmediateOrCancel: boolean = undefined;

    @JsonProperty('Closed', DateTime, false)
    Closed: Date = undefined;
}

