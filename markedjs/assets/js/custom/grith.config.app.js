var isAbsolute = false;
var isFixed = true;

$(document).ready(function() {

    /**
     * Custom Resize JS
     */
    $("#grith-auto").click(function() {
        $('.grith.fw.resize-btn').removeClass('active');
        $(this).addClass('active');
        $("body.grith.fw.fw-page").animate({
            width: '100%'
        }, function() {
            //$(".grith-container").gridalicious('resize');
        });
    });
    $("#ipadLandscape").click(function() {
        $('.grith.fw.resize-btn').removeClass('active');
        $(this).addClass('active');
        $("body.grith.fw.fw-page").animate({
            width: 1024
        }, function() {
            //$(".grith-container").gridalicious('resize');
        });
    });
    $("#ipadPortrait").click(function() {
        $('.grith.fw.resize-btn').removeClass('active');
        $(this).addClass('active');
        $("body.grith.fw.fw-page").animate({
            width: 768
        }, function() {
            //$(".grith-container").gridalicious('resize');
        });
    });
    $("#iphoneLandscape").click(function() {
        $('.grith.fw.resize-btn').removeClass('active');
        $(this).addClass('active');
        $("body.grith.fw.fw-page").animate({
            width: 480
        }, function() {
            //$(".grith-container").gridalicious('resize');
        });
    });
    $("#iphonePortrait").click(function() {
        $('.grith.fw.resize-btn').removeClass('active');
        $(this).addClass('active');
        $("body.grith.fw.fw-page").animate({
            width: 320
        }, function() {
            //$(".grith-container").gridalicious('resize');
        });
    });



    /**
     * Lazy loading for images
     */
    //$("img.lazy").lazyload({
    //    effect: "fadeIn"
    //});

    /**
     * Onload loading modal
     */
    $(".grith.fw.fw-page.page-blog-feed .grith.fw.load.modal").modal('show');

    /**
     * Gridalicious / imagesLoaded
     */
    //$('.grith.fw.fw-page.page-blog-feed .grith-container').imagesLoaded(function() {
    //    $('.grith.fw.fw-page.page-blog-feed .grith-container').gridalicious({
    //        gutter: 10,
    //        width: 330,
    //        animate: true,
    //        animationOptions: {
    //            speed: 150,
    //            duration: 500,
    //            complete: onComplete
    //        },
    //    });
    //});
    function onComplete(data) {
        $(".grith.fw.fw-page.page-blog-feed .grith.fw.load.modal").modal('hide');
        $('.grith.fw.fw-page.page-blog-feed .grith.fw.load.more').button('reset').removeClass('hidden');
        console.log('onComplete');
    }


    var pageBlogFeedTimeouts = null;
    $('.grith.fw.fw-page.page-blog-feed .grith.fw.load.more').click(function() {
        $('.grith.fw.fw-page.page-blog-feed .grith.fw.load.more').button('loading');
        $(".grith.fw.fw-page.page-blog-feed .grith.fw.load.modal").modal('show');
        clearTimeout(pageBlogFeedTimeouts);

        pageBlogFeedTimeouts = setTimeout(function() {
            $(".grith.fw.fw-page.page-blog-feed .grith.fw.load.modal").modal('hide');
            $('.grith.fw.fw-page.page-blog-feed .grith.fw.load.more').button('reset').removeClass('hidden');
            console.log('onComplete');
        }, 1500);
    });


});