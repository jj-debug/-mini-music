// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null,
    allPlayList: [],
    playStatus: true,
    playingSrc: '',
    playingSongID: '',  // 歌ID
    playingSongName: '',  // 歌名
    playingAuthors: [],   // 歌手
    playingAlName: '',    // 专辑名
    playingAlPic: '',     // 专辑图片
    bgm: wx.getBackgroundAudioManager()
  }
})
