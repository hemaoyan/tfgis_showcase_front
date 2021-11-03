<!--
 * @Author: your name
 * @Date: 2021-11-02 14:19:22
 * @LastEditTime: 2021-11-02 16:33:27
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /tfgis_showcase_front/src/views/vehicle/vehicleAnalysis/components/panelRightTop.vue
-->
<template>
  <div class="div_right_top_bar ground_glass">
    <div class="row_title">
      <div class="title font_bold">报警总数</div>
      <div class="unit font_12">条</div>
      <div class="number font_30 font_bold">{{ arr_data.totalNum }}</div>
    </div>
    <div class="row_content">
      <transition-group name="fade-fromSmallX" tag="div">
        <div
          v-for="(item, index) in arr_data.totalDetail"
          :key="index"
          class="col_content mg_t_20 pd_l_30"
        >
          <i class="iconfont icon_content" :class="item.icon"></i>
          <div class="mg_b_10">{{ item.label }}</div>
          <div>
            <span class="font_16 font_bold mg_r_15">{{ item.num }}</span>
            <span class="font_12 mg_r_10">条</span>
            <span class="font_12 font_active">{{ item.percent }}</span>
            <span class="font_12 font_active">%</span>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import Bus from "@/common/vehicle/common/js/Bus.js";
export default {
  data() {
    return {
      alermTotal: [],
      arr_data: {}
    };
  },
  created() {
    this.$axios.get("data/analysys_right.json").then(res => {
      //赋值
      this.alermTotal = res.data.alermTotal
      this.arr_data = res.data.alermTotal[0];
    });
  },
  mounted() {
    //接收统计分析确认
    Bus.$on("clickSubmitAnalysis", item => {
        if(item.status && item.dataType === 1 && !item.isSelVehicle) {
          this.arr_data = this.alermTotal[0];
        } else if (item.status && item.dataType === 2 && !item.isSelVehicle) {
          this.arr_data = this.alermTotal[1];
        } else if (item.status && item.isSelVehicle) {
          this.arr_data = this.alermTotal[2];
        } else if (!item.status) {
          this.arr_data = this.alermTotal[0];
        }
    });
  }
};
</script>

<style lang="scss" scoped>
@import "~@/common/vehicle/styles/index.scss";
.div_right_top_bar {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 350px;
  height: 290px;
  padding: 10px 20px;
  border-radius: 12px;
  box-sizing: border-box;
  .row_content {
    position: relative;
    width: 100%;
    .col_content {
      position: relative;
      display: inline-block;
      box-sizing: border-box;
      width: 50%;
      color: $color_text_major;
      .icon_content {
        position: absolute;
        top: 0px;
        left: 0px;
        color: $color_text_minor;
        // -webkit-animation: Parallaxs 2.5S infinite;
      }
    }
  }
}
</style>
