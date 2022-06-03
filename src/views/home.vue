<template>
    <section>
        <router-link
            class="link"
            v-for="item in routes"
            :key="item.to"
            :to="item.to"
        >
            {{ item.name }}
        </router-link>
    </section>
</template>

<script lang="ts" setup>
import { routesName } from '../routers';
import { TRoutesName } from '../utils/get-routes-name';

const skipRouteName = ['Home', '404'];

const flatRouteName = (routes: TRoutesName[]) => {
    const routeName: any = routes.reduce((res, route) => {
        const { to, isRedirect, children } = route;
        const childrenRoute = children.length
            ? flatRouteName(children)
            : ([] as any[]);
        if (!isRedirect && !skipRouteName.includes(to.name)) {
            res.push({ to, name: to.name || to.path });
        }
        return res.concat(childrenRoute);
    }, [] as { to: Record<string | symbol, string>; name: string }[]);
    return routeName;
};

const routes = flatRouteName(routesName);
</script>

<style scoped>
.link {
    margin: 0 1em;
    text-decoration: none;
}
</style>
