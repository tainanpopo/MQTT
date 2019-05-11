$(() => {
    const socket = io();

    $('#first').click(() => {
        console.log('???');
        socket.emit('firstBtn', 'first');
    });
});