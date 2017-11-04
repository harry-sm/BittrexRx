import { JsonProperty, Any } from 'json2typescript';
import { DateTime } from '../converter';

export class Candle {
    @JsonProperty('O', Number, false)
    O: number = undefined; // open

    @JsonProperty('H', Number, false)
    H: number = undefined; // high

    @JsonProperty('L', Number, false)
    L: number = undefined; // low

    @JsonProperty('C', Number, false)
    C: number = undefined; // close

    @JsonProperty('V', Number, false)
    V: number = undefined; // volume

    @JsonProperty('T', DateTime, false)
    T: Date = undefined; // time

    @JsonProperty('BV', Number, false)
    BV: number = undefined; // bitcoin value
}