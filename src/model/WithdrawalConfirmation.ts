import { JsonProperty } from 'json2typescript';

export class WithdrawalConfirmation {
	@JsonProperty('uuid', String, false)
	public uuid: string = undefined;
}
