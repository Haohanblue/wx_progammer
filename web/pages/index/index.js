const { api } = require("../../config");
import axios from "../../utils/network";
const app = getApp()
Page({

    data: {
        bannerImages:['/images/banner/01.jpg','/images/banner/02.jpg','/images/banner/03.jpg'],
        orderlist:[],
        orderlength:0,
        categories: ["显示全部","失物招领","失物认领","快递取送","一起学习","学习指导","旧物折价","活动招人"],
        selectedCategoryIndex: 0,
        displayedOrderlist: []
    },
    onPreview:function(e){
      let url = e.currentTarget.dataset.url
      wx.previewImage({
        current: url, // 当前显示图片的http链接
        urls: [url] // 需要预览的图片http链接列表
      })
    },
    switchCategory(event) {
        const { index } = event.currentTarget.dataset;
        if(index == 0){
            this.setData({
                displayedOrderlist:this.data.orderlist
            })
        }else{
            this.setData({
                selectedCategoryIndex: index,
                displayedOrderlist: this.data.orderlist.filter(item => item.ordertype === this.data.categories[index]),
              });
        }

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
            url: api.getOrders,
            method:'POST',
          }]).then((res)=>{
              let reslength = res[0].data.length
              let resarray = res[0].data
              this.setData({
                  orderlist:resarray,
                  orderlength:reslength,
                  displayedOrderlist:resarray
              })
            }).catch((err)=>{
                console.log(err)
            })
    },
    item:function(e){
        const orderId = e.currentTarget.dataset.id
        wx:wx.navigateTo({
          url: './item/item?id=' + orderId,
          events: {
          },
          success: (result) => {
          },
        })
    },
    submit:function(e){
        axios([{
            url: api.realease,
            method:'POST',
            data:{data:e.detail.value,
            openid:getApp().globalData.openid,
            }
          }]).then((res)=>{
              console.log("发送成功")
  }).catch((err)=>{
      console.log(err)
  })
    }
})