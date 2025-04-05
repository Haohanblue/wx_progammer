import { api } from "../../../config"
import axios from "../../../utils/network"

// index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
const app =getApp()
Component({
  data: {
    motto: 'Hello World',
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: '',
    },
    hasUserInfo: false,
    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    canIUseNicknameComp: wx.canIUse('input.type.nickname'),
  },
  methods: {
      // 图片转64代码

    submitTo:function(e){
      console.log(this.data.userInfo)
      axios([{
        url: api.register,
        method:'POST',
        data:{
          userInfo:this.data.userInfo,
          openid:getApp().globalData.openid
        },
    }]).then((res)=>{
      if(res[0].data="注册成功"){
        if(getApp().globalData.isRegister){
          wx.redirectTo({
            url: '/pages/navigation/loadingreset/loadingreset',
          })
        }else{
          wx.redirectTo({
            url: '/pages/navigation/login/login',
          })
        }

    }else{
        wx.showToast({
            title: '提交失败',
            icon:'error',
            duration:2000
          })
          wx.redirectTo({
              url: '/pages/navigation/error/error',
            })
    }
    }).catch((err)=>{
        console.log(err)
    })
  },
    onChooseAvatar(e) {
      const { avatarUrl } = e.detail
      const { nickName } = this.data.userInfo
      this.setData({
        "userInfo.avatarUrl": avatarUrl,
        hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
      })
      this.base64(avatarUrl,"png").then((res)=>{
        axios([{
          url: api.upavartar,
          method:'POST',
          data:{
            imgData:res,
            openid:getApp().globalData.openid
          },
      }]).then((result)=>{
        console.log(result)
      }).catch((err)=>{
        console.log(err)
      })
      })
    },
    onInputChange(e) {
      const nickName = e.detail.value
      const { avatarUrl } = this.data.userInfo
      this.setData({
        "userInfo.nickName": nickName,
        hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
      })
    },

    getUserProfile(e) {
      wx.getUserProfile({
        desc: '展示用户信息', 
        success: (res) => {
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    },
    // 图片转64代码
  base64(url, type) {
    return new Promise((resolve, reject) => {
      wx.getFileSystemManager().readFile({
        filePath: url, //选择图片返回的相对路径
        encoding: 'base64', //编码格式
        success: res => {
          //resolve('data:image/' + type.toLocaleLowerCase() + ';base64,' + res.data)
          resolve(res.data)
        },
        fail: res => reject(res.errMsg)
      })
    })
  },

  },
})
