<template>
    <div class="div_map_legned ground_glass"
    :class="!openBottom ? 'div_map_legned_down' : 'div_map_legned_up'">
        <div class="div_legned_row">
            <div class="legend_online"></div>
            <div>在线车辆</div>
        </div>
        <div class="div_legned_row">
            <div class="legend_outline"></div>
            <div>离线车辆</div>
        </div>
        <div class="div_legned_row">
            <div class="legend_alerm"></div>
            <div>异常车辆</div>
        </div>
    </div>
</template>

<script>
import Bus from "@/common/vehicle/common/js/Bus.js";
export default {
    data() {
        return {
            openBottom: true,
        }
    },
    mounted() {
        //接收侧边栏状态
        Bus.$on("openBottomVehicle", item => {
            this.openBottom = item
        });
        Bus.$on("openRight", item => {
            this.openBottom = !item
        });
    }
}
</script>

<style lang="scss" scoped>
@import "~@/common/vehicle/styles/index.scss";
.div_map_legned {
  border-radius: $border_radius_normal;
  font-size: 20px;
  position: absolute;
  bottom: 240px;
  left: 75px;
  padding: 16px 16px 8px 16px;
}
.div_map_legned_down {
  bottom: 20px;
  transition: bottom 0.5s;
}
.div_map_legned_up {
  bottom: 240px;
  transition: bottom 0.5s;
}
.div_legned_row {
  font-size: $font_size_small;
  margin-bottom: 8px;
  div{
      display: inline-block;
  }
  .legend_online {
      width: 12px;
      height: 12px;
      margin-right: 12px;
      border-radius: $border_radius_small;
      background: $vehicle_online;
  }
  .legend_outline {
      width: 12px;
      height: 12px;
      margin-right: 12px;
      border-radius: $border_radius_small;
      background: $vehicle_outline;
  }
  .legend_alerm {
      width: 12px;
      height: 12px;
      margin-right: 12px;
      border-radius: $border_radius_small;
      background: $vehicle_alerm;
  }
}
</style>