<template>
  <scorll-view scroll-y>
    <!-- 搜索框 -->
    <view class="tap">
      <!-- <view
        >请选择您要搜索的物品类型：
        
        <radio-group @change="radioClick">
          <radio value="book">二手书</radio>
          <radio value="election">电子产品</radio>
          <radio value="life">生活用品</radio>
          <radio value="car">二手车辆</radio>
          <radio value="any">其他</radio>
          <radio value="faxian">资源</radio>
        </radio-group>
      </view> -->
      <!-- 搜索框 -->
      <view class="search">
        <input
          type="text"
          placeholder-class="inputclass"
          confirm-type="search"
          focus="ture"
          placeholder="请输入关键字"
          v-model="searchdata"
          @confirm="onKeyInput"
        />
      </view>
      <view class="seAcch" @click="seArch()">搜索</view>
    </view>
    <!-- 二手书结果展示 -->
    <view class="album_list">
      <view
        class="album_item"
        v-for="(item, index) in bookData"
        :key="item.index"
      >
        <view class="album_img">
          <image class="vimage" mode="widthFix" :src="item.src"></image>
        </view>
        <view class="album_info">
          <view class="album_name">书名：{{ item.name }}</view>
          <view class="album_aunthor" v-if="item.author"
            >作者：{{ item.author }}</view
          >
          <view class="album_press" v-if="item.press"
            >出版社：{{ item.press }}</view
          >
          <view class="album_aunthor" v-if="item.describe"
            >描述：{{ item.describe }}</view
          >
          <view class="album_where" v-if="item.where"
            >地点：{{ item.where }}</view
          >
          <view class="album_price">价格：{{ item.price }}元</view>
          <view class="btn">
            <button class="album_gouwuche" @click="btnClick(index)">
              加入购物车
            </button>
          </view>
        </view>
      </view>
    </view>

    <view class="album_item" v-for="item in dataObj" :key="item.id">
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
  </scorll-view>
</template>
<script>
// 引入混入组件
import Mixin from "@/mixin/mixin";
// 链接数据库
const db = wx.cloud.database();
const _ = db.command;

export default {
  mixins: [Mixin],
  data() {
    return {
      searchdata: "",
      bookData: [],
      message1: "",
      messages: "",
    };
  },

  methods: {
    // 点击单选框事件
    radioClick(e) {
      this.message1 = e.detail.value;
    },
    // 点击搜索按钮触发
    seArch() {
      const searchkey = this.searchdata;
      this.searchData(searchkey);
    },
    // 键盘触发搜索
    onKeyInput(e) {
      const searchkey = e.detail.value;
      this.searchData(searchkey);
    },
    // 数据库搜索
    searchData(el) {
      db.collection("commodity")
        .where(
          _.or([
            {
              author: el,
            },
            {
              name: el,
            },
            {
              press: el,
            },
          ])
        )
        .get()
        .then((res) => {
          this.bookData = res.data;
          console.log(this.bookData);
          if (this.bookData == "") {
            wx.showModal({
              title: "提示",
              content: "未找到该物品",
              showCancel: false,
            });
          }
        });
    },
    //  加入二手书购物车按钮
    btnClick(index) {
      console.log("index", index);
      if (this.show == 1) {
        const { name, author, price, describe, where, src } =
          this.bookData[index];
        // 添加数据到数据库
        db.collection("gouwuche-book")
          .add({
            data: {
              name: name,
              author: author,
              price: price,
              where: where,
              describe: describe,
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
/* 二手书样式 */
@import "@/components/book.css";

.top {
  position: relative;
}
.search {
  position: absolute;
  width: calc(750rpx - 40px);
  border: 6rpx solid rgb(201, 199, 199);
  border-radius: 10rpx;
}
.seAcch {
  position: absolute;
  right: 0;
}
</style>
