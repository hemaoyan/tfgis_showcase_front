<!--
 * @Author: 何茂岩
 * @Date: 2021-07-07 15:01:20
 * @LastEditTime: 2021-10-21 16:45:10
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /vue2-webgis-template/src/layout/index.vue
-->
<template>
  <div class="home">
    <div class="home-header">
      <headBar></headBar>
    </div>
    <router-view class="home-main"></router-view>
  </div>
</template>

<script>
import headBar from "./headbar";
export default {
  name: "Home",
  components: { headBar },
};
</script>

<style lang="scss">
@import "~@/styles/variables.scss";
.home {
  width: 100%;
  height: 100%;
}
.home-header {
  height: #{$headBarHeight};
  background-color: #{$color-bg};
}
.home-main {
  height: calc(100% - #{$headBarHeight});
  background-color: #{$color-bg-transparent};
  position: relative;
}
</style>
