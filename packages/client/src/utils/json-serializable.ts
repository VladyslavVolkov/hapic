/*
 * Copyright (c) 2023.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { isObject } from './type-check';

export function isJSONSerializable(input: unknown) {
    if (input === undefined) {
        return false;
    }

    const t = typeof input;
    if (t === 'string' || t === 'number' || t === 'boolean' || t === null) {
        return true;
    }

    if (t !== 'object') {
        return false; // bigint, function, symbol, undefined
    }

    if (Array.isArray(input)) {
        return true;
    }

    return (
        isObject(input) ||
        (typeof input === 'function' && (input as Record<string, any>).toJSON === 'function')
    );
}
