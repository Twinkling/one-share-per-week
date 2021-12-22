<template>
  <ul class="tab">
    <li
      class="tab-item"
      :class="{ selected: current === item.value }"
      v-for="item in list"
      :key="item.value"
      @click="changeTab(item)"
    >
      {{ item.name }}
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

type TTab = { name: string; value: number };

export default defineComponent({
  name: "tab",
  components: {},
  props: {
    list: {
      type: Array as PropType<TTab[]>,
      default: () => [],
    },
    current: {
      type: Number,
      default: null,
    },
  },
  setup(props, { emit }) {
    const changeTab = (tab: TTab) => {
      emit("change", tab);
    };

    return {
      changeTab,
    };
  },
});
</script>

<style scoped>
ul,
li {
  margin: 0;
  padding: 0;
  list-style: none;
}
.tab {
  display: flex;
  justify-content: center;
}
.tab-item {
  padding: 0 12px;
  cursor: pointer;
}
.selected {
  color: #2254f4;
}
</style>
