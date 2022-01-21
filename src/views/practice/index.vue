<template>
    <section class="practice">
        <div ref="textWrap" class="wrap">
            <div class="text" ref="text">{{ resText }}</div>
            <div class="ellipsis" ref="ellipsis">...</div>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent, nextTick, shallowRef, ref, onMounted, onUnmounted, reactive, computed } from 'vue';

export default defineComponent({
    name: 'practice',
    components: {},
    props: {
        text: {
            type: String,
            default: '这是个测试，用于测试 - 前缀sssaa后缀 - sad省略号的, 就是那个 点点点',
            // default: '这是个测试，用于测试 - 前缀ss...ad省略号的, 就是那个 点点点',
        },
    },
    setup(props) {
        const splitIndex = props.text.length / 2;
        const resTemp = shallowRef([props.text.slice(0, splitIndex), props.text.slice(splitIndex)] as string[]);
        const ellipsis = ref(null as any);
        const textWrap = ref(null as any);
        const text = ref(null as any);
        const needEllipsis = shallowRef(false);
        let resizeCount = 0;
        
        const resText = computed(() => {
            return needEllipsis ? resTemp.value.join('...') : resTemp.value.join('');
        });

        const resize = () => {
            const ellipsisWidth = ellipsis.value.clientWidth;
            const textWrapWidth = textWrap.value.clientWidth - ellipsisWidth;
            const textWidth = text.value.clientWidth;
            const overflow = textWidth - textWrapWidth;
            const overflowRatio = overflow / textWidth;
            needEllipsis.value = needEllipsis.value || overflow > 1;
            const count = Math.ceil(resTemp.value.join('').length * overflowRatio);
            const index = Math.floor(count / 2);
            resizeCount++;
            if (resizeCount < 5 && overflow > 1) {
                // console.warn(resizeCount);
                // console.log(resTemp.value[0].slice(0, 0 - index), resTemp.value[1].slice(index));
                resTemp.value = [
                    0 - index < 0 ? resTemp.value[0].slice(0, 0 - index) : resTemp.value[0],
                    resTemp.value[1].slice(index),
                ];
                // console.log(JSON.stringify({ textWrapWidth, textWidth, overflow, count, index, res: resTemp.value }));
                nextTick(() => {
                    resize();
                });
            } else {
                resizeCount = 0;
            }
        };

        onMounted(() => {
            window.addEventListener('resize', resize);
            resize();
        });

        onUnmounted(() => {
            window.removeEventListener('resize', resize);
        });

        return {
            resText,
            ellipsis,
            text,
            textWrap,
        };
    },
})
</script>

<style scoped>
.practice {
}
.wrap {
    display: flex;
    width: 20vw;
    white-space: nowrap;
    overflow: hidden;
    background: red;
}
.text {
    background: violet;
}
.ellipsis {
    background: wheat;
}
</style>
