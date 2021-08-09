export class Middleware_Error extends Error {
    constructor(m: string) {
        super(m);
        Object.setPrototypeOf(this, Middleware_Error.prototype);
    }
}