const mongoose = require('mongoose');
//1.创建文档的结构对象 设置集合中文档的属性以及属性值的类型
let commentSchema = new mongoose.Schema({
    openid:{
        type:String,
        required:true,
    },
    comment:{
        type:String,
        required: true
    },
    time:{
        type:Date,
        required:true
    }
});

// //2.创建模型对象 对文档操作的封装对象
const CommentModel = mongoose.model('Comment', commentSchema);

//暴露模型对象
module.exports = CommentModel;