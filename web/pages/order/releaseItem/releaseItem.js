// 商品详情页 detail.js
import axios from "../../../utils/network";
const { api } = require("../../../config");
Page({
    data:{
        title:'',
        money:'',
        id:'',
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
            pickupId:itemData.pickupId,
            pickupState:itemData.pickupState
          })
          if(this.data.pickupId==null){
            this.setData({
                userNickname:"暂未接单",
                useravatarUrl:"/images/defaultAvatar.png",
                pickupTime:""
            })
          }else{
            axios([{
                url: api.getUserInfo,
                method:'POST',
                data:{openid:this.data.pickupId}
              }]).then((res)=>{
                  let userData = res[0].data
                this.setData({
                    userNickname:userData.userNickname,
                    useravatarUrl:userData.avatarUrl,
                    userPhone:userData.phone
                })
              }).catch((err)=>{
    
              })
          }
        }).catch((err)=>{
            console.log(err)
        })
      ;
    },
    withdraw:function(){
        if(this.data.finishState){
            wx.showToast({
              title: '该任务已经完成',
              icon:"error",
              duration:2000
            })
        }else{
            if(this.data.pickupState){
                wx.showToast({
                  title: '该任务已被接取',
                  icon:"error",
                  duration:2000
                })
            }else{
                wx.showModal({
                  title: '真的要撤回吗？',
                  content: '该操作不可逆',
                  complete: (res) => {
                    if (res.cancel) {
                      
                    }
                
                    if (res.confirm) {
                 axios([{
                    url: api.withdrawReleasOrder,
                    method:'POST',
                    data:{userid:getApp().globalData.openid,itemid:this.data.id}
                  }]).then((res)=>{
                    wx.reLaunch({
                        url: '/pages/user/user',
                      })
                      wx.showToast({
                        title: '撤回成功',
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
        }

     
    }
  });
  