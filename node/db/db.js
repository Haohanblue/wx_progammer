module.exports = function (success,error) {
    //判断 error 为其设置一个默认值
    if(typeof error !== 'function'){
        (error) => {
            console.log('连接失败');
        }
    }
    //导入mongoose
    const mongoose = require('mongoose');
    //导入配置文件
    const {USER,PWD,HOST,PORT,NAME} = require('../config/config')

    mongoose.set('strictQuery', true);
    //连接mongodb服务                           数据库名称
    mongoose.connect(`mongodb://${USER}:${PWD}@${HOST}:${PORT}/${NAME}`);

    mongoose.connection.once('open', () => {
        success();
    });

    //设置连接错误的回调
    mongoose.connection.on('error', () => {
        error();
    });
    //设置连接关闭
    mongoose.connection.on('close', () => {
        console.log('close')
    });
}