import HTTPStatus from "http-status-codes";

export class ResourceAlreadyExists extends Error {
    public HTTPStatusCode: number;

    constructor(message = "", ...args: []) {
        super(message, ...args);
        this.message = message;
        this.HTTPStatusCode = HTTPStatus.NOT_ACCEPTABLE;
    }
}

export class InvalidRequestBody extends Error {
    public HTTPStatusCode: number;

    constructor(message = "", ...args: []) {
        super(message, ...args);
        this.message = message;
        this.HTTPStatusCode = HTTPStatus.BAD_REQUEST;
    }
}

export class ResourceNotFound extends Error {
    public HTTPStatusCode: number;

    constructor(message = "", ...args: []) {
        super(message, ...args);
        this.message = message;
        this.HTTPStatusCode = HTTPStatus.NOT_FOUND;
    }
}
