var WebSocket = require('ws')
const Base = require('../service/base.js')
const request = require('request')

var queue = new Base.Queue()
var Ws = new WebSocket.Server({
    port:3001
});
//新建时间、位置数组
const a_time = [1,2,3,4,5,6,7,8,9]
const a_position = [1,2,3,4,5,6,7,8,9] 

//获取网络时间
function getNetTime(){
  const url = 'http://www.ntsc.ac.cn';
  request.get(url,(err,result) => {
      if(err){
          console.log(err)
      }else{
          return result
      }
  })
}
// Broadcast to all.
Ws.broadcast = function broadcast(data) {
    Ws.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  };
   
  Ws.on('connection', function connection(ws) {
    ws.on('message', function incoming(data) {
      var timeItem = a_time[data]
      var positionItem = a_position[data]
      var obj = {
        timeItem:timeItem,
        positionItem:positionItem
      }
      // Broadcast to everyone else.
        Ws.clients.forEach(function each(client){
          if(client !== ws && client.readyState === WebSocket.OPEN){
            var sender = setInterval(() => {
              client.send(getNetTime());
            },20)
          }
        })
    });
  });

  