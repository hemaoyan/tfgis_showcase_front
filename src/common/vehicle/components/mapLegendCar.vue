<template>
    <div class="div_map_legned_car ground_glass"
    :class="!openBottom ? 'div_map_legned_car_down' : 'div_map_legned_car_up'">
        <div class="div_legned_row">
            <div class="legend_img"><img src="~@/common/vehicle/assets/img/car_wxpc_gray.png"></div>
            <div>危险品车</div>
        </div>
        <div class="div_legned_row">
            <div class="legend_img"><img src="~@/common/vehicle/assets/img/car_lybc_yellow.png"></div>
            <div>旅游包车</div>
        </div>
        <div class="div_legned_row">
            <div class="legend_img"><img src="~@/common/vehicle/assets/img/car_bxkc_blue.png"></div>
            <div>班线客车</div>
        </div>
        <div class="div_legned_row">
            <div class="legend_img"><img src="~@/common/vehicle/assets/img/car_xjc_white.png"></div>
            <div>其他车辆</div>
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
.div_map_legned_car {
  border-radius: $border_radius_normal;
  font-size: 20px;
  position: absolute;
  bottom: 240px;
  left: 75px;
  padding: 16px 16px 8px 16px;
}
.div_map_legned_car_down {
  bottom: 20px;
  transition: bottom 0.5s;
}
.div_map_legned_car_up {
  bottom: 240px;
  transition: bottom 0.5s;
}
.div_legned_row {
  font-size: $font_size_small;
  margin-bottom: 8px;
  div{
      display: inline-block;
  }
  .legend_img {
      width: 30px;
      height: 12px;
      margin-right: 12px;
      text-align: right;
      
  }
}
</style>