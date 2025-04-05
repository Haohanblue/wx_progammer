const app =getApp()
import { api } from "../../config";
import axios from "../../utils/network";
Page({

    data: {
        openid:'',
        avatarUrl:'',
        userNickname:'',
        name:'',
        gender:'',
        phone:'',
    },
    onPullDownRefresh:function(){
        this.onRefresh();
      },
      onRefresh:function(){
          var that = this
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
            that.onShow()
        }, 200)
      },
    onShow:function(){
      console.log("实现了")
        axios([{
            url: api.getUserInfo,
            method:'POST',
            data:{openid:app.globalData.openid},
        }]).then((res)=>{
            let userData=res[0].data
            this.setData({
                openid:userData.openid,
                avatarUrl:userData.avatarUrl,
                userNickname:userData.userNickname,
                name:userData.name,
                gender:userData.gender,
                phone:userData.phone,
                isRegister:app.globalData.isRegister
            })
            app.globalData.avatarUrl = this.data.avatarUrl
        })
    },
    switchToName:function(){
        if(!app.globalData.isRegister){
            wx.showToast({
              title: '注册后才行哦',
              icon:'error',
              duration:2000,
            })}else{
                wx.navigateTo({
                    url: './reset/name/name'
                  })
            }

    },
    switchToRegister:function(){
        wx.navigateTo({
            url: '/pages/navigation/register/register'
            })
    },
    switchToGender:function(){
        if(!app.globalData.isRegister){
            wx.showToast({
              title: '注册后才行哦',
              icon:'error',
              duration:2000,
            })}else{
                wx.navigateTo({
                    url: './reset/gender/gender'
                  })
            }

    },
    switchToPhone:function(){
        if(!app.globalData.isRegister){
            wx.showToast({
              title: '注册后才行哦',
              icon:'error',
              duration:2000,
            })}else{
                wx.navigateTo({
                    url: './reset/phone/phone'
                  })
            }

    },
    switchToOrder:function(){
        if(!app.globalData.isRegister){
            wx.showToast({
              title: '注册后才行哦',
              icon:'error',
              duration:2000,
            })}else{
                wx.navigateTo({
                    url: '../order/order'
                  })
            }
    },
    switchToAvatar:function(){
                wx.navigateTo({
                    url: '/pages/navigation/register/register'
                  })
    },
    switchToNickname:function(){
        if(!app.globalData.isRegister){
            wx.showToast({
              title: '注册后才行哦',
              icon:'error',
              duration:2000,
            })}else{
                wx.navigateTo({
                    url: '/pages/navigation/register/register'
                  })
            }

    },
    switchToComment:function(){
        if(!app.globalData.isRegister){
            wx.showToast({
              title: '注册后才行哦',
              icon:'error',
              duration:2000,
            })}else{
                wx.navigateTo({
                    url: '/pages/user/comment/comment'
                  })
            }

    }
    
})