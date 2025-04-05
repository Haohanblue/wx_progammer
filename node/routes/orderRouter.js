const db = require('../db/db')
const userModel = require('../module/userModel')
const orderModel = require('../module/orderModel')
const {mountpath} = require("express/lib/application");
const express = require('express')
const router = express.Router();
const app = express();
const bodyParser = require('body-parser')
const fs = require("fs");
app.use(bodyParser.json({limit:'100mb'}));
app.use(bodyParser.urlencoded({ limit:'100mb', extended: true }));
const {BASE_SERVER_URL} = require('../config/baseServer')
router.post('/realease',(req,res)=>{
    console.log(req.body.openid)
    console.log(req.body.data)
    let releaseopenid = req.body.openid
    let data = req.body.data
    const releaseTime = new Date()
    console.log(releaseTime)
    let order = new orderModel({
        releaseOpenid:releaseopenid,
        ordertitle:data.ordertitle,
        releaseTime:releaseTime,
        ordertype:data.ordertype,
        description:data.description,
        imageUrl:data.imageUrl,
        money:data.money
    })
    order.save().then((result)=>{
        let orderid = result._doc._id
        if (result._doc.imageUrl!=='/images/help.png'){
            orderModel.updateOne({_id:orderid},{imageUrl:`${BASE_SERVER_URL}/OrderImage/${orderid}.png`}).then((rs)=>{
                console.log("图片路径修改成功")
            }).catch(()=>{
                console.log("失败")
            })
        }
        console.log("添加成功")
        res.send(result._doc._id)
    }).catch((err)=>{
        console.log(err)
    })
})

router.post('/pickup',(req,res)=>{
    console.log(req.body.userid)
    console.log(req.body.itemid)
    let userid = req.body.userid
    let itemid = req.body.itemid
    let currentTime = new Date()
    orderModel.updateOne({_id:itemid},{pickupState:true,pickupId:userid,pickupTime:currentTime}).then((result)=>{
     console.log(result)
         res.end("接取成功")
     }).catch((err)=>{
         console.log(err)
        res.end("接取失败")}
    )
})

router.post('/getOrders',(req,res)=>{
    console.log("收到！")
    orderModel.find({pickupState:false}).sort({releaseTime: -1,})
        .then((result) => {
            res.send(result)
            console.log("查到了")
        }).catch((err) => {
        console.log(err)
        console.log('查询失败')
    })
})

router.post('/getOneOrder',(req,res)=>{
    let id = req.body.data
    console.log("收到！")
    orderModel.findById(id).then((result) => {
        let i = new Date(result._doc.releaseTime)
        let j = new Date(result._doc.pickupTime)
        let k = new Date(result._doc.finishTime)
        const options = {
            timeZone: 'Asia/Shanghai', // 设置时区为上海，可根据需求修改
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        };
        let timedate1 = i.toLocaleString('zh-CN', options)
        let timedate2 = j.toLocaleString('zh-CN', options)
        let timedate3 = k.toLocaleString('zh-CN', options)
        result._doc.releaseTime=timedate1
        result._doc.pickupTime=timedate2
        result._doc.finishTime=timedate3
            res.send(result)
            console.log("查到了")
        }).catch((err) => {
        console.log(err)
        console.log('查询失败')
    })
})

router.post('/getReleaseOrder',(req,res)=>{
    console.log((req.body.userid))
    let userid = req.body.userid
    orderModel.find({releaseOpenid:userid}).sort({releaseTime:-1})
        .then((result)=>{
            console.log(result)
            res.send(result)
        }).catch((err)=>{
            res.send(err)
    })
})

router.post('/getPickupOrder',(req,res)=>{
    console.log((req.body.userid))
    let userid = req.body.userid
    orderModel.find({pickupId:userid}).sort({releaseTime:-1})
        .then((result)=>{
            res.send(result)
        }).catch((err)=>{
        res.send(err)
    })
})

router.post('/withdrawReleaseOrder',(req,res)=>{
    let userid = req.body.userid
    let itemid = req.body.itemid
    orderModel.deleteOne({_id:itemid})
        .then((result)=>{
            res.send("撤回发布成功！")
        }).catch((err)=>{
            res.send(err)
    })
})

router.post('/withdrawPickupOrder',(req,res)=> {
    let userid = req.body.userid
    let itemid = req.body.itemid
    orderModel.updateOne({_id: itemid}, {pickupState: false, pickupId: null, pickupTime: null})
        .then((result) => {
            res.send("取消接受成功！")
        }).catch((err) => {
        res.send(err)
    })
})
router.post('/finishOrder',(req,res)=>{
    let userid = req.body.userid
    let itemid = req.body.itemid
    let currentTime = new Date()
    orderModel.updateOne({_id: itemid}, {finishState: true, finishTime:currentTime})
        .then((result) => {
            res.send("订单已完成！")
        }).catch((err) => {
        res.send(err)
    })
})

router.post('/upImage', function(req, res){
    //接收前台POST过来的base64
    let orderId =  req.body.orderid
    let imgData = req.body.imgData;
    // 返回一个被 string 的值初始化的新的 Buffer 实例,原始二进制数据存储在 Buffer 类的实例中，        一个 Buffer 类似于一个整数数组，但它对应于 V8 堆内存之外的一块原始内存。
    let dataBuffer = Buffer.from(imgData, 'base64');
    fs.writeFile(`./OrderImage/${orderId}.png`, dataBuffer, function(err) {
        if(err){
            console.log(err)
            res.send(err);
        }else{
            console.log("成功")
            res.send("保存成功！");
        }
    });
});
module.exports = router;