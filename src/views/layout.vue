<template>
    <section class="layout">
        <Button @click="changeGap(0)">0</Button>
        <Button @click="changeGap(4)">4</Button>
        <Button @click="changeGap(12)">12</Button>
        <Relayout :gap="gap" />
    </section>
</template>

<script setup>
import { ref } from 'vue';
import Relayout from '../components/relayout.vue';

const gap = ref(12);

const changeGap = (newGap) => {
  gap.value = newGap;
}
</script>

<style scoped>
.app {
}
</style>