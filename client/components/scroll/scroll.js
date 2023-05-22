// components/scroll/scroll.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    hotList: {
      type: Array,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleList(event) {
      wx.navigateTo({
        url: '/pages/rankPage/rankPage?idx=' + event.currentTarget.dataset.id,
      })
    }
  }
})
