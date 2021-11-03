<!--
 * @Author: your name
 * @Date: 2021-11-02 11:32:02
 * @LastEditTime: 2021-11-02 15:56:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /tfgis_showcase_front/src/views/vehicleMonitor/index.vue
-->
<template>
  <div class="app_container">
    <mapContainer style="height:100%" :page="page"></mapContainer>
    <transition name="fade-fromLeft">
      <leftToolbar v-if="show" id="leftToolbar"></leftToolbar>
    </transition>
    <!-- <leftToolbar id="leftToolbar"></leftToolbar> -->

    <transition name="fade-fromUp" mode="out-in">
      <searchbar v-if="show" id="searchbar"></searchbar>
    </transition>
    <transition name="fade-fromSmall" mode="out-in">
      <mapToolbar v-if="show" id="mapToolbar"></mapToolbar>
    </transition>
    <transition name="fade-fromRight" mode="out-in">
      <rightListbar v-if="show" id="rightListbar"></rightListbar>
    </transition>
    <transition name="fade-fromDown" mode="out-in">
      <bottomMonitor v-if="show" id="panelBottom"></bottomMonitor>
    </transition>
    <transition name="fade-fromDown" mode="out-in">
      <mapLegend v-show="show && nowLegend < 14" id="mapLegend"></mapLegend>
    </transition>
    <transition name="fade-fromDown" mode="out-in">
      <mapLegendCar v-show="show && nowLegend >= 14" id="mapLegendCar"></mapLegendCar>
    </transition>
    <transition name="fade-fromDown" mode="out-in">
      <mapFunctionBar v-if="show" id="mapFunctionBar"></mapFunctionBar>
    </transition>
     <transition name="fade-fromDown" mode="out-in">
      <mapDetail v-if="show" id="mapDetail" ref="mapDetail"></mapDetail>
    </transition>
  </div>
</template>

<script>
import mapContainer from "@/common/vehicle/components/mapContainer.vue";
import leftToolbar from "./components/leftToolbar.vue";
import searchbar from "./components/searchbar.vue";
import rightListbar from "./components/rightListbar.vue";
import bottomMonitor from "./components/bottomMonitor.vue";
import mapToolbar from "@/common/vehicle/components/mapToolbar.vue";
import mapLegend from "@/common/vehicle/components/mapLegend.vue";
import mapLegendCar from "@/common/vehicle/components/mapLegendCar.vue";
import mapDetail from "@/common/vehicle/components/mapDetail.vue";
import mapFunctionBar from "@/common/vehicle/components/mapFunctionBar.vue";
import Bus from "@/common/vehicle/common/js/Bus.js";
export default {
  components: {
    leftToolbar,
    searchbar,
    mapContainer,
    mapToolbar,
    bottomMonitor,
    rightListbar,
    mapLegend,
    mapLegendCar,
    mapDetail,
    mapFunctionBar
  },
  data() {
    return {
      page: 'vehicle',
      show: false,
      nowLegend: 13
    };
  },
  mounted() {
    this.show = !this.show;
    //接收统计分析确认
        Bus.$on("clickMarker", item => {
            this.$refs.mapDetail.detailShow = true
        });

  },
  methods: {
    
  }
};
</script>

<style lang="scss" scoped>
@import "~@/common/vehicle/styles/index.scss";
</style>
