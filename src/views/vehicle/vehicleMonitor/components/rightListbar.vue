<template>
  <div
    class="rightbar_container pd_t_10 pd_b_10 ground_glass"
    :class="openRight ? 'show_bar' : 'hide_bar'"
  >
    <!-- 开关 -->
    <div class="rightbar_handle ground_glass" @click="handleClick()">
      <i
        class="iconfont icon_jiantou"
        :class="!openRight ? 'right_listbar_0' : 'right_listbar_180'"
      ></i>
    </div>
    <!-- 详情组件 -->
    <transition name="fade-fromRight">
      <rightDetailbar v-show="detailbarShow"></rightDetailbar>
    </transition>
    <!-- 列表开始 -->
    <div class="rightbar_wraper" v-show="!detailbarShow">
      <div class="rightbar_tab_wrap">
        <div
          class="rightbar_tab_item"
          :class="tabType == '全部' ? 'rightbar_tab_active' : ''"
          @click="clickTabFn('全部')"
        >
          全部
        </div>
        <div
          class="rightbar_tab_item"
          :class="tabType == '正常行驶' ? 'rightbar_tab_active' : ''"
          @click="clickTabFn('正常行驶')"
        >
          在线
        </div>
        <div
          class="rightbar_tab_item"
          :class="tabType == '离线' ? 'rightbar_tab_active' : ''"
          @click="clickTabFn('离线')"
        >
          离线
        </div>
        <div
          class="rightbar_tab_item"
          :class="tabType == '车辆异常' ? 'rightbar_tab_active' : ''"
          @click="clickTabFn('车辆异常')"
        >
          报警
        </div>
      </div>
      <div class="rightbar_select_wrap">
        <span class="rightbar_select_title">显示内容</span>
        <div class="rightbar_select_select">
          <el-select v-model="contentType" placeholder="请选择">
            <el-option
              v-for="item in selectOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="rightbar_select_reload" @click="getList">
          <i
            class="iconfont icon_a-zu399 "
            :class="loading ? 'xuanzhuan' : ''"
          ></i>
        </div>
      </div>
      <div class="rightbar_content_wrap" v-if="!loading">
        <div
          class="rightbar_content_item"
          v-for="(item, index) in listData"
          :key="item.id"
        >
          <div class="rightbar_content_logo">
            <i
              class="iconfont icon_a-zujian352"
              :class="
                item.status == '正常行驶'
                  ? 'car_blue'
                  : item.status == '车辆异常'
                  ? 'car_red'
                  : 'car_gray'
              "
            ></i>
          </div>
          <div class="rightbar_content_row">
            <div class="rightbar_content_left">
              <div class="rightbar_content_span">{{ item.number }}</div>
              <div
                class="rightbar_content_span"
                :class="
                  item.status == '正常行驶'
                    ? 'car_green'
                    : item.status == '车辆异常'
                    ? 'car_red'
                    : 'car_gray'
                "
              >
                {{ item.status }}
              </div>
            </div>
            <div class="rightbar_content_type">
              {{
                contentType == "type"
                  ? item.type
                  : contentType == "area"
                  ? item.area
                  : item.people
              }}
            </div>
            <div class="rightbar_content_icon">
              <el-tooltip
                class="item"
                effect="dark"
                content="实时定位"
                placement="bottom-start"
                trigger="hover"
                :open-delay="500"
                :visible-arrow="false"
              >
                <i class="iconfont icon_a-zu405" @click="locationFn(item)"></i>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="车辆轨迹"
                placement="bottom-start"
                trigger="hover"
                :open-delay="500"
                :visible-arrow="false"
              >
                <i class="iconfont icon_a-lujing604"></i>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="车辆详情"
                placement="bottom-start"
                trigger="hover"
                :open-delay="500"
                :visible-arrow="false"
              >
                <i
                  class="iconfont icon_a-zujian465"
                  @click="detailFn(item)"
                ></i>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="更多"
                placement="bottom-start"
                trigger="hover"
                :open-delay="500"
                :visible-arrow="false"
              >
                <i class="iconfont icon_a-zu406"></i>
              </el-tooltip>
            </div>
            <div class="rightbar_content_heart">
              <el-tooltip
                class="item"
                effect="dark"
                content="取消关注"
                placement="bottom-start"
                trigger="hover"
                :open-delay="500"
                :visible-arrow="false"
              >
                <i
                  class="iconfont icon_cheliangguanzhu-2 car_red xindong"
                  style="display:inline-block;"
                  :class="
                    heartMove && indexTool == index ? 'xindong' : 'xindong'
                  "
                  v-if="item.heart"
                  @click="heartFn(item, index)"
                ></i>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="特别关注"
                placement="bottom-start"
                trigger="hover"
                :open-delay="500"
                :visible-arrow="false"
              >
                <i
                  class="iconfont icon_cheliangguanzhu-2 car_gray"
                  v-if="!item.heart"
                  @click="heartFn(item, index)"
                ></i>
              </el-tooltip>
            </div>
          </div>
        </div>
      </div>
      <div class="rightbar_content_wrap" v-if="loading">
        <div class="rightbar_content_loading">
          <i class="iconfont icon_a-lujing616 car_loading xuanzhuan"></i>
          <span>加载中...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Bus from "@/common/vehicle/common/js/Bus.js";
