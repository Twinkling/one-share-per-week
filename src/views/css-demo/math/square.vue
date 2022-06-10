<template>
    <section class="square">
        <div class="step" @click="currentStep.action">
            {{ currentStep.name }}
        </div>
        <div class="list" :class="eleCls" v-custom-css="{ n: listCount }">
            <div
                class="list-item"
                v-custom-css="{ i: item }"
                v-for="item in listCount"
                :key="item"
            />
        </div>
    </section>
</template>

<script lang="ts">
import { computed, defineComponent, shallowRef } from 'vue';

export default defineComponent({
    name: 'square',
    components: {},
    setup() {
        const listCount = shallowRef(0);
        const steps = shallowRef([
            {
                name: '画个方块',
                value: 0,
                action: () => {
                    listCount.value = 1;
                    getNext();
                },
            },
            {
                name: '加点动画',
                value: 1,
                action: () => {
                    getNext();
                },
            },
            {
                name: '数量加点',
                value: 2,
                action: () => {
                    listCount.value = 16;
                    getNext();
                },
            },
            {
                name: '加点变换',
                value: 3,
                action: () => {
                    getNext();
                },
            },
            {
                name: '继续循环',
                value: 4,
                action: () => {
                    clear();
                    getNext();
                },
            },
        ]);

        const getNext = () => {
            const next = (currentStep.value.value + 1) % steps.value.length;
            currentStep.value = steps.value[next];
        };
        const clear = () => {
            listCount.value = 0;
        };

        const currentStep = shallowRef(steps.value[0]);
        const eleCls = computed(() => {
            if (currentStep.value.value > 3) {
                return ['grow-melt', 'middle-stagger'];
            }
            if (currentStep.value.value > 1) {
                return ['grow-melt'];
            }
            return [];
        });

        return {
            currentStep,
            eleCls,
            listCount,
        };
    },
});
</script>

<style lang="scss" scoped>
@import './math.scss';

.square {
    --color: #{$color};

    .step {
        margin-top: 12px;
        cursor: pointer;
    }

    .list {
        @keyframes grow {
            0% {
                transform: scale(0);
            }

            50%,
            100% {
                transform: scale(1);
            }
        }

        @keyframes melt {
            0%,
            50% {
                box-shadow: inset 0 0 0 var(--p) var(--bg);
            }

            100% {
                box-shadow: inset 0 0 0 0 var(--bg);
            }
        }

        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;

        &-item {
            --p: 2vw;
            --gap: 1vw;
            --bg: var(--color);
            --i: attr(data-index);

            padding: var(--p);
            margin: var(--gap);
            box-shadow: inset 0 0 0 var(--p) var(--bg);
        }

        &.grow-melt {
            .list-item {
                --t: 2s;

                animation-name: grow, melt;
                animation-duration: var(--t);
                animation-iteration-count: infinite;
            }
        }

        &.middle-stagger {
            .list-item {
                --m: #{middle(var(--n))}; // 中位数
                --i-m-dist: #{point-distance(var(--i), var(--m))}; // 计算每个id到中位数之间的距离
                --ratio: calc(var(--i-m-dist) / var(--m)); // 根据距离算出比例
                --delay: calc(var(--ratio) * var(--t)); // 根据比例算出delay
                --n-delay: calc(
                    (var(--ratio) - 2) * var(--t)
                ); // 负delay表示动画提前开始

                animation-delay: var(--n-delay);
            }
        }
    }
}
</style>
