import { JsonProperty, Any, JsonConverter, JsonCustomConvert, JsonConvert } from 'json2typescript';
// import { DateTime } from '../converter';
import { MarketSummary } from './MarketSummary';

@JsonConverter
class SummaryStateDeltaConverter implements JsonCustomConvert<SummaryStateDelta[]> {

	private jsc: JsonConvert = new JsonConvert();

	serialize(data: SummaryStateDelta[]): any {
		return data;
	}

	deserialize(data: any[]): SummaryStateDelta[] {
		return data.map((item) => {
			return this.jsc.deserialize(item, SummaryStateDelta);
		});
	}
}

@JsonConverter
class MarketSummaryConverter implements JsonCustomConvert<MarketSummary[]> {

	private jsc: JsonConvert = new JsonConvert();

	serialize(data: MarketSummary[]): any {
		return data;
	}

	deserialize(data: any[]): MarketSummary[] {
		return data.map((item) => {
			return this.jsc.deserialize(item, MarketSummary);
		});
	}
}

export class SummaryState {
    @JsonProperty('H', String, false)
    H: string = undefined; // Hub

    @JsonProperty('M', String, false)
    M: string = undefined; // MethodName

    @JsonProperty('A', SummaryStateDeltaConverter, false)
    A: SummaryStateDelta[] = undefined;
}

export class SummaryStateDelta {
    @JsonProperty('Nounce', Number, false)
    Nounce: string | number = undefined;

    @JsonProperty('Deltas', MarketSummaryConverter, false)
    Deltas: MarketSummary[] = undefined;
}