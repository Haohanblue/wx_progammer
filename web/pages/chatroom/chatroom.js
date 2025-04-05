// 商品详情页 detail.js
var util = require('../../utils/util.js');
import axios from "../../utils/network";
const app = getApp()
const { api } = require("../../config");
Page({
    data:{
        msg:'',
        list:[],
        myrole:"",
        scrollTop:0,
        isLoaded: false,
        opsiteAvatarUrl:'',
        opsiteNickName:''
        
    },
    onInput(e){
        this.setData({
            msg:e.detail.value
        })
    },
    onPullDownRefresh:function(){
        this.onRefresh();
    
      },
      onRefresh:function(){
          var that = this;
        //导航条加载动画
        wx.showNavigationBarLoading()
        //loading 提示框
        wx.showLoading({
          title: 'Loading...',
        })
        console.log("下拉刷新啦");
        setTimeout(function () {
          wx.hideLoading();
          wx.hideNavigationBarLoading();
          wx.stopPullDownRefresh();
          that.getUserMessage() 
        }, 200)
      },
    onLoad: function(options) {
      const orderId = options.id;
      axios([{
        url: api.getOneOrder,
        method:'POST',
        data:{data:orderId}
      }]).then((res)=>{
          let itemData = res[0].data;
          if(app.globalData.openid==itemData.releaseOpenid){
              this.setData({
                  myrole: "release"
              })
          }else if(app.globalData.openid==itemData.pickupId){
            this.setData({
                myrole: "pickup"
            })
          }
          this.setData({
              id:itemData._id,
              releaseOpenid:itemData.releaseOpenid,
              pickupOpenid:itemData.pickupId
          })
          this.getUserMessage()
        }).catch((err)=>{
            console.log(err)
        })
    },
    getUserMessage:function(){
        axios([{
            url:api.getMessage,
            method:'POST',
            data:{
                id:this.data.id,
                releaseOpenid:this.data.releaseOpenid,
                pickupId:this.data.pickupOpenid
            }
        },{
            url:api.getUsers,
            method:'POST',
            data:{
                myrole:this.data.myrole,
                releaseOpenid:this.data.releaseOpenid,
                pickupId:this.data.pickupOpenid
            }
        }]).then((res)=>{
            console.log(res[0].data)
            console.log(res[1].data)
            let Message = res[0].data
            this.setData({
                list:Message,
                isLoaded:true,
                opsiteAvatarUrl:res[1].data.avatarUrl,
                opsiteNickName:res[1].data.userNickname,
                myAvatarUrl:app.globalData.avatarUrl
            })
            wx.setNavigationBarTitle({
                title: this.data.opsiteNickName
              })
            console.log(this.data.list[2].whosend==this.data.myrole)
            this.rollingBottom()
            console.log(app.globalData.avatarUrl)
        }).catch((err)=>{
            console.log(err)
        })
    },




    send: function(e) {
        // 判断发送内容是否为空
        let message = this.data.msg
        console.log(message)
        if (message.length == 0) {
            // 弹出提示框
          wx.showToast({
            title: '消息不能为空哦~',
            icon: 'error',
            duration: 1000
          })
        } else if(message.length > 30){
            // 弹出提示框
            wx.showToast({
                title: '字太多啦~',
                icon: 'error',
                duration: 1000
              })
        }else {
            axios([{
                url:api.sendMessage,
                method:'POST',
                data:{
                    orderid:this.data.id,
                    releaseOpenid:this.data.releaseOpenid,
                    pickupId:this.data.pickupOpenid,
                    message:message,
                    whosend:this.data.myrole
                }
            }]).then((res)=>{
                wx.showToast({
                  title: '发送成功',
                  icon:"success",
                  duration:1000
                })
                this.setData({
                    msg:''
                })
          axios([{
            url:api.getMessage,
            method:'POST',
            data:{
                id:this.data.id,
                releaseOpenid:this.data.releaseOpenid,
                pickupId:this.data.pickupOpenid
            }
        }]).then((res)=>{
            console.log(res[0].data)
            let Message = res[0].data
            this.setData({
                list:Message
            })
            this.rollingBottom()
        })
                console.log(res)
            }).catch((err)=>{
                console.log(err)
            })
        }
      },

  rollingBottom(e) {
    wx.createSelectorQuery().selectAll('.list').boundingClientRect(rects => {
      rects.forEach(rect => {
        this.setData({
          scrollTop: rect.bottom
        })
      })
    }).exec()
  }
  });
  