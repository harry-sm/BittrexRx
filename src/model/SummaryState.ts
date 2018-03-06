import { JsonProperty, JsonConverter, JsonCustomConvert, JsonConvert } from 'json2typescript';
import { MarketSummary } from './MarketSummary';

@JsonConverter
class SummaryStateDeltaConverter implements JsonCustomConvert<SummaryStateDelta[]> {

	private jsc: JsonConvert = new JsonConvert();

	public serialize(data: SummaryStateDelta[]): any {
		return data;
	}

	public deserialize(data: any[]): SummaryStateDelta[] {
		return data.map((item: any) => {
			return this.jsc.deserialize(item, SummaryStateDelta);
		});
	}
}

@JsonConverter
class MarketSummaryConverter implements JsonCustomConvert<MarketSummary[]> {

	private jsc: JsonConvert = new JsonConvert();

	public serialize(data: MarketSummary[]): any {
		return data;
	}

	public deserialize(data: any[]): MarketSummary[] {
		return data.map((item: any) => {
			return this.jsc.deserialize(item, MarketSummary);
		});
	}
}

export class SummaryState {
	@JsonProperty('H', String, false)
	public H: string = undefined; // Hub

	@JsonProperty('M', String, false)
	public M: string = undefined; // MethodName

	@JsonProperty('A', SummaryStateDeltaConverter, false)
	public A: SummaryStateDelta[] = undefined;
}

export class SummaryStateDelta {
	@JsonProperty('Nounce', Number, false)
	public Nounce: string | number = undefined;

	@JsonProperty('Deltas', MarketSummaryConverter, false)
	public Deltas: MarketSummary[] = undefined;
}
