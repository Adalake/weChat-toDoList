// index.ts
// 获取应用实例

// TODO step 0: 输入邀请码验证，这样就可以按邀请码拉出该用户的打卡时间
// TODO step 1: 打勾，向数据库插入一条消息
// TODO step 2: 从数据库查询所有消息，并展示到页面

// TODO step 3: 验证当前日期和userId
// TODO step 4: 展示所有用户的数据
var util = require("../../utils/util.js");

const app = getApp<IAppOption>();
let context: any;
Page({
  data: {
    motto: "to do list",
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse("button.open-type.getUserInfo"),
    addShow: false,
    addText: "",
    status: "1",
    focus: false,
    lists: [] as Array<string>,
    curLists: [],
    books: [],
    editIndex: 0,
    delBtnWidth: 120,
    curDay: "",
    addUserInfo: "",
    studyStatus: 0,
    lastId: "",
    userId: "", // 邀请码
    user2List: [],
    user3List: [],
  },
  // 事件处理函数

  studyDone: () => {
    const db = wx.cloud.database();
    if (context.data.studyStatus === 0) {
      context.setData({
        studyStatus: 1,
      });
      db.collection("todolist").add({
        data: {
          done: true,
          userId: context.data.userId,
          curDay: context.data.curDay,
        },
        success: (res: any) => {
          context.setData({
            lastId: res["_id"],
          }),
            wx.showToast({
              title: "今日学习打卡",
            });
        },
      });
    } else {
      wx.showModal({
        title: "删除今天的打卡",
        content: "您确定要删除今天的打卡吗？",
        confirmText: "确认删除",
        cancelText: "取消",
        success: (res: any) => {
          if (res.confirm) {
            db
              .collection("todolist")
              .doc(context.data.lastId)
              .remove({
                success: () => {
                  wx.showToast({
                    title: "删除成功",
                  });
                },
              }),
              context.setData({
                studyStatus: 0,
              });
            console.log("用户确认删除");
          } else {
            console.log("用户取消了操作");
          }
        },
      });
    }
  },
  showLog: () => {
    const db = wx.cloud.database();
    db.collection("todolist").get({
      success: (e: any) => {
        console.log(e.data.filter((x: any) => x["userId"] === "test 3"));

        context.setData({
          user2List: e.data.filter((x: any) => x["userId"] === "test 2"),
          user3List: e.data.filter((x: any) => x["userId"] === "test 3"),
        });
      },
    });
  },

  bindViewTap() {
    wx.navigateTo({
      url: "../logs/logs",
    });
  },

  onLoad() {
    // 转化全局的this指向
    context = this;

    const db = wx.cloud.database();
    wx.getStorage({
      key: "userId",
      success: (e: any) => {
        context.setData({
          userId: e.data,
        }),
          console.log(e.data, "存入本地的userId");
        db.collection("todolist")
          .where({ userId: e.data })
          .get({
            success: (e: any) => {
              console.log(e, "不同的userId");
              if (e.data[e.data.length - 1]["curDay"] === getDay) {
                context.setData({
                  studyStatus: 1,
                  lastId: e.data[e.data.length - 1]["_id"],
                });
              }
            },
          });
      },
    });

    // 获取今天的时间
    let time = util.formatTime(new Date());
    const getDay = time.split(" ")[0];
    this.setData({
      curDay: getDay,
    });
    console.log(context.curDay, "today");

    wx.getStorage({
      key: "lists",
      success: function (res) {
        console.log(res.data);
        context.setData({
          lists: res.data,
          curLists: res.data,
        });
      },
    });

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      });
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        });
      };
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: (res) => {
          app.globalData.userInfo = res.userInfo;
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
          });
        },
      });
    }
  },

  getUserInfo(e: any) {
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
    });
  },

  addTodoShow: () => {
    context.setData({
      addShow: true,
      focus: true,
    });
  },

  addTodo: () => {
    if (!context.data.addText.trim()) {
      return;
    }
    let temp = context.data.lists;
    let addT: any = {
      id: new Date().getTime(),
      title: context.data.addText,
      status: "0",
    };
    temp.push(addT);
    context.showCur(temp);
    context.addTodoHide();
    wx.setStorage({
      key: "lists",
      data: temp,
    });
    wx.showToast({
      title: "添加成功! 23",
      icon: "success",
      duration: 1000,
    });
  },

  addTodoHide: () => {
    context.setData({
      addShow: false,
      focus: false,
      addText: "",
    });
  },

  showCur: (data: any) => {
    if (data.status === "1") {
      context.setData({
        lists: data,
        curLists: data,
      });
    } else {
      context.setData({
        lists: data,
        curLists: data.filter(
          (item: any) => +item.status === context.data.status - 2
        ),
      });
    }
  },

  changeTodo: (e: any) => {
    let item = e.currentTarget.dataset.item;
    let temp = context.data.lists;
    temp.forEach((el: any) => {
      if (el.id === item) {
        if (el.status === "0") {
          el.status = "1";
          context.showCur(temp);
          wx.setStorage({
            key: "lists",
            data: temp,
          });
          wx.showToast({
            title: "已完成任务",
            icon: "success",
            duration: 1000,
          });
        } else {
          wx.showModal({
            title: "",
            content: "该任务已完成，确定重新开始任务？",
            confirmText: "确定",
            cancelText: "不了",
            success: function (res) {
              if (res.confirm) {
                el.status = "0";
                context.showCur(temp);
                wx.setStorage({
                  key: "lists",
                  data: temp,
                });
              } else {
                return console.log("不操作");
              }
            },
          });
        }
      }
    });
    console.log(item);
  },

  setInput: (e: any) => {
    context.setData({
      addText: e.detail.value,
    });
  },

  setUser: (e: any) => {
    context.setData({
      addUserInfo: e.detail.value,
    });
  },

  addUser: () => {
    const db = wx.cloud.database();
    console.log(context.data.addUserInfo);
    if (context.data.addUserInfo === "test 2")
      db.collection("todolist").add({
        data: {
          openid: context.data.addUserInfo,
          done: true,
          curDay: context.data.curDay,
        },
        success: () => {
          wx.showToast({
            title: "邀请码验证成功",
          });
        },
        // 然后页面跳转到登录状态
      });
  },

  showStatus: (e: any) => {
    var st = e.currentTarget.dataset.status;
    if (context.data.status === st) return;
    if (st === "1") {
      context.setData({
        status: st,
        curLists: context.data.lists,
      });
      return;
    }
    context.setData({
      status: st,
      curLists: context.data.lists.filter(
        (item: any) => +item.status === st - 2
      ),
    });
  },

  delTodo: (e: any) => {
    let item = e.currentTarget.dataset.item;
    let temp = context.data.lists;
    temp.forEach((el: any, index: any) => {
      if (el.id === item) {
        temp[index].txtStyle = "left:0";
        wx.showModal({
          title: "",
          content: "您确定要删除吗？",
          confirmText: "确定",
          cancelText: "考虑一下",
          success: function (res) {
            if (res.confirm) {
              temp.splice(index, 1);
              context.showCur(temp);
              wx.setStorage({
                key: "lists",
                data: temp,
              });
            } else {
              context.showCur(temp);
              return console.log("不操作");
            }
          },
        });
      }
    });
  },

  touchS: (e: any) => {
    // console.log('开始：' + JSON.stringify(e))
    // 是否只有一个触摸点
    if (e.touches.length === 1) {
      context.setData({
        // 触摸起始的X坐标
        startX: e.touches[0].clientX,
      });
    }
  },

  touchM: (e: any) => {
    // console.log('移动：' + JSON.stringify(e))
    if (e.touches.length === 1) {
      // 触摸点的X坐标
      var moveX = e.touches[0].clientX;
      // 计算手指起始点的X坐标与当前触摸点的X坐标的差值
      var disX = context.data.startX - moveX;
      // delBtnWidth 为右侧按钮区域的宽度
      var delBtnWidth = context.data.delBtnWidth;
      var txtStyle = "";
      if (disX == 0 || disX < 0) {
        // 如果移动距离小于等于0，文本层位置不变
        txtStyle = "left:0";
      } else if (disX > 0) {
        // 移动距离大于0，文本层left值等于手指移动距离
        txtStyle = "left:-" + disX + "rpx";
        if (disX >= delBtnWidth) {
          // 控制手指移动距离最大值为删除按钮的宽度
          txtStyle = "left:-" + delBtnWidth + "rpx";
        }
      }
      // 获取手指触摸的是哪一个item
      var index = e.currentTarget.dataset.index;
      var list = context.data.curLists;
      // 将拼接好的样式设置到当前item中
      list[index].txtStyle = txtStyle;
      // 更新列表的状态
      context.setData({
        curLists: list,
      });
    }
  },

  touchE: (e: any) => {
    // console.log('停止：' + JSON.stringify(e))
    if (e.changedTouches.length === 1) {
      // 手指移动结束后触摸点位置的X坐标
      var endX = e.changedTouches[0].clientX;
      // 触摸开始与结束，手指移动的距离
      var disX = context.data.startX - endX;
      var delBtnWidth = context.data.delBtnWidth;
      // 如果距离小于删除按钮的1/2，不显示删除按钮
      var txtStyle =
        disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "rpx" : "left:0";
      // 获取手指触摸的是哪一项
      var index = e.currentTarget.dataset.index;
      var list = context.data.curLists;
      list[index].txtStyle = txtStyle;
      // 更新列表的状态
      context.setData({
        curLists: list,
      });
    }
  },
});
