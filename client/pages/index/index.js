// index.js
// 获取应用实例
import request from '../../utils/request'
const app = getApp()


Page({
  data: {
    banners: [],
    hotList: [],
    topList: [],
  },
  
  async onLoad() {
    let bannersData = await request('/banner', {
      type: 2
    })
    let hotListData = await request('/personalized', {
      limit: 6
    })
    let topListData = await request('/toplist', {
      limit: 5
    })
    console.log(hotListData);
    this.setData({
      banners: bannersData.banners,
      hotList: hotListData.result,
      topList: topListData.list,
    })
    // console.log(this.data.topList[0].id);
    // console.log(this.data.topList[1].id);
    // console.log(this.data.topList[2].id);
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
  }
})
