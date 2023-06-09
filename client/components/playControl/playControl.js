// components/playControl/playControl.js
import EventBus from '../../utils/EventBus'
import request from '../../utils/request'

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    bgm: null,
    allPlayList: getApp().globalData.allPlayList,
    playStatus: true,
    playingSrc: '',
    playingSongID: getApp().globalData.playingSongID,  // 歌ID
    playingSongName: '',  // 歌名
    playingAuthors: [],   // 歌手
    playingAlName: '',    // 专辑名
    playingAlPic: '',     // 专辑图片
    interval: null,
    
    tagShow: false,
    
    highLightIndex: null// 需要高亮的索引
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 高亮正在播放的歌曲
    highLightMusic() {
      let id = getApp().globalData.playingSongID
      let query = wx.createSelectorQuery().in(this)
      let that = this
      query.selectAll(".scroll-view-item").boundingClientRect(function(rects){
        // console.log("rects", rects);
        rects.forEach(function(rect, index){
          if(rect.id == id) {
            // console.log("rect", rect, index);
            that.setData({
              highLightIndex: index
            })
          } 
        })
      }).exec()
    },
    
    // 播放列表里进行歌曲切换
    async toggle(e) {
      console.log("切歌");
      let id = e.currentTarget.id;
      this.setData({
        playingSongID: id
      })
      getApp().globalData.playingSongID = id
      // 高亮
      this.highLightMusic()

      // 获取歌曲播放地址
      let res = await request('/song/url', {
        id
      })
      if(res.code != 200) {
        console.log('请求失败')
        return
      }
      this.setData({
        playingSrc: res.data[0].url,
      })
      getApp().globalData.bgm.src = this.data.playingSrc
      getApp().globalData.bgm.title = this.data.playingSongName
      getApp().globalData.playingSongID = id
      getApp().globalData.playStatus = true

      // 获取歌曲详细信息
      let detailRes = await request ('/song/detail', {
        ids: id
      })
      let detail = detailRes.songs[0]
      this.setData({
        playingSongName: detail.name,
        playingAuthors: detail.ar,
        playingAlName: detail.al.name,
        playingAlPic: detail.al.picUrl,
        playStatus: true,
      })
    },

    // 控制播放列表的显示与隐藏
    listShow() {
      this.setData({
        tagShow: !this.data.tagShow
      })
      // 高亮
      this.highLightMusic()
    },

    handlePlay() {
      if (this.data.playStatus) {
        this.data.bgm.pause()
        getApp().globalData.playStatus = false
        console.log('暂停');
      }else{
        this.data.bgm.play()
        getApp().globalData.playStatus = true
        console.log('开始');
      }
      this.setData({
        playStatus: !this.data.playStatus
      })
      console.log(this.data.playStatus);
    },
    updatePlaying(e){
      console.log('updatePlaying', e);
    },
    toPlayPage(){
      let id = getApp().globalData.playingSongID
      wx.navigateTo({
        url: '/pages/playPage/playPage?goon=true&id=' + id
      })
    },
  },
  
  lifetimes: {
    attached() {
      console.log('created');
      EventBus.$on('update', (data) => {
        console.log('更新正在播放的歌曲信息');  
        this.setData({
          bgm: wx.getBackgroundAudioManager(),
          playingSongName: getApp().globalData.playingSongName,
          playingAlPic: getApp().globalData.playingAlPic,
          allPlayList: getApp().globalData.allPlayList.map(item => {
            item.text = item.name;
            item.value = item.name;
            return item
          }),
          playingAuthors: getApp().globalData.playingAuthors,   // 歌手
        })
        
        console.log('歌曲列表', this.data.allPlayList);
      })
      EventBus.$on('updatePlayStatus', (data) => {
        console.log('更新歌曲状态', data);  
        this.setData({
          playStatus: data,
        })
      })
    },
    // attached() {
    //   console.log('attached');
    // },
    ready() {
      console.log('ready');
      this.setData({
        bgm: wx.getBackgroundAudioManager(),
        playingSongName: getApp().globalData.playingSongName,
        playingAlPic: getApp().globalData.playingAlPic,
        allPlayList: getApp().globalData.allPlayList.map(item => {
          item.text = item.name;
          item.value = item.name;
          return item
        }),
        playingAuthors: getApp().globalData.playingAuthors,   // 歌手
      })

    }, 
    moved() {
      console.log('moved');
    }
  },

  observers: {
    'playingSongName': function() {
      console.log('this.data.playingSongName', this.data.playingSongName);
      // clearInterval(this.data.interval)
    }
  }

})
