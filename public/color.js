$(() => {
    const socket = io();
    // Click Rainbow Mode.
    $('#rainbowBtn').click(() => {
        socket.emit('rainbowLedOn', 'Rainbow');
    });

    // Click Gradient Mode.
    $('#GradientBtn').click(() => {
        socket.emit('gradientLedOn', '255,255,255');
    });

    let values = document.getElementById("values");
    let colorPicker = new iro.ColorPicker("#color-picker-container", {
        // Set the size of the color picker
        width: 320,
        // Set the initial color to pure red
        color: "#f00",
        borderWidth: 1,
        borderColor: "#fff",
      });

    // https://iro.js.org/guide.html#color-picker-events
    colorPicker.on("color:change", (color) => {
        // Show the current color in different formats
        // Using the selected color: https://iro.js.org/guide.html#selected-color-api
        values.innerHTML = [
        "hex: " + color.hexString,
        "rgb: " + color.rgbString,
        "hsl: " + color.hslString,
        ].join("<br>");
    });

});