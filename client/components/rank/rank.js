// components/rank/rank.js
import request from "../../utils/request"
Component({
  /**
   * 组件的初始数据
   */
  data: {
    playListName: "",
    playList: [],
    // id: 1,
  },

  /**
   * 组件的属性列表
   */
  properties: {
    idx: {
      type: Number,
      default: 1
    }
  },


  /**
   * 组件的生命周期
   */
  lifetimes: {
    async ready() {
      // 接口已被弃用
      // let res = await request('/top/list', {
      //   idx: this.properties.idx
      // })
      // console.log(this.data.id);

      console.log(this.properties);
      console.log(this.properties.idx);

      let res = await request('/playlist/detail', {
        id: this.properties.idx
      })
      // console.log(res);
      if (res.code != 200) {
        console.log(res.message);
      }else{
        this.setData({
          playListName: res.playlist.name,
          playList: res.playlist.tracks
        })
      }
    }
    
  },

  

  /**
   * 组件的方法列表
   */
  methods: {
    toRankPage() {
      wx.navigateTo({
        url: '/pages/rankPage/rankPage?path=/playlist/detail&idx=' + this.properties.idx ,
      })
    }
  }
})