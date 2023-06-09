import request from '../../utils/request'
import formatLyric from '../../utils/formatLyric'
import EventBus from '../../utils/EventBus'
Page({
  data: {
      id: getApp().globalData.playingSongID,
      url: '',
      isPlay: true,
      backgroundAudioManager: getApp().globalData.bgm,
      songName: getApp().globalData.playingSongName,
      authors: getApp().globalData.playingAuthors,
      alName: getApp().globalData.playingAlName,
      alPic: getApp().globalData.playingAlPic,
      lyric: '',
      currentTime: 0,
      currentTimeFix: 0,
      currentLine: 0,
      interval: 0, // 定时器ID，方便页面隐藏时清除定时器
      
  },

  // 监听歌曲播放时间
  // observers:{
  //   currentTime: function(val) {
  //     console.log(val);
  //   }
  // },

  async onLoad(options) {

    let id = options.id
    console.log(id);
    console.log(this.data.id);
    //获取歌曲相关信息
    await this.getMusicInfo(id)

    // 获取歌曲播放状态
    this.setData({
      isPlay: getApp().globalData.playStatus
    })

    console.log("getApp().globalData.playingSongID", getApp().globalData.playingSongID);
    console.log('id', id);
    console.log('id==getApp().globalData.playingSongID', id==getApp().globalData.playingSongID);
    // 真机调试BUG：重新进入播放页面时歌曲会重新开始
    // 解决：判断app里的歌曲id和传递过来的ID是否相同
    if(id != getApp().globalData.playingSongID){
      // 使用 wx.getBackgroundAudioManager 获取背景音频管理器
      let bgm = wx.getBackgroundAudioManager()
      console.log("this.data", this.data);
      console.log("this.data.url", this.data.url);
      bgm.src = this.data.url
      bgm.title = this.data.songName
      bgm.onEnded(async () => {
        console.log('播放结束');
        let allPlayList = getApp().globalData.allPlayList
        let id = getApp().globalData.playingSongID
        for(let i = 0; i < allPlayList.length; i++){
          console.log("allPlayList", allPlayList);
          if(allPlayList[i].id == id){
            console.log('开始播放下一首');
            let id = allPlayList[(i+1)%allPlayList.length].id
            //获取歌曲相关信息
            await this.getMusicInfo(id)
            
            getApp().globalData.playingSongID = id
            bgm.src = this.data.url
            bgm.title = this.data.songName
            EventBus.$emit('update')
          }
        }
      })
      this.setData({
        backgroundAudioManager: bgm,
      }) 
      getApp().globalData.playingSongID = id
      console.log('播放新的歌曲')
    }

    EventBus.$emit('update')
  },

  onReady: function (e) {
    console.log('开启定时器');
    this.getTime() // 开启定时器
  },

  onUnload: function name(params) {
    clearInterval(this.data.interval)
  },


  // 根据id获取歌曲信息
  async getMusicInfo(id){
    console.log('根据id获取歌曲信息');
    // 获取歌曲播放地址
    let res = await request('/song/url', {
      id
    })
    // 获取歌曲详细信息
    let detailRes = await request ('/song/detail', {
      ids: id
    })
    let detail = detailRes.songs[0]
    // 获取歌词
    let lyricsRes = await request('/lyric', {
      id
    })
    this.setData({
      url: res.data[0].url,
      songName: detail.name,
      authors: detail.ar,
      alName: detail.al.name,
      alPic: detail.al.picUrl,
      lyric: formatLyric(lyricsRes.lrc.lyric) // 歌词解析
    })
    // 更新控制器的信息
    getApp().globalData.playingSongName = detail.name
    getApp().globalData.playingAuthors = detail.ar
    getApp().globalData.playingAlName = detail.al.name
    getApp().globalData.playingAlPic = detail.al.picUrl
  },

  // 定时器，监听歌曲播放位置
  getTime() {
    let bgm = wx.getBackgroundAudioManager()
    this.setData({
      // 监听歌曲播放时间
      interval: setInterval(() => {
        console.log('currentTime' , this.data.backgroundAudioManager);
        this.setData({
          currentTime: bgm.currentTime,
          // currentTimeFix: Math.floor(this.data.backgroundAudioManager.currentTime) * 5
        })

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
        
        this.setData({
          currentTimeFix: (this.data.currentLine - 5) * 21
        })
        // console.log('currentLine', this.data.currentLine)
        console.log('currentTimeFix', this.data.currentTimeFix)
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
    EventBus.$emit('updatePlayStatus', this.data.isPlay)
    // console.log('当前播放状态', this.data.backgroundAudioManager.paused)
  },
  audioPlay: function () {
    console.log('开始');
    this.setData({
      isPlay: true
    })
    console.log('this.data.backgroundAudioManager', this.data.backgroundAudioManager);
    this.data.backgroundAudioManager.play() // 播放
    this.getTime() // 开启定时器
  },
  audioPause: function () {
    console.log('暂停');
    this.setData({
      isPlay: false
    })
    // console.log('this.data.backgroundAudioManager', this.data.backgroundAudioManager);
    this.data.backgroundAudioManager.pause()
    clearInterval(this.data.interval) // 关闭定时器
  },

})