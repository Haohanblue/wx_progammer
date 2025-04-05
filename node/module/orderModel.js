const mongoose = require('mongoose');
//1.创建文档的结构对象 设置集合中文档的属性以及属性值的类型
let orderSchema = new mongoose.Schema({
    releaseOpenid:{
        type:String,
        required:true
    },
    ordertitle:{
        type:String,
        required:true
    },
    ordertype:{
        type:String,
        required:true,
        enum:["失物招领","失物认领","快递取送","一起学习","学习指导","旧物折价","活动招人"]
    },
    description:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        default:"img/default.png"
    },
    money:{
        type:Number,
        required:true
    },
    releaseTime:{
        type:Date,
        required:true
    },
    pickupState:{
        type:Boolean,
        default: false
    },
    pickupId:{
        type:String,
        default:null
    },
    pickupTime:{
        type:Date,
        default:null
    },
    finishState:{
        type:Boolean,
        default:false
    },
    finishTime:{
        type:Date,
        default:null
    },
});

// //2.创建模型对象 对文档操作的封装对象
const OrderModel = mongoose.model('Order', orderSchema);

//暴露模型对象
module.exports = OrderModel;