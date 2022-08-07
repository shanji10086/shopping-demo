// 判断是否登录方法

let Mixins = {
  data() {
    return {
      show: "",
      number: "",
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      var that = this;
      wx.getStorage({
        key: "userInfo",
        success(res) {
          that.number = res.data.number;
          that.show = 1;
        },
        fail(res) {
          that.show = 0;
        },
      });
    },
  },
};
export default Mixins;
