const mongoose = require('mongoose');
//1.创建文档的结构对象 设置集合中文档的属性以及属性值的类型
let messageSchema = new mongoose.Schema({
    time:{
        type:Date,
        required:true
    },
    orderId:{
        type:String,
        required:true
    },
    releaseId:{
        type:String,
        required:true
    },
    pickupId:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    whosend:{
        type:String,
        required:true,
        enum:["release","pickup"]
    }
});

// //2.创建模型对象 对文档操作的封装对象
const messageModel = mongoose.model('Message', messageSchema);

//暴露模型对象
module.exports = messageModel;