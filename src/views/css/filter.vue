<template>
    <section class="filter" :class="{ gray: isGray }">
        <Tab :list="tabs" :current="currentTab" @change="changeTab" />
        <section v-show="currentTab === 0">
            <h2>基础用法</h2>
            <div class="basic">
                <ul class="basic-attr">
                    <li
                        class="basic-attr-item"
                        v-for="item in filterAttrs"
                        :key="item.attr"
                        :class="{ selected: item.value === currentAttr.value }"
                        @click="select(item)"
                    >
                        {{ item.attr }}
                    </li>
                </ul>
                <div class="img">
                    <img
                        style="width: 100%; height: 100%"
                        :style="filterStyle"
                        src="../../assets/images/1.jpg"
                        alt="滤镜 demo 图"
                    />
                </div>
            </div>
            <!-- <div class="blur-wrap">
                <div class="blur">毛玻璃效果</div>
            </div> -->
        </section>
        <section v-show="currentTab === 1">
            <h2>全站灰度调整</h2>
            <button @click="toggleGray">灰度切换</button>
        </section>
        <section v-show="currentTab === 2">
            <h2>卡片模糊</h2>
            <ul class="cards">
                <li class="card">One</li>
                <li class="card">Two</li>
                <li class="card">Three</li>
            </ul>
        </section>
        <section v-show="currentTab === 3">
            <h2>融合效果</h2>
            <div class="container">
                <div class="circle circle-1"></div>
                <div class="circle circle-2"></div>
            </div>
        </section>
        <section v-show="currentTab === 4">
            <h2>加载动画</h2>
            <div class="loading">
                <div class="item"></div>
                <div class="item"></div>
                <div class="item"></div>
                <div class="item"></div>
                <div class="item"></div>
            </div>
        </section>
        <section v-show="currentTab === 5">
            <h2>酷炫的文字</h2>
            <div class="text-container">
                <span class="text">酷炫的文字出场</span>
            </div>
        </section>
    </section>
</template>

<script lang="ts">
import { shallowRef, ref, computed, defineComponent } from 'vue';
import svg from '../../assets/images/filter.svg';
import Tab from '../../components/tab.vue';

interface TTab {
    name: string;
    value: number;
}
interface TFilterAttr {
    attr: string;
    value: string;
}

export default defineComponent({
    components: {
        Tab,
    },
    setup() {
        const tabs = shallowRef([
            {
                name: '基础用法',
                value: 0,
            },
            {
                name: '示例一',
                value: 1,
            },
            {
                name: '示例二',
                value: 2,
            },
            {
                name: '示例三',
                value: 3,
            },
            {
                name: '示例四',
                value: 4,
            },
            {
                name: '示例五',
                value: 5,
            },
        ] as TTab[]);
        const filterAttrs = shallowRef([
            /* svg */
            {
                attr: "filter: url('../../assets/images/filter.svg#svgBlur')",
                value: `url(${svg}#svgBlur)`,
            },
            /* 高斯模糊, 不接受百分比数值 */
            { attr: 'filter: blur(5px)', value: 'blur(5px)' },
            /* 亮/明度 0~100%, 100% 无变化, 可超过 100% */
            { attr: 'filter: brightness(0.4)', value: 'brightness(0.4)' },
            /* 对比度 0~100%, 100% 无变化, 可超过 100%, 意味更低对比度 */
            { attr: 'filter: contrast(200%)', value: 'contrast(200%)' },
            /* 阴影效果, 可设置模糊度, 与 box-shadow 类似, 浏览器可能会为滤镜开启硬件加速 */
            {
                attr: 'filter: drop-shadow(16px 16px 20px blue)',
                value: 'drop-shadow(16px 16px 20px blue)',
            },
            /* 图像灰度, 0~100%, 0 无变化 */
            { attr: 'filter: grayscale(50%)', value: 'grayscale(50%)' },
            /* 色相旋转, 角度值, 0 无变化 */
            { attr: 'filter: hue-rotate(90deg)', value: 'hue-rotate(90deg)' },
            /* 图像反转 0~100%, 0 无变化 */
            { attr: 'filter: invert(75%)', value: 'invert(75%)' },
            /* 透明度 0~100%, 100% 无变化 */
            { attr: 'filter: opacity(25%)', value: 'opacity(25%)' },
            /* 图像饱和度 0~100%, 100% 无变化 */
            { attr: 'filter: saturate(30%)', value: 'saturate(30%)' },
            /* 转为深褐色 0~100%, 0 无变化 */
            { attr: 'filter: sepia(60%)', value: 'sepia(60%)' },
        ] as TFilterAttr[]);

        const filterStyle = computed(() => {
            return {
                filter: currentAttr.value.value,
            };
        });

        const currentAttr = ref(filterAttrs.value[0]);
        const select = (item: TFilterAttr) => {
            currentAttr.value = item;
        };

        const isGray = shallowRef(false);
        const toggleGray = () => {
            isGray.value = !isGray.value;
        };

        const currentTab = shallowRef(tabs.value[0].value);
        const changeTab = (tab: any) => {
            currentTab.value = tab.value;
        };

        return {
            tabs,
            filterAttrs,
            currentAttr,
            filterStyle,
            isGray,
            currentTab,

            select,
            toggleGray,
            changeTab,
        };
    },
});
</script>

