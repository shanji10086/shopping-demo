<template>
  <view>
    <!-- 单选框 -->
    <view
      >请选择要出售物品的类别：
      <radio-group @change="radioClick">
        <radio value="book">二手书</radio>
        <radio value="election">电子产品</radio>
        <radio value="life">生活用品</radio>
        <radio value="car">二手车辆</radio>
        <radio value="any">其他</radio>
        <radio value="faxian">资源</radio>
      </radio-group>
    </view>
    <!-- 二手书表单 -->
    <view v-if="message === 'book'"
      ><form @submit="btnSub">
        <input
          class="input1"
          type="text"
          name="name"
          placeholder="请输入书名"
        />
        <input
          class="input1"
          type="text"
          name="author"
          placeholder="请输入作者"
        />
        <input
          class="input1"
          type="text"
          name="press"
          placeholder="请输入出版社"
        />
        <input
          class="input1"
          type="text"
          name="price"
          placeholder="请输入价格"
        />
        <input
          class="input1"
          type="text"
          name="where"
          placeholder="请输入交易地点"
        />

        <view v-if="img"><img :src="img" /></view>
        <button @click="Image">上传图片</button>

        <button class="input1" type="primary" form-type="submit">提交</button>
      </form></view
    >
    <!-- 电子产品表单 -->
    <view v-else-if="message === 'election'">
      <form @submit="btnSub">
        <input
          class="input1"
          type="text"
          name="name"
          placeholder="请输入物品名"
        />

        <textarea
          class="input1"
          type="text"
          name="describe"
          placeholder="请输入物品详情"
        />
        <input
          class="input1"
          type="text"
          name="price"
          placeholder="请输入物品价格"
        />
        <input
          class="input1"
          type="text"
          name="where"
          placeholder="请输入交易地点"
        />
        <view v-if="img"><img :src="img" /></view>
        <button @click="Image">上传图片</button>
        <button class="input1" type="primary" form-type="submit">提交</button>
      </form>
    </view>
    <!-- 二手车辆表单 -->
    <view v-else-if="message === 'car'">
      <form @submit="btnSub">
        <input
          class="input1"
          type="text"
          name="name"
          placeholder="请输入物品名"
        />

        <textarea
          class="input1"
          type="text"
          name="describe"
          placeholder="请输入物品详情"
        />
        <input
          class="input1"
          type="text"
          name="price"
          placeholder="请输入物品价格"
        />
        <input
          class="input1"
          type="text"
          name="where"
          placeholder="请输入交易地点"
        />
        <view v-if="img"><img :src="img" /></view>
        <button @click="Image">上传图片</button>
        <button class="input1" type="primary" form-type="submit">提交</button>
      </form></view
    >
    <!-- 生活用品表单 -->
    <view v-else-if="message === 'life'">
      <form @submit="btnSub">
        <input
          class="input1"
          type="text"
          name="name"
          placeholder="请输入物品名"
        />

        <textarea
          class="input1"
          type="text"
          name="describe"
          placeholder="请输入物品详情"
        />
        <input
          class="input1"
          type="text"
          name="price"
          placeholder="请输入物品价格"
        />
        <input
          class="input1"
          type="text"
          name="where"
          placeholder="请输入交易地点"
        />
        <view v-if="img"><img :src="img" /></view>
        <button @click="Image">上传图片</button>
        <button class="input1" type="primary" form-type="submit">提交</button>
      </form></view
    >
    <!-- 其他表单 -->
    <view v-else-if="message === 'any'">
      <form @submit="btnSub">
        <input
          class="input1"
          type="text"
          name="name"
          placeholder="请输入物品名"
        />

        <textarea
          class="input1"
          type="text"
          name="describe"
          placeholder="请输入物品详情"
        />
        <input
          class="input1"
          type="text"
          name="price"
          placeholder="请输入物品价格"
        />
        <input
          class="input1"
          type="text"
          name="where"
          placeholder="请输入交易地点"
        />
        <view v-if="img"><img :src="img" /></view>
        <button @click="Image">上传图片</button>
        <button class="input1" type="primary" form-type="submit">提交</button>
      </form></view
    >
    <!-- 发现表单 -->
    <view v-else-if="message === 'faxian'">
      <form @submit="btnSub">
        <input
          class="input1"
          type="text"
          name="name"
          placeholder="请输入物品名"
        />

        <textarea
          class="input1"
          type="text"
          name="describe"
          placeholder="请输入物品详情"
        />
        <input
          class="input1"
          type="text"
          name="price"
          placeholder="请输入物品价格"
        />
        <view v-if="img"><img :src="img" /></view>
        <button @click="Image">上传图片</button>
        <button class="input1" type="primary" form-type="submit">提交</button>
      </form>
    </view>
  </view>
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
      message: "",
      img: "",

      number: "",
    };
  },

  methods: {
    // 点击单选框事件
    radioClick(e) {
      this.message = e.detail.value;
    },
    // 提交
    btnSub(res) {
      if (this.show == 1) {
        const { name, author, press, price, where, describe } =
          res.detail.value;

        // 添加数据到数据库
        db.collection("commodity")
          .add({
            data: {
              name: name,
              author: author,
              press: press,
              price: price,
              where: where,
              describe: describe,
              src: this.img,
              message: this.message,
              show: 1,
              number: this.number,
            },
          })
          .then((res) => {
            wx.showModal({
              title: "提示",
              content: "上架成功",
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

    //  上传图片
    Image() {
      var that = this;
      wx.chooseImage({
        count: 1,
        sourceType: ["album", "camera"],
        success(res) {
          wx.showLoading({
            title: "上传中",
          });
          const tempFilePaths = res.tempFilePaths;
          const fileName = Date.now() / 1000;

          wx.cloud.uploadFile({
            cloudPath: Date.now() + ".png",
            filePath: tempFilePaths[0], //文件路径
            success: function (res) {
              wx.hideLoading();
              that.img = res.fileID;
            },
          });
        },
      });
    },
  },
};
</script>
<style>
.input1 {
  padding: 10rpx;
  border-style: solid;
  margin-bottom: 20rpx;
  width: 50%;
}
</style>
