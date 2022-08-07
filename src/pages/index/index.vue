<template>
  <view class="content">
    <input
      @click="seaRch()"
      type="text"
      confirm-type="search"
      class="search"
      placeholder="请输入关键字"
    />

    <scroll-view class="recommend" scroll-y>
      <uni-segmented-control
        :current="current"
        :values="items.map((v) => v.title)"
        @clickItem="onclickItem"
        style-type="text"
        active-color="#4cd964"
      ></uni-segmented-control>
      <view>
        <view v-if="current === 0"> <book></book></view>
        <view v-if="current === 1"><election></election></view>
        <view v-if="current === 2"><life></life></view>
        <view v-if="current === 3"> <car></car></view>
        <view v-if="current === 4"> <any></any></view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
// 引入分段器
import { uniSegmentedControl } from "@dcloudio/uni-ui";
// 引入组件
import book from "./index/book/book";
import election from "./index/election/election";
import car from "./index/car/car";
import life from "./index/life/life";
import any from "./index/any/any";

export default {
  data() {
    return {
      items: [
        { title: "二手书" },
        { title: "电子产品" },
        { title: "生活用品" },
        { title: "二手车" },
        { title: "其他" },
      ],
      current: 0,
      bookid: "",
    };
  },
  components: {
    uniSegmentedControl,
    book,
    election,
    car,
    life,
    any,
  },
  // mounted() {
  //   bus.$on("val", (val) => {
  //     bus.a = val;
  //   });
  // },
  methods: {
    //   分段器方法

    onclickItem(e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex;
      }
    },
    // 搜索
    seaRch() {
      wx.navigateTo({
        url: "../search/search",
      });
    },

    // 发送数据给购物车
    // bookData(a) {
    //   this.bookid = a;
    //   bus.$emit("val", this.bookid);
    // },
  },
};
</script>

<style>
.search {
  width: 738rpx;
  border: 6rpx solid rgb(201, 199, 199);
  border-radius: 10rpx;
}
.recommend {
  height: calc(100vh - 29px);
}
</style>
