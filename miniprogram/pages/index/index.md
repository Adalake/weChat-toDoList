```
<template>
  <div class="test" ref="testDom" v-html="data1"></div>
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
      data1: "",
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
    apiGet() {
      var that = this;
      service
        .get("/api/103631738.html", {
          responseType: "blob",
          transformResponse: [
            function(data) {
              let reader = new FileReader();
              reader.readAsText(data, "GBK");
              reader.onload = function(e) {
                var a = reader.result;
                var b = a.indexOf('<div class="content">');
                var c = a.indexOf("记住手机版网址");
                var d = a.slice(b+21, c);
                console.log(d, b, c);
                that.downloadtext("test.html", d);
                that.data1 = reader.result;
              };
              return data;
            },
          ],
        })
        .then(() => {
          this.domControl();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    domControl() {
      console.log("_____", this.data1);
      // this.downloadtext("test.html", "asdasda");
    },
  },
  mounted() {
    // this.downloadtext('test.html','adadad')
    // this.test(this.data1);
    this.apiGet();
  },
};
</script>

<style></style>

```
