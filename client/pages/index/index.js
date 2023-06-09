// index.js
// 获取应用实例
import request from '../../utils/request'


Page({
  data: {
    banners: [],
    hotList: [],
    topList: [],
    allPlayList: getApp().globalData.allPlayList,
    playingSongName: getApp().globalData.playingSongName,
  },
  
  async onLoad() {
    // 获取轮播图
    let bannersData = await request('/banner', {
      type: 2
    })
    // 获取专辑列表
    let hotListData = await request('/personalized', {
      limit: 6
    })
    // 获取排行榜
    let topListData = await request('/toplist', {
      limit: 5
    })
    this.setData({
      banners: bannersData.banners,
      hotList: hotListData.result,
      topList: topListData.list,
    })
    
  },

  onReady() {
    // console.log('ready');
  },
  onShow() {
    // console.log('show');
    // // 获取背景音乐
    // let bgm = wx.getBackgroundAudioManager()
    // console.log('bgm', bgm);
    // console.log('bgm.title', bgm.title);
    // console.log('bgm.coverImgUrl', bgm.coverImgUrl);
    // console.log("getApp().globalData.allPlayList", getApp().globalData.allPlayList);
    this.setData({
      allPlayList: getApp().globalData.allPlayList,
      playingSongName: getApp().globalData.playingSongName,
    })
  },

  toSearchPage() {
    console.log(1);
    wx.navigateTo({
      url: '../searchPage/searchPage',
    })
  },


  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
  },

})
