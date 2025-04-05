
const API_BASE_URL = 'https://haohanblue.top:6015'  // 主域名
module.exports = {
    api:{
        //用户信息相关接口
        login: API_BASE_URL + "/login",
        register: API_BASE_URL + "/registerUsers",
        getUserInfo: API_BASE_URL + "/getUserInfo",
        upavartar: API_BASE_URL + "/upavartar",
        resetInfo:API_BASE_URL + "/resetInfo",
        getImage:API_BASE_URL + "/getImage",
        getUsers:API_BASE_URL + "/getUsers",
        //任务相关接口
        realease:API_BASE_URL + "/realease",
        upImage:API_BASE_URL + "/upImage",
        pickup:API_BASE_URL + "/pickup",
        getOrders:API_BASE_URL + "/getOrders",
        getOneOrder:API_BASE_URL + "/getOneOrder",
        getReleaseOrder:API_BASE_URL  + "/getReleaseOrder",
        getpickupOrder:API_BASE_URL  + "/getpickupOrder",

        withdrawReleasOrder:API_BASE_URL + "/withdrawReleaseOrder",
        withdrawPickupOrder:API_BASE_URL + "/withdrawPickupOrder",
        finishOrder:API_BASE_URL + "/finishOrder",

        getMessage:API_BASE_URL + "/getMessage",
        sendMessage:API_BASE_URL + "/sendMessage",

        makeComment:API_BASE_URL + "/makeComment"
    }
}