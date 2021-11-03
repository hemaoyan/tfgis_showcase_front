<template>
  <div class="app-container">

    <div class="map-container">
      <Map :url="configUrl" @onload="onMapload" />
      <div class="div-nav-group">
        <transition name="fade-fromSmallX">
          <div class="div-nav" v-if="isFadeInit" @click="clickHomeBTN()">首页</div>
        </transition>

        <transition name="fade-fromSmallX">
          <div class="div-nav" v-if="isFadeInit" @click="clickProjectBTN()">公司项目</div>
        </transition>
        
        <transition name="fade-fromSmallX">
          <div class="div-nav" v-if="isFadeInit" @click="clickIntroduceBTN()">公司简介</div>
        </transition>
      </div>
      <div class="div-btn-container" @click="isShowBuildingLayer = !isShowBuildingLayer">
        <i class="el-icon-office-building"></i>
      </div>
    </div>
    <transition name="fade-fromRight">
    <div class="introduce-container" v-if="isShowIntroduce">
      <el-carousel :autoplay="false">
          <el-carousel-item v-for="(item, index) in list_img" :key="index">
            <el-image 
              style="width: 100%; height: 100%"
              :src="item">
              <!-- :preview-src-list="list_img" -->
            </el-image>
          </el-carousel-item>
      </el-carousel>
    </div>
    </transition>
  </div>
  
</template>

<script>
import Map from '@/components/map/Map.vue'
import * as mars3d from 'tfgis/mars3d/lib/mars3d'
import {
  createDivLayer,
  setMap,
  startAnimation,
  startRotate,
  stopRotate,
  addDistrict,
  addProjectDIV,
  graphic_div_project,
  loadBuilding,
  addDynamicCircle,
  addDynamicFlyLine,
  addWall
} from '@/utils/fun'

