<template>
  <scroll-view class="album_list" scroll-y>
    <view class="album_item" v-for="(item, index) in dataObj" :key="item.index">
      <view class="album_img">
        <image class="vimage" mode="widthFix" :src="item.src"></image>
      </view>
      <view class="album_info">
        <view class="album_name" v-if="item.name">书名：{{ item.name }}</view>
        <view class="album_aunthor" v-if="item.author"
          >作者：{{ item.author }}</view
        >
        <view class="album_press" v-if="item.press"
          >出版社：{{ item.press }}</view
        >
        <view class="album_where" v-if="item.where"
          >地点：{{ item.where }}</view
        >
        <view class="album_price" v-if="item.price"
          >价格：{{ item.price }}元</view
        >

        <view class="btn">
          <button class="album_gouwuche" @click="butClick(index)">
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
      bookid: "",
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
          message: "book",
          show: 1,
        })
        .get()
        .then((res) => {
          this.dataObj = res.data;
        });
    },

    butClick(index) {
      if (this.show == 1) {
        const { name, author, press, price, where, src } = this.dataObj[index];
        // 添加数据到数据库;
        db.collection("gouwuche-book")
          .add({
            data: {
              name: name,
              author: author,
              press: press,
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
.album_list {
  padding: 10rpx;
  height: calc(100vh - 70px);
}
.album_item {
  padding: 10rpx 0;
  display: flex;
}
.album_img {
  padding: 10rpx;
  width: 188px;
}
.vimage {
  display: block;
  width: 330rpx;
  height: 228px !important;
}

.album_info {
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
.album_gouwuche {
  width: 374rpx;
  height: 46px;
}
</style>
