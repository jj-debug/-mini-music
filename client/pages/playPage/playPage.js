import request from '../../utils/request'
import formatLyric from '../../utils/formatLyric'
Page({
  data: {
      url: '',
      isPlay: true,
      innerAudioContext: {},
      songName: '',
      authors: [],
      alName: '',
      alPic: '',
      lyric: '',
      currentTime: 0,
      currentTimeFix: 0,
      currentLine: 0,
      interval: 0, // 定时器ID，方便页面隐藏时清除定时器
      
  },

  // 监听歌曲播放时间
  observers:{
    currentTime: function(val) {
      console.log(val);
    }
  },

  async onLoad(options) {

    let id = options.id

    // 获取歌曲播放地址
    let res = await request('/song/url', {
      id
    })
    this.setData({
      url: res.data[0].url
    })

    // 使用 wx.createAudioContext 获取 audio 上下文 context
    let bgm = wx.getBackgroundAudioManager()
    bgm.src = this.data.url
    bgm.title = '1'
    this.setData({
      innerAudioContext: bgm
    }) 

    // 获取歌曲详细信息
    let detailRes = await request ('/song/detail', {
      ids: id
    })
    let detail = detailRes.songs[0]
    console.log(detail.ar);
    this.setData({
      songName: detail.name,
      authors: detail.ar,
      alName: detail.al.name,
      alPic: detail.al.picUrl
    })

    // 获取歌词
    let lyricsRes = await request('/lyric', {
      id
    })
    console.log(lyricsRes.lrc.lyric);
    this.setData({
      lyric: formatLyric(lyricsRes.lrc.lyric)
    })
    console.log(this.data.lyric);


  },

  onReady: function (e) {
    this.getTime() // 开启定时器
  },

  onUnload: function name(params) {
    clearInterval(this.data.interval)
  },

  // 定时器，监听歌曲播放位置
  getTime() {
    this.setData({
      // 监听歌曲播放时间
      interval: setInterval(() => {
        console.log('currentTime' , this.data.innerAudioContext.currentTime);
        this.setData({
          currentTime: this.data.innerAudioContext.currentTime,
          // currentTimeFix: Math.floor(this.data.innerAudioContext.currentTime) * 5
        })
        console.log(Math.floor(this.data.currentTime))

        let lyric = this.data.lyric
        let len = lyric.length;
        for(let i = 0; i < len ; i++){
          if(this.data.currentTime > lyric[i].time){
            this.setData({
              currentLine: i + 1
            })
          }
        }
        if(this.data.currentLine < 6) {
          this.setData({
            currentLine: 0
          })
        }
        let query = wx.createSelectorQuery();
        query.select('.lyric').boundingClientRect((rect) => {
          let lyricHeight = rect.height
          console.log(lyricHeight);
          let lineSum = lyricHeight / 20.8
        })
        
        this.setData({
          currentTimeFix: (this.data.currentLine - 6) * 20.8
        })
        console.log(this.data.currentLine)
        console.log(this.data.currentTimeFix)
      }, 500)
    })
  },

  // 暂停/播放切换
  handlePlay() {
    if (this.data.isPlay) {
      this.audioPause()
    }else{
      this.audioPlay()
    }
  },

  audioPlay: function () {
    console.log('开始');
    this.setData({
      isPlay: true
    })
    this.data.innerAudioContext.play() // 播放
    this.getTime() // 开启定时器
  },
  audioPause: function () {
    console.log('暂停');
    this.setData({
      isPlay: false
    })
    this.data.innerAudioContext.pause()
    clearInterval(this.data.interval) // 关闭定时器
  },
  audio60: function () {
    this.data.innerAudioContext.seek(60)
  },
  audioStart: function () {
    this.data.innerAudioContext.seek(0)
  }
})