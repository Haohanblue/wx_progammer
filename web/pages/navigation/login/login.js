import { api } from "../../../config"
import axios from "../../../utils/network"

const app =getApp()
Page({
    data: {
        msg:"正在载入中...",
        time:999999
    },
    onLoad: function() {
      wx.showToast({
        title: '载入中',
        duration: this.data.time,
        icon:'loading'
      })
      this.login()
    },
    login:function(){
      wx.login({
          success: (res) => {
            axios([{
              url: api.login,
              method:'POST',
              data:{code:res.code},
          }]).then((res)=>{
              console.log(res[0].data)
              let data = res[0].data
              app.globalData.openid=data.openid
              app.globalData.isLogin=true
              app.globalData.isRegister=data.Register
              console.log(data.Register)
            wx.reLaunch({
                  url: '/pages/index/index',
            })
          }).catch((err)=>{
            this.setData.time=0
            wx.redirectTo({
              url: '/pages/navigation/error/error',
            })
          })
          },
          fail:function(err){
            console.log(err)
          }
        })
    },
})