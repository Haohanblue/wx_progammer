const db = require('../db/db')
const {mountpath} = require("express/lib/application");
const express = require('express')
const router = express.Router();
const app = express();
const bodyParser = require('body-parser')
const {PWD} = require("../config/config");
const {etag} = require("express/lib/utils");
const commentModel = require('../module/commentModel')
app.use(bodyParser.json());

router.post('/makeComment',(req,res)=>{
    console.log(req.body.data)
    let openid = req.body.openid
    let content = req.body.data.comment
    let currentTime = new Date()
    let comment = new commentModel({
        openid:openid,
        comment:content,
        time:currentTime
    })
    comment.save().then((result)=>{
        console.log("添加成功")
        res.send("成功留言")
    }).catch((err)=>{
        console.log("添加失败")
    })

})





module.exports = router;