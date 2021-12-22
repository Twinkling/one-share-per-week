<template>
  <section class="cos">
    <div class="step" @click="currentStep.action">{{ currentStep.name }}</div>
    <div class="lists">
      <div class="list" :class="eleCls" v-for="item in listCount" :key="item">
        <div class="list-item" v-for="i in itemCount" :key="'0' + i"></div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, shallowRef } from "vue";

export default defineComponent({
  name: "cos",
  components: {},
  setup() {
    const listCount = shallowRef(0);
    const steps = shallowRef([
      {
        name: "画个虚线",
        value: 0,
        action: () => {
          listCount.value = 7;
          getNext();
        },
      },
      {
        name: "加个变换",
        value: 1,
        action: () => {
          getNext();
        },
      },
      {
        name: "加个动画",
        value: 2,
        action: () => {
          getNext();
        },
        // }, {
        //     name: '数量加点',
        //     value: 2,
        //     action: () => {
        //         listCount.value = 7;
        //         getNext();
        //     },
        // }, {
        //     name: '加点变换',
        //     value: 3,
        //     action: () => {
        //         getNext();
        //     }
      },
      {
        name: "继续循环",
        value: 3,
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
      if (currentStep.value.value > 2) {
        return ["transform", "animate"];
      }
      if (currentStep.value.value > 1) {
        return ["transform"];
      }
    });
    return {
      itemCount: 50,
      currentStep,
      listCount,
      eleCls,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "./math.scss";
$list-count: 7;
$item-count: 50;

.cos {
  .step {
    margin-top: 12px;
    cursor: pointer;
  }
  .lists {
    $colors: red, orange, yellow, green, cyan, blue, purple;

    position: relative;
    top: 200px;
    margin: 0 auto;
    width: 34vw;
    height: 2vw;
    transform-style: preserve-3d;
    perspective: 800px;

    .list {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      transform: translateZ(var(--z));

      @for $i from 1 through $list-count {
        &:nth-child(#{$i}) {
          --bg: #{nth($colors, $i)};
          --z: #{$i * -1vw};
          --basic-delay-ratio: #{$i / $list-count};
        }
      }

      &-item {
        --w: 0.6vw;
        --gap: 0.15vw;

        width: var(--w);
        height: var(--w);
        margin: var(--gap);
        background: var(--bg);
        border-radius: 50%;
      }

      @keyframes wave {
        from {
          transform: translateY(var(--n-single-wave-length));
        }

        to {
          transform: translateY(var(--single-wave-length));
        }
      }
    }
    .transform .list {
      &-item {
        $offset: pi() * 0.5;
        --wave-length: 21vw;

        @for $i from 1 through $item-count {
          &:nth-child(#{$i}) {
            --i: #{$i};
            $ratio: ($i - 1) / ($item-count - 1);
            $angle-unit: pi() * $ratio;
            $wave: cos($angle-unit + $offset);
            --single-wave-length: calc(#{$wave} * var(--wave-length));
            --n-single-wave-length: calc(var(--single-wave-length) * -1);
          }
        }

        transform: translateY(var(--n-single-wave-length));
      }
    }
    .animate .list {
      &-item {
        --t: 2s;

        animation: wave var(--t) infinite ease-in-out alternate;
      }

      &-item {
        --n: #{$item-count + 1};
        --m: #{middle(var(--n))};
        --i-m-dist: #{dist-1d(var(--i), var(--m))};
        --ratio: calc(var(--i-m-dist) / var(--m));
        --square: calc(var(--ratio) * var(--ratio));
        --delay: calc(
          calc(var(--square) + var(--basic-delay-ratio) + 1) * var(--t)
        );
        --n-delay: calc(var(--delay) * -1);

        animation-delay: var(--n-delay);
      }
    }
  }
}
</style>
