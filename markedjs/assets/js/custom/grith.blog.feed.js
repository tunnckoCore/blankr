$("img.lazy").lazyload({
    effect: "fadeIn"
});
$('.grith-container').imagesLoaded(function() {
    $('.grith-container').gridalicious({
        gutter: 10,
        width: 240,
        animate: true,
        animationOptions: {
            speed: 150,
            duration: 500,
            complete: onComplete
        },
    });
});

