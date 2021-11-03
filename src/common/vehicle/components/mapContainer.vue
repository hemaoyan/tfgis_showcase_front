<template>
  <div id="container" style="height:100%"></div>
</template>

<script>
import AMapLoader from "@amap/amap-jsapi-loader";
import Bus from "@/common/vehicle/common/js/Bus.js";
import {
  createHeatMapGD,
  createTrafficGD,
  createClusterGD,
  createVehicleGD,
  deleteClusterGD,
  deleteTrafficGD,
  deleteVehicleGD,
  deleteHeatMapGD,
  drawPolygon
} from "@/common/vehicle/common/js/GaoDe";
export default {
  props: ["page"],
  data() {
    return {
      map: null,
      dataCar: [],
      dataCluster: [],
      dataHeatmap: [],
      mouseTool: null,
      drawing: false
    };
  },
  created() {
    
  },
  mounted() {
    var vm = this;
    this.$axios.get("data/map/map_car.json").then(res => {
      //赋值
      this.dataCar = res.data;
      // 热力图数据
      var arr_data = res.data[1].car_position;
      for (var key in arr_data) {
        var item = arr_data[key];
        this.dataHeatmap.push({
          lng: item.position[0],
          lat: item.position[1],
          count: key * 5000
        });
        this.dataCluster.push({
          lnglat: item.position
        });
      }
      this.createMap();
    });
    //接收侧边栏状态
    Bus.$on("clickMapTool", item => {
      if (item.status) {
        if (item.value == 1) {
          if (vm.page == "vehicle") {
            vm.createCluster();
          }
        } else if (item.value == 2) {
          vm.createTraffic();
        }
      } else {
        if (item.value == 1) {
          if (vm.page == "vehicle") {
            vm.createVehicle(vm.dataCar[1]);
            deleteClusterGD(vm.map);
          }
        } else if (item.value == 2) {
          deleteTrafficGD(vm.map);
        }
      }
    });
    //接收侧边栏状态
    Bus.$on("createVehicle", item => {
      if (item == 0) {
        vm.createVehicle(vm.dataCar[0]);
      } else {
        vm.createVehicle(vm.dataCar[1]);
      }
    });
    //接收统计分析确认
    Bus.$on("clickSubmitAnalysis", item => {
      if (item.status) {
        vm.createHeatMap();
      } else {
        // deleteHeatMapGD(vm.map);
      }
    });
    // 监听绘制事件
    Bus.$on("clickMapDrawTool", item => {
      if (vm.drawing) {
        vm.mouseTool.close(true); //关闭，并清除覆盖物
        vm.drawing = !vm.drawing;
      } else {
        if (item == 1) {
          drawPolygon(vm.mouseTool);
          vm.drawing = !vm.drawing;
        } else {
        }
      }
    });
    //监听定位事件
    Bus.$on("coordinateMap", item => {
      vm.map.setZoomAndCenter(17, [item[0], item[1]], false, 300);
      Bus.$emit("clickMarker", item);
    });

    //  map.setCenter([e.lnglat.lng, e.lnglat.lat])
    //     Bus.$emit("clickMarker", e);
  },
  methods: {
    createMap() {
      var vm = this;
      AMapLoader.load({
        key: "c9c3f73c0a051dfa9abece80a140e703", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [
          "AMap.Scale",
          "AMap.DistrictSearch",
          "AMap.HeatMap",
          "AMap.MarkerClusterer",
          "AMap.MoveAnimation",
          "AMap.MouseTool"
        ],
        Loca: {
          // 是否加载 Loca， 缺省不加载
          version: "2.0.0" // Loca 版本，缺省 1.3.2
        }
      })
        .then(AMap => {
          var zoomInit;
          var centerInit;
          if (vm.page == "vehicle") {
            zoomInit = 13
            centerInit = [117.190182, 39.125596]
          } else if (vm.page == "analysis") {
            zoomInit = 9
            centerInit = [117.372514,39.134739]
          }
          vm.map = new AMap.Map("container", {
            zoom: zoomInit,
            // pitch:50,
            showBuildingBlock: true,
            showIndoorMap: false,
            showLabel: false,
            center: centerInit,
            viewMode: "3D",
            mapStyle: "amap://styles/whitesmoke",
            features: ["bg", "road", "point"], //隐藏默认楼块
            layers: [
              AMap.createDefaultLayer() //高德默认标准图层
            ]
          });

          vm.mouseTool = new AMap.MouseTool(vm.map);
          // 监听地图缩放级别变化
          vm.map.on('zoomchange', function (e) {
            vm.$parent.nowLegend = vm.map.getZoom()
          });

          //鼠标点击marker弹出自定义的信息窗体
          // vm.mouseTool.polygon.on('dblclick', function (e) {
          //     vm.mouseTool.close(true)//关闭，并清除覆盖物
          // });
          if (vm.page == "vehicle") {
              console.log(vm.page, vm.dataCar[1], 'page')
            vm.createVehicle(vm.dataCar[1]);
          } else if (vm.page == "analysis") {
            vm.createHeatMap();
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    // 添加热力图
    createHeatMap() {
      createHeatMapGD(this.map, this.dataHeatmap);
    },
    // 添加实时交通图层
    createTraffic() {
      createTrafficGD(this.map);
    },
    // 添加聚合图层
    createCluster() {
      createClusterGD(this.map, this.dataCluster);
    },
    // 添加车辆数据
    createVehicle(data) {
      createVehicleGD(this.map, data);
    }
  }
};
</script>

<style></style>
