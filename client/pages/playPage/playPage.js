import request from '../../utils/request'

Page({
  data() {
    return {
      url: '',
      innerAudioContext: {}
    }
  },

  async onLoad(options) {
    console.log(options.id);
    
    let res = await request('/song/url', {
      id: options.id
    })
    console.log(res);
    this.setData({
      url: res.data[0].url
    })
    console.log(this.data.url);
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    let bgm = wx.getBackgroundAudioManager()
    bgm.src = this.data.url
    bgm.title = '1'
    console.log(bgm);
    this.setData({
      innerAudioContext: bgm
    })
  },

  onReady: function (e) {
      
      // innerAudioContext.pause() // 暂停
      
      // innerAudioContext.stop() // 停止
  },
  audioPlay: function () {
    console.log(this.data.innerAudioContext);
    this.data.innerAudioContext.play() // 播放
  },
  audioPause: function () {
    this.data.innerAudioContext.pause()
  },
  audio14: function () {
    this.data.innerAudioContext.seek(14)
  },
  audioStart: function () {
    this.data.innerAudioContext.seek(0)
  }
})