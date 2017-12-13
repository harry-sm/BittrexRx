import {JsonObject, JsonProperty, Any} from 'json2typescript';

export class ApiResponseError {
    messgae: string = null;
    name: string = null;
    type: string = null;
    statusText: string = null;
    status: number = null;
}
export class ApiResponse {
    success: Boolean = false;
    message: string = '';
    result: any = null;
    error: ApiResponseError = {} as ApiResponseError;
}
