<template>
  <scroll-view class="album_list" scroll-y>
    <input
      @click="seaRch()"
      type="text"
      confirm-type="search"
      class="search"
      placeholder="请输入关键字"
    />
    <view class="album_item" v-for="(item, index) in dataObj" :key="item.id">
      <view class="album_img">
        <image class="vimage" mode="widthFix" :src="item.src"></image>
      </view>
      <view class="album_info">
        <view class="album_name">项目：{{ item.name }}</view>
        <view class="album_aunthor">描述：{{ item.describe }}</view>
        <view class="album_price">价格：{{ item.price }}元</view>
        <view class="btn">
          <button class="album_gouwuche" @click="btnClick(index)">
            加入购物车
          </button>
        </view>
      </view>
    </view>
  </scroll-view>
</template>

<script>
// 引入混入组件
import Mixin from "@/mixin/mixin";
// 链接数据库
const db = wx.cloud.database();

export default {
  mixins: [Mixin],
  data() {
    return {
      dataObj: [],
      show: "",
    };
  },
  //   组件挂载完毕

  methods: {
    onTabItemTap() {
      this.getData();
    },
    // 获取数据库数据
    getData() {
      db.collection("commodity")
        .where({
          message: "faxian",
          show: 1,
        })
        .get()
        .then((res) => {
          this.dataObj = res.data;
          console.log(this.dataObj);
        });
    },
    btnClick(index) {
      // var that = this;
      // wx.getStorage({
      //   key: "userInfo",
      //   success(res) {
      //     that.show = 1;
      //   },
      //   fail(res) {
      //     that.show = 0;
      //   },
      // });
      if (this.show == 1) {
        const { name, describe, price, where, src } = this.dataObj[index];
        // 添加数据到数据库
        db.collection("gouwuche-book")
          .add({
            data: {
              name: name,
              describe: describe,
              price: price,
              where: where,
              src: src,
              number: this.number,
            },
          })
          .then((res) => {
            wx.showModal({
              title: "提示",
              content: "已加入购物车",
              showCancel: false,
            });
          });
      } else {
        wx.showModal({
          title: "提示",
          content: "请登录",
          showCancel: false,
        });
      }
    },
    seaRch() {
      wx.navigateTo({
        url: "../search/search",
      });
    },
  },
};
</script>

<style>
.search {
  width: 738rpx;
  border: 6rpx solid rgb(201, 199, 199);
  border-radius: 10rpx;
}
.album_list {
  padding: 10rpx;
  height: calc(100vh - 29px);
}
.album_item {
  padding: 10rpx 0;
  display: flex;
}
.album_img {
  flex-grow: 1;
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
  word-wrap: break-word;
}
.album_price {
  font-size: 30rpx;
  color: #000;
  padding: 10rpx 0;
}
</style>
