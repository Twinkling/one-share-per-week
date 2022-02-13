<template>
  <section class="javascript-csv">
    <input type="file" accept=".csv" @change="readerCSV" />
    <v-chart class="chart" :option="option" />
    <table>
      <thead>
        <tr>
          <td v-for="(item, i) in CSVDataHead" :key="i">{{ item }}</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in CSVDataBody" :key="i">
          <td v-for="(key, j) in item" :key="j">{{ key }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import VChart, { THEME_KEY } from "vue-echarts";
import { useECharts } from "./useEChart";

export default defineComponent({
  name: "javascript-csv",
  components: {
    VChart,
  },
  provide: {
    [THEME_KEY]: "light",
  },
  setup() {
    const keyMap = [4, 6, 0, 2, 7, 1, 8, 9, 3, 5];
    const CSVData = ref([] as any[]);

    const CSVDataHead = computed(() => CSVData.value[0]);
    const CSVDataBody = computed(() => CSVData.value.slice(1));

    const numberMap = (str: string) => {
      const resMap = [];
      for (let i of str) {
        const num = keyMap[+i];
        resMap.push(num > -1 ? num : i === "万" ? "0000" : i);
      }
      return resMap.join("");
    };

    const processNumber = (data: any[]) => {
      const [price, sell, rp, rs] = data.slice(-4);
      const realPrice = numberMap(price);
      const realSell = numberMap(sell);
      return data
        .slice(0, -4)
        .concat([
          price,
          sell,
          +realPrice > -1 ? realPrice : rp,
          +realSell > -1 ? +realSell : rs,
        ]);
    };

    const readerCSV = (event: any) => {
      const files = event.target?.files;
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = (event.target?.result as string) || "";
        const temp = text.replace(/\r|"|¥|人购买/g, "").split("\n");
        const res = temp.map((str) => {
          if (str) {
            const [, ...data] = str.split(",");
            data.push("course-real-price", "course-real-sell");
            return processNumber(data);
          }
          return str;
        });
        //   .reduce((res, curr) => {}, []);
        // console.log(res);
        CSVData.value = res;
      };
      reader.readAsText(files[0]);
    };

    const { option } = useECharts();

    return {
      readerCSV,
      CSVDataHead,
      CSVDataBody,

      option,
    };
  },
});
</script>

<style scoped>
.javascript-csv {
}
.chart {
  height: 400px;
}
</style>
