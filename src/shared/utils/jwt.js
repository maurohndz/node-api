import jwt from 'jsonwebtoken';
import { ErrorCore } from '../core/ErrorCore.js';

export class Jwt {
    /**
     * Sign a JWT
     * @param {*} payload
     * @returns
     */
    static async sign(payload) {
        const expiresIn = process.env[`JWT_EXPIRED_TIME`];

        return await jwt.sign(payload, process.env[`JWT_SECRET`], { expiresIn })
    }

    /**
     * Verify a JWT
     * @param {*} token
     * @returns
     */
    static async verify(token) {
        try {
            return await jwt.verify(token, process.env[`JWT_SECRET`]);
        } catch (error) {
            throw new ErrorCore('auth');
        }
    }
}