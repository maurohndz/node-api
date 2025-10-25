import { errors } from '../constants/http.js';
import { logger } from '../logs/Logger.js';

export class ErrorCore extends Error {
    constructor(error, payload = null) {
        super(errors[error].message);

        this.ownPayload = errors[error];

        if (payload) {
            logger[payload.level]({
                message: this.ownPayload.message ?? errors['server'].message,
                ...payload,
            });
        }
    }
}
