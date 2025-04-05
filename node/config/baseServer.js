const {PROTOCOLS,SERVER,SERVER_PORT} = require('./config')
let serverUrl = `${PROTOCOLS}://${SERVER}:${SERVER_PORT}`
module.exports ={
    BASE_SERVER_URL:serverUrl
}