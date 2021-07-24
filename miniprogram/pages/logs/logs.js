"use strict";
var util = require("../../utils/util.js");
var _context;
Page({
  data: {
    logs: [],
    curDay: "",
    addUserInfo: "",
    studyStatus: 0,
    isClicked: false,
  },
  onLoad: function () {
    _context = this;
    var time = util.formatTime(new Date());
    var getDay = time.split(" ")[0];
    this.setData({
      curDay: getDay,
    });
    var db = wx.cloud.database(); // 初始化
    console.log(db);
    db.collection("todolist").get({
      success: function (e) {
        if (e.data.pop()["curDay"] === getDay) {
          _context.data.isClicked = true;
        }
      },
    });
  },
  setUser: function (e) {
    _context.setData({
      addUserInfo: e.detail.value,
    });
  },
  addUser: function () {
    if (
      _context.data.addUserInfo === "test 2" ||
      _context.data.addUserInfo === "test 3"
    ) {
      wx.setStorage({
        key: "userId",
        data: _context.data.addUserInfo,
        success: function () {
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
