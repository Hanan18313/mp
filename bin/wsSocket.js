var webSocket = require('ws')


var Ws = new webSocket.Server({
    port:8090
});
Ws.on('connection',function connection(ws){
    ws.on('message',function incoming(message){
        console.log('收到的消息：'+message)
        ws.send(message)
    })
    ws.send('来自服务器的消息')
})