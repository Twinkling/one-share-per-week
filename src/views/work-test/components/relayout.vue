<template>
  <section class="relayout">
    <div
      class="item"
      v-for="(item, idx) in list"
      :key="idx"
      :style="getStyle(item)"
    />
  </section>
</template>

<script lang="ts">
import { ref, toRefs, watch, computed, reactive, defineComponent } from "vue";
import reLayoutGridByGapBorder from "../utils/re-layout-grid-by-gap-border";
import reLayout from "../utils/re-layout";
import { data } from "../data";

export default defineComponent({
  props: {
    gap: Number,
  },
  setup(props) {
    const layout = reactive(data.layouts[0]);
    // const list = computed(() => {
    //   const {
    //     screenSize: [layW, layH],
    //     elements,
    //   } = layout;
    //   return elements.map((ele: any) => {
    //     const { width, height, x, y } = ele;
    //     ele.$id = Math.random();
    //     ele.$pos = {
    //       $width: Math.round((width * layW) / 100),
    //       $height: Math.round((height * layH) / 100),
    //       $top: Math.round((y * layH) / 100),
    //       $left: Math.round((x * layW) / 100),
    //     };
    //     return ele;
    //   });
    // });

    const model: Record<string, number>[] = [
      {
        top: 0,
        left: 0,
        width: 150,
        height: 94,
      },
      {
        top: 106,
        left: 0,
        width: 42,
        height: 44,
      },
      {
        top: 106,
        left: 54,
        width: 42,
        height: 44,
      },
      {
        top: 106,
        left: 108,
        width: 42,
        height: 44,
      },
    ];

    const list = ref(model);

    const { gap } = toRefs(props);
    watch(gap, (newValue, oldValue) => {
      // const { screenSize: [layW, layH] } = layout;
      // const grid = list.value.map((l: any) => {
      //   const { x, y, width, height } = l;
      //   l.$$pos = {
      //     $$width: Math.round((width * layW) / 100),
      //     $$height: Math.round((height * layH) / 100),
      //     $$top: Math.round((y * layH) / 100),
      //     $$left: Math.round((x * layW) / 100),
      //   };
      //   return l;
      // });
      const newList = reLayoutGridByGapBorder(list.value, newValue!, 0);
      // const newList = reLayout(grid, newValue - oldValue, {top: 0, right: 1920, bottom: 1080, left: 0});
      list.value = newList;
    });

    // const getStyle = ({ $pos: { $width, $height, $top, $left } }) => {
    //   return {
    //     top: `${$top}px`,
    //     left: `${$left}px`,
    //     width: `${$width}px`,
    //     height: `${$height}px`,
    //   };
    // };
    const getStyle = ({ top, left, width, height }: any) => {
      return {
        top: `${top}px`,
        left: `${left}px`,
        width: `${width}px`,
        height: `${height}px`,
      };
    };
    return {
      list,

      getStyle,
    };
  },
});
</script>

<style scoped>
.relayout {
  position: relative;
  background-color: pink;
  width: 150px;
  height: 150px;
  /* width: 1920px;
  height: 1080px; */
}
.item {
  position: absolute;
}
.item::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 1px dashed #000;
  border-radius: 4px;
  box-sizing: border-box;
}
</style>
