import { ENABLE_TOKENIZATION_SECRET } from "../../util/secrets.util";
import jwt from "jsonwebtoken";

/**
 *
 * @function generateToken
 * @param {string} _key
 * @returns
 */
export function generateToken(_key: string, _expireIn: number) {
    try {
        const payload = {
            id: _key,
            name: new Date()
        };
        return jwt.sign(payload, ENABLE_TOKENIZATION_SECRET, { expiresIn: 36000 });

    } catch (_error) {
        return "error";
    }
}


