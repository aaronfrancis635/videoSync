const drawing = require('./lib/drawing');
const Room = require('./lib/room');
const util = require('./lib/util');
const config = require('./config.json');
const mongo = require('mongodb').MongoClient

mongo.connect(config.dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err, client) => {
  if (err) {
    console.error(err)
    return
  }
  const db = client.db('videoSync');
  const rooms = db.collection('rooms');

  rooms.deleteMany({}, ()=>{});


var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(6789);

function handler (req, res) {
    fs.readFile(__dirname + '/index.html',
    function (err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading index.html');
      }
  
      res.writeHead(200);
      res.end(data);
    });
  }
  drawing.clearConsole(true);

var clients = [];

io.on('connection', function (socket) {
    clients[socket.id] = socket;
    socket.on("createRoom", (data) =>{
        var temp = new Room()
        temp.users.push(socket.id);
        rooms.insertOne(temp, (err, result) => {
            util.debug("Room Created: " + temp.roomId);
            socket.emit("updateRoom", temp)
            socket.roomId = temp.roomId;
        });
    });
    socket.on("joinRoom", (data) => {
        rooms.findOne({roomId: data.roomId}, (err, room) => {
            if (!err)
                room.users.push(socket.id);
                room.users.forEach(userId => {
                    clients[userId].emit("updateRoom", room);
                });
                rooms.updateOne({roomId: room.roomId}, {$set: {'users': room.users}}, (err, item) => {
                    if(err)
                        util.debug(err, util.problem)
                    util.debug(item, util.warn)
                    util.debug("User '" + socket.id + "' Joined '" + room.roomId + "'")
                    socket.roomId = room.roomId;
                });
        })
    });

    socket.on("updateRoom", (data) => {
        if(!socket.roomId)
            return;
        rooms.updateOne({roomId: data.roomId}, {'$set': {'site': data.site, 'vId': data.vId, 'time': data.time, 'paused': data.paused}}, (err, item) => {
            rooms.findOne({roomId: data.roomId}, (err, room) => {
                if(err)
                 util.debug(room, util.warn)
                room.users.forEach(userId => {
                    clients[userId].emit("updateRoom", room);
                });
            });
            util.debug("Room " + data.roomId + " Updated!", util.warn);
          })
    });

    socket.on("disconnect", (reason) => {
        if(!socket.roomId)
            return;
        rooms.findOne({roomId: socket.roomId}, (err, room) => {
            room.users.splice(room.users.indexOf(socket.id));
            rooms.updateOne({roomId: room.roomId}, {'$set': {'users': room.users}}, (err, item) => {
                room.users.forEach(userId => {
                    clients[userId].emit("updateRoom", room);
                });
            });
        });
        
    });

});


});


