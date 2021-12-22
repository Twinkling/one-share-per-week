<template>
  <section class="reference-link">
    <div class="link-title">参考链接</div>
    <ul class="link-list">
      <li class="link-item" v-for="(link, idx) in links" :key="idx">
        <a :href="link">{{ link }}</a>
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "reference-link",
  components: {},
  props: {
    links: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  },
});
</script>

<style scoped>
.reference-link {
  text-align: left;
}

.link-title {
  font-weight: bold;
}
</style>
