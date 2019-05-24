var WebSocket = require('ws')
const Base = require('../service/base.js')
const buff = new Buffer(10)

var queue = new Base.Queue()
var Ws = new WebSocket.Server({
    port:3001
});
//新建时间、位置数组
const a_time = [1,2,3,4,5,6,7,8,9]
const a_position = [1,2,3,4,5,6,7,8,9] 

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
      console.log(data)
      if(data == '-101'){
        Ws.clients.forEach(function each(client){
          if(client !== ws && client.readyState === WebSocket.OPEN){
            var sender = setInterval(() => {
              client.send(queue.front());
              queue.dequeue()
              if(queue.isEmpty()){
                clearInterval(sender)
              }
            },20)
          }
        })
      }else{
        var S_obj = JSON.stringify(obj)
        queue.enqueue(data)
        Ws.clients.forEach(function each(client){
          if(client !== ws && client.readyState === WebSocket.OPEN){
            if(queue.size() > 100){
              client.send(queue.front())
              queue.dequeue()
            }
          }
        })
      } 
    });
  });

  