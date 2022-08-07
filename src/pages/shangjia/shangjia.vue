<template>
  <scroll-view class="album_list" scroll-y>
    <view class="album_item" v-for="(item, index) in dataObj" :key="item.index">
      <view class="album_img">
        <image class="vimage" mode="widthFix" :src="item.src"></image>
      </view>
      <view class="album_info">
        <view class="album_name">物品名：{{ item.name }}</view>
        <view class="album_aunthor" v-if="item.author"
          >作者：{{ item.author }}</view
        >
        <view class="album_press" v-if="item.press"
          >出版社：{{ item.press }}</view
        >
        <view class="album_press" v-if="item.describe"
          >描述：{{ item.describe }}</view
        >
        <view class="album_where">地点：{{ item.where }}</view>
        <view class="album_price">价格：{{ item.price }}元</view>

        <view class="btn">
          <button class="album_btn" @click="btnClick(index)">上架</button>
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
      id: "",
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      db.collection("commodity")
        .where({
          number: this.number,
          show: 0,
        })
        .get()
        .then((res) => {
          this.dataObj = res.data;
        });
    },
    btnClick(index) {
      this.id = this.dataObj[index]._id;
      db.collection("commodity")
        .doc(this.id)
        .update({
          data: {
            show: 1,
          },
        })
        .then((res) => {
          wx.showModal({
            title: "提示",
            content: "已上架",
            showCancel: false,
          });
        });
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
.album_btn {
  width: 374rpx;
  height: 46px;
}
.album_btn1 {
  width: 374rpx;
  height: 46px;
}
</style>
