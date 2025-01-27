/*
 * Copyright (c) 2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import type { Config, ConfigInput } from './type';

export function buildConfig(
    config?: ConfigInput,
) : Config {
    config = config || {};

    return {
        ...config,
        extra: config.extra || {},
        retry: config.retry ?? false,
    };
}
