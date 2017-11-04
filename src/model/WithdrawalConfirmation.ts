import { JsonProperty, Any } from 'json2typescript';

export class WithdrawalConfirmation {
    @JsonProperty('uuid', String, false)
    uuid: string = undefined;
}
