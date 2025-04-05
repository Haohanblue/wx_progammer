const db = require('../db/db')
const userModel = require('../module/userModel')
const orderModel = require('../module/orderModel')
const messageModel = require('../module/messageModel')
const {mountpath} = require("express/lib/application");
const express = require('express')

const router = express.Router();
const app = express();
const bodyParser = require('body-parser')
const {PWD} = require("../config/config");
const {etag} = require("express/lib/utils");

app.use(bodyParser.json());


router.post('/getMessage',(req,res)=>{
    orderid = req.body.id
    releaseid = req.body.releaseOpenid
    pickupid = req.body.pickupId
    console.log("任务订单为："+orderid)
    console.log("发布者id"+ releaseid)
    console.log("接受者ID" +pickupid)
    messageModel.find({orderId:orderid,releaseId:releaseid,pickupId:pickupid}).sort({time: 1})
        .then((result)=>{
            let array = result
            const options = {
                timeZone: 'Asia/Shanghai', // 设置时区为上海，可根据需求修改
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            };
            for (let i = 0 ; i < array.length ; i++){
                let j = new Date(array[i].time)
                let timedate = j.toLocaleString('zh-CN', options)
                array[i]._doc.timedate = timedate;
            }
            console.log("已经获取所有消息")
            res.send(array)
        }).catch((err)=>{
            console.log(err)
            console.log("获取消息失败")
            res.send(err)
    })
})

router.post('/sendMessage',(req,res)=>{
    orderid = req.body.orderid
    releaseid = req.body.releaseOpenid
    pickupid = req.body.pickupId
    message = req.body.message
    whosend = req.body.whosend
    let currentTime = new Date()
    let msg = new messageModel({
        time:currentTime,
        orderId:orderid,
        releaseId:releaseid,
        pickupId:pickupid,
        message:message,
        whosend:whosend
    })
    msg.save().then((result)=>{
        res.send("发送成功")
    }).catch((err)=>{
        console.log(err)
        res.send("发送失败")
    })
})

module.exports = router;