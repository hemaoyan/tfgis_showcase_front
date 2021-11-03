<template>
  <div
    class="div_map_function_bar"
    :class="
      !openBottom ? 'div_map_function_bar_down' : 'div_map_function_bar_up'
    "
  >
    <div
      v-for="(item, index) in list_tool"
      :key="index"
      class="div_map_function_zoom ground_glass mg_b_15"
      @click="indexTool = index"
    >
      <div class="icon_container">
        <el-tooltip
          class="item"
          effect="dark"
          :content="item.name"
          placement="right"
          trigger="hover"
          :open-delay="500"
          :visible-arrow="false"
        >
          <img
            class="zhinanzhen"
            v-if="item.name == '指南针'"
            src="@/common/vehicle/assets/img/zhinanzhen.png"
            @click="clickHandle('/vehicleAnalysis');"
          />
          <i
            v-else
            class="iconfont left_toolbar_icon"
            :class="item.className"
          ></i>
        </el-tooltip>
      </div>
    </div>
    <div class="div_map_function_zoom ground_glass">
      <div
        v-for="(item, index) in list_zoom"
        :key="index"
        class="icon_container"
        @click="indexTool = index"
      >
        <el-tooltip
          class="item"
          effect="dark"
          :content="item.name"
          placement="right"
          trigger="hover"
          :open-delay="500"
          :visible-arrow="false"
        >
          <i class="iconfont left_toolbar_icon" :class="item.className"></i>
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
      indexTool: 0,
      openBottom: true,
      list_tool: [
        {
          name: "指南针",
          className: "icon_a-zu332"
        },
        {
          name: "定位",
          className: "icon_a-lujing472"
        }
      ],
      list_zoom: [
        {
          name: "放大",
          className: "icon_a-zu327"
        },
        {
          name: "缩小",
          className: "icon_a-zu6796"
        }
      ]
    };
  },
  mounted() {
    //接收侧边栏状态
    Bus.$on("openBottomVehicle", item => {
      this.openBottom = item;
    });
    Bus.$on("openRight", item => {
      this.openBottom = !item;
    });
  },
  methods: {
    clickHandle :function (path) {
      this.$router.push({
          path: path
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/common/vehicle/styles/index.scss";
.div_map_function_bar {
  font-size: 20px;
  position: absolute;
  bottom: 240px;
  left: 20px;
}
.div_map_function_bar_down {
  bottom: 20px;
  transition: bottom 0.5s;
}
.div_map_function_bar_up {
  bottom: 240px;
  transition: bottom 0.5s;
}
.div_map_function_zoom {
  border-radius: 10px;
}
.zhinanzhen {
  width: 10px;
}
</style>
