import { errors } from '../constants/http.js';

export class ErrorCore extends Error {
    constructor(error, params = {}) {
        super(errors[error].message);

        this.ownPayload = errors[error];
        this.ownParams = params;
    }
}
