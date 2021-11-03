<!--
 * @Author: your name
 * @Date: 2021-11-02 14:19:22
 * @LastEditTime: 2021-11-02 15:59:44
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /tfgis_showcase_front/src/views/vehicle/vehicleMonitor/components/leftToolbar.vue
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
        trigger="hover"
        :open-delay="500"
        :visible-arrow="false"
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
      indexTool: 0,
      list_tool: [
        {
          name: "车辆实时监控",
          className: "icon_cheliangshishijiankong"
        },
        {
          name: "围栏监控",
          className: "icon_weilanjiankong"
        },
        {
          name: "车辆关注",
          className: "icon_cheliangguanzhu"
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
