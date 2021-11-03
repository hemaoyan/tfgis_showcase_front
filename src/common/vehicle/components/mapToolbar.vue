<template>
  <div
    class="map_toolbar_container ground_glass pd_5"
    :class="openRight ? 'map_toolbar_container_move' : ''"
  >
    <div v-for="(item, index) in list_tool" :key="index" class="display_inline">
      <div
        class="icon_container  mg_l_5 mg_r_5"
        content="sss"
        :class="arr_selTools.indexOf(index) != -1 ? 'map_icon_active' : ''"
        @click="clickBTNTool(index)"
        tabindex="1"
      >
        <!-- 主题换肤 -->
        <div
          class="icon_pocket_zhuti ground_glass"
          v-if="index == 3 && themeShow"
        >
          <div class="icon_zhuti">
            <div
              class="icon_img"
              :class="iconActive == 1 ? 'iconActive' : ''"
              @click="clickTheme(1)"
            >
              <img src="@/common/vehicle/assets/img/bg-gray.png" />
            </div>
            <span>远山黛</span>
          </div>
          <div class="icon_zhuti">
            <div
              class="icon_img"
              :class="iconActive == 2 ? 'iconActive' : ''"
              @click="clickTheme(2)"
            >
              <img src="@/common/vehicle/assets/img/bg-blue.png" />
            </div>
            <span>雅士灰</span>
          </div>
        </div>
        <!-- 图层 -->
        <div
          class="icon_pocket_tuceng ground_glass"
          v-if="index == 4 && tucengShow"
        >
          <div class="icon_tuceng_title">
            <span>图层名称</span>
            <span>可见性</span>
          </div>
          <div
            class="icon_tuceng_item"
            v-for="(item, index) in arr_tuceng"
            :key="index"
          >
            <span class="icon_tuceng_lable">{{ item.lable }}</span>
            <div class="icon_tuceng_switch">
              <el-switch
                v-model="item.select"
                active-color="#2154F4"
                inactive-color="#D6E0EA"
              >
              </el-switch>
            </div>
          </div>
        </div>
        <!-- 工具 -->
        <div
          class="icon_pocket_tool ground_glass"
          v-if="index == 5 && toolShow"
        >
          <div
            class="icon_tool_item"
            v-for="(item, index) in arr_tool"
            :key="index"
            @click="clickToolFn(item.id)"
          >
            <div class="icon_tool_icon">
              <i class="iconfont" :class="item.icon"></i>
            </div>
            <span class="icon_tool_lable">{{ item.lable }}</span>
          </div>
        </div>
        <el-tooltip
          class="item"
          effect="dark"
          :content="item.name"
          placement="bottom-start"
          trigger="hover"
          :open-delay="500"
          :visible-arrow="false"
        >
          <i class="iconfont map_toolbar_icon" :class="item.className"></i>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import Bus from "@/common/vehicle/common/js/Bus.js";
