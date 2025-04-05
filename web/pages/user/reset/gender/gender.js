import { api } from "../../../../config"
import axios from "../../../../utils/network"

Page({
    data: {
    },

    submit:function(e){
      let temp = e.detail.value.gender
      if(temp === ''){
        wx.showToast({
          title: '请选择性别',
          icon:'error',
          duration:3000
        })
      }else{
          wx.showModal({
            title: '确认修改性别为？',
            content: temp,
            complete: (res) => {
              if (res.cancel) {
              }
              if (res.confirm) {
                axios([{
                    url: api.resetInfo,
                    method:'POST',
                    data:{data:e.detail.value,
                    openid:getApp().globalData.openid}
                  }]).then((res)=>{
                    wx.switchTab({
                      url: '/pages/user/user',
                    })
                    wx.showToast({
                        title: '修改成功',
                        icon:'success',
                        duration:1000
                      })
                  }).catch((err)=>{
                    wx.redirectTo({
                      url: '/pages/navigation/loadingerror/loadingerror'
                    })
                  })                   
              }
            }
          })
     
    }
  },
  goback:function(){
    wx.switchTab({
      url: '/pages/user/user',
    })
  }
})