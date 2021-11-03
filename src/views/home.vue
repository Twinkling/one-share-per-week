<template>
    <section>
        <router-link
            class="link"
            v-for="name in routes"
            :key="name"
            :to="{ name }"
        >{{ name }}</router-link>
    </section>
</template>

<script setup>
const routes = ['Layout', 'Filter'];
</script>

<style scoped>
.link {
    margin: 0 1em;
    text-decoration: none;
}
</style>