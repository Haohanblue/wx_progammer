const mongoose = require('mongoose');
//1.创建文档的结构对象 设置集合中文档的属性以及属性值的类型
let userSchema = new mongoose.Schema({
    openid:{
        type:String,
        required:true,
        unique:true
    },
    nickname:{
        type:String,
        default:null,
    },
    avatarurl:{
        type:String,
        default: '../AvartaImage/default.png'
    },
    gender:{
        type:String,
        default:'未设置',
        enum:['男','女','未设置']
    },
    name:{
        type:String,
        default:'未设置'
    },
    phone:{
        type:String,
        default:'未设置'
    }
});

// //2.创建模型对象 对文档操作的封装对象
const UserModel = mongoose.model('User', userSchema);

//暴露模型对象
module.exports = UserModel;