$(() => {
    const socket = io();

    // Click to login.
    $('#nameBtn').click(inputName);

    // Press enter key to login.
    $('#name').keyup((event) => {
        if (event.which == 13) {
            inputName();
        }
    });

    function inputName() {
        $('.name').hide();
        socket.emit('login', $('#name').val());
        return false;
    }

    // 傳送訊息
    $('#m').keypress((e) => {
        let code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            let regu = "^[ ]+$"; // regular expression
            let re = new RegExp(regu);
            // Returns a Boolean value that indicates whether or not a pattern exists in a searched string.
            // 防止啥都沒打跟只打了一堆空白就送出
            if (re.test($('#m').val()) == true || $('#m').val() == '') {
                return false;
            }
            else {
                console.log($('#m').val());
                socket.emit('chat message', {
                    message: $('#m').val()
                })
                $('#m').val('');
                return false;
            }
        }
    });

    // Click gugu2525 Emotes.
    $('.gugu2525 img').click(gugu2525EmotesClick);

    function gugu2525EmotesClick() {
        let id = $(this).attr('id');
        let old = $('#m').val();
        console.log(old + id + ' ');
        $('#m').val(old + id + ' ');
        return false;
    }

    // 接收訊息
    socket.on('receiveMsg', (obj) => {
        let name = obj.name; //user name
        let emoteDefault = obj.emoteDefault; // twitch emote
        let message = obj.message; // the message user send
        let content = ''; // temporary store the message to show in the chat room
        let blank; // find the index of the message
        // console.log('message: ' + message);
        while (blank !== -1) { // 只要還有空白就繼續判斷是貼圖或是文字
            let checkMessage = false;
            blank = message.indexOf(' '); // find the index of the message
            let res = message.substr(0, blank);  // capture the substr before the blank
            message = message.substr(blank + 1, message.length); // 把找到的單字或是貼圖(貼圖為字串)從 message 切割
            if (res !== '') { // 開始判斷 res 是貼圖還是單字
                for (let i = 0; i < emoteDefault.length; i++) { // 從 socket 回傳的貼圖表搜尋是否為貼圖
                    if (emoteDefault[i] === res) {
                        checkMessage = true;
                    }
                }
                if (checkMessage === true) { // 如果是貼圖就把 res 輸入到 img tag，然後暫存到 content
                    content += `<img src="./image/${res}.png"/>`;
                    checkMessage = false;
                }
                else { // 如果不是，一樣要把使用者輸入的文字暫存到 content
                    let tmp = ' ';
                    content += `<span>${res}${tmp}</span>`; // 輸入英文的話會有單字之間的空白問題，中文也一樣
                    checkMessage = false;
                }
            }
        }
        // 當 message 沒有空白之後，還是會有剩餘的字串，一樣去判斷是貼圖還是單字
        let checkMessage = false;
        if (message !== '') {
            for (let i = 0; i < emoteDefault.length; i++) {
                if (emoteDefault[i] === message) {
                    checkMessage = true;
                }
            }
            if (checkMessage === true) {
                content += `<img src="./image/${message}.png"/>`;
                checkMessage = false
            }
            else {
                let tmp = ' ';
                content += `<span>${message}${tmp}</span>`; // 輸入英文的話會有單字之間的空白問題，中文也一樣
                checkMessage = false
            }
        }
        // console.log(content);<button class="btn"></button>
        $('#conversation').append(`
            <div class="left"><span>${name}:</span>${content}</div>`);

        // $('#conversation').append(`
        // <div class=${side}><span>${content}</span></div>`);

        $('#conversation').scrollTop($('#conversation').prop('scrollHeight'));
        //$('#conversation').scrollTop($('#conversation')[0].scrollHeight); // 讓 scrollbar 一直滾到最下方。
    });

    $('#main #chat #send').click(sendMessage);

    function sendMessage() {
        // 當 class 切換至 gugu2525 show 時，就不要再 toggle，當送出文字或者是再次點擊按鈕才關閉 guguBtn
        let id = $('.gugu2525').attr('class');
        if (id !== 'gugu2525') {
            $('.gugu2525').css('display', 'none');
            $('.gugu2525').toggleClass('show');
        }
        let regu = "^[ ]+$"; // regular expression
        let re = new RegExp(regu);
        // Returns a Boolean value that indicates whether or not a pattern exists in a searched string.
        // 防止啥都沒打跟只打了一堆空白就送出
        if (re.test($('#m').val()) == true || $('#m').val() == '') {
            return false;
        }
        else {
            console.log($('#m').val());
            socket.emit('chat message', {
                message: $('#m').val()
            })
            $('#m').val('');
            return false;
        }
        // $('.jinny').toggleClass('jinnyshow');
        // $('.jinny').css('display', 'none');
    };

    $('#form form #emoteBtn').click(function () {
        let yPos = $('#conversation').prop('scrollHeight');
        let id = $('.gugu2525').attr('class');
        console.log(id);
        if (id === 'gugu2525') {
            $('.gugu2525').css('display', 'block');
            $('.gugu2525').css('top', yPos - 120);
            $('.gugu2525').toggleClass('show');
        }
        else {
            $('.gugu2525').css('display', 'none');
            $('.gugu2525').css('top', yPos - 120);
            $('.gugu2525').toggleClass('show');
        }
        // console.log($('#main #emoticons button').position().top);
        // ({top: 200, left: 200, position:'absolute'});
    });

});