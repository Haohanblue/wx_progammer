// noinspection BadExpressionStatementJS
process.env.TZ = 'Asia/Shanghai'
const mongoose = require('mongoose');
const db = require('./db/db')
const express = require('express')
const request = require('request')
const app = express();
const bodyParser = require('body-parser')
const https = require('https');
const fs = require('fs')
const userRouter = require('./routes/userRouter')
const orderRouter = require('./routes/orderRouter')
const messageRouter = require('./routes/messageRouter')
const commentRouter = require('./routes/commentRouter')
const opt = {
    key: fs.readFileSync('./SSL/haohanblue.top.key'),
    cert:fs.readFileSync('./SSL/haohanblue.top.pem')
};
app.use(bodyParser.json({limit:'100mb'}));
app.use(bodyParser.urlencoded({ limit:'100mb', extended: true }));
app.use(userRouter);
app.use(orderRouter);
app.use(messageRouter);
app.use(commentRouter);

app.use('/Avatar', express.static('./AvartaImage'));
app.use('/OrderImage', express.static('./OrderImage'));

db((data) => {


});
const server = https.createServer(opt, app);
const {SERVER_PORT} = require('./config/config')
server.listen(`${SERVER_PORT}`,()=>{
    console.log(`服务已经启动,端口${SERVER_PORT}监听中......`)
})