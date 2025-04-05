const { api } = require("../../config");
import axios from "../../utils/network";
const app = getApp()
Page({
    data: {
        card: 1,
        activeRelease: 'filter-active',
        activeAccept: '',
        releaseItemList:[],
        pickupItemList:[]
    },
    onPreview:function(e){
      let url = e.currentTarget.dataset.url
      wx.previewImage({
        current: url, // 当前显示图片的http链接
        urls: [url] // 需要预览的图片http链接列表
      })
    },
    showReleasedTasks: function(){
        this.setData({
          activeRelease: 'filter-active',
          activeAccept: '',
          card: 1
        })
    },
    showAcceptedTasks: function(){
        this.setData({
          card:2,
          activeRelease: '',
          activeAccept: 'filter-active',
        })
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
            that.onLoad()
        }, 200)
      },
    onLoad:function(){
        axios([{
            url: api.getReleaseOrder,
            method:'POST',
            data:{
                userid:app.globalData.openid
            }
          },{
              url:api.getpickupOrder,
              method:'POST',
              data:{
                  userid:app.globalData.openid
              }
          }]).then((res)=>{
            let releaseArray = res[0].data
            let pickupArray = res[1].data
            this.setData({
                releaseItemList:releaseArray,
                pickupItemList:pickupArray
            })
            }).catch((err)=>{
                console.log(err)
            })
    },
    releaseitem:function(e){
        const orderId = e.currentTarget.dataset.id
        wx:wx.navigateTo({
          url: './releaseItem/releaseItem?id=' + orderId,
          events: {
          },
          success: (result) => {
          },
        })
    },
    pickupitem:function(e){
        const orderId = e.currentTarget.dataset.id
        wx:wx.navigateTo({
          url: './pickupItem/pickupItem?id=' + orderId,
          events: {
          },
          success: (result) => {
          },
        })
    },
    ToChatRoom:function(e){
        const orderId = e.currentTarget.dataset.id
        wx:wx.navigateTo({
          url: '/pages/chatroom/chatroom?id=' + orderId,
          events: {
          },
          success: (result) => {
          },
        })
    }
})