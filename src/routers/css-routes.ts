import { RouteRecordRaw, RouterView } from 'vue-router';
import getRoutesName from '../utils/get-routes-name';

const cssRoutes = [
    {
        name: 'CSS',
        path: '/css',
        redirect: { name: 'Filter' },
        component: RouterView,
        children: [
            {
                name: 'Filter',
                path: 'filter',
                component: () => import('../views/css/filter.vue')
            }
        ]
    },
] as RouteRecordRaw[];

export const cssRoutesName = getRoutesName(cssRoutes);

export default cssRoutes;
