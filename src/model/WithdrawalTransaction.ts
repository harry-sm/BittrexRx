import { JsonProperty, Any } from 'json2typescript';
import { DateTime } from '../converter';


export class WithdrawalTransaction {
    @JsonProperty('PaymentUuid', String, false)
    PaymentUuid: string = undefined;

    @JsonProperty('Currency', String, false)
    Currency: string = undefined;

    @JsonProperty('Amount', Number, false)
    Amount: number = undefined;

    @JsonProperty('Address', String, false)
    Address: string = undefined;

    @JsonProperty('Opened', DateTime, false)
    Opened: Date = undefined;

    @JsonProperty('Authorized', Boolean, false)
    Authorized: boolean = undefined;

    @JsonProperty('PendingPayment', Boolean, false)
    PendingPayment: boolean = undefined;

    @JsonProperty('TxCost', Number, false)
    TxCost: number = undefined;

    @JsonProperty('TxId', String, false)
    TxId: string | null = undefined;

    @JsonProperty('Canceled', Boolean, false)
    Canceled: boolean = undefined;

    @JsonProperty('InvalidAddress', Boolean, false)
    InvalidAddress: boolean = undefined;
}