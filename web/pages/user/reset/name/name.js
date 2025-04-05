import { api } from "../../../../config";
import axios from "../../../../utils/network"

Page({
    data: {
    },
    validateName:function(name) {
      var regex = /^([a-zA-Z·]+\s)*[a-zA-Z·\u4e00-\u9fa5]{1,20}$/;
      return regex.test(name);
    },
    goback:function(){
      wx.navigateBack()
    },
    submit:function(e){
      if(!this.validateName(e.detail.value.name)){
        wx.showToast({
          title: '姓名不合法',
          icon:'error',
          duration:3000
        })
      }else{
      wx.showModal({
        title: '确认修改姓名为？',
        content: e.detail.value.name,
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