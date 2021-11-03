<template>
  <div class="rightdetail_wraper">
    <div class="rightdetail_top">
      <div class="rightdetail_title">车辆信息</div>
      <div class="rightdetail_close" @click="closeFn">
        <i class="iconfont icon_a-zujian4313"></i>
      </div>
    </div>
    <div class="rightdetail_center">
      <div class="rightdetail_item">
        <div class="rightdetail_item_title">车辆牌照</div>
        <div class="rightdetail_item_value">津A·HJJA3</div>
      </div>
      <div class="rightdetail_item">
        <div class="rightdetail_item_title">品牌</div>
        <div class="rightdetail_item_value">奔驰</div>
      </div>
      <div class="rightdetail_item">
        <div class="rightdetail_item_title">业主名称</div>
        <div class="rightdetail_item_value">天津市公交三公司</div>
      </div>
      <div class="rightdetail_item">
        <div class="rightdetail_item_title">类型</div>
        <div class="rightdetail_item_value">班线客车</div>
      </div>
      <div class="rightdetail_item">
        <div class="rightdetail_item_title">吨位</div>
        <div class="rightdetail_item_value">16吨</div>
      </div>
      <div class="rightdetail_item">
        <div class="rightdetail_item_title">车辆照片</div>
        <div class="rightdetail_item_value">
          <img src="@/common/vehicle/assets/img/bus.png" />
        </div>
      </div>
      <div class="rightdetail_item">
        <div class="rightdetail_item_title">XXX字段</div>
        <div class="rightdetail_item_value">
          XXXXXXXXXXXXX的内容展示最长展示，太多换行 内容展示最长展示
        </div>
      </div>
      <div class="rightdetail_item">
        <div class="rightdetail_item_title">电子围栏</div>
        <div class="rightdetail_item_value weilan">查看详情</div>
      </div>
    </div>
    <div class="rightdetail_bottom">
      <img src="@/common/vehicle/assets/img/date.png" />
    </div>
  </div>
</template>

<script>
import Bus from "@/common/vehicle/common/js/Bus.js";
export default {
  data() {
    return {
      listData: [],
      loading: false,
      openRight: false, //右边栏开启开关
      detailbarShow: false //右边栏详情开关
    };
  },
  mounted() {},
  methods: {
    //关闭详情
    closeFn() {
      Bus.$emit("detailbarShow", false);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/common/vehicle/styles/index.scss";
.rightdetail_wraper {
  padding: 10px 20px 10px 30px;
  height: 100%;
  .rightdetail_top {
    width: 100%;
    display: inline-block;
    height: 30px;
    .rightdetail_title {
      float: left;
      box-sizing: border-box;
      width: 86px;
      color: $color_text_major;
      font-weight: bold;
    }
    .rightdetail_close {
      float: right;
      cursor: pointer;
    }
    .rightdetail_close:hover {
      color: $color_primary;
    }
  }
  .rightdetail_center {
    width: 100%;
    display: inline-block;
    .rightdetail_item {
      width: 100%;
      display: inline-block;
      font-size: 12px;
      line-height: 32px;
      .rightdetail_item_title {
        width: 80px;
        display: inline-block;
        vertical-align: top;
        color: $color_text_minor;
      }
      .rightdetail_item_value {
        width: calc(100% - 80px);
        display: inline-block;
        color: $color_text_major;
        word-wrap: break-word;
        word-break: normal;
        img {
          width: 85%;
          margin-top: 10px;
          border-radius: 4px;
        }
      }
      .weilan {
        cursor: pointer;
        color: $color_primary;
      }
    }
  }
  .rightdetail_bottom{
    margin: 20px 0 20px 0;
    img{
      width: 100%;
    }
  }
}
</style>
