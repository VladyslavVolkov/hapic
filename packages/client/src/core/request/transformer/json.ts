/*
 * Copyright (c) 2023.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { HeaderName } from '../../../header';
import {
    isArrayBuffer,
    isBlob,
    isFile,
    isFormData,
    isJSONSerializable,
    isStream,
    isURLSearchParams,
} from '../../../utils';
import type { RequestTransformer } from '../type';

export function createDefaultRequestTransformer() : RequestTransformer {
    return (data, headers) => {
        if (
            isArrayBuffer(data) ||
            isFile(data) ||
            isBlob(data) ||
            isFormData(data) ||
            isStream(data)
        ) {
            return data;
        }

        if (isURLSearchParams(data)) {
            headers.set(HeaderName.CONTENT_TYPE, 'application/x-www-form-urlencoded;charset=utf-8');
            return data;
        }

        const contentType = headers.get(HeaderName.CONTENT_TYPE) || '';
        const contentTypeIsJson = contentType.indexOf('application/json') !== -1;

        if (isJSONSerializable(data) || contentTypeIsJson) {
            data = typeof data === 'string' ?
                data :
                JSON.stringify(data);

            if (!headers.has(HeaderName.CONTENT_TYPE)) {
                headers.set(HeaderName.CONTENT_TYPE, 'application/json');
            }

            if (!headers.has(HeaderName.ACCEPT)) {
                headers.set(HeaderName.ACCEPT, 'application/json');
            }
        }

        return data;
    };
}