export default {
  name: 'Index',

  components: {
    Map
  },
  created(){
    // 获取项目数据
    mars3d.Resource.fetchJson({ url: 'config_tfprojectshow/projectdata.json', }).then((data) => {
      console.log(data, 'projectdata')
      this.list_data = data.list_data
      this.main_camera = data.main_camera
      this.introduce_camera = data.introduce_camera
    })
    // 获取边界数据
    mars3d.Resource.fetchJson({ url: 'config_tfprojectshow/provincal.geojson', }).then((item) => {
      console.log(item, 'provincal')
      this.list_provincial = item.features
    })
    this.buildingLayer = loadBuilding()
  },
  mounted() {
    this.isFadeInit = true
  },
  data() {
    return {
      isFadeInit: false,
      list_data: [],
      main_camera: {},
      introduce_camera: {},
      list_provincial: [],
      configUrl: 'config_tfprojectshow/config.json',
      map: null,
      graphicLayer: createDivLayer(),
      previousTime: null,
      buildingLayer: null,
      isShowIntroduce: false, // 是否显示详情
      isShowBuildingLayer: false, // 是否加载建筑物图层
      list_img: [
        require("@/common/demotfprojectshow/assets/tf-introduce-1.png"),
        require("@/common/demotfprojectshow/assets/tf-introduce-2.png"),
        require("@/common/demotfprojectshow/assets/tf-introduce-3.png"),
      ],
    }
  },
  watch: {
      isShowIntroduce: {
          handler(newVal,oldVal) {
              if(newVal) {
                startRotate()
              } else {
                stopRotate()
              }
          }
      },
      isShowBuildingLayer: {
          handler(newVal,oldVal) {
              console.log(newVal, '是否显示建筑物图层')
              if(newVal) {
                this.map.addLayer(this.buildingLayer)
                this.map.setCameraView({
                  lng: 117.222219,
                  lat: 39.091924,
                  alt: 50000,
                })
              } else {
                if (this.buildingLayer) {
                  this.map.removeLayer(this.buildingLayer)
                }
              }
          }
      }
  },
  methods: {
    // 点击首页
    clickHomeBTN() {
      this.isShowIntroduce = false
      this.graphicLayer.clear()
      this.map.flyHome()
      stopRotate()
      this.map.removeLayer(this.buildingLayer)
    },
    // 点击公司项目
    clickProjectBTN() {
      this.isShowIntroduce = false
      this.graphicLayer.clear()
      this.map.removeLayer(this.buildingLayer)
      stopRotate()
      startAnimation(this.main_camera)
      addDistrict(this.graphicLayer, this.list_data)
      addDynamicCircle(this.graphicLayer, this.list_data[0])
      addDynamicFlyLine(this.graphicLayer, this.list_data)
    },
    // 点击公司简介
    clickIntroduceBTN() {
      this.map.setCameraView(this.introduce_camera)

      // //按shift键+鼠标左键 拖拽 地球到合适区域，通过下面代码获取视角参数，拷贝到mapOptions的center参数中。
      // let center = this.map.getCameraView({ simplify: false })
      this.graphicLayer.clear()
      this.map.removeLayer(this.buildingLayer)
      this.isShowIntroduce = true
    },
    showProvinceBound(sourceData) {
      for (var key in this.list_provincial) {
        if(this.list_provincial[key].properties.name == sourceData.name) {
          addWall(this.graphicLayer, this.list_provincial[key])
        }
      }
    },
    // 地图构造完成回调
    onMapload(map) {
        var vm = this
        this.map = map
        map.clock.multiplier = 250 //速度
        setMap(map)
        //创建DIV数据图层
        // this.graphicLayer = new mars3d.layer.DivLayer()
        map.addLayer(this.graphicLayer)
        // map上绑定事件
        map.on(mars3d.EventType.click, function (event) {
          if(event.graphic == null || typeof(event.graphic) == "undefined"){
            if(graphic_div_project){
              vm.graphicLayer.removeGraphic(graphic_div_project)
            }
          }
        })
        //在layer上绑定监听事件
        this.graphicLayer.on(mars3d.EventType.click, function (event) {
          console.log('监听map，单击了矢量对象', event)
          if(event.graphic){
            var graphicType = event.graphic.options.graphicType
            var sourceData = event.graphic.options.sourceData
            if(graphicType == 'point') {
              if(sourceData.type == "province"){
                
              } else if(sourceData.type == "project") {
                vm.graphicLayer.removeGraphic(graphic_div_project)
                addProjectDIV(vm.graphicLayer, sourceData)
              }
            } else if(graphicType == 'div') {
              if(sourceData.type == "province"){
                map.setCameraView({
                  lng: sourceData.lng,
                  lat: sourceData.lat,
                  alt: sourceData.alt,
                })
                vm.showProvinceBound(sourceData)
              } else if(sourceData.type == "project") {
                if(sourceData.url && sourceData.url != "") {
                  window.open(sourceData.url);
                }
              }
            }
          } else {
            if(graphic_div_project){
              vm.graphicLayer.removeGraphic(graphic_div_project)
            }
          }  
        })
      },
    },
}
</script>

<style lang="scss" scope>
@import "~@/common/demotfprojectshow/styles/mars3d/css/divpoint.css";
@import "~@/common/demotfprojectshow/styles/index.scss";
.introduce-container {
  position: absolute;
  top: 1.12%;
  right: 18.2%;
  // width: 540px;
  // height: 720px;
  bottom:16.9%;
  width: 28.1%;
  background: transparent;
  overflow: show;
  background: url("~@/common/demotfprojectshow/assets/infoBox.png") no-repeat;
  background-size: 100% 100%;

}
.map-container {
  display: inline-block;
  position: relative;
  height: 100%;
  width: calc( 100% - 600px);
  overflow: hidden;
}

.map-container {
  display: inline-block;
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.map-container-introduce {
  width: calc( 100% - 600px);
}
.el-carousel__container {
    position: relative;
    height: 100%;
}
.el-carousel {
    position: absolute;
    top: 0px;
    bottom: 0px;
    right: 0px;
    left: 0px
}

</style>
