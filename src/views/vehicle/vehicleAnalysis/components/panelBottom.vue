<template>
  <div class="div_right_bottom_bar">
    <div class="div_chart_left ground_glass">
      <div class="div_chart_title mg_t_10 mg_l_40">
        <div class="title font_bold">报警趋势</div>
      </div>
      <transition name="fade-fromSmallX">
        <div
          id="div_echart1"
          v-if="isShowFade"
          class="div_chart_analysis"
        ></div>
      </transition>
    </div>
    <div class="div_chart_center ground_glass">
      <div class="div_chart_title mg_t_10 mg_l_40">
        <div class="title font_bold">报警时段分布</div>
      </div>
      <transition name="fade-fromSmallX">
        <div
          id="div_echart2"
          v-if="isShowFade"
          class="div_chart_analysis"
        ></div>
      </transition>
    </div>
    <transition name="fade-fromDown">
      <div class="div_chart_right ground_glass" v-if="!isSelVehicle">
        <div class="div_chart_title mg_t_10 mg_l_40">
          <div class="title font_bold">报警车辆类型分布</div>
        </div>
        <transition name="fade-fromSmallX">
          <div
            id="div_echart3"
            v-if="isShowFade"
            class="div_chart_analysis"
          ></div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
import {
  template_analysis_bar,
  template_analysis_radio,
  template_analysis_pie
} from "@/common/vehicle/common/echarts/TemplateCharts";
import Bus from "@/common/vehicle/common/js/Bus.js";
export default {
  data() {
    return {
      analysis: {},
      param: {},
      chart1_options: {},
      chart2_options: {},
      chart3_options: {},
      myChart1: null,
      myChart2: null,
      myChart3: null,
      isShowFade: false,
      isSelVehicle: false, // 切换为单个车辆选择
    };
  },
  mounted() {
    this.isShowFade = true;
    this.getCharts();
    //接收统计分析确认
    Bus.$on("clickSubmitAnalysis", item => {
      this.isShowFade = false;
        this.isSelVehicle = item.isSelVehicle
        if(item.status && item.dataType === 1 && !item.isSelVehicle) {
            this.param = this.analysis.demo1
        } else if (item.status && item.dataType === 2 && !item.isSelVehicle) {
            this.param = this.analysis.demo2
        } else if (item.status && item.isSelVehicle) {
            this.param = this.analysis.demo3
        } else if (!item.status) {
            this.isSelVehicle = false
        }
        setTimeout(() => {
          this.isShowFade = true;
          this.$nextTick(() => {
            this.createCharts();
        });
        }, 1000);
          
    });
  },
  methods: {
    getCharts() {
      var vm = this;
      vm.$axios.get("data/data_chart.json").then(res => {
        vm.analysis = res.data.analysis
        //赋值
        vm.param = res.data.analysis.demo1;
        this.createCharts()
      });
    },
    createCharts() {
      var vm = this
      // 线图
      vm.chart1_options = template_analysis_bar(vm.param.chart1);
      vm.myChart1 = vm.$echarts.init(document.getElementById("div_echart1"));
      vm.myChart1.setOption(vm.chart1_options);
      // 雷达图
      vm.chart2_options = template_analysis_radio(vm.param.chart2);
      vm.myChart2 = vm.$echarts.init(document.getElementById("div_echart2"));
      vm.myChart2.setOption(vm.chart2_options);
      // 饼图
      vm.chart3_options = template_analysis_pie(vm.param.chart3);
      vm.myChart3 = vm.$echarts.init(document.getElementById("div_echart3"));
      vm.myChart3.setOption(vm.chart3_options);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/common/vehicle/styles/index.scss";
.div_right_bottom_bar {
  position: absolute;
  height: 220px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  box-sizing: border-box;
  z-index: 160;
  .div_chart_title {
    position: relative;
    width: 100%;
    height: 40px;
    line-height: 40px;
  }
  .div_chart_left {
    width: calc(100% - 680px);
    height: 100%;
    display: inline-block;
  }

  .div_chart_center {
    width: 280px;
    height: 100%;
    display: inline-block;
  }

  .div_chart_right {
    width: 400px;
    height: 100%;
    display: inline-block;
  }
}
.div_chart_analysis {
  width: 100%;
  height: calc(100% - 40px);
}
</style>
