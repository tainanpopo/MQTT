const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000;
const router = require('./public/router');

app.use('/', router);
//透過 /static 路徑字首，來載入 public 目錄中的檔案。
//ex:http://localhost:3000/static/images/kitten.jpg
//app.use('/static', express.static('public'));
app.use('/', express.static('public'));

//this middleware function will be executed for every request to the app.
app.use((req, res, next) => {
    console.log('Hello MQTT!');
    next();
});

// error handler
app.use((req, res, next) => {
    res.status(500).send('HTTP 500 Internal Server Error');
})

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + 'index.html');
// });

const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://test.mosquitto.org')

client.on('connect', () => {
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



io.on('connection', (socket) => {
    socket.on('rainbowLedOn', (msg) => {
        console.log(msg);
        client.publish("rainbowLedOn", msg.toString());
    });
    socket.on('gradientLedOn', (msg) => {
        console.log(msg);
        client.publish("gradientLedOn", msg.toString());
    });
    socket.on('colorOneLedOn', (msg) => {
        let leftBracket = msg.indexOf("(");
        msg = msg.substring(leftBracket);
        console.log(msg);
        client.publish("colorOneLedOn", msg.toString());
    });
    socket.on('colorTwoLedOn', (msg) => {
        let leftBracket = msg.indexOf("(");
        msg = msg.substring(leftBracket);
        console.log(msg);
        client.publish("colorTwoLedOn", msg.toString());
    });
    socket.on('colorThreeLedOn', (msg) => {
        let leftBracket = msg.indexOf("(");
        msg = msg.substring(leftBracket);
        console.log(msg);
        client.publish("colorThreeLedOn", msg.toString());
    });

    socket.on('colorDefault', (msg) => {
        console.log(msg);
        client.publish("colorDefault", msg.toString());
    });
});

http.listen(PORT, () => {
    console.log('listening on http://localhost:3000');
});