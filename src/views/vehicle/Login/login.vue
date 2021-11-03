<template>
  <div class="app_container">
    <video
      id="videoLogin"
      muted
      autoplay
      loop
      style="position: absolute;width: 100%; height:100%; object-fit: fill"
    >
      <source :src="$loginVideo" />
    </video>

    <div class="main">
      <img class="topImage" src="@/common/vehicle/assets/svg/login-logo.svg" />
      <div class="loginMain">
        <div class="flexCol">
          <!-- 蓝色 -->
          <div class="blue"></div>
          <!-- 宣传语 -->
          <span class="logotext">专注行业领域， 因为专注所以专业 </span>
        </div>

        <div class="input login-input">
          <div class="flex-center" style="height:44px">
            <p class="login-text">
              登录
            </p>
            <img class="login-QR" src="@/common/vehicle/assets/svg/QRcode.svg" />
          </div>
          <div class="mt29">
            <el-input
              v-model="account"
              placeholder="请输入账号"
              @focus="focus(1)"
              @blur="blur"
            ></el-input>
            <div class="line" :style="{ background: accountColor }"></div>
          </div>
          <div class="mt29">
            <el-input
              v-model="password"
              placeholder="请输入密码"
              @focus="focus(2)"
              @blur="blur"
            ></el-input>
            <div class="line" :style="{ background: passwordColor }"></div>
          </div>
          <div class="flex-center mt29">
            <div class="flexCol" style="width: 160px">
              <el-input
                v-model="Qcode"
                placeholder="请输入验证码"
                @focus="focus(3)"
                @blur="blur"
              ></el-input>
              <div class="line" :style="{ background: QcodeColor }"></div>
            </div>
            <img class="code" src="@/common/vehicle/assets/svg/7364.svg" />
            <img class="refresh" src="@/common/vehicle/assets/svg/refresh.svg" />
          </div>

          <div class="midMian">
            <div class="flex-center" @click="rememberpwd">
              <img
                v-if="loginSelect"
                class="login-nomal"
                src="@/common/vehicle/assets/svg/login-select.svg"
              />
              <img
                v-else
                class="login-nomal"
                src="@/common/vehicle/assets/svg/login-nomal.svg"
              />
              <span class="login-textcode ml15">记住我的登录信息</span>
            </div>
            <span class="login-textcode">
              忘记密码？
            </span>
          </div>
          <div @click="login" class="login-button">
            <p class="login-buttontext">登录</p>
          </div>
        </div>
      </div>

      <div class="bottom-main">
        <span class="bottom-text"
          >Copyright2021-2026 @ 天津拓甫科技股份有限公司
          津ICP备14047939号-2</span
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      account: '',
      password: '',
      Qcode: '',
      accountColor: '',
      passwordColor: '',
      QcodeColor: '',
      loginSelect: false
    }
  },
  mounted() {
    let video = document.getElementById("videoLogin");
    video.addEventListener(
      "canplay",
      () => {
        console.log('可以播放');
        video.play();
      },
      false
    );
    video.addEventListener(
      "pause",
      () => {
        console.log('暂停了续播');
        video.play();
      },
      false
    );
  },
  methods: {
    login () {
      this.$router.push('/vehicleMonitor')
    },
    focus (index) {
      switch (index) {
        case 1:
          this.accountColor = 'rgba(255, 255, 255, 1)'
          break
        case 2:
          this.passwordColor = 'rgba(255, 255, 255, 1)'
          break
        default:
          this.QcodeColor = 'rgba(255, 255, 255, 1)'
          break
      }
    },
    blur () {
      this.accountColor = 'rgba(255, 255, 255, 0.3)'
      this.QcodeColor = 'rgba(255, 255, 255, 0.3)'
      this.passwordColor = 'rgba(255, 255, 255, 0.3)'
    },
    rememberpwd () {
      console.log(this.loginSelect)
      this.loginSelect = !this.loginSelect
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/common/vehicle/styles/index.scss";
.main {
  position: absolute;
 height: 100%;
 width: 100%;
  // height: 1080px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.2);
}
.flexCol {
  display: flex;
  flex-direction: column;
}
.topImage {
  width: 304px;
  height: 30px;
  margin-left: 36px;
  margin-top: 36px;
}
.loginMain {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.blue {
  width: 46px;
  height: 8px;
  background: #2154f4;
}
.logotext {
  font-weight: bold;
  font-size: 67px;
  text-align: left;
  color: #fff;
  margin-top: 50px;
  width: 536px;
  line-height: 107px;
}
.login-input {
  width: 300px;
  // height: 405px;
  border-radius: 16px;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 50px;
  backdrop-filter: blur(7px);
}
.input {
  ::v-deep .el-input__inner {
    padding: 0px !important;
    color: #fff;
    font-size: 14px;
  }

  ::v-deep .el-input__inner {
    &::placeholder {
      color: rgba(255, 255, 255, 0.3);
    }

    &::-webkit-input-placeholder {
      /* WebKit browsers 适配谷歌 */
      color: rgba(255, 255, 255, 0.3);
    }

    &:-moz-placeholder {
      /* Mozilla Firefox 4 to 18 适配火狐 */
      color: rgba(255, 255, 255, 0.3);
    }

    &::-moz-placeholder {
      /* Mozilla Firefox 19+ 适配火狐 */
      color: rgba(255, 255, 255, 0.3);
    }

    &:-ms-input-placeholder {
      /* Internet Explorer 10+  适配ie*/
      color: rgba(255, 255, 255, 0.6);
    }
  }
}

.flex-center {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.login-text {
  font-weight: bold;
  font-size: 22px;
  color: rgb(255, 255, 255);
}

.login-QR {
  width: 22px;
  height: 22px;
}

.line {
  background: rgba(255, 255, 255, 0.3);
  height: 1px;
  margin-top: 5px;
}

.mt29 {
  margin-top: 15px;
}

.code {
  width: 79px;
  height: 40px;
}

.refresh {
  width: 16px;
  height: 16px;
  margin-right: 10px;
  margin-left: 20px;
}

.midMian {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 23px;
}

.login-nomal {
  width: 18px;
  height: 18px;
  cursor: pointer;
}
.login-textcode {
  font-size: 12px;
  color: #ebebeb;
}

.ml15 {
  margin-left: 15px;
}
.login-button {
  display: flex;
  margin-top: 40px;
  border-radius: 12px;
  height: 50px;
  background-color: rgb(33, 84, 244);
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.login-buttontext {
  font-size: 16px;
  color: #fff;
}

.bottom-main {
  display: flex;
  width: 100%;
  justify-content: center;
}
.bottom-text {
  font-weight: normal;
  font-size: 14px;
  text-align: center;
  color: #fff;
  opacity: 0.6;
  margin-bottom: 20px;
  z-index: 190;
}
</style>
