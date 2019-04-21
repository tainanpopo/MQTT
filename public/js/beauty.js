$(() => {
    const socket = io();
    $('.beauty').remove();
    $('.loading').css('visibility', 'visible');
    socket.emit('scraping', 'beauty');

    // receive scrapying ingur links.
    socket.on('receiveMsg', (obj) => {
        console.log(obj.link[0]);
        let content = '';
        for (i = 0; i < obj.link[0].length; i++) {
            content += `<div><img src="${obj.link[0][i]}"/></div>`
        };
        $('.content').append(
            `<div class="beauty">${content}</div>`);
        $('.loading').css('visibility', 'hidden');
    });
});