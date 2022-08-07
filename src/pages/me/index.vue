<template>
  <view>
    <view v-if="login == 1" class="login"
      ><form @submit="btnSub">
        <input
          class="inputs"
          type="text"
          name="number"
          placeholder="请输入学号"
        />

        <input
          class="inputs"
          type="password"
          name="password"
          placeholder="请输入密码"
        />
        <button form-type="submit">登录</button>
      </form></view
    >
    <view v-if="login == 0">
      <view class="userId" v-if="userInfo.number">
        用户:{{ userInfo.number }}</view
      >
      <view class="aaaa">历史订单</view>
      <view class="bbbb" @click="administration">下架商品</view>
      <view class="bbbb" @click="administration1">上架商品</view>
      <button class="extButton" @click="ext">退出登录</button>
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
      userInfo: [],
      login: 1,
      dataObj: [],
    };
  },
  mounted() {
    // 修改页面标题
    uni.setNavigationBarTitle({ title: "个人中心" });
  },

  methods: {
    // 登录，获取用户信息
    btnSub(res) {
      //获取本地存储
      wx.setStorageSync("userInfo", res.detail.value);
      const { number, password } = res.detail.value;
      var that = this;
      // 查询是否在用户数据库里
      db.collection("user")
        .where({
          number: number,
          password: password,
        })
        .get()
        .then((res) => {
          if (res.data.length == 0) {
            wx.showModal({
              title: "提示",
              content: "用户名或密码不正确",
              showCancel: false,
            });
            wx.removeStorage({
              key: "userInfo",
            });
          } else {
            this.login = 0;
            wx.showModal({
              title: "提示",
              content: "登录成功",
              showCancel: false,
            });
            wx.getStorage({
              key: "userInfo",
              success(res) {
                that.userInfo = res.data;
              },
            });
          }
        });
    },
    ext() {
      this.login = 1;
      wx.removeStorage({
        key: "userInfo",
        success(res) {
          wx.showModal({
            title: "提示",
            content: "已退出",
            showCancel: false,
          });
        },
      });
    },
    //跳转管理页面
    administration() {
      wx.navigateTo({
        url: "../guanli/guanli",
      });
    },

    administration1() {
      wx.navigateTo({
        url: "../shangjia/shangjia",
      });
    },
  },
};
</script>

<style>
.login {
  margin-top: 50%;
}
.userId {
  margin: 20rpx;
  font-size: 30px;
  height: 40px;
}
.aaaa {
  border-style: solid none none none;
  height: 80rpx;
  text-align: center;
  line-height: 80rpx;
}
.bbbb {
  border-style: solid none none none;
  height: 80rpx;
  text-align: center;
  line-height: 80rpx;
}

.extButton {
  width: 100%;
  font-size: 35rpx;
  position: fixed;
  bottom: 0;
}
.inputs {
  border-bottom: 2px solid black;
  margin-top: 20rpx;
  margin-bottom: 40rpx;
}
</style>
