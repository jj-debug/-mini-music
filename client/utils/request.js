// 发送ajax
import config from './config'
export default (url, data = {}, method = 'GET') => {
  return new Promise((resolve, reject) => {
    let res = wx.request({
      url: config.host + url,
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