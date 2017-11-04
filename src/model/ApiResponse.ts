import {JsonObject, JsonProperty, Any} from 'json2typescript';

export class ApiResponse<T> {
    @JsonProperty("success", Boolean)
    success: Boolean = undefined;

    @JsonProperty("message", String)
    message: String = undefined;

    
    @JsonProperty("result", Any)
    result: any = undefined;
    
    // classType: ClassType<T>;
    // constructor(success:boolean, message: String,  result: T)
    // {
    //     //Console.WriteLine("api {0}", result);
    //     this.success = success;
    //     this.message = message;
    //     this.result = result;
    // }
}



