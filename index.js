const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000;
const router = require('./public/router');
const request = require("request");
const cheerio = require('cheerio');
const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();

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

    socket.on('scraping', (msg) => {
        console.log(msg);
        //https://www.ptt.cc/bbs/Beauty/M.1554665148.A.66F.html
        //https://www.ptt.cc/bbs/Beauty/M.1554658432.A.6EA.html
        let pttUrl = "https://www.ptt.cc/bbs/Beauty/M.1554658432.A.6EA.html";
        awaitDemo(pttUrl).then(data => {
            socket.emit('receiveMsg', {
                link: data
            });
        });
    });
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.content === config.prefix + 'beauty') {
        let pttUrl = "https://www.ptt.cc/bbs/Beauty/M.1554658432.A.6EA.html";
        awaitDemo(pttUrl).then(data => {
            let result = data;
            msg.reply(result[Math.floor((Math.random() * 12))]);
        });
    }
});

client.login(config.token);

http.listen(PORT, () => {
    console.log('listening on http://localhost:3000');
});