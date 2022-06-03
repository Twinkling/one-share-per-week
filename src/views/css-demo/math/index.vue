<template>
    <section class="math">
        <div class="content">
            <Tab :list="tabs" :current="currentTab" @change="changeTab" />
            <Square v-show="currentTab === 0" />
            <Cos v-show="currentTab === 1" />
        </div>
        <ReferenceLink :links="links" />
    </section>
</template>

<script lang="ts">
import { defineComponent, shallowRef } from 'vue';
import Tab from '../../../components/tab.vue';
import ReferenceLink from '../../../components/reference-link.vue';
import Square from './square.vue';
import Cos from './cos.vue';

export default defineComponent({
    name: 'math',
    components: {
        Tab,
        Square,
        Cos,
        ReferenceLink,
    },
    setup() {
        const tabs = shallowRef([
            {
                name: '线性',
                value: 0,
            },
            {
                name: '余弦',
                value: 1,
            },
        ]);
        const currentTab = shallowRef(tabs.value[0].value);
        const changeTab = (tab: any) => {
            currentTab.value = tab.value;
        };

        return {
            tabs,
            currentTab,
            links: [
                'https://en.wikipedia.org/wiki/Taylor_series',
                'https://www.unindented.org/blog/trigonometry-in-sass/',
                'http://jimyuan.github.io/blog/2015/02/12/trigonometry-in-sass.html',
                'https://github.com/chokcoco/iCSS/issues/72',
                'https://mp.weixin.qq.com/s/Cbwy72-4ah6lwUxB6FksCw',
            ],

            changeTab,
        };
    },
});
</script>

<style scoped>
.content {
    min-height: 500px;
}
</style>
