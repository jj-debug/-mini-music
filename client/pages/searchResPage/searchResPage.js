// pages/searchResPage/searchResPage.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    playList: []
  },

  async toPlayPage(option) {
    console.log(option.currentTarget.dataset.id);
    let id = option.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/playPage/playPage?id=' + id
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    let path = '/search',
    query = {
      keywords: options.keywords,
      limit: options.limit
    }
    let res = await request(path, query)
    this.setData({
      playList: res.result.songs
    })
    console.log(this.data.playList);
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