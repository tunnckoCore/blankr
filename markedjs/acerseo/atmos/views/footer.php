<?php
/**
 * @author      George Yanev (http://github.com/tunnckoCore)
 * 
 * @license     MIT License (http://opensource.org/licenses/MIT)
 * @copyright   2013, WAF Development
 */
?>
        
        <div  style="width: 85%; margin: 0 auto; margin-bottom: 20px;" id="relatedLinksMenu">
            
            <ul class="nav nav-tabs" id="tabsComment">
                <li class="active"><a href="#googlePlusComments" data-toggle="tab"><i class="fa fa-google-plus-square"></i> Google+</a></li>
                <li><a href="#facebookComments" data-toggle="tab"><i class="fa fa-facebook-square"></i> Facebook</a></li>
                <li><a href="#relatedLinks" data-toggle="tab"><i class="fa fa-link"></i> Подобни статии</a></li>
            </ul>

            <div class="tab-content">
                <div class="tab-pane active" id="googlePlusComments">
                    <div id="google-comments">
                        <a href="http://dream.bg" rel="follow" class="tm-global-hide">Да купим Acer</a>
                        <a href="http://www.addurl.nu" class="tm-global-hide">www.addurl.nu</a>
                        <a href="http://www.xurt.com/" class="tm-global-hide">Xurt Ultimate Web Portal</a>
                    </div>
                </div>
                <div class="tab-pane" id="facebookComments">
                    <div class="fb-comments" data-href="<?php echo $globalRequestWEEEEEEEEE; ?>" data-width="1076" data-numposts="20" data-colorscheme="light"></div>
                </div>
                <div class="tab-pane text-left" id="relatedLinks">
                    <?php
                        foreach ($templateData['dataIndex']['entry'] as $entryKey => $value) {
                            echo '<h3 class="text-left" style="padding-top: 10px;">'
                            . '<a href="'.$value['id'].'" rel="follow" itemprop="relatedLink">'.$value['title'].'</a></h3>';
                        }
                    ?>
                </div>
            </div>

        </div>
</div> <!-- END ROOT PAGE -->
        <section class="xlg-load-main">
                <!-- the component -->
                <div class="wrapper">
                    <div class="inner">
                        <span>L</span>
                        <span>o</span>
                        <span>a</span>
                        <span>d</span>
                        <span>i</span>
                        <span>n</span>
                        <span>g</span>
                    </div>
                </div>
        </section>
        <!-- ==================== Website AssocialsApi ============================ -->
        <div class="tm-fixed-left-associals">
            <script>$(function() {
                    AssocialsApi('associals-block-indexer');
                });</script>
            <div class="data-associals associals-block-indexer"
                 data-associals-item-id="indexer"
                 data-associals-item-url="<?=urlencode(APP_URI)?>"
                 data-associals-item-title='<?=APP_NAME?>'
                 data-associals-item-image="<?=APP_SITE_IMG?>">
                <!--<div class="btn btn-default associals-item-index-github"><i title="github project" class="fa fa-github-alt icon20"></i></div>-->
                <div class="btn btn-warning associals-item-indexer-googleplus"><i title="Google+" class="fa fa-google-plus icon20"></i></div>
                <div class="btn btn-primary associals-item-indexer-facebook"><i title="Facebook" class="fa fa-facebook icon20"></i></div>
                <div class="btn btn-danger associals-item-indexer-pinterest"><i title="Pinterest" class="fa fa-pinterest icon20"></i></div>
                <div class="btn btn-info associals-item-indexer-twitter"><i title="Twitter" class="fa fa-twitter icon20"></i></div>
            </div>
        </div>
        
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
        <script src="<?= APP_URI ?>assets/js/bootstrap.min.js"></script>
        <script src="<?= APP_URI ?>assets/js/AssocialsApi3.js"></script>
        <section id="fb-root"></section>
        <script type="text/javascript">
        less = {
            env: "production", // or "production"
            async: false,       // load imports async
            fileAsync: false,   // load imports async when in a page under
            // a file protocol
            poll: 1000,         // when in watch mode, time in ms between polls
            functions: {},      // user functions, keyed by name
            dumpLineNumbers: "comments", // or "mediaQuery" or "all"
            relativeUrls: false,// whether to adjust url's to be relative
            // if false, url's are already relative to the
            // entry less file
            rootpath: ":/a.com/"// a path to add on to the start of every url
            //resource
        };
        </script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/less.js/1.3.3/less.min.js" type="text/javascript"></script>
        <script type="text/javascript">
        /* ---------- Acivate Functions ---------- */
	$(".xlg-load-main").delay(600).fadeOut(400, function () {
            $(".xlg-root-page").animate({opacity: 1}, 550, function() {
                //animate complete
            });
        });
        
        
        $(window).load(function() {
            
            $('body').imagesLoaded(function() {
                $('#tabsComment a:first').tab('show');
                initGoogle();
                initFacebook();
                $('.xlg-anime-link').live('click', function() {
                    var thehref = $(this).attr('href');

                    if (thehref.substring(0,1) !== '#') {
                        return true;
                    } else {
                        $.scrollTo(thehref, 500);
                    }
                    return false;
                });
                // scroll body to 0px on click
                $('.toTopLink').click(function () {
                        $('body,html').animate({
                                scrollTop: 0
                        }, 500);
                        return false;
                });
                
            });
            
            
            
            
            function initFacebook() {
                if (typeof(FB) != 'undefined' && FB != null ) {
                    FB.XFBML.parse();
                }
                (function(d, s, id) {
                    var js, fjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id))
                        return;
                    js = d.createElement(s);
                    js.id = id;
                    js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=201791933325778";
                    fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));
            }
            
            function initGoogle() {
                gapi.plusone.render('xlg-plusone-div', {
                    "size": "medium",
                    "count": "true"
                });

                gapi.comments.render('google-comments', {
                    href: '<?php echo $globalRequestWEEEEEEEEE; ?>',
                    width: '1076',
                    first_party_property: 'BLOGGER',
                    view_type: 'FILTERED_POSTMOD'
                });

                (function(i, s, o, g, r, a, m) {
                    i['GoogleAnalyticsObject'] = r;
                    i[r] = i[r] || function() {
                        (i[r].q = i[r].q || []).push(arguments)
                    }, i[r].l = 1 * new Date();
                    a = s.createElement(o),
                            m = s.getElementsByTagName(o)[0];
                    a.async = 1;
                    a.src = g;
                    m.parentNode.insertBefore(a, m)
                })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

                ga('create', 'UA-42989282-1', 'charlike.pw');
                ga('send', 'pageview');
            }
            
        });
        
        
        
        document.write('<a href="https://www.tyxo.bg/?148092" title="Tyxo.bg counter"><img width="1" style="display: none;" height="1" border="0" alt="Tyxo.bg counter" src="' + location.protocol + '//cnt.tyxo.bg/148092?rnd=' + Math.round(Math.random() * 2147483647));
        document.write('&sp=' + screen.width + 'x' + screen.height + '&r=' + escape(document.referrer) + '"></a>');
        </script>
        <script src="//cdn.jsdelivr.net/jquery.scrollto/1.4.6/jquery.scrollTo.min.js"></script>
        <script src="//cdn.jsdelivr.net/ekko-lightbox/3.0.2b/ekko-lightbox.min.js"></script>
        <script src="//cdn.jsdelivr.net/imagesloaded/3.0.4/imagesloaded.pkgd.js"></script>
    </body>
</html>
