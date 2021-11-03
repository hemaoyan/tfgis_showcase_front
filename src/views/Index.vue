<!--
 * @Author: 何茂岩
 * @Date: 2021-10-28 10:15:16
 * @LastEditTime: 2021-11-03 09:46:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /tfgis_showcase_front/src/views/Index.vue
-->
<template>
  <div>
    <transition name="fade-fromDown" mode="out-in">
      <el-row v-if="show" :gutter="60" class="row-ol">
        <el-col :span="8">
          <div class="col-ol" @click="clickHandle('/demoYinChuan')">
            <img src="@/assets/img/yinchuan.png" width="100%" height="250px">
            银川兴庆区
          </div>
        </el-col>
        <el-col :span="8">
          <div class="col-ol" @click="clickHandle('/demoTFProjectShow')">
            <img src="@/assets/img/demotfprojectshow.png" width="100%" height="250px">
            拓甫项目情况地图展示
          </div>
        </el-col>
        <el-col :span="8">
          <div class="col-ol" @click="clickHandle('/login')">
            <img src="@/assets/img/vehicle.png" width="100%" height="250px">
            车联云路
          </div>
        </el-col>
      </el-row>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'Index',

  components: {

  },
  data() {
    return {
      show: false,
    }
  },
  mounted() {
    // setInterval(() => {
      this.show = !this.show
    // }, 1000)
  },
  methods: {
    clickHandle :function (path) {
      this.$router.push({
          path: path
      });
    }
  }
    
}
</script>

<style lang="scss" scope>
.row-ol {
  margin: 50px 100px 0px 100px !important;
}
.col-ol {
  position: relative;
  text-align: center;
  padding: 20px;
  background: #fff;
  box-shadow: 0 3px 6px rgba(0,0,0,.16);
  border-radius: 8px;
  box-sizing: border-box;
  cursor: pointer;
}

.col-ol:hover {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-duration: var(--animate-duration);
  animation-duration: var(--animate-duration);
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-name: pulse;
  animation-name: pulse;
  -webkit-animation-timing-function: ease-in-out;
  animation-timing-function: ease-in-out;
  color: #2154F4;
}
</style>
