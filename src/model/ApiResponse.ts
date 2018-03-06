export class ApiResponseError {
	public messgae: string = undefined;
	public name: string = undefined;
	public type: string = undefined;
	public statusText: string = undefined;
	public status: number = undefined;
}
export class ApiResponse {
	public success: boolean = false;
	public message: string = '';
	public result: any = undefined;
	public error: ApiResponseError = {} as ApiResponseError;
}