export default {
  data() {
    return {
      openRight: false, //右边栏开启开关
      themeShow: false, //主题开关
      tucengShow: false, //图层开关
      toolShow: false, //工具开关
      iconActive: "",
      indexTool: 0,
      arr_tuceng: [
        { lable: "指定加油站", select: true },
        { lable: "危险车辆检查站", select: false },
        { lable: "倾卸垃圾场", select: true },
        { lable: "车辆停放区", select: true }
      ],
      arr_tool: [
        {
          id: 1,
          icon: "icon_a-lujing484",
          lable: "多边形选择工具"
        },
        {
          id: 2,
          icon: "icon_a-lujing485",
          lable: "框选工具"
        },
        {
          id: 3,
          icon: "icon_a-tuoyuan10",
          lable: "圆形框选工具"
        },
        {
          id: 4,
          icon: "icon_a-lujing486",
          lable: "测量工具"
        },
        {
          id: 5,
          icon: "icon_a-zu358",
          lable: "定位工具"
        }
      ],
      arr_selTools: [],
      list_tool: [
        {
          name: "2、3维切换",
          className: "icon_a-3D"
        },
        {
          name: "聚类效果开关",
          className: "icon_a-111"
        },
        {
          name: "实时路网开关",
          className: "icon_shishiluwang"
        },
        {
          name: "主题换肤",
          className: "icon_zhutihuanfu"
        },
        {
          name: "自定义图层管理器",
          className: "icon_zidingyitucengguanliqi"
        },
        {
          name: "工具箱",
          className: "icon_gongjuxiang"
        },
        {
          name: "纯净模式开关",
          className: "icon_chunjingmoshi"
        }
      ]
    };
  },
  mounted() {
    //接收侧边栏状态
    Bus.$on("openRight", openRight => {
      this.openRight = openRight;
    });
  },
  methods: {
    //点击工具
    clickToolFn(val) {
      // 发送按钮点击状态
      Bus.$emit("clickMapDrawTool", val);
    },
    //点击切换主题
    clickTheme(val) {
      this.iconActive = val;
    },
    // 点击功能按钮
    clickBTNTool(item) {
      if (item == 3) {
        this.themeShow = !this.themeShow;
        this.tucengShow = false;
        this.toolShow = false;
        if(this.arr_selTools.indexOf(4) != -1){this.arr_selTools.splice(this.arr_selTools.indexOf(4), 1)}
        if(this.arr_selTools.indexOf(5) != -1){this.arr_selTools.splice(this.arr_selTools.indexOf(5), 1)}
      } else if (item == 4) {
        this.tucengShow = !this.tucengShow;
        this.themeShow = false;
        this.toolShow = false;
        if(this.arr_selTools.indexOf(3) != -1){this.arr_selTools.splice(this.arr_selTools.indexOf(3), 1)}
        if(this.arr_selTools.indexOf(5) != -1){this.arr_selTools.splice(this.arr_selTools.indexOf(5), 1)}
      } else if (item == 5) {
        this.toolShow = !this.toolShow;
        this.themeShow = false;
        this.tucengShow = false;
        if(this.arr_selTools.indexOf(3) != -1){this.arr_selTools.splice(this.arr_selTools.indexOf(3), 1)}
        if(this.arr_selTools.indexOf(4) != -1){this.arr_selTools.splice(this.arr_selTools.indexOf(4), 1)}
      }
      var index = this.arr_selTools.indexOf(item);
      if (index == -1) {
        this.arr_selTools.push(item);
        // 发送按钮点击状态
        Bus.$emit("clickMapTool", { status: true, value: item });
      } else {
        this.arr_selTools.splice(index, 1);
        Bus.$emit("clickMapTool", { status: false, value: item });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/common/vehicle/styles/index.scss";
.map_toolbar_container {
  border-radius: $border_radius_normal;
  font-size: 20px;
  position: absolute;
  top: 20px;
  right: 20px;
  transition: right 0.5s;
}
.map_toolbar_container_move {
  right: 408px;
  transition: right 0.5s;
}
// 工具栏样式
.map_icon_active {
  color: $color_primary;
}
.map_toolbar_icon {
  font-size: 24px;
}
.icon_container {
  position: relative;
}
.icon_pocket_zhuti {
  display: inline-block;
  box-sizing: border-box;
  padding: 16px 13px;
  position: absolute;
  top: 50px;
  left: -50px;
  width: 156px;
  height: 105px;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  .icon_zhuti {
    // float: left;
    // width: 40%;
    .icon_img {
      width: 56px;
      height: 44px;
      border-radius: 13px;
      border: 2px solid transparent;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .iconActive {
      border-radius: 14px;
      border: 2px solid #2154f4;
    }
    .icon_img:hover {
      border-radius: 14px;
      border: 2px solid #2154f4;
    }
    span {
      display: block;
      font-size: 12px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      line-height: 32px;
      color: #323232;
      text-align: center;
    }
  }
}
.icon_pocket_tuceng {
  display: inline-block;
  box-sizing: border-box;
  padding: 16px 13px;
  position: absolute;
  top: 50px;
  left: -50px;
  width: 168px;
  height: 160px;
  border-radius: 12px;
  color: $color_text_minor;
  font-weight: 400;
  font-size: 12px;
  font-family: Source Han Sans CN;
  .icon_tuceng_title {
    height: 25px;
    width: 100%;
    margin: 0 auto;
    border-bottom: 1px solid #d6e0ea;
    line-height: 15px;
    display: flex;
    justify-content: space-between;
  }
  .icon_tuceng_item {
    width: 100%;
    line-height: 28px;
    display: flex;
    justify-content: space-between;
    .icon_tuceng_lable,
    .icon_tuceng_switch {
      display: inline-block;
      color: $color_text_major;
    }
    .icon_tuceng_switch {
      transform: scale(0.6, 0.7);
    }
  }
}
.icon_pocket_tool {
  display: inline-block;
  box-sizing: border-box;
  padding: 5px;
  position: absolute;
  top: 50px;
  left: -50px;
  width: 148px;
  height: 201px;
  border-radius: 12px;
  color: $color_text_major;
  font-weight: 400;
  font-size: 12px;
  font-family: Source Han Sans CN;
  .icon_tool_item {
    padding: 4px;
    box-sizing: border-box;
    border-radius: 6px;
    line-height: 19px;
    .icon_tool_icon {
      display: inline-block;
      width: 30px;
      padding: 5px;
      i {
        font-size: 19px;
      }
    }
    .icon_tool_lable {
      text-align: left;
    }
  }
  .icon_tool_item:hover {
    background: rgba($color_gray, 0.3);
    color: $color_primary;
  }
}
</style>
