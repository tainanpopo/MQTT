$(() => {
    const socket = io();
    $('a[href="#beauty"]').click(() => {
        $('.beauty').remove();
        $('.loading').css('visibility', 'visible');
        socket.emit('scraping', 'beauty');
    });

    // receive scrapying ingur links.
    socket.on('receiveMsg', (obj) => {
        console.log(obj.link);
        let content = '';
        for (i = 0; i < obj.link.length; i++) {
            content += `<div><img src="${obj.link[i]}"/></div>`
        };
        $('.page:nth-child(2)').append(
            `<div class="beauty">${content}</div>`);
        $('.loading').css('visibility', 'hidden');
    });
});