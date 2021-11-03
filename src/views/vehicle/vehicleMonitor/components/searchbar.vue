<template>
  <div class="searchbar_container">
    <div class="searchbar_group ground_glass">
      <div class="search_left_type">
        <el-dropdown trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            {{ type }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="车辆">车辆</el-dropdown-item>
            <el-dropdown-item command="地物">地物</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="search_center">
        <el-autocomplete
          class="inline-input"
          v-model="searchValue"
          :fetch-suggestions="querySearch"
          placeholder="请输入车牌号、归属地"
          @select="handleSelect"
          @focus="betterSearchShow = false"
        >
          <!-- 清空 -->
          <i
            slot="suffix"
            class="iconfont icon_a-lujing2663 search_tool_icon"
            @click="deleteFn"
            v-if="!loading && !hasSearch && searchValue"
          ></i>
          <!-- loading -->
          <i
            slot="suffix"
            class="iconfont icon_a-zu415 search_tool_icon"
            v-if="loading && hasSearch"
          ></i>
          <!-- 删除并重置 -->
          <i
            slot="suffix"
            class="iconfont icon_a-zujian4313 search_tool_icon"
            @click="reloadFn"
            v-if="!loading && hasSearch && searchValue"
          ></i>
          <!-- 放大镜 -->
          <i
            slot="suffix"
            class="iconfont icon_fangdajing search_icon"
            @click="searchFn"
          ></i>
        </el-autocomplete>
      </div>
      <div class="search_right">
        <span
          class="search_right_span"
          v-if="!betterSearchShow"
          @click="betterSearchFn()"
          >高级搜索</span
        >
        <div v-if="betterSearchShow" @click="betterSearchFn()">
          <span class="search_right_span">收起</span>
          <i class="iconfont icon_xialajiantou"></i>
        </div>
      </div>
    </div>
    <transition name="fade-fromUp" mode="out-in">
      <div class="searchbar_better_group ground_glass" v-if="betterSearchShow">
        <div class="better_title">
          筛选条件
        </div>
        <div class="better_checked_result" v-if="resultValueBox.length > 0">
          <div
            v-for="item in resultValueBox"
            :key="item.id"
            class="checked_item"
          >
            <span>{{ item.value }}</span>
            <i
              class="iconfont icon_a-zujian4313"
              @click="deleteResultValue(item)"
            ></i>
          </div>
        </div>
        <div
          class="better_checked_reload"
          v-if="resultValueBox.length > 0"
          @click="betterReloadFn"
        >
          <span>重置</span>
          <i class="iconfont icon_a-zu399"></i>
        </div>

        <div v-for="(item, index) in searchJson" :key="index">
          <div class="better_center">
            <div class="better_center_title">
              {{ item.title }}
            </div>
            <div
              class="better_center_value "
              :class="!item.isSubShow ? 'better_center_value_close' : ''"
            >
              <div
                v-for="sub in item.subItems"
                :key="sub.id"
                class="better_center_value_item"
                :class="sub.select ? 'better_center_item_active' : ''"
                @click="valueClick(sub, item.subItems)"
              >
                <span>{{ sub.value }}</span>
              </div>
            </div>
            <div
              class="better_center_more"
              v-if="item.title != '是否黄标车' && item.title != '既定轨迹'"
              @click="showToggle(item, index)"
            >
              <span>{{ !item.isSubShow ? "更多" : "收起" }}</span>
              <i
                class="iconfont left_toolbar_icon "
                :class="
                  !item.isSubShow
                    ? 'icon_xialajiantou'
                    : 'icon_shanglajiantou-copy'
                "
              ></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import searchJson from "@/common/vehicle/assets/js/cartype.json";
import Bus from "@/common/vehicle/common/js/Bus.js";
export default {
  data() {
    return {
      type: "车辆",
      loading: false,
      hasSearch: false, //已搜索
      betterSearchShow: false, //高级搜索
      searchJson: searchJson, //车辆类型
      resultValueBox: [], //已选择的值
      valueArr: [], //筛选条件新数组
      restaurants: [],
      searchValue: ""
    };
  },
  mounted() {
    this.restaurants = this.loadAll();
  },
  methods: {
    //切换搜索类型
    handleCommand(command) {
      this.type = command;
    },
    //高级搜索
    betterSearchFn() {
      this.betterSearchShow = !this.betterSearchShow;
    },
    //已筛选-删除
    deleteResultValue(val) {
      if (this.resultValueBox.includes(val)) {
        this.resultValueBox = this.resultValueBox.filter(function(ele) {
          return ele != val;
        });
      }
      this.searchJson.forEach(valItem => {
        valItem.subItems.forEach(item => {
          if (valItem.subItems.includes(val)) {
            item.select = false;
          }
        });
      });
    },
    //高级筛--重置
    betterReloadFn() {
      this.resultValueBox = [];
      this.searchJson.forEach(val => {
        val.subItems.forEach(item => {
          if (item.value == "不限") {
            item.select = true;
          } else {
            item.select = false;
          }
        });
      });
    },
    // 更多-点击展开折叠菜单事件
    showToggle(item, ind) {
      this.searchJson.forEach(i => {
        if (i.isSubShow !== this.searchJson[ind].isSubShow) {
          i.isSubShow = false;
        }
      });
      item.isSubShow = !item.isSubShow;
    },
    //点击筛选条件
    valueClick(val, list) {
      if (val.value == "不限") {
        //点不限，该类其它选项变为未选中
        this.searchJson.forEach(valItem => {
          if (valItem.subItems == list) {
            valItem.subItems.forEach(item => {
              item.select = false;
            });
          }
        });
        //并删除已选择结果的选项
        list.forEach(item => {
          this.resultValueBox = this.resultValueBox.filter(function(ele) {
            return ele != item;
          });
        });
        val.select = true;
        console.log(this.resultValueBox, " this.resultValueBox ");
      } else {
        val.select = !val.select;
        //点其它选项，不限选项变为未选中
        this.searchJson.forEach(valItem => {
          if (valItem.subItems == list) {
            valItem.subItems.forEach(item => {
              if (item.value == "不限") {
                item.select = false;
              }
            });
          }
        });
        //将选项添加到已选结果中
        if (this.resultValueBox.includes(val)) {
          this.resultValueBox = this.resultValueBox.filter(function(ele) {
            return ele != val;
          });
        } else {
          this.resultValueBox.push(val);
        }
      }
    },
    //清除
    deleteFn() {
      this.searchValue = "";
    },
    //搜索
    searchFn() {
      this.hasSearch = true;
      Bus.$emit("openRight", true);
      if (!this.betterSearchShow) {
        Bus.$emit("createVehicle", 0);
      } else {
        Bus.$emit("createVehicle", 1);
      }
    },
    //删除并重置
    reloadFn() {
      this.hasSearch = false;
      Bus.$emit("openRight", false);
      this.searchValue = "";
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    loadAll() {
      return [
        { value: "津A·31415", address: "长宁区新渔路144号" },
        {
          value: "北辰区",
          address: "上海市长宁区淞虹路661号"
        },
        {
          value: "天津市",
          address: "上海市普陀区真北路988号创邑金沙谷6号楼113"
        },
        { value: "津B·6328C", address: "天山西路438号" },
        {
          value: "天津市呜呼啊哈车辆管理有限公司",
          address: "上海市长宁区金钟路968号1幢18号楼一层商铺18-101"
        },
        {
          value: "天津市北辰区消防第三支队",
          address: "上海市长宁区金钟路633号"
        },
        {
          value: "蒙A·94618 ",
          address: "上海市嘉定区曹安公路曹安路1685号"
        }
      ];
    },
    handleSelect(item) {
      console.log(item);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/common/vehicle/styles/index.scss";
.searchbar_container {
  width: 452px;
  height: 48px;
  position: absolute;
  top: 20px;
  left: 90px;
}
.searchbar_group {
  box-sizing: border-box;
  padding: 5px 15px;
  border-radius: 12px;
  .search_left_type {
    display: inline-block;
    width: 70px;
    border-right: 1px solid $color_gray;
    cursor: pointer;
    span {
      font-size: 14px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      line-height: 15px;
      color: $color_text_major;
      margin-right: 10px;
    }
  }
  .search_center {
    display: inline-block;
    width: 275px;
    .search_tool_icon {
      font-size: 15px;
      color: $color_gray;
      cursor: pointer;
      position: absolute;
      right: 40px;
      top: 12px;
    }
    .search_icon {
      font-size: 21px;
      color: $color_gray;
      line-height: 40px;
      cursor: pointer;
      margin-right: 8px;
    }
  }
  .search_right {
    display: inline-block;
    width: 56px;
    border-left: 1px solid $color_gray;
    cursor: pointer;
    padding-left: 15px;
    color: $color_text_major;
    i {
      font-size: 10px;
      margin-left: 10px;
      // color: $color_text_minor;
    }
  }
  .search_right:hover {
    color: $color_primary;
  }
}
.searchbar_better_group {
  width: 890px;
  // height: 400px;
  padding: 20px;
  box-sizing: border-box;
  position: absolute;
  top: 60px;
  left: 0px;
  border-radius: 12px;
  .better_title {
    font-size: 14px;
    font-weight: bold;
    line-height: 15px;
    color: $color_text_major;
    margin-bottom: 10px;
  }
  .better_checked_result {
    width: calc(100% - 70px);
    padding: 5px 0;
    display: inline-block;
    .checked_item {
      border-radius: 6px;
      background: $color_primary;
      color: $color_bg;
      padding: 5px 10px;
      display: inline-block;
      margin: 5px 9px 5px 0;
      span {
        margin-right: 8px;
      }
      i {
        cursor: pointer;
      }
    }
  }
  .better_checked_reload {
    display: inline-block;
    width: 52px;
    cursor: pointer;
    padding-left: 18px;
    color: $color_text_major;
    // vertical-align:top;
    span {
      margin-right: 8px;
    }
  }
  .better_checked_reload:hover {
    color: $color_primary;
  }
  .better_center {
    // padding: 10px 0;
    .better_center_title {
      width: 80px;
      height: 20px;
      display: inline-block;
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      color: $color_text_minor;
      vertical-align: top;
      margin: 10px 0px 10px 0;
    }
    .better_center_value {
      display: inline-block;
      width: calc(100% - 150px);
      .better_center_value_item {
        display: inline-block;
        border-radius: 6px;
        cursor: pointer;
        padding: 5px 10px;
        margin: 3px 6px 3px 0;
      }
      .better_center_value_item:hover {
        background: rgba($color_bg_active_other, 0.35);
        color: $color_primary;
      }
      .better_center_item_active {
        background: rgba($color_bg_active_other, 0.35);
        color: $color_primary;
      }
    }
    .better_center_value_close {
      height: 36px;
      overflow: hidden;
    }
    .better_center_more {
      display: inline-block;
      width: 52px;
      cursor: pointer;
      padding-left: 18px;
      color: $color_text_minor;
      vertical-align: top;
      margin: 10px 0px 10px 0;
      span {
        margin-right: 8px;
      }
    }
  }
}
.left_toolbar_icon {
  font-size: 10px;
  color: $color_text_minor;
  font-weight: 100;
}
</style>
