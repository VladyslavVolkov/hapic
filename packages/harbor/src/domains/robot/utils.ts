/*
 * Copyright (c) 2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import type { RobotPermission } from './type';

/**
 * Create robot permission to access all resources.
 *
 * @param namespace (e.g. * or project name)
 */
export function buildRobotPermissionForAllResources(
    namespace: string,
) : RobotPermission {
    return {
        access: [
            { resource: 'repository', action: 'push' },
            { resource: 'repository', action: 'pull' },

            { resource: 'artifact', action: 'delete' },

            { resource: 'helm-chart', action: 'read' },

            { resource: 'helm-chart-version', action: 'create' },
            { resource: 'helm-chart-version', action: 'delete' },

            { resource: 'tag', action: 'create' },
            { resource: 'tag', action: 'delete' },

            { resource: 'artifact-label', action: 'create' },

            { resource: 'scan', action: 'create' },
            { resource: 'scan', action: 'stop' },

            { resource: 'artifact', action: 'list' },
            { resource: 'repository', action: 'list' },
        ],
        kind: 'project',
        namespace,
    };
}
