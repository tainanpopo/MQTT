$(() => {
    const socket = io();
    let nowColor;
    let colorOne;
    let colorTwo;
    let colorThree;
    let count = -1;

    // Setup F5 Event.
    if ($('.choose-one').css("background-color") == "rgb(255, 255, 255)" &&
        $('.choose-two').css("background-color") == "rgb(255, 255, 255)" &&
        $('.choose-three').css("background-color") == "rgb(255, 255, 255)") {
        console.log('default');
        reset();
        socket.emit('colorDefault', 'colorDefault');
    }
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

    // Click Gradient Mode.
    $('#cycleBtn').click(() => {
        reset();
        socket.emit('cycleLedOn', 'cycle');
    });

    function reset(){
        $('.choose-one').css('background-color', "rgb(255, 255, 255)");
        $('.choose-two').css('background-color', "rgb(255, 255, 255)");
        $('.choose-three').css('background-color', "rgb(255, 255, 255)");
        $('.outside').css('background-image', "rgb(255, 255, 255)");
    };

    let colorPicker = new iro.ColorPicker("#color-picker-container", {
        // Set the size of the color picker
        width: 250,
        // Set the initial color to pure red
        color: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#fff",
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
        $('.outside').css('background-color', color.rgbString);
        nowColor = color.rgbString;
        console.log(nowColor);
        count += 1;
        console.log(count);
        switch (count) {
            case 0:
                colorOne = nowColor;
                // let leftBracketOne = colorOne.indexOf("(");
                // let emitColorOne = colorOne.substring(leftBracketOne);
                $('.choose-one').css('background-color', nowColor);
                $('.outside').css('background-image', "linear-gradient( to right," + colorOne + "," + colorTwo + "," + colorThree + ")");
                socket.emit('colorOneLedOn', colorOne);
                break;
            case 1:
                colorTwo = nowColor;
                // let leftBracketTwo = colorTwo.indexOf("(");
                // let emitColorTwo = colorTwo.substring(leftBracketTwo);
                $('.choose-two').css('background-color', nowColor);
                $('.outside').css('background-image', "linear-gradient( to right," + colorOne + "," + colorTwo + "," + colorThree + ")");
                socket.emit('colorTwoLedOn', colorTwo);
                break;
            case 2:
                colorThree = nowColor;
                // let leftBracketThree = colorThree.indexOf("(");
                // let emitColorThree = colorThree.substring(leftBracketThree);
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
});