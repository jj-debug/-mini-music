// 发送ajax
export default (url, data = {}, method = 'GET') => {
  return new Promise((resolve, reject) => {
    let res = wx.request({
      url: 'http://localhost:3000' + url,
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