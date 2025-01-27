/*
 * Copyright (c) 2021-2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import type { ClientDriverInstance, ConfigInput } from 'hapic';
import { Client as BaseClient } from 'hapic';
import type {
    ClientOptions, OpenIDProviderMetadata,
} from './type';

import { AuthorizeAPI, TokenAPI, UserinfoAPI } from './domains';

export class Client extends BaseClient {
    public options : ClientOptions;

    // -----------------------------------------------------------------------------------

    public authorize: AuthorizeAPI;

    public token : TokenAPI;

    public userInfo : UserinfoAPI;

    // -----------------------------------------------------------------------------------

    constructor(config?: ConfigInput & { options?: ClientOptions}) {
        super(config);

        config = config || {};

        this.options = config.options || {};

        this.token = new TokenAPI(this.driver, this.options);
        this.authorize = new AuthorizeAPI(this.driver, this.options);
        this.userInfo = new UserinfoAPI(this.driver, this.options);
    }

    // -----------------------------------------------------------------------------------

    override setDriver(client: ClientDriverInstance) {
        super.setDriver(client);

        this.authorize.setClient(client);
        this.token.setClient(client);
        this.userInfo.setClient(client);
    }

    setOptions(options: ClientOptions) {
        this.options = options;

        this.authorize.setOptions(options);
        this.token.setOptions(options);
        this.userInfo.setOptions(options);
    }

    // -----------------------------------------------------------------------------------

    buildOpenIDDiscoveryURL(baseURL?: string) {
        let url = '.well-known/openid-configuration';

        if (baseURL) {
            url = new URL(url, baseURL).href;
        } else {
            url = `/${url}`;
        }

        return url;
    }

    async useOpenIDDiscovery(baseURL?: string) {
        const url = this.buildOpenIDDiscoveryURL(baseURL);

        const { data } : { data: OpenIDProviderMetadata } = await this.driver.get(url);

        if (data.authorization_endpoint) {
            this.options.authorization_endpoint = data.authorization_endpoint;
        }

        if (data.introspection_endpoint) {
            this.options.introspection_endpoint = data.introspection_endpoint;
        }

        if (data.token_endpoint) {
            this.options.token_endpoint = data.token_endpoint;
        }

        if (data.userinfo_endpoint) {
            this.options.userinfo_endpoint = data.userinfo_endpoint;
        }

        this.setOptions(this.options);
    }
}
