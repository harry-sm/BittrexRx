import { JsonProperty, Any } from 'json2typescript';

export class OrderResult {
    @JsonProperty('uuid', Any, false)
    uuid: string = undefined;
}
