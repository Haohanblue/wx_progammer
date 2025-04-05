//定义函数完成网络请求
//params是对象格式，用来存储网络请求中需要使用的数据参数，比如网址，请求方式，请求头，data等
function startNetwork(params){
    //返回一个Promise对象，在该对象中封装网络请求
    return new Promise(function(resolve,reject){
        //开始网络请i去
        wx.request({
            // 扩展运算，把对象中的数据依次放在这排开
          ...params,
          success(res){
            //成功时传递数据
              resolve(res);
          },
          fail(err){
              //通知外界请求失败
              reject(err);
          }
        })
    });
}
// 封装函数实现多个网络请求按照顺序将结果同意传递给外界
async function axios(params){
    //判断参数params数据类型，如果时数组类型此时嗲表含有多个网络请求任务，如果时对象，则只有一个网络请求任务
    //instanceof时js内部专门用来进行类型数据比对操作，该操作可以精确比较数据类型
    if(params instanceof Array){
        // 定义数据存储容器存储多个网络请求任务的结果
        var datas=[];
        //作用：便利所有的请求参数
        for(var i=0;i<params.length;i++){
            // var param=params[i];
            //开始本次网络请i去
            var data=await startNetwork(params[i]);
            datas.push(data);
        }
        return datas;
    }else{
        //开始本次网络请求
        return await startNetwork(params);
    }
}

// 将该文件作为模块提供给外界
export default axios;
