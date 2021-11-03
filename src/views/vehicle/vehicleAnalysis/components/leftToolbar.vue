<!--
 * @Author: your name
 * @Date: 2021-11-02 14:19:22
 * @LastEditTime: 2021-11-02 16:32:55
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /tfgis_showcase_front/src/views/vehicle/vehicleAnalysis/components/leftToolbar.vue
-->
<template>
  <div class="left_toolbar_container ground_glass pd_t_20 pd_b_20">
    <div
      v-for="(item, index) in list_tool"
      :key="index"
      class="icon_container  mg_10 mg_t_25 mg_b_25"
      @click="indexTool = index"
      :class="indexTool === index ? 'tool_icon_active' : ''"
    >
      <el-tooltip
        class="item"
        effect="dark"
        :content="item.name"
        placement="right"
      >
        <i class="iconfont left_toolbar_icon" :class="item.className"></i>
      </el-tooltip>
    </div>
   </div>
</template>

<script>
export default {
  data() {
    return {
      show: true,
      indexTool: 0,
      list_tool: [
        {
          name: "报警分析",
          className: "icon_baojingfenxi"
        },
        {
          name: "站区分析",
          className: "icon_zhanqufenxi"
        },
        {
          name: "路线分析",
          className: "icon_a-lujing604"
        },
        {
          name: "流向分析",
          className: "icon_liuxiangfenxi"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
@import "~@/common/vehicle/styles/index.scss";
.left_toolbar_container {
  position: absolute;
  top: 20px;
  left: 20px;
  border-radius: 12px;
}
.left_toolbar_icon {
  font-size: 24px;
}

</style>
