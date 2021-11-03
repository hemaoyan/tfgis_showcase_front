<template>
  <div>
    <!-- 收起状态 -->
    <div
      v-if="!searchBar"
      @click="handleClick()"
      class="div_analysis_searchbar_close ground_glass"
    >
      <span>报警分析</span> <i class="iconfont icon_jiantou-copy"></i>
    </div>
    <div v-else class="div_analysis_searchbar ground_glass">
      <!-- 开关 -->
      <div class="rightbar_handle ground_glass" @click="handleClick()">
        <i
          class="iconfont icon_jiantou"
          :class="!searchBar ? 'right_listbar_0' : 'right_listbar_180'"
        ></i>
      </div>

      <div class="title">
        报警分析
      </div>

      <div class="row_search">
        <div class="row_title">
          时间
        </div>
        <div class="row_condition">
          <el-radio-group v-model="radio_time">
            <el-radio :label="1">按日统计</el-radio>
            <el-radio :label="2">按月统计</el-radio>
          </el-radio-group>

          <el-date-picker
            v-model="searchTime"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </div>
      </div>

      <div class="row_search">
        <div class="row_title">
          报警类型
        </div>
        <div class="row_condition">
          <transition-group name="fade-fromSmallX" tag="div">
            <div
              v-for="item in arr_alermType"
              :key="item.value"
              class="row_condition_item"
              :class="
                sel_alermType.indexOf(item.value) != -1
                  ? 'row_condition_item_active'
                  : ''
              "
              @click="clickAlermType(item.value)"
            >
              <span>{{ item.label }}</span>
            </div>
          </transition-group>
        </div>
      </div>

      <div class="row_search">
        <div class="row_title">
          车辆选择
        </div>
        <div class="row_condition">
          <div class="row_condition" v-if="!isSelVehicle">
            <transition-group name="fade-fromSmallX" tag="div">
              <div
                v-for="item in arr_vehicleType"
                :key="item.value"
                class="row_condition_item"
                :class="
                  sel_vehicleType.indexOf(item.value) != -1
                    ? 'row_condition_item_active'
                    : ''
                "
                @click="clickVehicleType(item.value)"
              >
                <span>{{ item.label }}</span>
              </div>
            </transition-group>
          </div>
          <transition name="fade-fromSmallX" mode="out-in">
            <el-select
              v-model="sel_vehicle"
              v-if="isSelVehicle"
              filterable
              multiple
              clearable
              collapse-tags
              placeholder="请选择"
              class="rightbar_select_select mg_r_10"
            >
              <el-option
                v-for="item in arr_vehicle"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </transition>

          <div class="row_condition_item" @click="isSelVehicle = !isSelVehicle;sel_vehicle = []">
            <span>切换为单个车辆选择</span>
          </div>
        </div>
      </div>

      <div class="div_btn_group">
        <div class="btn_submit" @click="clickSubmit">确定</div>
        <div class="btn_reset" @click="clickReset">
          重置 <i class="iconfont icon_a-zu399"></i>
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
      searchBar: true, //搜索栏展开
      radio_time: 1,
      searchTime: "",
      arr_alermType: [],
      sel_alermType: ["0"],
      arr_vehicleType: [],
      sel_vehicleType: ["0"],
      isfadeInit: false,
      isSelVehicle: false, // 切换为单个车辆选择
      arr_vehicle: [],
      sel_vehicle: [],
      loading: false,
      hasSearch: false, //已搜索
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      indexTool: 0,
      restaurants: [],
      searchValue: ""
    };
  },
  created() {
    var vm = this;
    this.$axios.get("data/analysys_search.json").then(res => {
      //赋值
      vm.arr_alermType = res.data.alermType;
      vm.arr_vehicleType = res.data.vehicleType;
      vm.arr_vehicle = res.data.arr_vehicle;
    });
  },
  mounted() {
    this.isfadeInit = true;
  },
  methods: {
    //合起开关
    handleClick() {
      this.searchBar = !this.searchBar;
      //发送给地图工具栏，侧边栏状态
      // Bus.$emit("searchBar", this.searchBar);
    },
    //清除
    deleteFn() {
      this.searchValue = "";
    },
    //搜索
    searchFn() {
      this.hasSearch = true;
    },
    //删除并重置
    reloadFn() {
      this.hasSearch = false;
      this.searchValue = "";
    },
    handleSelect(item) {
      console.log(item);
    },
    // 点击确认
    clickSubmit() {
      Bus.$emit("clickSubmitAnalysis", {
        status: true,
        dataType: this.radio_time,
        isSelVehicle: this.isSelVehicle
      });
    },
    // 点击重置
    clickReset() {
      this.radio_time = 1;
      this.searchTime = "";
      this.sel_alermType = ["0"];
      this.sel_vehicleType = ["0"];
      this.isSelVehicle = false;
      Bus.$emit("clickSubmitAnalysis", {
        status: false,
        dataType: this.radio_time,
        isSelVehicle: this.isSelVehicle
      });
    },
    // 点击报警类型
    clickAlermType(item) {
      var indexBuXian = this.sel_alermType.indexOf("0");
      if (indexBuXian != -1) {
        this.sel_alermType.splice(indexBuXian, 1);
      }
      var index = this.sel_alermType.indexOf(item);
      if (index == -1) {
        if (item == "0") {
          this.sel_alermType = [item];
        } else {
          this.sel_alermType.push(item);
        }
      } else {
        this.sel_alermType.splice(index, 1);
      }
    },
    // 点击车辆类型
    clickVehicleType(item) {
      var indexBuXian = this.sel_vehicleType.indexOf("0");
      if (indexBuXian != -1) {
        this.sel_vehicleType.splice(indexBuXian, 1);
      }
      var index = this.sel_vehicleType.indexOf(item);
      if (index == -1) {
        if (item == "0") {
          this.sel_vehicleType = [item];
        } else {
          this.sel_vehicleType.push(item);
        }
      } else {
        this.sel_vehicleType.splice(index, 1);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/common/vehicle/styles/index.scss";
.div_analysis_searchbar_close {
  height: 62px;
  width: 119px;
  padding: 20px;
  box-sizing: border-box;
  position: absolute;
  top: 20px;
  left: 90px;
  border-radius: 12px;
  color: $color_text_major;
  font-weight: bold;
   transition: .5s ease;
  
  cursor: pointer;
  i {
    font-size: 12px;
    margin-left: 5px;
  }
}
// .change_close{
// animation: change_close 0.5s;
// }
// @keyframes change_close {
//   from {
//     height: 62px;
//     width: 119px;
//     opacity: 1;
//   }

//   to {
//     width: 780px;
//     height: 222px;
//     opacity: 1;
//   }
// }
// .change_open{
// animation: change_open 0.5s;
// }
// @keyframes change_open {
//   from {
//      width: 780px;
//     height: 222px;
//     opacity: 1;
   
//   }

//   to {
//     height: 62px;
//     width: 119px;
//     opacity: 1;
//   }
// }
.div_analysis_searchbar {
  width: 780px;
  padding: 20px;
  box-sizing: border-box;
  position: absolute;
  top: 20px;
  left: 90px;
  border-radius: 12px;
  transition: 0.5s ease;
  .rightbar_handle {
    position: absolute;
    top: 70px;
    left: 780px;
    width: 14px;
    height: 76px;
    border-radius: 0px 10px 10px 0px;
    display: inline-block;
    line-height: 76px;
    box-sizing: border-box;
    cursor: pointer;
    i {
      font-size: 11px;
      display: inline-block;
    }
  }
  .rightbar_handle:hover {
    background: rgba(219, 219, 219, 0.5);
    -webkit-backdrop-filter: saturate(180%) blur(30px);
    backdrop-filter: saturate(185%) blur(30px);
  }
  .title {
    font-size: 14px;
    font-weight: bold;
    line-height: 15px;
    color: $color_text_major;
    margin-bottom: 20px;
  }
  .row_search {
    .row_title {
      width: 70px;
      height: 20px;
      display: inline-block;
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      color: $color_text_minor;
    }
    .row_condition {
      display: inline-block;
      .row_condition_item {
        display: inline-block;
        border-radius: 6px;
        cursor: pointer;
        padding: 5px 10px;
        margin: 5px 3px 5px 0;
      }
      .row_condition_item:hover {
        background: rgba($color_bg_active_other, 0.75);
        color: $color_primary;
      }
      .row_condition_item_active {
        background: rgba($color_bg_active_other, 0.75);
        color: $color_primary;
      }
    }
  }
}
.div_btn_group {
  text-align: right;
  .btn_submit {
    width: 56px;
    height: 28px;
    border-radius: 6px;
    background: #2154f4;
    color: #fff;
    line-height: 28px;
    text-align: center;
    display: inline-block;
    cursor: pointer;
  }
  .btn_submit:hover {
    background: rgba($color_bg_active_other, 0.75);
    color: #000;
  }
  .btn_reset {
    width: 69px;
    height: 28px;
    border-radius: 6px;
    background: none;
    line-height: 28px;
    text-align: center;
    display: inline-block;
    cursor: pointer;
    margin-left: 5px;
  }
  .btn_reset:hover {
    background: rgba($color_bg_active_other, 0.75);
  }
}
</style>
