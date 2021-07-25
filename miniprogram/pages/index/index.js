"use strict";

Page({
  data: {
    data: "",
    html2: "正在快速加载中...",
  },
  onLoad: function (options) {
    wx.showToast({
      title: "数据加载中",
      icon: "loading",
    });
    wx.cloud.downloadFile({
      fileID:
        "cloud://todolist-233.746f-todolist-233-1302025306/book/test (7).html", // 文件 ID
      success: (res) => {
        // 返回临时文件路径
        let tempFilePath = res.tempFilePath;
        let fs = wx.getFileSystemManager();
        let result = fs.readFileSync(tempFilePath, "utf-8");
        // 读取文件内容到result
        this.setData({
          html2: result,
        });
      },
      fail: console.error,
    });
  },
});
