const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000;
const router = require('./public/router');
const request = require("request");
const cheerio = require('cheerio');
const Discord = require('discord.js');
const config = require('./public/config.json');
const bot = new Discord.Client();
const firebase = require('firebase');
firebase.initializeApp({
    apiKey: "AIzaSyD7m_p0sGbNgYG9DClursrnAYcd7q_TFsI",
    authDomain: "hearthstone-89926.firebaseapp.com",
    databaseURL: "https://hearthstone-89926.firebaseio.com",
    projectId: "hearthstone-89926",
    storageBucket: "hearthstone-89926.appspot.com",
    messagingSenderId: "34512369905"
});

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

function sleep(second, pttUrl) {
    return new Promise((resolve, reject) => {
        let data = []; // save scrapying data.
        request({
            url: pttUrl,
            method: "GET"
        }, (error, response, body) => {
            if (error || !body || response.statusCode != 200) {
                return false;
            }
            const $ = cheerio.load(body); // 載入 body
            $('a').each((i, el) => {
                let link = $(el).attr('href');
                let regu = "http[s]?://(i.)?imgur.com/."; // regular expression
                let re = new RegExp(regu);

                if (re.test(link) == false || link == pttUrl) {
                    console.log(link, ' Error link...');
                    if (link == pttUrl) {
                        return false;
                    }
                }
                else {
                    data.push(link);
                }
            });
        });
        setTimeout(() => {
            resolve(data);
        }, second);
    })
}
function normalFunc() {
    console.log('NormalFunc');
}
async function awaitDemo(pttUrl) {
    await normalFunc();
    console.log('Start scrapying...');
    try {
        let result = await sleep(2000, pttUrl);
        console.log(result);
        console.log('Scrapying done...');
        return result;
    } catch (err) {
        console.log(err);
    }
}

// https://kanboo.github.io/2017/12/26/Firebase-studynotes/
function beautyquery(second) {
    return new Promise((resolve, reject) => {
        let data = []; // save query data.
        const db = firebase.database();
        db.ref('link/url').once('value', (snapshot) => {
            // console.log(snapshot.val());
            data.push(snapshot.val());
        });
        // let links = {
        //     link: {
        //         url: data
        //     }
        // };

        // set 是覆蓋
        // db.ref().set(links).then(() => {
        //     //讀取todos，查看資料是否有寫入？
        //     db.ref('link/url').once('value', (snapshot) => {
        //         console.log(snapshot.val());
        //     });
        // });
        setTimeout(() => {
            resolve(data);
        }, second);
    })
}

async function awaitFirebase() {
    console.log('Start query...');
    try {
        let result = await beautyquery(2000);
        console.log(result);
        console.log('Query done...');
        return result;
    } catch (err) {
        console.log(err);
    }
}

const mqtt = require('mqtt')
const options = {
    port: 10342,
    host: 'mqtt://m16.cloudmqtt.com',
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    username: 'dyruunih',
    password: '-eEcoOkXnOe9',
    keepalive: 60,
    reconnectPeriod: 1000,
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    clean: true,
    encoding: 'utf8'
};

const client = mqtt.connect('mqtt://m16.cloudmqtt.com', options);
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
    socket.on('cycleLedOn', (msg) => {
        console.log(msg);
        client.publish("cycleLedOn", msg.toString());
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

    socket.on('scraping', (msg) => {
        console.log(msg);
        // ptt beauty closed....改從資料庫撈之前存的圖床
        // https://www.ptt.cc/bbs/Beauty/M.1554665148.A.66F.html
        // https://www.ptt.cc/bbs/Beauty/M.1554658432.A.6EA.html
        // let pttUrl = "https://www.ptt.cc/bbs/Beauty/M.1554658432.A.6EA.html";
        // awaitDemo(pttUrl).then(data => {
        //     socket.emit('receiveMsg', {
        //         link: data
        //     });
        // });
        awaitFirebase().then(data => {
            socket.emit('receiveMsg', {
                link: data
            });
        });
    });
});

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
    if (msg.content === config.prefix + 'beauty') {
        // let pttUrl = "https://www.ptt.cc/bbs/Beauty/M.1554658432.A.6EA.html";
        // awaitDemo(pttUrl).then(data => {
        //     let result = data;
        //     console.log(Math.floor((Math.random() * 12)));
        //     msg.reply(result[Math.floor((Math.random() * 12))]);
        // });

        // write and read
        // const db = firebase.database();
        // let links = {
        //     link: {
        //         url: data
        //     }
        // };
        // db.ref().set(links).then(() => {
        //     //讀取todos，查看資料是否有寫入？
        //     db.ref('link/url').once('value', (snapshot) => {
        //         console.log(snapshot.val());
        //     })
        // })

        // read
        const db = firebase.database();
        let myNameRef = db.ref('link/url');
        myNameRef.once('value', function (snapshot) {
            let data = [];
            data.push(snapshot.val());
            console.log(data[0].length);
            console.log(snapshot.val()[Math.floor((Math.random() * data[0].length))]);
            msg.channel.send("\:grinning:");
            msg.channel.send(snapshot.val()[Math.floor((Math.random() * data[0].length))]);
        });
    }
});

bot.login(config.token);

http.listen(PORT, () => {
    console.log('listening on http://localhost:3000');
});