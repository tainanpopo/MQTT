$(() => {
    console.log('ummmmm...');
    $('a[href="page1"]').click(function(){
        $('html, body').animate({
            scrollTop: $(".page-wrap #page1").offset().top
        }, 1000) 
     }),
     $('a[href="page2"]').click(function(){
        $('html, body').animate({
            scrollTop: $(".page-wrap #page2").offset().top
        }, 1000) 
     }),
     $('a[href="page3"]').click(function(){
        $('html, body').animate({
            scrollTop: $(".page-wrap #page3").offset().top
        }, 1000) 
     }),
     $('a[href="page4"]').click(function(){
        $('html, body').animate({
            scrollTop: $(".page-wrap #page4").offset().top
        }, 1000) 
     })
});