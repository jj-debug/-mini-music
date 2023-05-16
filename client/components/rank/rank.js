// components/rank/rank.js
import request from "../../utils/request"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    idx: {
      type: Number,
      default: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    playListName: "",
    playList: []
  },
  /**
   * 组件的生命周期
   */
  lifetimes: {
    async attached() {
      let res = await request('/top/list', {
        idx: this.properties.idx
      })
      this.setData({
        playListName: res.playlist.name,
        playList: res.playlist.tracks
      })
      
    }
  },

  

  /**
   * 组件的方法列表
   */
  methods: {
    toSongList() {
      wx.navigateTo({
        url: '/pages/songlist/songlist?idx=' + this.properties.idx ,
      })
    }
  }
})