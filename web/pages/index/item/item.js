// 商品详情页 detail.js
const app = getApp()
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
              releaseId:itemData.releaseOpenid,
              description:itemData.description,
              releaseTime:itemData.releaseTime
          })
          axios([{
            url: api.getUserInfo,
            method:'POST',
            data:{openid:this.data.releaseId}
          }]).then((res)=>{
              let userData = res[0].data
            this.setData({
                userNickname:userData.userNickname,
                useravatarUrl:userData.avatarUrl
            })
          }).catch((err)=>{
          })
          console.log(this.data)
        }).catch((err)=>{
            console.log(err)
        })
      ;
    },
    pickup:function(){
        if(!app.globalData.isRegister){
            wx.showToast({
              title: '注册后才行哦',
              icon:'error',
              duration:2000,
            })
        }else{
            if(this.data.releaseId==app.globalData.openid){
                wx.showToast({
                  title: '不可以接取自己发布的任务',
                  icon:'none',
                  duration:2000
                })
            }else{
                wx.showModal({
                    title: '确认接取？',
                    content: '',
                    complete: (res) => {
                      if (res.cancel) {
                      }
                      if (res.confirm) {
                          axios([{
                              url: api.pickup,
                              method:'POST',
                              data:{userid:getApp().globalData.openid,itemid:this.data.id}
                            }]).then((res)=>{
                              wx.reLaunch({
                                  url: '/pages/index/index'
                                })
                                wx.showToast({
                                  title: '接取成功',
                                  icon:'success',
                                  duration:2000
                                })
                                console.log("接取成功")
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
  