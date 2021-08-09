import responseCode from '../../config/code';

interface DataResponseType {
    status: boolean,
    code: number,
    message: string,
    token?: string,
    data: any
}

interface ResponseDataTypes {
        TOKEN_EXPIRED: number,
        BLACK_LISTED_TOKEN: number,
        INVALID_TOKEN: number,
        NO_TOKEN: number,
        USER_NOT_FOUND: number,
        SUCCESS: number,
        FAILURE: number,
        VALIDATION_ERROR: number,
        EXPIRED: number,
        TRYING_TO_INSERT_DUPLICATE: number,
        NOT_AUTHORIZED: number,
        EXCEPTION: number,
        NOT_FOUND: number,
        WRONG_JSON_FORMAT: number
        ACCOUNT_NOT_VERIFY: number,
        WRONG_USERNAME: number,
        WRONG_PASSWORD: number,
        WRONG_CREDENTIALS: number,
        ACCOUNT_VERIFIED: number,
        NOT_EXISTS: number,
}

class ResponseBuilder {

    status = false;
    code = 0;
    message = '';
    data = {};
    token = '';

    /**
     * Code constructor.
     * @param      code
     * @param message
     * @throws \Exception
     */

    constructor(code:number, message:string = '') {
        if (this.isNotDocCode(code))
            throw new Error('Response code not found please refer to documentation');
        this.status = code > 0;
        this.code = Math.abs(code);
        this.message = this.defaultMessage(code, message);
    }

    /**
     * @param data
     */
    setData(data:any) {
        this.data = data;
    }

    /**
     * @param token
     */
    setToken(token:string) {
        this.token = token;
    }

    /**
     * @return Object
     */
    reply() {
        let data: DataResponseType = {
            status: this.status,
            message: this.message,
            code: this.code,
            data: this.data,
        };
        if (this.token)
            data['token'] = this.token;
        return data;
    }

    /**
     * Check if send code exist in doc code
     * @param  code
     * @return boolean
     */
    isNotDocCode(code:number) {
        return ResponseBuilder.getCode().hasOwnProperty(code);
    }

    static getCode(): {string:number} {
        return {...responseCode.auth, ...responseCode.request, ...responseCode.token};
    }

    defaultMessage(code:number, message:string) {
        if (!message){
            let codes: any = ResponseBuilder.getCode()
            for (let codeKey in codes) {
                if (codes.hasOwnProperty(codeKey) && codes[codeKey] === code)
                    return codeKey.replace('_', ' ')
            }
        }

        return message;
    }
}

export default ResponseBuilder;