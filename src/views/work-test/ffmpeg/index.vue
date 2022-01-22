<template>
    <section class="ffmpeg">
        <div ref="img" class="img">
            <img crossorigin src="./test.jpeg" />
        </div>
        <img v-if="imgUrl" :src="imgUrl" alt="">
        <button @click="save">save</button>
    </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, shallowRef } from 'vue';
import { toJpeg, toPng } from 'html-to-image';

export default defineComponent({
    name: 'ffmpeg',
    components: {},
    setup() {
        const img = ref(null as any);
        const imgUrl = shallowRef('');

        const save = () => {
            toPng(img.value, { pixelRatio: 1 }).then(dataUrl => {
                // const link = document.createElement('a');
                // link.download = 'my-image-name.png';
                // link.href = dataUrl;
                // link.click();
                imgUrl.value = dataUrl;
            });
        };

        return {
            img,
            imgUrl,

            save,
        };
    },
})
</script>

<style scoped>
.ffmpeg {
}

.img {
    width: 600px;
    height: 400px;
}
</style>