import rightDetailbar from "./rightDetailbar.vue";
export default {
  components: {
    rightDetailbar
  },
  data() {
    return {
      tabType: "全部", //tab切换
      selectOptions: [
        {
          value: "type",
          label: "车辆类型"
        },
        {
          value: "area",
          label: "归属地"
        },
        {
          value: "people",
          label: "驾驶员"
        }
      ],
      contentType: "type", //显示内容类型
      listData: [],
      carJson: [],
      loading: false,
      heartMove: false, //心动特效
      indexTool: 0,
      list_tool: [],
      openRight: false, //右边栏开启开关
      detailbarShow: false //右边栏详情开关
    };
  },
  created() {
    var vm = this;
    //接收侧边栏状态
    Bus.$on("createVehicle", item => {
      if (item == 0) {
        vm.listData = [
          {
            id: 101,
            coordinate: "117.24635,39.124705",
            number: "津A·314159",
            status: "正常行驶",
            type: "班线客车",
            area: "天津市",
            people: "老张",
            heart: true
          }
        ];
      } else {
        vm.$axios.get("data/car.json").then(res => {
          //赋值
          vm.carJson = res.data.tableData;
          vm.listData = vm.carJson;
        });
      }
    });

    console.log(this.carJson);
  },
  mounted() {
    Bus.$on("openRight", openRight => {
      this.openRight = openRight;
    });
    Bus.$on("detailbarShow", detailbarShow => {
      this.detailbarShow = detailbarShow;
    });
    Bus.$on("openBottomVehicle", openBottomVehicle => {
      openBottomVehicle ? (this.openRight = false) : (this.openRight = true);
    });
    this.getList();
  },
  methods: {
    //获取数据
    getList() {
      this.loading = true;
      let _this = this;
      setTimeout(function() {
        _this.loading = false;
        _this.$axios.get("data/car.json").then(res => {
          //赋值
          _this.carJson = res.data.tableData;
          _this.listData = _this.carJson;
        });
      }, 1000);
    },
    //定位
    locationFn(item) {
      console.log(item.coordinate, "coordinate");
       Bus.$emit("coordinateMap", item.coordinate);
    },
    //详情
    detailFn(item) {
      this.detailbarShow = true;
      Bus.$emit("detailbarShow", this.detailbarShow);
    },
    //特别关注
    heartFn(item, index) {
      // val
      // this.heartMove = val;
      this.indexTool = index;
      this.carJson.forEach(val => {
        if (val == item) {
          console.log(val, "item");
          val.heart = !val.heart;
          this.heartMove = val.heart;
        }
      });
    },
    //tab切换
    clickTabFn(type) {
      this.listData = [];
      this.tabType = type;
      if (this.tabType == "全部") {
        this.listData = this.carJson;
      } else {
        this.carJson.forEach(val => {
          if (val.status == type) {
            this.listData.push(val);
          }
        });
      }
    },
    //右侧栏合起开关
    handleClick() {
      this.openRight = !this.openRight;
      //发送给地图工具栏，侧边栏状态
      Bus.$emit("openRight", this.openRight);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/common/vehicle/styles/index.scss";
.rightbar_container {
  position: absolute;
  top: 0px;
  width: 388px;
  height: 100%;
  display: inline-block;
  box-sizing: border-box;

  .rightbar_handle {
    position: absolute;
    top: calc(50% - 76px);
    right: 388px;
    width: 14px;
    height: 76px;
    border-radius: 10px 0px 0px 10px;
    display: inline-block;
    line-height: 76px;
    padding: 0 2px;
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
  .rightbar_wraper {
    padding: 10px 10px 10px 18px;
    height: 100%;
    .rightbar_tab_wrap {
      width: 100%;
      padding-right: 10px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      .rightbar_tab_item {
        display: inline-block;
        padding: 8px 13px;
        font-size: 14px;
        color: $color_text_minor;
        cursor: pointer;
      }
      .rightbar_tab_active {
        display: inline-block;
        font-weight: bold;
        color: $color_primary;
        border-radius: 6px;
        // 毛玻璃
        background: rgba(219, 219, 219, 0.3);
        -webkit-backdrop-filter: saturate(180%) blur(30px);
        backdrop-filter: saturate(185%) blur(30px);
      }
    }
    .rightbar_select_wrap {
      width: 100%;
      margin: 20px 0 10px 0;
      padding-right: 10px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      .rightbar_select_title {
        display: inline-block;
        width: 70px;
        line-height: 40px;
        font-size: 14px;
        color: $color_text_major;
      }
      .rightbar_select_select {
        display: inline-block;
        width: calc(100% - 95px);
      }
      .rightbar_select_reload {
        display: inline-block;
        line-height: 40px;
        width: 22px;
        cursor: pointer;
        i {
          display: inline-block;
          font-size: 20px;
        }
      }
      .rightbar_select_reload:hover {
        color: $color_primary;
      }
    }
    .rightbar_content_wrap {
      width: 100%;
      height: calc(100% - 120px);
      overflow-y: scroll;
      padding-right: 7px;
      .rightbar_content_item {
        display: inline-block;
        width: 100%;
        .rightbar_content_logo {
          display: inline-block;
          height: 55px;
          line-height: 55px;
          vertical-align: top;
          width: 40px;
          // padding: 4px 8px 0 0;
          box-sizing: border-box;
          // line-height: 56px;
          i {
            font-size: 28px;
          }
        }
        .rightbar_content_row {
          display: inline-block;
          width: 308px;
          border-bottom: 1px solid $color_gray;
          box-sizing: border-box;
          height: 55px;
          // line-height: 56px;
          .rightbar_content_left {
            display: inline-block;
            line-height: 56px;
            padding-top: 5px;
            box-sizing: border-box;
            height: 55px;
            width: 86px;
            color: $color_text_major;
            .rightbar_content_span {
              width: 100%;
              height: 22px;
              line-height: 22px;
              font-size: 12px;
              font-weight: bold;
            }
            .rightbar_content_span:last-child {
              font-size: 10px;
            }
          }
          .rightbar_content_type {
            display: inline-block;
            height: 55px;
            line-height: 55px;
            vertical-align: top;
            font-size: 10px;
            font-weight: 400;
            width: 66px;
            color: $color_text_major;
          }
          .rightbar_content_icon {
            display: inline-block;
            width: 130px;
            box-sizing: border-box;
            height: 55px;
            line-height: 55px;
            vertical-align: top;
            color: $color_text_major;
            i {
              font-size: 19px;
              margin: 0 6px;
              cursor: pointer;
            }
            i:hover {
              color: $color_primary;
            }
          }
          .rightbar_content_heart {
            display: inline-block;
            height: 55px;
            line-height: 55px;
            vertical-align: top;
            cursor: pointer;
            width: 25px;
            text-align: center;
            i {
              font-size: 20px;
            }
          }
        }
      }
      .rightbar_content_loading {
        width: 100px;
        margin: calc(100% - 55px) auto;
        color: $color_text_minor;
        .car_loading {
          display: inline-block;
          font-size: 25px;
          height: 55px;
          line-height: 55px;
          vertical-align: top;
        }

        span {
          display: inline-block;
          margin-left: 10px;
          height: 55px;
          line-height: 55px;
          vertical-align: top;
        }
      }
    }
  }
}
.right_listbar_180 {
  transform: rotate(180deg);
  transition: all 0.5s;
}
.right_listbar_0 {
  transform: rotate(0deg);
  transition: all 0.5s;
}

.show_bar {
  right: 0px !important;
  transition: right 0.5s;
}
.hide_bar {
  right: -388px !important;
  transition: right 0.5s;
}
.car_blue {
  color: #2154f4;
}
.car_red {
  color: #d65858;
}
.car_gray {
  color: #979fa7;
}
.car_green {
  color: #63cb71;
}
</style>
