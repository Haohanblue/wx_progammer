Page({
  data: {
      success_text : '成功!', 
      time:3,
  },
  onReady: function () {
   //3s后跳转
   this.data.Time = setInterval(() => {
    this.setData({
      time: --this.data.time
    })
    if (this.data.time <= 0) {
      clearInterval(this.data.Time)
      this.swithtabIndex()
    }
  }, 1000)
},
  swithtabIndex:function(){
    this.setData({
      time: 0
    })
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },
})
