// logs.ts
var util = require("../../utils/util.js");

let _context: any;

Page({
  data: {
    logs: [],
    curDay: "",
    addUserInfo: "",
    studyStatus: 0,
    isClicked: false,
  },
  onLoad() {
    _context = this;

    // 获取今天的时间
    let time = util.formatTime(new Date());
    const getDay = time.split(" ")[0];
    this.setData({
      curDay: getDay,
    });

    const db = wx.cloud.database();
    db.collection("todolist").get({
      success: (e: any) => {
        // console.log(e.data.pop()["curDay"], "test get something", getDay);
        if (e.data.pop()["curDay"] === getDay) {
          _context.data.isClicked = true;
        }
      },
    });
  },
  setUser: (e: any) => {
    _context.setData({
      addUserInfo: e.detail.value,
    });
  },
  addUser: () => {
    if (
      _context.data.addUserInfo === "test 2" || 
      _context.data.addUserInfo === "test 3"
      // 如果用户当天已经往数据库里插入消息了，此时就不能再插消息
    ) {
      // db.collection("todolist").add({
      //   data: {
      //     openid: _context.data.addUserInfo,
      //     done: true,
      //     curDay: _context.data.curDay,
      //   },
      //   success: () => {
      //     wx.navigateTo({
      //       url: "../index/index",
      //     });
      //   },
      // });
      wx.setStorage({
        key: "userId",
        data: _context.data.addUserInfo,
        success: () => {
          wx.navigateTo({
            url: "../index/index",
          });
        },
      });
    } else {
      wx.showModal({
        title: "邀请码不正确，请重新输入",
        showCancel: false,
      });
    }
  },
});
