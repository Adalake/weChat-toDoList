```
<template>
  <div>
    <div class="test" ref="testDom" v-html="data1"></div>
    <van-button class="btn" @click="btnClick" type="primary"
      >获取列表</van-button
    >
  </div>
</template>

<script>
import axios from "axios";
let service = axios.create({
  timeout: 20000,
});
service.defaults.headers.common["Content-Type"] =
  "application/json; charse=UTF-8";

// 添加响应拦截器
service.interceptors.response.use(
  function(response) {
    console.log("请求前");
    // 对响应数据做点什么
    if (response.data.return_code !== "200") {
      ///错误处理
      ///
    }
    return response;
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);
export default {
  data() {
    return {
      data1: "疯狂加载中...",
      timer: null,
      apiList: [],
    };
  },
  methods: {
    downloadtext(filename, text) {
      var element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(text)
      );
      element.setAttribute("download", filename);

      element.style.display = "none";
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    },
    apiGet(api) {
      var that = this;
      service
        .get(api, {
          responseType: "blob",
          transformResponse: [
            function(data) {
              let reader = new FileReader();
              reader.readAsText(data, "GBK");
              reader.onload = function(e) {
                var dom_container = reader.result; // 获取dom
                if (api.indexOf("index") == -1) {
                  // 文章详情
                  that.detailGet(dom_container);
                  console.log("文章详情");
                } else {
                  // 文章列表
                  var list_start = dom_container.indexOf(
                    '<ul class="chapter">'
                  );
                  var list_end = dom_container.indexOf(
                    '<div class="listpage">'
                  );
                  var list = dom_container.slice(list_start, list_end); //获取正文内容
                  that.data1 = list;
                  // console.log("文章列表", list_start, list_end, list);
                  // test lake
                  that.apiList = list.split(".html").map((x) => {
                    //链接地址
                    var q = x.indexOf("<li>");
                    var w = x.slice(q);
                    return w.replace(/[^0-9]/gi, ""); // 正则 寻找数字
                  });
                  that.apiList.pop();
                  console.log("文章列表", that.apiList, list);
                }
                that.timer = setTimeout(() => {
                  // console.log(dom_container);
                  // that.apiGet("/api/103631738_2.html");
                });
              };
              return data;
            },
          ],
        })
        .then(() => {})
        .catch((err) => {
          console.log(err);
        });
    },
    detailGet(dom_container) {
      var detail_start = dom_container.indexOf('<div class="content">');
      var detail_end = dom_container.indexOf("记住手机版网址");
      var detail = dom_container.slice(detail_start + 21, detail_end); //获取正文内容
      var title_start = dom_container.indexOf("<title>");
      var title_end = dom_container.indexOf("</title>");
      var title = dom_container.slice(title_start + 7, title_end); // 获取标题
      var title_temp = title.indexOf(" ");
      title = title.slice(0, title_temp);
      // console.log(title, detail);
      // that.downloadtext(`${title}.html`, detail); //下载当前html
    },
    btnClick() {
      this.apiGet("/api/index_86.html");
    },
    listGet() {},
    nextDomGet() {},
  },
  mounted() {
    // this.apiGet("/api/103631738.html");
  },
};
</script>

<style></style>

```