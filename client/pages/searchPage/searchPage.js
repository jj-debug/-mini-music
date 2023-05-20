// pages/searchPage/searchPage.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotSearchList: []
  },

  async getSearchResult(option, value) {
    let keywords = option.detail.value || option.currentTarget.dataset.keywords;
    // console.log(option.currentTarget.dataset.keywords);
    wx.navigateTo({
      url: '/pages/searchResPage/searchResPage?path=/search&keywords=' + keywords + '&limit=30',
    })
    // let res = await request("/search", {
    //   keywords,
    //   limit: 30
    // })
    // console.log(res.result);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    // 获取热门搜索列表
    let res = await request('/search/hot/detail')
    if (res.code == 200) {
      this.setData({
        hotSearchList: res.data
      })
      console.log(this.data.hotSearchList);
    } else {
      console.log('请求热搜失败, 请检查网络或其他设置');
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})