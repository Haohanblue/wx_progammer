import { api } from "../../../config";
import axios from "../../../utils/network"
Page({
    submit:function(e){
        if(e.detail.value.comment.length == 0 ){
            wx.showToast({
                title: '留言不能为空哦',
                icon:'error',
                duration:3000
              })
        }else if(e.detail.value.comment.length > 300){
            wx.showToast({
                title: '不能超过300字',
                icon:'error',
                duration:3000
              })
        }else{
            wx.showModal({
                title: '确认提交留言？',
                complete: (res) => {
                  if (res.cancel) {
                  }
                  if (res.confirm) {
                    axios([{
                        url: api.makeComment,
                        method:'POST',
                        data:{data:e.detail.value,
                        openid:getApp().globalData.openid}
                      }]).then((res)=>{
                        wx.switchTab({
                            url: '/pages/user/user',
                          })
                          wx.showToast({
                              title: '留言成功',
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
        wx.navigateBack({
          url: '/pages/user/user',
        })
      },
})