import { RouteRecordRaw, RouterView } from 'vue-router';
import getRoutesName from '../utils/get-routes-name';

const workTestRoutes = [
    {
        name: 'WorkTest',
        path: '/work-test',
        redirect: { name: 'Layout' },
        component: RouterView,
        children: [
            {
                name: 'Layout',
                path: 'layout',
                component: () => import('../views/work-test/layout.vue'),
            },
        ],
    },
] as RouteRecordRaw[];

export const workTestRoutesName = getRoutesName(workTestRoutes);

export default workTestRoutes;
