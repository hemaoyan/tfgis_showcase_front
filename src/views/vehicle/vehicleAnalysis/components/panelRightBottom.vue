<template>
  <div class="div_right_bottom_bar ground_glass" :class="isSelVehicle ? 'div_right_bottom_all': ''">
    <div v-if="isSelVehicle">
      <div class="row_title">
        <div class="title font_bold">行驶分析</div>
      </div>
      <div class="row_content">
        <div
          class="col_content mg_t_20 pd_l_30"
          v-for="(item, index) in arr_trafficAnalysis"
          :key="index"
        >
          <i class="iconfont icon_content" :class="item.icon"></i>
          <div class="mg_b_10">{{ item.label }}</div>
          <div>
            <span class="font_16 font_bold div_item">{{ item.num }}</span>
            <span class="font_12 mg_r_15">{{ item.unit }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!isSelVehicle">
      <div class="row_title">
        <div class="title font_bold">报警排行</div>
      </div>
      <el-select
        v-model="selAlermType"
        placeholder="请选择"
        class="rightbar_select_select sel_alerm_type"
        @change="changeAlermType"
      >
        <el-option
          v-for="item in alermType"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <div class="row_content">
        <div class="col_content_title">
          <div>排名</div>
          <div>车牌</div>
          <div>报警次数</div>
        </div>
        <div class="col_content_wrapper">
          <div
            class="col_content_all"
            v-for="(item, index) in showListAlerm"
            :key="index"
          >
            <div>{{ item.index }}</div>
            <div>{{ item.plate }}</div>
            <div>{{ item.num }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Bus from "@/common/vehicle/common/js/Bus.js";
export default {
  data() {
    return {
      isSelVehicle: false,
      arr_trafficAnalysis: {}, // 行驶分析
      alermType: [], // 报警类型
      selAlermType: "1", // 选中的报警类型
      listAlerm: [], // 报警车辆列表全部
      indexlistAlerm: 0, // 显示的报警车辆数据
      showListAlerm: []
    };
  },
  created() {
    this.$axios.get("data/analysys_right.json").then(res => {
      //赋值
      this.alermType = res.data.alermType;
      this.listAlerm = res.data.listAlerm;
      this.showListAlerm = res.data.listAlerm[0];
      this.arr_trafficAnalysis = res.data.trafficAnalysis[0];
    });
  },
  mounted() {
    //接收统计分析确认
    Bus.$on("clickSubmitAnalysis", item => {
      this.isSelVehicle = item.isSelVehicle;
      this.selAlermType = "1";
      this.indexlistAlerm = 0;
      this.showListAlerm = this.listAlerm[0];
      if (item.status && item.dataType === 1 && !item.isSelVehicle) {
        this.indexlistAlerm = 0;
        this.showListAlerm = this.listAlerm[0];
      } else if (item.status && item.dataType === 2 && !item.isSelVehicle) {
        this.indexlistAlerm = 1;
        this.showListAlerm = this.listAlerm[1];
      } else if (item.status && item.isSelVehicle) {
      } else if (!item.status) {
        this.isSelVehicle = false;
      }
    });
  },
  methods: {
    changeAlermType(value) {
      if (value != "1") {
        this.showListAlerm = this.listAlerm[this.indexlistAlerm].slice(
          0,
          parseInt(value)
        );
      } else {
        this.showListAlerm = this.listAlerm[this.indexlistAlerm];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/common/vehicle/styles/index.scss";
.div_right_bottom_bar {
  position: absolute;
  top: 320px;
  bottom: 240px;
  right: 20px;
  width: 350px;
  // height: 338px;
  padding: 10px 20px;
  border-radius: 12px;
  box-sizing: border-box;
  overflow: hidden;
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
      .div_item {
        display: inline-block;
        width: 79px;
      }
    }
    .col_content_all {
      position: relative;
      display: inline-block;
      box-sizing: border-box;
      width: 100%;
      color: $color_text_major;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #d5d8db;
      div {
        height: 40px;
        line-height: 40px;
      }
    }
    .col_content_title {
      position: relative;
      display: inline-block;
      box-sizing: border-box;
      width: 100%;
      color: $color_text_major;
      display: flex;
      align-items: center;
      justify-content: space-between;
      div {
        height: 40px;
        line-height: 40px;
        color: #959fa8;
      }
    }
    .col_content_wrapper {
      height: 250px;
      overflow-y: scroll;
      padding-right: 7px;
      box-sizing: border-box;
      padding-bottom: 10px;
    }
  }
}
.sel_alerm_type {
  position: absolute;
  top: 10px;
  right: 20px;
  height: 36px;
  width: 158px;
}
.div_right_bottom_all{
  bottom: 20px;
}
</style>
