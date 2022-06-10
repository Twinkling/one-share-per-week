import { RouteRecordRaw } from 'vue-router';

export declare interface TRoutesName {
    to: Record<string | symbol, string>;
    isRedirect: boolean;
    children: TRoutesName[];
}

function getRoutesName(routes: RouteRecordRaw[]) {
    return routes.map((route) => {
        const { name, path, redirect } = route;
        const to: Record<string | symbol, string> = {};
        name && (to.name = <string>name);
        path && (to.path = path);
        const item: TRoutesName = { to, isRedirect: !!redirect, children: [] };
        item.children = route.children?.length
            ? getRoutesName(route.children)
            : [];
        return item;
    });
}

export default getRoutesName;
