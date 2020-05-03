"use strict";
var app = getApp();
Page({
  data: {
    motto: "Hello World version-1 233",
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse("button.open-type.getUserInfo"),
    addShow: false,
    addText: "",
    status: "1",
    focus: false,
    lists: [],
    curLists: [],
    editIndex: 0,
    delBtnWidth: 120, // 删除按钮宽度单位（rpx）
  },
  bindViewTap: function () {
    wx.navigateTo({
      url: "../logs/logs",
    });
  },
  changeTodo: function (e) {
    var _this = this;
    var item = e.currentTarget.dataset.item;
    var temp = _this.data.lists;
    temp.forEach((el) => {
      if (el.id === item) {
        if (el.status === "0") {
          el.status = "1";
          _this.showCur(temp);
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
                _this.showCur(temp);
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
  addTodoShow: function () {
    this.setData({
      addShow: true,
      focus: true,
    });
    console.log("233");
  },
  addTodoHide: function () {
    this.setData({
      addShow: false,
      focus: false,
      addText: "",
    });
  },
  setInput: function (e) {
    this.setData({
      addText: e.detail.value,
    });
  },
  addTodo: function () {
    if (!this.data.addText.trim()) {
      return;
    }
    var temp = this.data.lists;
    var addT = {
      id: new Date().getTime(),
      title: this.data.addText,
      status: "0",
    };
    temp.push(addT);
    this.showCur(temp);
    this.addTodoHide();
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
  showCur: function (data) {
    if (this.data.status === "1") {
      this.setData({
        lists: data,
        curLists: data,
      });
    } else {
      this.setData({
        lists: data,
        curLists: data.filter((item) => +item.status === this.data.status - 2),
      });
    }
  },
  showStatus: function (e) {
    var st = e.currentTarget.dataset.status;
    if (this.data.status === st) return;
    if (st === "1") {
      this.setData({
        status: st,
        curLists: this.data.lists,
      });
      return;
    }
    this.setData({
      status: st,
      curLists: this.data.lists.filter((item) => +item.status === st - 2),
    });
  },
  delTodo: function (e) {
    var _this = this;
    var item = e.currentTarget.dataset.item;
    var temp = _this.data.lists;
    temp.forEach((el, index) => {
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
              _this.showCur(temp);
              wx.setStorage({
                key: "lists",
                data: temp,
              });
            } else {
              _this.showCur(temp);
              return console.log("不操作");
            }
          },
        });
      }
    });
  },
  touchS: function (e) {
    // console.log('开始：' + JSON.stringify(e))
    // 是否只有一个触摸点
    if (e.touches.length === 1) {
      this.setData({
        // 触摸起始的X坐标
        startX: e.touches[0].clientX,
      });
    }
  },
  touchM: function (e) {
    // console.log('移动：' + JSON.stringify(e))
    var _this = this;
    if (e.touches.length === 1) {
      // 触摸点的X坐标
      var moveX = e.touches[0].clientX;
      // 计算手指起始点的X坐标与当前触摸点的X坐标的差值
      var disX = _this.data.startX - moveX;
      // delBtnWidth 为右侧按钮区域的宽度
      var delBtnWidth = _this.data.delBtnWidth;
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
      var list = _this.data.curLists;
      // 将拼接好的样式设置到当前item中
      list[index].txtStyle = txtStyle;
      // 更新列表的状态
      this.setData({
        curLists: list,
      });
    }
  },
  touchE: function (e) {
    // console.log('停止：' + JSON.stringify(e))
    var _this = this;
    if (e.changedTouches.length === 1) {
      // 手指移动结束后触摸点位置的X坐标
      var endX = e.changedTouches[0].clientX;
      // 触摸开始与结束，手指移动的距离
      var disX = _this.data.startX - endX;
      var delBtnWidth = _this.data.delBtnWidth;
      // 如果距离小于删除按钮的1/2，不显示删除按钮
      var txtStyle =
        disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "rpx" : "left:0";
      // 获取手指触摸的是哪一项
      var index = e.currentTarget.dataset.index;
      var list = _this.data.curLists;
      list[index].txtStyle = txtStyle;
      // 更新列表的状态
      _this.setData({
        curLists: list,
      });
    }
  },
  //   onLoad: function () {
  //     var _this = this;
  //     if (app.globalData.userInfo) {
  //       this.setData({
  //         userInfo: app.globalData.userInfo,
  //         hasUserInfo: true,
  //       });
  //     } else if (this.data.canIUse) {
  //       app.userInfoReadyCallback = function (res) {
  //         _this.setData({
  //           userInfo: res.userInfo,
  //           hasUserInfo: true,
  //         });
  //       };
  //     } else {
  //       wx.getUserInfo({
  //         success: function (res) {
  //           app.globalData.userInfo = res.userInfo;
  //           _this.setData({
  //             userInfo: res.userInfo,
  //             hasUserInfo: true,
  //           });
  //         },
  //       });
  //     }
  //   },
  onLoad: function () {
    var _this = this;
    wx.getStorage({
      key: "lists",
      success: function (res) {
        console.log(res.data);
        _this.setData({
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
  //   getUserInfo: function (e) {
  //     console.log(e);
  //     app.globalData.userInfo = e.detail.userInfo;
  //     this.setData({
  //       userInfo: e.detail.userInfo,
  //       hasUserInfo: true,
  //     });
  //   },
  getUserInfo: function (e) {
    console.log(e);
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
    });
  },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsSUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFjLENBQUE7QUFFaEMsSUFBSSxDQUFDO0lBQ0gsSUFBSSxFQUFFO1FBQ0osS0FBSyxFQUFFLGtCQUFrQjtRQUN6QixRQUFRLEVBQUUsRUFBRTtRQUNaLFdBQVcsRUFBRSxLQUFLO1FBQ2xCLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLDhCQUE4QixDQUFDO0tBQ3BEO0lBRUQsV0FBVztRQUNULEVBQUUsQ0FBQyxVQUFVLENBQUM7WUFDWixHQUFHLEVBQUUsY0FBYztTQUNwQixDQUFDLENBQUE7SUFDSixDQUFDO0lBQ0QsTUFBTTtRQUFOLGlCQTJCQztRQTFCQyxJQUFJLEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFO1lBQzNCLElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ1gsUUFBUSxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUTtnQkFDakMsV0FBVyxFQUFFLElBQUk7YUFDbEIsQ0FBQyxDQUFBO1NBQ0g7YUFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBRzVCLEdBQUcsQ0FBQyxxQkFBcUIsR0FBRyxVQUFBLEdBQUc7Z0JBQzdCLEtBQUksQ0FBQyxPQUFPLENBQUM7b0JBQ1gsUUFBUSxFQUFFLEdBQUcsQ0FBQyxRQUFRO29CQUN0QixXQUFXLEVBQUUsSUFBSTtpQkFDbEIsQ0FBQyxDQUFBO1lBQ0osQ0FBQyxDQUFBO1NBQ0Y7YUFBTTtZQUVMLEVBQUUsQ0FBQyxXQUFXLENBQUM7Z0JBQ2IsT0FBTyxFQUFFLFVBQUEsR0FBRztvQkFDVixHQUFHLENBQUMsVUFBVSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFBO29CQUN0QyxLQUFJLENBQUMsT0FBTyxDQUFDO3dCQUNYLFFBQVEsRUFBRSxHQUFHLENBQUMsUUFBUTt3QkFDdEIsV0FBVyxFQUFFLElBQUk7cUJBQ2xCLENBQUMsQ0FBQTtnQkFDSixDQUFDO2FBQ0YsQ0FBQyxDQUFBO1NBQ0g7SUFDSCxDQUFDO0lBQ0QsV0FBVyxFQUFYLFVBQVksQ0FBTTtRQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ2QsR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUE7UUFDM0MsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLFFBQVEsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVE7WUFDM0IsV0FBVyxFQUFFLElBQUk7U0FDbEIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIGluZGV4LnRzXG4vLyDojrflj5blupTnlKjlrp7kvotcbmNvbnN0IGFwcCA9IGdldEFwcDxJQXBwT3B0aW9uPigpXG5cblBhZ2Uoe1xuICBkYXRhOiB7XG4gICAgbW90dG86ICdIZWxsbyBXb3JsZCAyMzYzJyxcbiAgICB1c2VySW5mbzoge30sXG4gICAgaGFzVXNlckluZm86IGZhbHNlLFxuICAgIGNhbklVc2U6IHd4LmNhbklVc2UoJ2J1dHRvbi5vcGVuLXR5cGUuZ2V0VXNlckluZm8nKSxcbiAgfSxcbiAgLy8g5LqL5Lu25aSE55CG5Ye95pWwXG4gIGJpbmRWaWV3VGFwKCkge1xuICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgdXJsOiAnLi4vbG9ncy9sb2dzJyxcbiAgICB9KVxuICB9LFxuICBvbkxvYWQoKSB7XG4gICAgaWYgKGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvKSB7XG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICB1c2VySW5mbzogYXBwLmdsb2JhbERhdGEudXNlckluZm8sXG4gICAgICAgIGhhc1VzZXJJbmZvOiB0cnVlLFxuICAgICAgfSlcbiAgICB9IGVsc2UgaWYgKHRoaXMuZGF0YS5jYW5JVXNlKSB7XG4gICAgICAvLyDnlLHkuo4gZ2V0VXNlckluZm8g5piv572R57uc6K+35rGC77yM5Y+v6IO95Lya5ZyoIFBhZ2Uub25Mb2FkIOS5i+WQjuaJjei/lOWbnlxuICAgICAgLy8g5omA5Lul5q2k5aSE5Yqg5YWlIGNhbGxiYWNrIOS7pemYsuatoui/meenjeaDheWGtVxuICAgICAgYXBwLnVzZXJJbmZvUmVhZHlDYWxsYmFjayA9IHJlcyA9PiB7XG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgdXNlckluZm86IHJlcy51c2VySW5mbyxcbiAgICAgICAgICBoYXNVc2VySW5mbzogdHJ1ZSxcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8g5Zyo5rKh5pyJIG9wZW4tdHlwZT1nZXRVc2VySW5mbyDniYjmnKznmoTlhbzlrrnlpITnkIZcbiAgICAgIHd4LmdldFVzZXJJbmZvKHtcbiAgICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICBhcHAuZ2xvYmFsRGF0YS51c2VySW5mbyA9IHJlcy51c2VySW5mb1xuICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICB1c2VySW5mbzogcmVzLnVzZXJJbmZvLFxuICAgICAgICAgICAgaGFzVXNlckluZm86IHRydWUsXG4gICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgfVxuICB9LFxuICBnZXRVc2VySW5mbyhlOiBhbnkpIHtcbiAgICBjb25zb2xlLmxvZyhlKVxuICAgIGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvID0gZS5kZXRhaWwudXNlckluZm9cbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgdXNlckluZm86IGUuZGV0YWlsLnVzZXJJbmZvLFxuICAgICAgaGFzVXNlckluZm86IHRydWUsXG4gICAgfSlcbiAgfSxcbn0pXG4iXX0=
