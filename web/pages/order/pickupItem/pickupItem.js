// 商品详情页 detail.js
import axios from "../../../utils/network";
const { api } = require("../../../config");
Page({
    data:{
        title:'',
        money:'',
        id:'',
        finishState:true
    },
    onLoad: function(options) {
      const orderId = options.id;
      axios([{
        url: api.getOneOrder,
        method:'POST',
        data:{data:orderId}
      }]).then((res)=>{
          let itemData = res[0].data;
          this.setData({
              title:itemData.ordertitle,
              money:itemData.money,
              id:itemData._id,
              releaseTime:itemData.releaseTime,
              pickupTime:itemData.pickupTime,
              releaseId:itemData.releaseOpenid,
              finishState:itemData.finishState,
              description:itemData.description,
              finishTime:itemData.finishTime
          })
          if(this.data.finishState==false){
            this.setData({
                finishTime:""
            })
          }else{
              
          }
          axios([{
            url: api.getUserInfo,
            method:'POST',
            data:{openid:this.data.releaseId}
          }]).then((res)=>{
              let userData = res[0].data
            this.setData({
                userNickname:userData.userNickname,
                useravatarUrl:userData.avatarUrl,
                userPhone:userData.phone
            })
          }).catch((err)=>{

          })
          console.log(this.data)
        }).catch((err)=>{
            console.log(err)
        })
      ;
    },
    withdrawpickup:function(){
        if(this.data.finishState){
            wx.showToast({
              title: '该任务已经完成了',
              icon:'error',
              duration:2000
            })
        }else{
            wx.showModal({
                title: '要取消接受嘛？',
                content: '取消了就要被别人抢走了哦',
                complete: (res) => {
                  if (res.cancel) {
                  }
                  if (res.confirm) {
                      axios([{
                          url: api.withdrawPickupOrder,
                          method:'POST',
                          data:{userid:getApp().globalData.openid,itemid:this.data.id}
                        }]).then((res)=>{
                            wx.reLaunch({
                              url: '/pages/user/user',
                            })
                            wx.showToast({
                              title: '取消成功',
                              icon:'success',
                              duration:2000
                           })
                          }).catch((err)=>{
                              console.log(err)
                          })                 
                  }
                }
              })
        }

     
    },
    finish:function(){
        if(this.data.finishState){
            wx.showToast({
              title: '该任务已经完成了',
              icon:'error',
              duration:2000
            })
        }else{
            wx.showModal({
                title: '是否完成？',
                content: '请和发布者确认后再点击完成哦',
                complete: (res) => {
                  if (res.cancel) {
                  }
                  if (res.confirm) {
                      axios([{
                          url: api.finishOrder,
                          method:'POST',
                          data:{userid:getApp().globalData.openid,itemid:this.data.id}
                        }]).then((res)=>{
                            wx.reLaunch({
                                url: '/pages/user/user',
                              })
                              wx.showToast({
                                title: '取消成功',
                                icon:'success',
                                duration:2000
                             })
                            console.log("完成！")
                          }).catch((err)=>{
                              console.log(err)
                          })                 
                  }
                }
              })
        }

    }
  });
  