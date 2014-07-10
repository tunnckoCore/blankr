function onComplete(data) {
    $(".grith.fw.load.modal").modal('hide');
    $('.grith.fw.load.more').button('reset').removeClass('hidden');
    console.log('onComplete');
}
function ajaxProcess(perPg, currPg) {
    var URL2 = 'http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=e73c3c2e11d5780e5370d864dccff2cf&';
    var tags = "&tags=animals";
    var tagmode = "&tagmode=any";
    var jsonFormat = "&format=json";
    var ajaxURL = URL2 + "per_page=" + perPg + "&page=" + currPg + tags + tagmode + jsonFormat;

    $.ajax({
        url: ajaxURL,
        dataType: "jsonp",
        jsonp: "jsoncallback",
        success: function(data) {
            if (data.stat !== "fail") {
                console.log(data);
                $.each(data.photos.photo, function(i, photo) {
                    var photoHTML = "";
                    photoHTML += '<div class="grith fw list item"><img class="img-responsive lazy" data-original="';
                    photoHTML += 'http://farm' + photo.farm + '.static.flickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg"';
                    photoHTML += ' title="' + photo.title + '"';
                    photoHTML += '><div class="metadata clearfix"><div class="pull-left"><i class="glyphicon glyphicon-user"></i> admin</div><div class="pull-right"><i class="glyphicon glyphicon-eye-open"></i> '+i+'</div>';
                    photoHTML += '</div>';
                    $('.grith.fw.fw-page.page-gallery .grith-container').append(photoHTML);
                    $('loaded' + photo.id).load(function() {
                        $(this).addClass('tinRightIn');
                    });
                });

                // Third-Party Plugins
                $("img.lazy").lazyload({
                    effect: "fadeIn"
                });
                $('.grith.fw.fw-page.page-gallery .grith-container').imagesLoaded(function() {
                    $('.grith.fw.fw-page.page-gallery .grith-container').gridalicious({
                        gutter: 10,
                        width: 240,
                        animate: true,
                        animationOptions: {
                            speed: 150,
                            duration: 500,
                            complete: onComplete
                        }
                    });
                });

            } else {
                $('.grith.fw.fw-page.page-gallery .grith-container').empty();
                console.log("Error code " + data.stat);

            }

        }
    }).done(function() {
        //done
    });
}


$(document).ready(function() {
    var currentPage = 1;
    var perPage;
    $('.grith.fw.fw-page.page-gallery .grith-container').empty();
    $(".grith.fw.load.modal").modal('show');

    setTimeout(function() {
        $(".grith.fw.load.modal").modal('hide');
    }, 3700);

    // perPage / currentPage
    ajaxProcess(60, currentPage);


    $('.grith.fw.load.more').click(function() {
        $('.grith.fw.load.more').button('loading');
        $(".grith.fw.load.modal").modal('show');

        // If we're at the bottom, retrieve the next page
        currentPage++;
        //alert('page ' + currentPage);
        if (currentPage >= 6) {
            perPage = 60;
        } else if (currentPage >= 12) {
            perPage = 90;
        } else {
            perPage = 20;
        }
        console.log("perPage " + perPage);
        ajaxProcess(perPage, currentPage);

        console.log("page " + currentPage);

    });
});