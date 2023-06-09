import config from './config'

// 发送ajax
export default (url, data = {}, method = 'GET') => {
  return new Promise((resolve, reject) => {
    let res = wx.request({
      // url: config.host + url,
      url: config.mobileHost + url,
      // url: config.JXHost + url,
      data,
      method,
      success: (res) => {
        resolve(res.data)
      },
      fail(err){
        reject(err)
      }
    })

  })
}