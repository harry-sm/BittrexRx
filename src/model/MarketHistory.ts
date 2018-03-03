import { JsonProperty, Any } from 'json2typescript';
import { DateTime } from '../converter';
import { OrderType } from '../converter/order-type';
import { OrderTypeValue } from '../enum/OrderTypeValue';
import { FillType } from '../converter/fill-type';
import { FillTypeValue } from '../enum/FillTypeValue';


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

    @JsonProperty('FillType', FillType, false)
    FillType: FillTypeValue = undefined;

    @JsonProperty('OrderType', OrderType, false)
    OrderType: OrderTypeValue = undefined;
}
