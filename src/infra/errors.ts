
import HTTPStatus from 'http-status-codes';

export class ResourceAlreadyExists extends Error {
    public httpStatusCode: number;

    constructor(message = "", ...args: []) {
        super(message, ...args);
        this.message = message;
        this.httpStatusCode = HTTPStatus.NOT_ACCEPTABLE;
    }
}

export class InvalidRequestBody extends Error {
    public httpStatusCode: number;

    constructor(message = "", ...args: []) {
        super(message, ...args);
        this.message = message;
        this.httpStatusCode = HTTPStatus.BAD_REQUEST;
    }
}

export class ResourceNotFound extends Error {
    public httpStatusCode: number;

    constructor(message = "", ...args: []) {
        super(message, ...args);
        this.message = message;
        this.httpStatusCode = HTTPStatus.NOT_FOUND;
    }
}
