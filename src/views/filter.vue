<template>
    <section>
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
            <img class="img" :style="filterStyle" src="../assets/images/1.jpg" alt="滤镜 demo 图" >
        </div>
        <h2>卡片模糊</h2>
        <ul class="cards">
            <li class="card">One</li>
            <li class="card">Two</li>
            <li class="card">Three</li>
        </ul>
        <h2>融合效果</h2>
        <div class="container">
            <div class="circle circle-1"></div>
            <div class="circle circle-2"></div>
        </div>
        <h2>加载动画</h2>
        <div class="loading">
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
        </div>
        <h2>酷炫的文字</h2>
        <div class="text-container">
            <span class="text">酷炫的文字出场</span>
        </div>
    </section>
</template>

<script>
import { shallowRef, ref, computed } from 'vue';
import svg from '../assets/images/filter.svg';

export default {
    setup() {
        const filterAttrs = shallowRef([
            /* svg */
            { attr: "filter: url('../assets/images/filter.svg#svgBlur')", value: `url(${svg}#svgBlur)` },
            /* 高斯模糊, 不接受百分比数值 */
            { attr: "filter: blur(5px)", value: "blur(5px)" },
            /* 亮/明度 0~100%, 100% 无变化, 可超过 100% */
            { attr: "filter: brightness(0.4)", value: "brightness(0.4)" },
            /* 对比度 0~100%, 100% 无变化, 可超过 100%, 意味更低对比度 */
            { attr: "filter: contrast(200%)", value: "contrast(200%)" },
            /* 阴影效果, 可设置模糊度, 与 box-shadow 类似, 浏览器可能会为滤镜开启硬件加速 */
            { attr: "filter: drop-shadow(16px 16px 20px blue)", value: "drop-shadow(16px 16px 20px blue)" },
            /* 图像灰度, 0~100%, 0 无变化 */
            { attr: "filter: grayscale(50%)", value: "grayscale(50%)" },
            /* 色相旋转, 角度值, 0 无变化 */
            { attr: "filter: hue-rotate(90deg)", value: "hue-rotate(90deg)" },
            /* 图像反转 0~100%, 0 无变化 */
            { attr: "filter: invert(75%)", value: "invert(75%)" },
            /* 透明度 0~100%, 100% 无变化 */
            { attr: "filter: opacity(25%)", value: "opacity(25%)" },
            /* 图像饱和度 0~100%, 100% 无变化 */
            { attr: "filter: saturate(30%)", value: "saturate(30%)" },
            /* 转为深褐色 0~100%, 0 无变化 */
            { attr: "filter: sepia(60%)", value: "sepia(60%)" },
        ]);

        const currentAttr = ref(filterAttrs.value[0]);

        const filterStyle = computed(() => {
            return {
                filter: currentAttr.value.value,
            };
        });

        const select = (item) => {
            currentAttr.value = item;
        };

        return {
            filterAttrs,
            currentAttr,
            filterStyle,

            select,
        };
    },
}
</script>

<style>
.basic {
    display: flex;
    justify-content: center;
}
.basic ul,
.basic li {
    margin: 0;
    padding: 0;
    list-style: none;
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
/* 卡片模糊 */
.cards,
.card {
    list-style: none;
}

.cards {
    display: flex;
    justify-content: center;
}
.card {
    position: relative;
    width: 200px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 24px;
    color: #fff;
    margin: 0 8px;
}

.card:before{
    z-index: -1;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    border-radius: 20px;
    filter: blur(0px) opacity(1);
    transition: filter 200ms linear, transform 200ms linear;
    background: url('../assets/images/1.jpg') no-repeat center center;
    background-size: 200px 100px;
}

.card:nth-child(2)::before {
    background-image: url('../assets/images/2.jpg');
}

.card:nth-child(3)::before {
    background-image: url('../assets/images/3.jpg');
}

.cards:hover > .card:not(:hover):before{    
    filter: blur(5px) opacity(0.8) brightness(0.8);
}

.card:hover:before{
    filter: saturate(1.2);  
    transform: scale(1.05);
}

/* 融合效果 */
.container {
    margin: 50px auto;
    height: 140px;
    width: 600px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    filter: contrast(30);
}

.circle {
    border-radius: 50%;
    position: absolute;
    filter: blur(10px);
}

.circle-1 {
    height: 90px;
    width: 90px;
    background: #03a9f4;
    transform: translate(-50px);
}

.container:hover .circle-1 {
    animation: 2s moving linear infinite alternate-reverse;
}

.circle-2 {
    height: 60px;
    width: 60px;
    background: #0000ff;
    transform: translate(50px);
}

.container:hover .circle-2 {
    animation: 2s moving linear infinite alternate;
}

@keyframes moving {
    0%{
        transform: translate(50px)
    }
    100%{
        transform: translate(-50px)
    }
}

/* 加载动画 */
.loading {
    margin: 10px auto;
    height: 140px;
    width: 300px;
    background: #fff;
    display: flex;
    align-items: center;
    filter: contrast(30);
}

.item {
    height: 50px;
    width: 60px;
    background: #1aa7ff;
    border-radius: 50%;
    position: absolute;
    filter: blur(20px);
    transform: scale(0.1);
    transform-origin: left top;
}

.loading:hover .item {
    animation: move 4s cubic-bezier(.44,.79,.83,.96) infinite;
}

.loading:hover .item:nth-child(2) {
    animation-delay: .4s;
}

.loading:hover .item:nth-child(3) {
    animation-delay: .8s;
}

.loading:hover .item:nth-child(4) {
    animation-delay: 1.2s;
}

.loading:hover .item:nth-child(5) {
    animation-delay: 1.6s;
}

@keyframes move {
    0%{
        transform: translateX(10px) scale(0.3);
    }
    45%{
        transform: translateX(135px) scale(0.8);
    }
    85%{
        transform: translateX(270px) scale(0.1);
    }
}

/* 炫酷文字 */
.text-container {
    margin-top: 50px;
    text-align: center;
    /* background-color: #000; */
    filter: contrast(30);
}

.text {
    font-size: 100px;
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
    letter-spacing: -1em;
    /* color: #fff; */
    color: #000;
}

.text-container:hover .text {
    animation: move-letter 4s linear forwards;
}

@keyframes move-letter {
    0% {
        opacity: 0;
        letter-spacing: -1em;
        filter: blur(10px);
    }
    25% {
        opacity: 1;
    }
    50% {
        filter: blur(5px);
    }
    100% {
        letter-spacing: 20px;
        filter: blur(0px);
    }
}

</style>