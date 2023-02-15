/*
 * Copyright (c) 2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import type { Client, ClientDriverInstance } from 'hapic';
import type { AuthorizeParametersInput } from './type';
import type { ClientOptions } from '../../type';
import { BaseOAuth2API } from '../base';

export class AuthorizeAPI extends BaseOAuth2API {
    // eslint-disable-next-line no-useless-constructor,@typescript-eslint/no-useless-constructor
    constructor(
        client: Client | ClientDriverInstance,
        options?: ClientOptions,
    ) {
        super(client, options);
    }

    buildURL(parameters?: Partial<AuthorizeParametersInput>) {
        parameters = parameters || {};

        let baseURL : string | undefined;
        let input : string | undefined;

        if (this.options.authorization_endpoint) {
            input = this.options.authorization_endpoint;
        } else {
            const clientURL = this.client.getUri();
            if (clientURL) {
                baseURL = clientURL;
            }
        }

        const url = new URL(input || 'authorize', baseURL);
        url.searchParams.set('response_type', parameters.response_type || 'code');

        if (this.options.client_id) {
            url.searchParams.set('client_id', this.options.client_id);
        }

        const redirectUri = parameters.redirect_uri || this.options.redirect_uri;
        if (redirectUri) {
            url.searchParams.set('redirect_uri', redirectUri);
        }

        const scope : string[] = [];
        if (this.options.scope) {
            const input = Array.isArray(this.options.scope) ?
                this.options.scope :
                this.options.scope.split(' ');

            scope.push(...input);
        }

        if (parameters.scope) {
            const input = Array.isArray(parameters.scope) ?
                parameters.scope :
                parameters.scope.split(' ');

            scope.push(...input);
        }

        if (scope.length > 0) {
            url.searchParams.set('scope', scope.join(' '));
        }

        return url.href;
    }
}
