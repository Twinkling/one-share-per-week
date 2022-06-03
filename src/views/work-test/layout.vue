<template>
    <section class="layout">
        <button @click="changeGap(0)">0</button>
        <button @click="changeGap(4)">4</button>
        <button @click="changeGap(12)">12</button>
        <Relayout :gap="gap" />
    </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Relayout from './components/relayout.vue';

const gap = ref(12);

const changeGap = (newGap: number) => {
    gap.value = newGap;
};
</script>

<style scoped></style>
