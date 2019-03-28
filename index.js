const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000;

//透過 /static 路徑字首，來載入 public 目錄中的檔案。
//ex:http://localhost:3000/static/images/kitten.jpg
//app.use('/static', express.static('public'));
app.use('/', express.static('public'));

app.use((req, res, next) =>{
    console.log('Hello MQTT!');
    next();
});

app.get('/', (req, res) => {
    //res.send('hello world');
    res.sendFile('index.html' , { root : __dirname});
});

const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://test.mosquitto.org')
//client.publish("rainbowLedOn", "rainbow")

client.on('connect', function () {
    console.log('MQTT CONNECT!');
    // client.subscribe('test', function (err) {
    //     if (!err) {
    //         client.publish("test", "hello test");
    //     }
    // })
});

// client.on('message', function (topic, message) {
//     // message is Buffer
//     console.log(topic);
//     console.log(message.toString());
//     client.end()
// });



io.on('connection', function (socket) {
    socket.on('rainbowLedOn',function (msg) {
        console.log(msg);
        client.publish("rainbowLedOn", msg.toString());
    });
    socket.on('gradientLedOn',function (msg) {
        console.log(msg);
        client.publish("gradientLedOn", msg.toString());
    });
});

    // socket.on('login', function (name) {
    //     user.push(name);
    //     socket.nickname = name;
    // });

    // socket.on('chat message', function (msg) {
    //     socket.broadcast.emit('receiveMsg', {
    //         name: socket.nickname,
    //         emoteDefault: twitchDefault,
    //         message: msg.message
    //     });

    //     socket.emit('receiveMsg', {
    //         name: socket.nickname,
    //         emoteDefault: twitchDefault,
    //         message: msg.message
    //     });
    // });

http.listen(PORT, function () {
    console.log('listening on http://localhost:3000');
});