<!--
 * @Author: your name
 * @Date: 2021-06-15 20:23:19
 * @LastEditTime: 2021-11-02 17:10:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /tfgis_building_yingchuan/src/views/Index.vue
-->
<template>
  <div>
    <div class="map-container">
      <Map :url="configUrl" @onload="onMapload" />
    </div>
  </div>
</template>

<script>
import Map from '@/components/map/Map.vue'
import {
  addTilesetLayer,
  addGraphicLayer,
  addPointGraphic,
  addBloomEffect,
  addWaterLayer,
  addAreaLayer
} from 'tfgis/utils/fun'

export default {
  name: 'Index',

  components: {
    Map
  },
  data() {
    return {
      configUrl: 'config/config.json',
      map: null,
      buildingLayer: null, // 建筑物图层
      pointLayer: null, // 重点位置图层
      buildingInfo : {
        name: "银川建筑物",
        url: "config/3dtiles/building_yc/tileset.json",
        popup: [
            { field: "objectid", name: "编号" },
            { field: "height", name: "楼高", unit: "米" }
        ]
      },
      arr_data: [// 重点点位数据
        { name: "鼓楼", position : [106.281196,38.465235,30], color: "pink"},
        { name: "海宝塔", position : [106.280812,38.491814,30], color: "pink"},
        { name: "乘天寺塔", position : [106.269691,38.463445,30], color: "pink"},
        { name: "玉皇阁", position : [106.284194,38.46497,30], color: "pink"},
        { name: "南薰门", position : [106.284556,38.457706,120], color: "pink"},
        { name: "凤凰碑", position : [106.260962,38.470347,30], color: "pink"},
        { name: "南关清真寺", position : [106.28026,38.455375,30], color: "pink"},
        { name: "兴庆区政务大厅", position : [106.325197,38.484615,30], color: "green"}
      ]
    }
  },
  methods: {
    // 地图构造完成回调
    onMapload(map) {
      var vm = this
      this.map = map
      this.buildingLayer = addTilesetLayer(this.map, this.buildingInfo); // 加载建筑物图层
      addBloomEffect(this.map);// 添加泛光特效
      this.pointLayer = addGraphicLayer(this.map);// 加载重点位置图层
      addPointGraphic(this.pointLayer, this.arr_data);// 记加载重点位置
      addWaterLayer(this.map, 'config/shuiti.json');// 加载水体
      // addAreaLayer(this.map, 'config/kongdi.json');// 加载空地
    },
  },
    
}
</script>

<style lang="scss">
.map-container {
  display: inline-block;
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

</style>
