Page({
  data: {
      success_text : '登录成功!', 
      time:3,
  },
  onReady: function () {
   //3s后跳转
   this.data.Time = setInterval(() => {
    this.setData({
      time: --this.data.time
    })
    if (this.data.time <= 0) {
      this.swithtabIndex()
    }
  }, 1000)
},
  swithtabIndex:function(){
    clearInterval(this.data.Time)
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },
})
