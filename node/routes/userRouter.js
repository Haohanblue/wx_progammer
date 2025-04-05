const db = require('../db/db')
const userModel = require('../module/userModel')
const {mountpath} = require("express/lib/application");
const express = require('express')
const router = express.Router();
const request = require('request')
const app = express();
const bodyParser = require('body-parser')
const fs = require('fs')
app.use(bodyParser.json());
app.use(bodyParser.json({limit:'100mb'}));
app.use(bodyParser.urlencoded({ limit:'100mb', extended: true }));
const wx = {
    appid:'wx8524fdc67a64ed24',
    secret:'14a00915ef5692d9f5d060efa05963dd'
}

router.post('/login',(req,res)=>{
        console.log("监测到请求的code为" + req.body.code)
        let RegisterState = false
        // code,appid,secret都有了就发起请求到微信接口服务校验
        let url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + wx.appid + '&secret=' + wx.secret + '&js_code=' + req.body.code + '&grant_type=authorization_code'
        request(url, (err, response, body) => {
            if (!err && response.statusCode == 200){
                let session = JSON.parse(body)
                let id = session.openid
                console.log(id)
                if (id!=null){
                    console.log(`检测到openid为:${id}的用户登录`)
                    //查询数据库是否存在该openid，如果已有则进入欢迎界面，没有则向数据库中插入数据进行注册，获取用户的头像、昵称
                    userModel.find().then((result)=>{
                        console.log("查询所有数据结果为："+ result)
                    })
                    userModel.findOne({openid:id}).then((result)=> {
                        console.log("查询结果是否存在openid结果为：" + result)
                        if (result == null) {
                            //该用户为新用户
                            console.log("新用户")
                            console.log(id)
                            let user = new userModel({openid:id})
                            user.save().then((result)=>{
                                console.log("添加成功")
                                RegisterState = false
                                let data = {openid: id, Register: RegisterState};
                                res.send(data)
                            }).catch((err)=>{
                                console.log("添加失败")
                            })
                        }
                        //该用户为老用户
                        else{
                            if (result.nickname === null ){
                                console.log("未注册")
                                RegisterState = false
                                let data = {openid: id, Register: RegisterState};
                                res.send(data)
                            }else{
                                console.log("已注册")
                                RegisterState = true
                                let data={openid:id,Register:RegisterState}
                                res.send(data)
                            }

                        }
                    }).catch((err)=>{
                        console.log(err)
                    })
                }
                else {console.log("未检测到用户openid")
                    res.send(err)
                }

            }
            else {
                console.log("获取openi失败")
            }

        })
    },
)
const {BASE_SERVER_URL} = require('../config/baseServer')
router.post('/registerUsers',async (req, res) => {
    userInfo = req.body.userInfo
    openid = req.body.openid
    userModel.updateOne({openid:openid},{nickname:userInfo.nickName,avatarurl:`${BASE_SERVER_URL}/Avatar/${openid}.png`}).then((result)=>{
        console.log(result)
        res.end("注册成功")
    }).catch((err)=>{
        console.log(err)
        res.end("注册失败")}
    )
});

router.post('/getUserInfo',(req,res)=>{
    openid = req.body.openid
    console.log(openid)
    userModel.findOne({openid:openid}).then((result)=>{
        console.log(result)
        let data = {
            openid:result.openid,
            avatarUrl:result.avatarurl,
            userNickname:result.nickname,
            name:result.name,
            gender:result.gender,
            phone:result.phone
        }
        res.send(data)
    }).catch((err)=>{
        console.log(err)
        res.send(err)
    })
})

router.post('/upavartar', function(req, res){
    //接收前台POST过来的base64
    let openid =  req.body.openid
    let imgData = req.body.imgData;
    // 返回一个被 string 的值初始化的新的 Buffer 实例,原始二进制数据存储在 Buffer 类的实例中，        一个 Buffer 类似于一个整数数组，但它对应于 V8 堆内存之外的一块原始内存。
    let dataBuffer = Buffer.from(imgData, 'base64');
    fs.writeFile(`./AvartaImage/${openid}.png`, dataBuffer, function(err) {
        if(err){
            console.log(err)
            res.send(err);
        }else{
            console.log("成功")
            res.send("保存成功！");
        }
    });
});

router.post('/resetInfo',(req,res)=>{
    console.log("获取到请求")
    let temp =req.body
    console.log(temp)
    let id = temp.openid
    let data = temp.data
    userModel.updateOne({openid:openid},data).then((result)=>{
        console.log(result)
        res.end("修改成功")
    }).catch((err)=>{
        console.log(err)
        res.end("修改失败")}
    )
    console.log(id)
    console.log(data)

})

router.post('/getUsers',(req,res)=>{
    releaseid = req.body.releaseOpenid
    pickupid = req.body.pickupId
    myrole = req.body.myrole
    if(myrole == 'pickup') {
        openid = releaseid
    }else{
        openid = pickupid
    }
     userModel.findOne({openid:openid}).then((result)=>{
         console.log(result)
         let data = {
             avatarUrl:result.avatarurl,
             userNickname:result.nickname,
         }
         res.send(data)
     }).catch((err)=>{
         console.log(err)
         res.send(err)
     })
})
module.exports = router;