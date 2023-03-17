/*
 * Copyright (c) 2021.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { createClient } from './client';

export * from './client';
export * from './error';
export * from './module';
export * from './mount';
export * from './type';
export * from './key-value';
export * from './utils';

const client = createClient();
export default client;
