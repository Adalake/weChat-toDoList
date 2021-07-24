"use strict";

Page({
  data: {
    data: "",
    html2:'正在快速加载中...',
    html3: `<div class="content">
&nbsp;&nbsp;&nbsp;&nbsp;第16章 徒儿，来修仙16<br /><br />&nbsp;&nbsp;&nbsp;&nbsp;床的动静惊醒了封珏，他摸着脑袋，不知自己什么时候回到这的，旁边的吊床上，没了人影。<br /><br />&nbsp;&nbsp;&nbsp;&nbsp;“封师弟在吗？”殿外响起叫唤声，封珏应了一声，赶紧出殿。<br /><br />&nbsp;&nbsp;&nbsp;&nbsp;殿外等着的人是朱枫，他见封珏出来后，目光还朝里面看了看。<br /><br />&nbsp;&nbsp;&nbsp;&nbsp;“师父不在。”封珏脱口而出，觉得自己有些奇怪。<br /><br />&nbsp;&nbsp;&nbsp;&nbsp;朱枫表情有些失望，他笑着向封珏自我介绍后，带他去领制服。<br /><br />&nbsp;&nbsp;&nbsp;&nbsp;朱枫御剑而行，让封珏抓着自己的衣裳，他却稳稳站在剑上，没去抓着朱枫，朱枫还夸他平衡力好，说着说着，就夸起绫清玄来，说了绫清玄不少事迹。<br /><br />&nbsp;&nbsp;&nbsp;&nbsp;“别看玄清殿冷清，凌长老人很好的，而且凌长老道行深，跟在她身边，你一定能快速提升实力。”<br /><br />&nbsp;&nbsp;&nbsp;&nbsp;“你可不知道，我们师兄弟们心心念念想拜在凌长老名下，可她一个徒弟都没收过，你可是他第一个弟子，也是最后一个弟子啊。”<br /><br />&nbsp;&nbsp;&nbsp;&nbsp;朱枫语气中都带着羡慕，封珏的心思全在他的话中，心里不由得有一丝丝雀跃。<br /><br />&nbsp;&nbsp;&nbsp;&nbsp;往前十几年，好像都没有这么开心过。<br /><br />&nbsp;&nbsp;&nbsp;&nbsp;可是一想到这些事他都是从别人口中知道的，自己却不知晓，封珏心里又有了一种莫名的感觉。<br /><br />&nbsp;&nbsp;&nbsp;&nbsp;……<br /><br />&nbsp;&nbsp;&nbsp;&nbsp;“凌长老，可是要什么东西？”守着藏宝阁的是位老头，精明地很，看见绫清玄来这了，便开口问着。<br /><br />&nbsp;&nbsp;&nbsp;&nbsp;绫清玄也不废话，“极品洗髓丹。”<br /><br />&nbsp;&nbsp;&nbsp;&nbsp;老者神色为难，“凌长老，您来晚了，这极品洗髓丹，天长老昨日便定下来了。”<br /><br />&nbsp;&nbsp;&nbsp;&nbsp;别人昨天就定了，系统的任务今天才来。第一文学网&nbsp;www.cnd1wx.com<br /><br />&nbsp;&nbsp;&nbsp;&nbsp;ZZ在空间里感觉到浑身发凉。<br /><br />&nbsp;&nbsp;&nbsp;&nbsp;绫清玄盯着老者，“他定了，但没来拿。”<br /><br />&nbsp;&nbsp;&nbsp;&nbsp;“可是，之前就说了，天长老今日晚些就来拿。”<br /><br />&nbsp;&nbsp;&nbsp;&nbsp;绫清玄严肃脸，“他现在没来。”<br /><br />&nbsp;&nbsp;&nbsp;&nbsp;老者：……<br /><br />&nbsp;&nbsp;&nbsp;&nbsp;这乾坤门还没有哪条规定说定了就等于是他的了，老者不知怎么跟绫清玄沟通，只好再次拒绝。<br /><br />&nbsp;&nbsp;&nbsp;&nbsp;绫清玄思索着，将手放在剑上，老者感受到那灵力的威压，汗颜地弯腰，“老夫这就拿，这就给您拿。”<br /><br />&nbsp;&nbsp;&nbsp;&nbsp;这乾坤门上下都知道，凌长老是几位长老实力中最强的，若是惹恼了她，可能下一秒就会尸骨无存，老者还不想死，他颤颤巍巍将极品洗髓丹拿了出来。<br /><br />&nbsp;&nbsp;&nbsp;&nbsp;绫清玄只是习惯性的动作，见老者拿出来了，她也正好不用多费口舌。<br /><br />&nbsp;&nbsp;&nbsp;&nbsp;“凌长老还真是威风啊，这定好的东西，你说拿就拿。”齐媛跟着天长老来这，见绫清玄面前就是那极品洗髓丹的盒子，不由得出声。<br /><br />&nbsp;&nbsp;&nbsp;&nbsp;“媛儿。”天长老制止了一声，并未多说，他看了绫清玄一眼，“凌长老，这极品洗髓丹是本座为慕霖准备的，昨日还未送来藏宝阁，所以本座便先定下了，不知凌长老也想要，还请长老你等下一批吧。”<br /><br />&nbsp;&nbsp;&nbsp;&nbsp;绫清玄伸手接过，当着他的面收了起来。<br /><br />&nbsp;&nbsp;&nbsp;&nbsp;“绫清玄！”天长老再好的教养，在这个时候也生气了，这绫清玄什么毛病，之前天天闭关不问世事，现在出来了天天惹事，看见她就脑壳疼。<br /><br />&nbsp;&nbsp;&nbsp;&nbsp;完成任务比较重要，绫清玄面无惧色，“本座先来的。”<br /><br />&nbsp;&nbsp;&nbsp;&nbsp;“凌长老，我敬你是长老，不想你如此不知廉耻，这说好的事，怎么在你这就耍无赖了。”齐媛上前指责，巴不得声音大到所有人能听见。<br /><br />&nbsp;&nbsp;&nbsp;&nbsp;这藏宝阁周围的弟子还不少，此时听见齐媛说的话，都侧目过来。<br /><br /><br />记住手机版网址：xs.niuniuxs.com
<
</div>`,
  },
  onLoad: function (options) {
    wx.showToast({
      title: "数据加载中",
      icon: "loading",
    });

    wx.cloud.downloadFile({
      fileID:
        "cloud://todolist-233.746f-todolist-233-1302025306/book/第16章.html", // 文件 ID
      success: (res) => {
        // 返回临时文件路径
        console.log(111, res.tempFilePath);
        let s = res.tempFilePath;
        let fs = wx.getFileSystemManager();
        let result = fs.readFileSync(s, "utf-8");
        // 读取文件内容到result
        console.log(222, result);
        this.setData({
          html2: result,
        });
      },
      fail: console.error,
    });
  },
});
