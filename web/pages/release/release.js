const { api } = require("../../config");
import axios from "../../utils/network";
const app = getApp()
Page({
    data: {
        imageUrl:"/images/help.png",
        array:["失物招领","失物认领","快递取送","一起学习","学习指导","旧物折价","活动招人"],
        selectedValue: '失物招领',
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
            wx.reLaunch({
              url: '/pages/release/release',
            })
        }, 200)
      },
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
        chooseImage: function() {
            let that = this;
            wx.chooseMedia({
                mediaType: ['image'],
                sourceType: ['album', 'camera'],
                maxDuration: 10,
                camera: 'back',
                success: function(res) {
                    if (res.type === 'image') {
                        that.setData({
                            imageUrl: res.tempFiles[0].tempFilePath // 将选择的图片路径保存到 imageUrl 中
                        });
                        console.log("设置成功")
                    }
                    else{
                        console.log("不是图片") 
                    }
                }
            });
        },
        bindPickerChange: function(e) {
            const selectedIndex = e.detail.value; // 获取选择的索引
            const selectedString = this.data.array[selectedIndex]; // 根据索引获取对应的字符串
            this.setData({
                selectedValue: selectedString // 更新 selectedValue 显示选择的字符串
            });
        },
    submit:function(e){
        let data = e.detail.value;
        let money = data.money;
        let n = Number(money);
        if (isNaN(n))
        {wx.showToast({
          title: '报酬为数字哦',
          icon:'error',
          duration:2000
        })}else{
            if(n<0 ||n>9999){
                wx.showToast({
                  title: '报酬超出范围',
                  icon:'error',
                  duration:2000
                })
            }else{
                if(!app.globalData.isRegister){
                    wx.showToast({
                      title: '注册后才行哦',
                      icon:'error',
                      duration:2000,
                    })}else{
                        if(data.ordertitle.length==0 || data.ordertitle.length>10){
                            wx.showToast({
                              title: '标题为空或过长',
                              icon:"error",
                              duration:1000
                            })
                        }else if(data.description.length==0 || data.description.length>50){
                            wx.showToast({
                                title: '描述为空或过长',
                                icon:"error",
                                duration:1000
                              })
                        }else if(data.money.length==0){
                            wx.showToast({
                                title: '请输入报酬',
                                icon:"error",
                                duration:1000
                              })
                        }
                        else{        
                            wx.showModal({
                            title: '确认发布？',
                            content: '请检查信息无误哦',
                            complete: (res) => {
                              if (res.cancel) {
                              }
                              if (res.confirm) {
                                  axios([{
                                      url: api.realease,
                                      method:'POST',
                                      data:{
                                      data:{
                                        ordertitle:e.detail.value.ordertitle,
                                        ordertype:this.data.selectedValue,
                                        description:e.detail.value.description,
                                        money:e.detail.value.money,
                                        imageUrl:this.data.imageUrl
                                      },
                                      openid:getApp().globalData.openid,
                                      }
                                    }]).then((res)=>{
                                    if(this.data.imageUrl!=='/images/help.png'){
                                        let orderId = res[0].data
                                      this.base64(this.data.imageUrl,"png").then((result)=>{
                                        axios([{
                                            url: api.upImage,
                                            method:'POST',
                                            data:{
                                              imgData:result,
                                              orderid:orderId
                                            },
                                        }]).then(()=>{
                                            console.log("图片上传成功")
                                        }).catch(()=>{
                                            console.log("图片上传失败")
                                        })
                                      })
                                  }
                                      wx.reLaunch({
                                          url: '/pages/index/index'
                                        })
                                        wx.showToast({
                                          title: '发布成功',
                                          icon:'success',
                                          duration:2000
                                        })
                                        console.log("发送成功")
                              }).catch((err)=>{
                                  console.log(err)
                              })              
                              }
                            }
                          })}
                
                           
                    }
            }

            }


    }
})