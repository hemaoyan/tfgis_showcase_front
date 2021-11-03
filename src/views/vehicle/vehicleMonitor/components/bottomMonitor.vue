<template>
  <div
    class="bottombar_container ground_glass"
    :class="openBottom ? 'show_bar' : 'hide_bar'"
  >
    <!-- 开关 -->
    <div class="bottombar_handle ground_glass" @click="handleClick()">
      <i
        class="iconfont icon_xia-copy"
        :class="!openBottom ? 'bottom_listbar_180 ' : 'bottom_listbar_0'"
      ></i>
    </div>
    <div class="bottombar_wrapper">
      <!-- <div class="bottombar_left"> -->
      <div class="bottombar_left_left">
        <img src="@/common/vehicle/assets/img/ptjkzs.png" />
        <span class="bottombar_left_title">平台监控总数</span>
        <div class="bottombar_left_num">
          <div class="number">
            <vns
              :start="0"
              :end="1"
              :speed="80"
              :times="20"
              :format="num => num"
            />
          </div>
          <div class="number">
            <vns
              :start="0"
              :end="3"
              :speed="80"
              :times="20"
              :format="num => num"
            />
          </div>
          <div class="number">
            <vns
              :start="0"
              :end="8"
              :speed="80"
              :times="20"
              :format="num => num"
            />
          </div>
          <div class="number">
            <vns
              :start="0"
              :end="7"
              :speed="80"
              :times="20"
              :format="num => num"
            />
          </div>
          <div class="number">
            <vns
              :start="0"
              :end="4"
              :speed="80"
              :times="20"
              :format="num => num"
            />
          </div>
        </div>
        <div class="liang">辆</div>
      </div>
      <div class="bottombar_left_right">
        <img src="@/common/vehicle/assets/img/ycbj.png" />
        <span class="bottombar_left_title">异常报警</span>
        <div class="bottombar_left_num">
          <div class="number warn_red">
            <vns
              :start="0"
              :end="1"
              :speed="80"
              :times="20"
              :format="num => num"
            />
          </div>
          <div class="number warn_red">
            <vns
              :start="0"
              :end="3"
              :speed="80"
              :times="20"
              :format="num => num"
            />
          </div>
          <div class="number warn_red">
            <vns
              :start="0"
              :end="8"
              :speed="80"
              :times="20"
              :format="num => num"
            />
          </div>
        </div>
        <div class="liang">辆</div>
      </div>
      <!-- </div>
      <div class="bottombar_center"> -->
      <div class="bottombar_center_left">
        <div id="div_echart1" class="div_chart_analysis"></div>
      </div>
      <div class="bottombar_center_right">
        <div id="div_echart2" class="div_chart_analysis"></div>
      </div>
      <!-- </div> -->
      <div class="bottombar_right">
        <div class="nowTime">{{ nowTime }}</div>
        <div class="nowWeek">{{ nowWeek }}</div>
        <div class="nowDate">{{ nowDate }}</div>
        <div class="weather">
          <img src="@/common/vehicle/assets/img/duoyun.png" />
          多云，当前气温30℃，最高气温35℃
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  monitor_analysis_bar,
  monitor_analysis_pie
} from "@/common/vehicle/common/echarts/MonitorCharts";
import vns from "vue-number-scroll";
import Bus from "@/common/vehicle/common/js/Bus.js";
export default {
  components: {
    vns
  },
  data() {
    return {
      openBottom: true, //边栏开启开关
      param: {},
      num: 10,
      timer: null,
      nowWeek: "",
      nowDate: "",
      nowTime: "",
      chart1_options: {},
      chart2_options: {},
      chart3_options: {},
      myChart1: null,
      myChart2: null,
      myChart3: null,
      isShowFade: false
    };
  },
  mounted() {
    this.isShowFade = true;
    this.getCharts();
    Bus.$on("openRight", openRight => {
      openRight ? (this.openBottom = false) : (this.openBottom = true);
    });
    this.timer = setInterval(() => {
      this.setNowTimes();
    }, 1000);
  },
  methods: {
    //下侧栏合起开关
    handleClick() {
      this.openBottom = !this.openBottom;
      //发送给地图工具栏，侧边栏状态
      Bus.$emit("openBottomVehicle", this.openBottom);
    },
    setNowTimes() {
      let myDate = new Date();
      // console.log(myDate)
      let wk = myDate.getDay();
      let yy = String(myDate.getFullYear());
      let mm = myDate.getMonth() + 1;
      let dd = String(
        myDate.getDate() < 10 ? "0" + myDate.getDate() : myDate.getDate()
      );
      let hou = String(
        myDate.getHours() < 10 ? "0" + myDate.getHours() : myDate.getHours()
      );
      let min = String(
        myDate.getMinutes() < 10
          ? "0" + myDate.getMinutes()
          : myDate.getMinutes()
      );
      let sec = String(
        myDate.getSeconds() < 10
          ? "0" + myDate.getSeconds()
          : myDate.getSeconds()
      );
      let weeks = [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六"
      ];
      let week = weeks[wk];
      this.nowDate = yy + "年" + mm + "月" + dd + "日";
      this.nowTime = hou + ":" + min + ":" + sec;
      this.nowWeek = week;
    },
    getCharts() {
      //双柱图
      this.chart1_options = monitor_analysis_bar();
      this.myChart1 = this.$echarts.init(
        document.getElementById("div_echart1")
      );
      this.myChart1.setOption(monitor_analysis_bar());

      //环形图
      this.chart2_options = monitor_analysis_pie();
      this.myChart2 = this.$echarts.init(
        document.getElementById("div_echart2")
      );
      this.myChart2.setOption(monitor_analysis_pie());
      // var vm = this;
      // vm.$axios.get("data/data_chart.json").then(res => {
      //   //赋值
      //   vm.param = res.data.ecology.demo1;
      //   // 线图

      // 线图
      // vm.chart1_options = template_analysis_bar(vm.param.chart1);
      // vm.myChart1 = vm.$echarts.init(document.getElementById("div_echart1"));
      // vm.myChart1.setOption(vm.chart1_options);
      // 雷达图
      // vm.chart2_options = template_analysis_radio(vm.param.chart2);
      // vm.myChart2 = vm.$echarts.init(document.getElementById("div_echart2"));
      // vm.myChart2.setOption(vm.chart2_options);
      // // 饼图
      // vm.chart3_options = template_analysis_pie(vm.param.chart3);
      // vm.myChart3 = vm.$echarts.init(document.getElementById("div_echart3"));
      // vm.myChart3.setOption(vm.chart3_options);
      // });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/common/vehicle/styles/index.scss";
.bottombar_container {
  position: absolute;
  height: 220px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  box-sizing: border-box;
  display: inline-block;
  z-index: 160;
  min-width: 900px;
  .bottombar_handle {
    position: absolute;
    right: calc(50% - 14px);
    bottom: 220px;
    width: 76px;
    height: 14px;
    border-radius: 10px 10px 0px 0px;
    display: inline-block;
    line-height: 14px;
    text-align: center;
    padding: 2px 0;
    box-sizing: border-box;
    cursor: pointer;
    i {
      font-size: 11px;
      display: inline-block;
    }
  }
  .bottombar_handle:hover {
    background: rgba(219, 219, 219, 0.5);
    -webkit-backdrop-filter: saturate(180%) blur(30px);
    backdrop-filter: saturate(185%) blur(30px);
  }
  .bottombar_wrapper {
    padding: 20px;
    display: flex;
    justify-content: space-between;
    .bottombar_left_right,
    .bottombar_left_left {
      display: inline-block;
      margin: 10px;
      box-sizing: border-box;
      height: 120px;
      img {
        display: block;
        width: 16px;
        height: 16px;
      }
      .bottombar_left_title {
        font-size: 14px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        color: $color_text_major;
        display: block;
        margin-top: 14px;
        margin-bottom: 18px;
      }
      .bottombar_left_num {
        width: 250px;
        height: 60px;
        display: inline-block;
      }
      .liang {
        color: $color_text_minor;
        display: inline-block;
        vertical-align: bottom;
        width: 18px;
      }
    }
    .bottombar_left_left {
      width: 268px;
      height: 120px;
      vertical-align: top;
      display: inline-block;
    }
    .bottombar_left_right {
      vertical-align: top;
      display: inline-block;
      width: 170px;
      .warn_red {
        color: #d65858;
      }
      .bottombar_left_num {
        width: 150px;
      }
    }
    .bottombar_center_left {
      vertical-align: top;
      display: inline-block;
      width: 530px;
      height: 160px;
      margin-right: 20px;
    }
    .bottombar_center_right {
      vertical-align: top;
      display: inline-block;
      width: 380px;
      height: 160px;
    }
    .bottombar_right {
      width: 240px;
      box-sizing: border-box;
      vertical-align: top;
      font-family: "Source Han Sans CN Normal";
      font-weight: normal;
      margin: 20px;
      .nowTime {
        display: inline-block;
        width: 100%;
        font-weight: 300;
        font-size: 34px;
        line-height: 42px;
        text-align: left;
        color: $color_text_major;
      }
      .nowWeek {
        display: inline-block;
        width: 100%;
        font-size: 20px;
        line-height: 35px;
        text-align: left;
        color: $color_text_major;
      }
      .nowDate {
        display: inline-block;
        width: 100%;
        font-size: 14px;
        line-height: 40px;
        text-align: left;
        color: $color_text_minor;
      }
      .weather {
        display: inline-block;
        width: 100%;
        width: 250px;
        font-size: 14px;
        line-height: 40px;
        text-align: left;
        color: $color_text_major;
      }
    }
  }
}
.bottom_listbar_180 {
  transform: rotate(180deg);
  transition: all 0.5s;
}
.bottom_listbar_0 {
  transform: rotate(0deg);
  transition: all 0.5s;
}

.show_bar {
  bottom: 0px !important;
  transition: bottom 0.5s;
}
.hide_bar {
  bottom: -220px !important;
  transition: bottom 0.5s;
}
@font-face {
  font-family: "customize";
  src: url("~@/common/vehicle/assets/font/Antonio-Bold.ttf") format("truetype");
}
.number {
  width: 44px;
  height: 74px;
  line-height: 74px;
  float: left;
  margin-right: 5px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 2px 6px #edeff5;
  text-align: center !important;
  span {
    font-family: "customize";
    font-weight: 600;
    font-size: 54px !important;
  }
}
.div_chart_analysis {
  width: 100%;
  height: 210px;
}
.div_right_bottom_bar {
  position: absolute;
  height: 220px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  box-sizing: border-box;
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
</style>
