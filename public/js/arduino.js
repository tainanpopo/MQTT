$(() => {
    const socket = io();
    let nowColor;
    let colorOne;
    let colorTwo;
    let colorThree;
    let count = -1;
    let colorPicker;

    // Setup F5 Event.
    if ($('.choose-one').css("background-color") == "rgb(255, 255, 255)" &&
        $('.choose-two').css("background-color") == "rgb(255, 255, 255)" &&
        $('.choose-three').css("background-color") == "rgb(255, 255, 255)") {
        console.log('default');
        reset();
        //socket.emit('colorDefault', 'colorDefault');
    }

    $('#led').click(() =>{
        if($('#led').prop("checked") == true){
            $('#led').css("background-color", "#2196F3");
            console.log("true");
            socket.emit('ledOn', 'true');
        }
        else{
            $('#led').css("background-color", "white");
            console.log("false");
            reset();
            count = -1;
            socket.emit('ledOff', 'false');
        }
    });

    // Click Rainbow Mode.
    $('#rainbowBtn').click(() => {
        reset();
        socket.emit('rainbowLedOn', 'rainbow');
    });

    // Click Gradient Mode.
    $('#gradientBtn').click(() => {
        reset();
        socket.emit('gradientLedOn', 'gradient');
    });

    // https://iro.js.org/guide.html#color-picker-events
    colorPicker.on("input:end", (color) => {
        // Show the current color in different formats
        // Using the selected color: https://iro.js.org/guide.html#selected-color-api
        $('.outside').innerHTML = [
            "hex: " + color.hexString,
            "rgb: " + color.rgbString,
            "hsl: " + color.hslString,
        ].join("<br>");
        //$('.outside').css('background-color', color.rgbString);
        nowColor = color.rgbString;
        console.log(nowColor);
        count += 1;
        console.log(count);
        switch (count) {
            case 0:
                colorOne = nowColor;
                $('.choose-one').css('background-color', nowColor);
                $('.outside').css('background-image', "linear-gradient( to right," + colorOne + "," + colorTwo + "," + colorThree + ")");
                socket.emit('colorOneLedOn', colorOne);
                break;
            case 1:
                colorTwo = nowColor;
                $('.choose-two').css('background-color', nowColor);
                $('.outside').css('background-image', "linear-gradient( to right," + colorOne + "," + colorTwo + "," + colorThree + ")");
                socket.emit('colorTwoLedOn', colorTwo);
                break;
            case 2:
                colorThree = nowColor;
                $('.choose-three').css('background-color', nowColor);
                $('.outside').css('background-image', "linear-gradient( to right," + colorOne + "," + colorTwo + "," + colorThree + ")");
                socket.emit('colorThreeLedOn', colorThree);
                break;
            default:
                break;
        }
        if (count == 2) {
            console.log(colorOne);
            console.log(colorTwo);
            console.log(colorThree);
            count = -1;
        }
    });

    function reset(){
        console.log('reset');
        $('.choose-one').css('background-color', "rgb(255, 255, 255)");
        $('.choose-two').css('background-color', "rgb(255, 255, 255)");
        $('.choose-three').css('background-color', "rgb(255, 255, 255)");
        $('.outside').css('background-image', "linear-gradient( to right, rgb(255, 255, 255) , rgb(255, 255, 255) , rgb(255, 255, 255)");
        colorOne = '';
        colorTwo = '';
        colorThree = '';
        if(colorPicker == null){
            colorPicker = new iro.ColorPicker("#color-picker-container", {
                // Set the size of the color picker
                width: 250,
                // Set the initial color to pure white
                color: nowColor,
                borderWidth: 1,
                borderColor: "#fff",
            });
        }
    };

    $('#static').click(() => {
        socket.emit('staticBtn', 'static');
    });

    $('#cycle').click(() => {
        socket.emit('cycleBtn', 'cycle');
    });
});