import { JsonProperty, Any } from 'json2typescript';
import { DateTime } from '../converter';


export class Transaction {
    @JsonProperty('Id', Number, false)
    PaymentUuid: number = undefined;

    @JsonProperty('Amount', Number, false)
    Amount: number = undefined;

    @JsonProperty('Currency', String, false)
    Address: string = undefined;

    @JsonProperty('Confirmations', Number, false)
    Confirmations: number = undefined;

    @JsonProperty('LastUpdated', DateTime, false)
    LastUpdated: DateTime = undefined;

    @JsonProperty('TxId', String, false)
    TxId: string | null = undefined;

    @JsonProperty('CryptoAddress', String, false)
    CryptoAddress: string | null = undefined;
}