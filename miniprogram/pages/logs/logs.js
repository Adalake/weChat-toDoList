"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../../utils/util");
Page({
    data: {
        logs: [],
    },
    onLoad: function () {
        this.setData({
            logs: (wx.getStorageSync("logs") || []).map(function (log) {
                return util_1.formatTime(new Date(log));
            }),
        });
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9ncy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxvZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSx5Q0FBOEM7QUFFOUMsSUFBSSxDQUFDO0lBQ0gsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLEVBQUU7S0FDVDtJQUNELE1BQU0sRUFBTjtRQUNFLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWCxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFDLEdBQVc7Z0JBQ3RELE9BQU8saUJBQVUsQ0FBQyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ25DLENBQUMsQ0FBQztTQUNILENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBsb2dzLnRzXG4vLyBjb25zdCB1dGlsID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvdXRpbC5qcycpXG5pbXBvcnQgeyBmb3JtYXRUaW1lIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3V0aWxcIjtcblxuUGFnZSh7XG4gIGRhdGE6IHtcbiAgICBsb2dzOiBbXSxcbiAgfSxcbiAgb25Mb2FkKCkge1xuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBsb2dzOiAod3guZ2V0U3RvcmFnZVN5bmMoXCJsb2dzXCIpIHx8IFtdKS5tYXAoKGxvZzogc3RyaW5nKSA9PiB7XG4gICAgICAgIHJldHVybiBmb3JtYXRUaW1lKG5ldyBEYXRlKGxvZykpO1xuICAgICAgfSksXG4gICAgfSk7XG4gIH0sXG59KTtcbiJdfQ==