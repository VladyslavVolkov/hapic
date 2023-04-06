/*
 * Copyright (c) 2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import type { Driver } from 'hapic';
import type { MountAPI } from '../mount';

export type KeyValueContext = {
    client: Driver,
    mountAPI: MountAPI
};