<style scoped>
@keyframes moving {
    0% {
        transform: translate(50px);
    }

    100% {
        transform: translate(-50px);
    }
}

@keyframes move {
    0% {
        transform: translateX(10px) scale(0.3);
    }

    45% {
        transform: translateX(135px) scale(0.8);
    }

    85% {
        transform: translateX(270px) scale(0.1);
    }
}

@keyframes move-letter {
    0% {
        letter-spacing: -1em;
        filter: blur(10px);
        opacity: 0;
    }

    25% {
        opacity: 1;
    }

    50% {
        filter: blur(5px);
    }

    100% {
        letter-spacing: 20px;
        filter: blur(0);
    }
}

.filter ul,
.filter li {
    padding: 0;
    margin: 0;
    list-style: none;
}

.basic {
    display: flex;
    justify-content: center;
}

.basic-attr-item {
    width: 400px;
    cursor: pointer;
}

.basic-attr-item.selected {
    color: #2254f4;
}

/* 基础用法 */
.img {
    width: 400px;
    height: 242px;
}

.blur-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 400px;
    height: 242px;
    margin: 20px auto;
    background: url('../../assets/images/3.jpg') 0 / contain fixed;
}

.blur-wrap .blur {
    position: relative;
    padding: 20px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 4px;

    /* overflow: hidden; */
}

.blur-wrap .blur::before {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    content: '';
    filter: blur(20px);

    /* background-color: rgba(255, 0, 0, .8);
    margin: -30px; */
}

/* 全站灰度 */
.gray {
    filter: grayscale(100%);
}

/* 卡片模糊 */
.cards,
.card {
    list-style: none;
}

.cards {
    display: flex;
    justify-content: center;
}

.cards .card {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 100px;
    margin: 0 8px;
    font-size: 24px;
    font-weight: bold;
    color: #fff;
}

.card::before {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    content: '';
    background: url('../../assets/images/1.jpg') no-repeat center center;
    filter: blur(0) opacity(1);
    background-size: 200px 100px;
    border-radius: 20px;
    transition: filter 200ms linear, transform 200ms linear;
}

.card:nth-child(2)::before {
    background-image: url('../../assets/images/2.jpg');
}

.card:nth-child(3)::before {
    background-image: url('../../assets/images/3.jpg');
}

.cards:hover > .card:not(:hover)::before {
    filter: blur(5px) opacity(0.8) brightness(0.8);
}

.card:hover::before {
    filter: saturate(1.2);
    transform: scale(1.05);
}

/* 融合效果 */
.container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 600px;
    height: 140px;
    margin: 50px auto;
    background: #fff;
    filter: contrast(30);
}

.circle {
    position: absolute;
    filter: blur(10px);
    border-radius: 50%;
}

.circle-1 {
    width: 90px;
    height: 90px;
    background: #03a9f4;
    transform: translate(-50px);
}

.container:hover .circle-1 {
    animation: 2s moving linear infinite alternate-reverse;
}

.circle-2 {
    width: 60px;
    height: 60px;
    background: #00f;
    transform: translate(50px);
}

.container:hover .circle-2 {
    animation: 2s moving linear infinite alternate;
}

/* 加载动画 */
.loading {
    display: flex;
    align-items: center;
    width: 300px;
    height: 140px;
    margin: 10px auto;
    background: #fff;
    filter: contrast(30);
}

.item {
    position: absolute;
    width: 60px;
    height: 50px;
    background: #1aa7ff;
    filter: blur(20px);
    border-radius: 50%;
    transform: scale(0.1);
    transform-origin: left top;
}

.loading:hover .item {
    animation: move 4s cubic-bezier(0.44, 0.79, 0.83, 0.96) infinite;
}

.loading:hover .item:nth-child(2) {
    animation-delay: 0.4s;
}

.loading:hover .item:nth-child(3) {
    animation-delay: 0.8s;
}

.loading:hover .item:nth-child(4) {
    animation-delay: 1.2s;
}

.loading:hover .item:nth-child(5) {
    animation-delay: 1.6s;
}

/* 炫酷文字 */
.text-container {
    margin-top: 50px;
    text-align: center;

    /* background-color: #000; */
    filter: contrast(30);
}

.text {
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS',
        sans-serif;
    font-size: 100px;

    /* color: #fff; */
    color: #000;
    letter-spacing: -1em;
}

.text-container:hover .text {
    animation: move-letter 4s linear forwards;
}
</style>
