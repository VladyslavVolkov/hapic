/*
 * Copyright (c) 2023.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

export function isObject(input: unknown) : input is Record<string, any> {
    return typeof input === 'object' &&
        input !== null &&
        !!input &&
        !Array.isArray(input);
}
