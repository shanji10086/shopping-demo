<template>
  <scroll-view class="election_list" scroll-y>
    <view class="election_item" v-for="(item, index) in dataObj" :key="item.id">
      <view class="election_img">
        <image class="eimage" mode="widthFix" :src="item.src"></image>
      </view>
      <view class="election_info">
        <view class="election_name">物品：{{ item.name }}</view>
        <view class="election_describe">描述：{{ item.describe }}</view>
        <view class="election_where">地点：{{ item.where }}</view>
        <view class="election_price">价格：{{ item.price }}元</view>
        <view class="ebtn">
          <button class="election_gouwuche" @click="butClick(index)">
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
  mounted() {
    this.getData();
  },
  methods: {
    // 获取数据库数据
    getData() {
      db.collection("commodity")
        .where({
          message: "election",
          show: 1,
        })
        .get()
        .then((res) => {
          this.dataObj = res.data;
        });
    },

    butClick(index) {
      console.log(this.dataObj[index]);
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
  },
};
</script>

<style>
.election_list {
  padding: 10rpx;
  height: calc(100vh - 70px);
}
.election_item {
  padding: 10rpx 0;
  display: flex;
}
.election_img {
  flex-grow: 1;
  padding: 10rpx;
}
.eimage {
  width: 300rpx;
  height: 300rpx !important;
}

.election_info {
  flex-grow: 2;
  padding: 0 10rpx;
}
.election_name {
  font-size: 30rpx;
  color: #000;
  padding: 10rpx 0;
}

.election_press {
  padding: 10rpx 0;
  font-size: 30rpx;
}
.election_where {
  padding: 10rpx 0;
  font-size: 30rpx;
}
.election_price {
  padding: 10rpx 0;
  font-size: 30rpx;
}
.election_gouwuche {
  width: 187px;
  height: 46px;
}
</style>
