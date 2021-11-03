<!--
 * @Author: your name
 * @Date: 2021-11-02 11:32:02
 * @LastEditTime: 2021-11-02 17:26:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /tfgis_showcase_front/src/views/vehicleAnalysis/index.vue
-->
<template>
  <div class="app_container">
    <mapContainer style="height:100%" :page="page"></mapContainer>
    
    <transition name="fade-fromLeft">
      <leftToolbar v-if="show" id="leftToolbar"></leftToolbar>
    </transition>

    <transition name="fade-fromBig" mode="out-in">
      <mapToolbar v-if="show" id="mapToolbar" class="analysis_map_toolbar"></mapToolbar>
    </transition>
    
    <transition name="fade-fromSmall" mode="out-in">
      <searchbar v-if="show" id="rightTopbar"></searchbar>
    </transition>
    
    <transition name="fade-fromRight">
      <panelRightTop v-if="show" id="panelRightTop"></panelRightTop>
    </transition>

    <transition name="fade-fromRight" mode="out-in">
      <rightBottombar v-if="show" id="rightBottombar"></rightBottombar>
    </transition>

    <transition name="fade-fromDown" mode="out-in">
      <panelBottom v-if="show" id="panelBottom"></panelBottom>
    </transition>

    <!-- <transition name="fade-fromDown" mode="out-in">
      <mapLegend v-if="show" id="mapLegend"></mapLegend>
    </transition> -->
    
    <transition name="fade-fromDown" mode="out-in">
      <mapFunctionBar v-if="show" id="mapFunctionBar"></mapFunctionBar>
    </transition>
  </div>
</template>

<script>
import mapContainer from "@/common/vehicle/components/mapContainer.vue";
import mapToolbar from "@/common/vehicle/components/mapToolbar.vue";
import leftToolbar from "./components/leftToolbar.vue";
import panelRightTop from "./components/panelRightTop.vue";
import rightBottombar from "./components/panelRightBottom.vue";
import panelBottom from "./components/panelBottom.vue";
import searchbar from './components/searchbar.vue';
import mapLegend from "@/common/vehicle/components/mapLegend.vue";
import mapFunctionBar from "@/common/vehicle/components/mapFunctionBar.vue";
export default {
  components: {
    leftToolbar,
    mapContainer,
    mapToolbar,
    searchbar,
    panelRightTop,
    rightBottombar,
    panelBottom,
    mapLegend,
    mapFunctionBar
  },
  data() {
    return {
      page: 'analysis',
      show: false,
      dialogFormVisible: false,
    };
  },
  mounted() {
    // setInterval(() => {
      this.show = !this.show
    // }, 1000)
  },
  methods:{
        
  }
}
</script>

<style lang="scss" scoped>
.analysis_map_toolbar {
  right: 390px;
}
</style>