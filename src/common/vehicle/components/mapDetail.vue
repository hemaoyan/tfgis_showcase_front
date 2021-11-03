<template>
  <div class="div_map_detail ground_glass" v-if="detailShow">
    <div class="detail_wrapper">
      <div class="detai_close" @click="closeFn">
        <i class="iconfont icon_a-zujian4313"></i>
      </div>
      <div class="detai_img">
        <img src="@/common/vehicle/assets/img/speed_blue.png" />
        <div class="detail_img_item">
          <span class="detail_img_value">25</span>
          <span class="detail_img_unit">km/h</span>
        </div>
      </div>
      <div class="detail_item">
        <div class="detail_label">车牌号</div>
        <div class="detail_value">津A·87327</div>
      </div>
      <div class="detail_item">
        <div class="detail_label">状态</div>
        <div class="detail_value">在线</div>
      </div>
      <div class="detail_item">
        <div class="detail_label">方向</div>
        <div class="detail_value">东北</div>
      </div>
      <div class="detail_item">
        <div class="detail_label">定位时间</div>
        <div class="detail_value">2019-08-05 17:00:00</div>
      </div>
      <div class="detail_item">
        <div class="detail_label">坐标</div>
        <div class="detail_value">117.138795,39.228909</div>
      </div>
      <div class="detail_warn" v-if="warnShow">
        <div class="detail_warn_item">
          <img src="@/common/vehicle/assets/img/ycbj.png" />
          <div class="detail_warn_value detail_warn_values detail_warn_active">
            连续行驶 4h30min
          </div>
        </div>
        <div class="detail_warn_item">
          <div class="detail_warn_value">超速行驶，已超速12分钟</div>
        </div>
        <div class="detail_warn_item">
          <div class="detail_warn_value">疲劳驾驶，已疲劳驾驶30分钟</div>
        </div>
        <div class="detail_warn_item">
          <div class="detail_warn_value">
            未报备驶入，易燃易爆物运输车未报备驶入
          </div>
        </div>
      </div>
      <div class="detail_bottom">
        <i class="iconfont icon_a-zujian465 icon_bottom"></i>
        <i class="iconfont icon_a-zujian475 icon_bottom"></i>
        <i class="iconfont icon_cheliangguanzhu-1 guanzhu"></i>
      </div>
    </div>
  </div>
</template>

<script>
import Bus from "@/common/vehicle/common/js/Bus.js";
export default {
  data() {
    return {
      detailShow: false,
      openBottom: true,
      warnShow: true
    };
  },
  mounted() {
    //接收侧边栏状态
    Bus.$on("openBottomVehicle", item => {
      this.openBottom = item;
    });
  },
  methods: {
    //关闭
    closeFn() {
      this.detailShow = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/common/vehicle/styles/index.scss";
.div_map_detail {
  border-radius: 12px;
  font-size: 20px;
  position: absolute;
  bottom: calc(50% + 10px);
  left: calc(50% + 10px);
  padding: 14px 20px;
  width: 320px;
  //   height: 280px;
  box-sizing: border-box;
  .detail_wrapper {
    position: relative;
    .detai_close {
      position: absolute;
      top: -6px;
      right: -2px;
      cursor: pointer;
      color: $color_text_minor;
    }
    .detai_close:hover {
      color: $color_primary;
    }
    .detai_img {
      position: absolute;
      top: 26px;
      right: 22px;
      .detail_img_item {
        position: absolute;
        top: 9px;
        right: 1px;
        line-height: 4px;
        .detail_img_value {
          display: inline-block;
          width: 100%;
          font-size: 14px;
          font-family: Source Han Sans CN;
          font-weight: bold;
          line-height: 15px;
          color: #3056eb;
          text-align: center;
        }
        .detail_img_unit {
          display: inline-block;
          width: 100%;
          font-size: 10px;
          font-family: Source Han Sans CN;
          font-weight: 500;
          line-height: 15px;
          color: #3056eb;
          text-align: center;
        }
      }
    }
    .detail_item {
      line-height: 20px;
      display: inline-block;
      width: 100%;
      font-size: 12px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      .detail_label {
        width: 60px;
        display: inline-block;
        color: $color_text_minor;
      }
      .detail_value {
        display: inline-block;
        width: calc(100% - 63px);
        color: $color_text_major;
      }
    }
    .detail_warn {
      width: 94%;
      display: inline-block;
      font-size: 12px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      padding: 3px 0 0 32px;
      .detail_warn_item {
        line-height: 24px;
        display: inline-block;
        img {
          display: inline-block;
          margin-right: 10px;
        }
        .detail_warn_value {
          display: inline-block;
          color: $color_text_minor;
          margin-left: 26px;
        }
        .detail_warn_values {
          margin-left: 0px;
        }
        .detail_warn_active {
          color: #ff6464;
        }
      }
    }
    .detail_bottom {
      color: $color_text_major;
      margin-top: 10px;
      .icon_bottom {
        margin-right: 10px;
        font-size: 20px;
        cursor: pointer;
      }
      .icon_bottom:hover {
        color: $color_primary;
      }
      .guanzhu {
        color: #d65858;
        float: right;
        margin-top: 3px;
        font-size: 20px;
        cursor: pointer;
      }
    }
  }
}
</style>
