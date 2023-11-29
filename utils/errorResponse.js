class ErrorResponse extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCose = statusCode;
    }
}

export default ErrorResponse;