<template>
  <view class="top" v-if="show == 1">
    <!-- 二手书展示 -->
    <view class="album_list">
      <view class="album_item" v-for="(item, index) in bookObj" :key="item.id">
        <view class="album_checkbox">
          <checkbox-group @change="checked">
            <checkbox @click="checkClick(index)" :value="r1"></checkbox>
          </checkbox-group>
        </view>
        <view class="album_img">
          <image class="vimage" mode="widthFix" :src="item.src"></image>
        </view>
        <view class="album_info">
          <view class="album_name" v-if="item.name">书名：{{ item.name }}</view>
          <view class="album_aunthor" v-if="item.author"
            >作者：{{ item.author }}</view
          >
          <view class="album_aunthor" v-if="item.describe"
            >描述:{{ item.describe }}</view
          >
          <view class="album_press" v-if="item.press"
            >出版社：{{ item.press }}</view
          >
          <view class="album_where">地点：{{ item.where }}</view>
          <view class="album_price">价格：{{ item.price }}元</view>
        </view>
      </view>
    </view>

    <view class="album_bottom">
      <view class="album_bottomPrice">价格：{{ sum }}元</view>
      <view class="album_bootom_click">
        <button @click="pay">结算</button></view
      >
    </view>
  </view>
</template>

<script>
// 引入混入组件
import Mixin from "@/mixin/mixin";
// 链接数据库
const db = wx.cloud.database();

// import bus from "../bus/bus";

// 获取元素
export default {
  mixins: [Mixin],
  data() {
    return {
      prcie: 0,
      bookObj: [],
      r1: 1,
      num1: 0,
      num: 0,
    };
  },
  //   组件挂载完毕
  mounted() {
    // 修改页面标题
    uni.setNavigationBarTitle({ title: "购物车" });

    // this.dataId = bus.a;
    // this.getBookdata();
    // bus.$on("val", (val) => {
    //   this.dataId = val;
    //   this.getBookdata();
    // });
  },

  methods: {
    onTabItemTap() {
      this.getData();
    },
    // 获取购物车数据库中的数据
    getData() {
      if (this.show == 1) {
        db.collection("gouwuche-book")
          .where({
            number: this.number,
          })
          .get()
          .then((res) => {
            this.bookObj = res.data;
          });
      }
    },

    checked(e) {
      this.num1 = e.detail.value;
    },
    // 单选按钮
    checkClick(index) {
      this.price = this.bookObj[index].price;
      if (this.num1 == 1) {
        this.num = this.num + Number(this.price);
      } else {
        this.num = this.num - Number(this.price);
      }
    },

    pay() {},
  },

  computed: {
    sum() {
      return this.num;
    },
  },
};
</script>

<style>
.album_list {
  padding: 10rpx;
  height: calc(100vh + 150px);
}

.album_item {
  padding: 10rpx 0;
  display: flex;
}
.album_img {
  width: 188px;
  padding: 10rpx;
}
.vimage {
  width: 330rpx;
  height: 330rpx !important;
}

.album_info {
  flex-grow: 2;
  padding: 0 10rpx;
}
.album_name {
  font-size: 30rpx;
  color: #000;
  padding: 10rpx 0;
}
.album_aunthor {
  padding: 10rpx 0;
  font-size: 30rpx;
}
.album_press {
  padding: 10rpx 0;
  font-size: 30rpx;
}
.album_where {
  padding: 10rpx 0;
  font-size: 30rpx;
}
.album_price {
  padding: 10rpx 0;
  font-size: 30rpx;
}
.album_checkbox {
  margin-top: 90px;
}
.remove {
  margin-top: 30rpx;
}

.album_bottom {
  width: 100%;
  font-size: 35rpx;
  display: flex;
  position: fixed;
  bottom: 0;
}
.album_bottomPrice {
  margin-bottom: 0px;
  line-height: 46px;
}
.album_bootom_click {
  flex: 1;
}
</style>
