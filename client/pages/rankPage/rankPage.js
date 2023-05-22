// pages/rankPage.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    playList:[],
    allList: [],
    currentIndex: 0,
    pageSize: 20,
    loadingMore: false
  },

  toPlayPage(option){
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
    let res = await request("/playlist/detail", {
      id: options.idx
    })
    console.log(res);
    if(res.code != 200){
      console.log(res.message);
    }else{
      this.setData({
        // playList: res.playlist.tracks
        allList: res.playlist.tracks || res.result.songs
      })
    }
    
    console.log(this.data.allList);
    this.renderNextPage()
  },

  loadMore() {
    console.log('load more');
    this.renderNextPage()
  },

  renderNextPage() {
    const { currentIndex, pageSize, allList, playList } = this.data
    
    console.log(playList);
    console.log(allList);
    if (playList.length >= allList.length) {
      return
    }
    this.setData({
      loadingMore: true
    })
    setTimeout(() => {
      const offset = currentIndex * pageSize
      const arr = allList.slice(offset, offset + pageSize)
      this.setData({
        playList: playList.concat(arr),
        currentIndex: currentIndex + 1
      })

      console.log(playList);
      console.log(allList);
      this.setData({
        loadingMore: false
      })
    }, 500)
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