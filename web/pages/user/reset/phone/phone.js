import { api } from "../../../../config"
import axios from "../../../../utils/network"

Page({
    data: {
    },
    goback:function(){
      wx.navigateBack()
    },
    submit:function(e){
      let number = e.detail.value.phone
      if(!(number.length === 11 && !isNaN(number))){
        wx.showToast({
          title: '请输入手机号码',
          icon:'error',
          duration:3000
        })
      }else{
          wx.showModal({
            title: '确认修改手机号码为？',
            content: number,
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
  }
})