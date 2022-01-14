<template>
  <div class="floatBotEchart" :id="echartInfo.domId"></div>
</template>

<script>
// import { onMounted, computed, watch } from "vue";
import { onMounted, computed } from "vue";
import { useStore } from 'vuex';
import * as echarts from "echarts";
import { geoJson } from "@/resource/cityAreaData.js";
import echartsOptions from "@/resource/echartsOption.js";

export default {
  name: "FloatBotEchart",
  props: ["echartInfo"],
  setup(props) {
      const domId = (() => props.echartInfo.domId)()
      const inter = (() => props.echartInfo.interface)()

      const store = useStore();
      const echartData =  computed(() => store.state.float.echartsDatas[inter])
      
      let option = computed( () => echartsOptions[`${domId}_option`](domId, echartData.value))

      // watch(echartData, () => { //直接监听
      //   echartInit()
      // },{deep:true});

      const echartInit = () => {
        let chartDom = document.getElementById(domId);
        echarts.registerMap(props.echartInfo.domId, geoJson);
        let myChart = echarts.init(chartDom);
        myChart.setOption(option.value);
      };
      onMounted(echartInit);

    //       const store = useStore();
    //   const float = computed(() => store.state.float);
    //   const echartData =  computed(() => float.value.echartsDatas[inter])
      
    //   const domId = (() => props.echartInfo.domId)()
    //   const inter = (() => props.echartInfo.interface)()
    //   let option = computed( () => echartsOptions[`${domId}_option`](domId, echartData.value))

    // watch(echartData, () => { //直接监听
    //   echartInit()
    // },{deep:true});

    // const echartInit = () => {
    //   let chartDom = document.getElementById(domId);
    //   echarts.registerMap(props.echartInfo.domId, geoJson);
    //   let myChart = echarts.init(chartDom);
    //   myChart.setOption(option.value);
    // };
    // console.log(echartInit)
    // onMounted(echartInit);
    return {};
  },
};
</script>

<style scoped>
.floatBotEchart {
  width: 100%;
  height: 100%;
  color: #fff;
  text-align: left;
  /* padding-right: 12%; */
}
</style>
