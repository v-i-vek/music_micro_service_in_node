export enum EHttpCode {

    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,

    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    PAYMENT_REQUIRED = 402,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    PROXY_AUTHENTICATION_REQUIRED = 407,
    CONFLICT = 409,
    PRECONDITION_FAILED = 412,
    REQUEST_TOO_LONG = 413,
    REQUEST_URI_TOO_LONG = 414,
    UNPROCESSABLE_ENTITY = 422,
    TOO_MANY_REQUESTS = 429,

    INTERNAL_SERVER_ERROR = 500,
    NOT_IMPLEMENTED = 501,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAILABLE = 503,
    GATEWAY_TIMEOUT = 504,
}


export class HttpException extends Error {
    statusCode: EHttpCode
    message: string
    error: string | null

    constructor(statusCode: EHttpCode, message: string, error?: string) {
        super(message)
        this.statusCode = statusCode
        this.message = message;
        this.error = error || null;
        Error.captureStackTrace(this)
    }
}