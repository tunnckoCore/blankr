<?php
/**
 * @author      George Yanev (http://github.com/tunnckoCore)
 *
 * @license     MIT License (http://opensource.org/licenses/MIT)
 * @copyright   2013, WAF Development
 */
require dirname(__DIR__) . DIRECTORY_SEPARATOR . 'config.php';
$cntEntries = count($templateData['data']['entry'])-1;
if ($templateData['isArticle'] == 'yes') {
    $globalRequestWEEEEEEEEE = $templateData['data']['entry']['id'];
    $itempropH1Name = '';
    $significantLink = '';
    $ogTitle = str_replace('"', '', $templateData['data']['entry']['title']);
    $titleBuild = $templateData['data']['entry']['title'] . ' - ' . APP_ACERSEO_KW . ' | ' . APP_NAME;
    $descrBuild = str_replace('"', '', $templateData['data']['entry']['title'] . ' ' . simpleCut(strip_tags($templateData['data']['entry']['content']), 150));
    $articleAtom = '<link rel="alternate" type="application/atom+xml" title=\'AtomFeed - ' . $ogTitle . '\' href="' . str_replace('/article/', '/atom/', $templateData['data']['entry']['id']) . '" />';
} else {
    $globalRequestWEEEEEEEEE = $templateData['data']['id'];
    $significantLink = '<meta content="'.$templateData['data']['entry'][0]['id'].'" itemprop="significantLink">';
    $itempropH1Name = ' itemprop="name"';
    $ogTitle = str_replace('"', '', APP_ACERSEO_KW);
    $titleBuild = APP_ACERSEO_KW . ' | ' . APP_NAME;
    $descrBuild = str_replace('"', '', $templateData['data']['entry'][0]['title'] . ' ' . simpleCut(strip_tags($templateData['data']['entry'][0]['content']), 150));
    $articleAtom = '';
}
?>
<!DOCTYPE html>
<!--                      oooo$$$$$$$$$$$$oooo
                      oo$$$$$$$$$$$$$$$$$$$$$$$$o
                   oo$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$o         o$   $$ o$
   o $ oo        o$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$o       $$ $$ $$o$
oo $ $ "$      o$$$$$$$$$    $$$$$$$$$$$$$    $$$$$$$$$o       $$$o$$o$
"$$$$$$o$     o$$$$$$$$$      $$$$$$$$$$$      $$$$$$$$$$o    $$$$$$$$
  $$$$$$$    $$$$$$$$$$$      $$$$$$$$$$$      $$$$$$$$$$$$$$$$$$$$$$$
  $$$$$$$$$$$$$$$$$$$$$$$    $$$$$$$$$$$$$    $$$$$$$$$$$$$$  """$$$
   "$$$""""$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$     "$$$
    $$$   o$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$     "$$$o
   o$$"   $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$       $$$o
   $$$    $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$" "$$$$$$ooooo$$$$o
  o$$$oooo$$$$$  $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$   o$$$$$$$$$$$$$$$$$
  $$$$$$$$"$$$$   $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$     $$$$""""""""
 """"       $$$$    "$$$$$$$$$$$$$$$$$$$$$$$$$$$$"      o$$$
            "$$$o     """$$$$$$$$$$$$$$$$$$"$$"         $$$
              $$$o          "$$""$$$$$$""""           o$$$
               $$$$o                                o$$$"
                "$$$$o      o$$$$$$o"$$$$o        o$$$$
                  "$$$$$oo     ""$$$$o$$$$$o   o$$$$""
                     ""$$$$$oooo  "$$$o$$$$$$$$$"""
                        ""$$$$$$$oo $$$$$$$$$$
                                """"$$$$$$$$$$$
                                    $$$$$$$$$$$$
                                     $$$$$$$$$$"
                                      "$$$""          http://www.charlike.pw -->
<html class="demo-4" lang="bg-BG" prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb#">
    <head>
        <meta charset="utf-8">

        <!-- Omit the viewport http://getbootstrap.com/getting-started/#disable-responsive
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;">-->
        <meta name="google-site-verification" content="CfoCmA7J2brFCL0QabRlCqiftkLq6-pD_lyjBlMMVnk">
        <meta name="description" content="<?= $descrBuild ?>">

<?php
if ($templateData['isArticle'] == 'yes') {
    /* ARTICLE FACEBOOK METAS */
    $eData = $templateData['data'];
    ?>
            <meta name="canonical" content="<?= $eData['entry']['id'] ?>">
            <meta property="og:type" content="article">
            <meta property="og:site_name" content="<?= APP_NAME ?>">
            <meta property="og:image" content="<?= $eData['logo'] ?>">
            <meta property="og:title" content="<?= $ogTitle ?>">
            <meta property="og:description" content="<?= $descrBuild ?>">
            <meta property="og:url" content="<?= $eData['entry']['id'] ?>">
            <meta property="article:publisher" content="https://www.facebook.com/lekanosht">
            <meta property="article:published_time" content="<?= $eData['entry']['published'] ?>">
            <meta property="article:modified_time" content="<?= $eData['entry']['updated'] ?>">
            <meta property="article:author" content="https://www.facebook.com/lekanosht">
            <meta property="article:section" content="seo">
            <?php
            $parseTags = explode("_", $eData['entry']['id'])[1];
            $parseTags = explode("-", str_replace('/article/', '', $parseTags));
            $cntTags = count($parseTags);
            foreach ($parseTags as $key => $tag) {
                echo '<meta property="article:tag" content="' . $tag . '">' . "\n        ";
            }
            ?>

            <meta property="twitter:card" content="summary">
            <meta property="twitter:creator" content="@tunnckoCore">
            <meta property="twitter:site" content="@AcerOtNotebook_">
            <meta property="twitter:title" content="<?= $ogTitle ?>">
            <meta property="twitter:description" content="<?= $descrBuild ?>">
            <?php
        } else {
            /* WEBSITE FACEBOOK METAS */
            ?>
            <meta name="canonical" content="<?= APP_URI ?>">
            <meta property="og:type" content="blog">
            <meta property="og:site_name" content="<?= APP_NAME ?>">
            <meta property="og:image" content="<?= $templateData['data']['logo'] ?>">
            <meta property="og:title" content="<?= $ogTitle ?>">
            <meta property="og:description" content="<?= $descrBuild ?>">
            <meta property="og:url" content="<?= APP_URI ?>">
            <?php
        }
        ?>


            <meta name="robots" content="noindex,nofollow">

  <script src="//code.jquery.com/jquery-1.9.1.min.js"></script>
        <title><?= $titleBuild ?></title>

        <link rel="author" href="https://plus.google.com/101032319194415059995">

        <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.2/css/bootstrap.min.css">

        <script src="<?= APP_URI ?>assets/js/bootstrap.min.js"></script>
        <link rel="stylesheet" href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css">

        <link rel="stylesheet" href="<?= APP_URI ?>assets/css/core.library.css">
        <link rel="stylesheet" href="<?= APP_URI ?>assets/css/fontello.css">
        <link rel="stylesheet" href="<?= APP_URI ?>assets/css/style.css">

        <!-- include summernote -->
        <link rel="stylesheet/less" type="text/css" href="<?= APP_URI ?>assets/summernote/summernote.less" />
        <script type="text/javascript" src="<?= APP_URI ?>assets/summernote/summernote.js"></script>


        <link rel="alternate" type="application/atom+xml" title="AtomFeed - <?= APP_NAME ?>" href="<?= APP_URI ?>atom" />
<?php echo $articleAtom; ?>

        <link rel="shortcut icon" href="<?= APP_URI ?>imgs/charlike-avatar.png">

        <script src="<?= APP_URI ?>assets/js/jquery.min.js"></script>
        <script type="text/javascript" src="https://apis.google.com/js/plusone.js"></script>

        <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!--[if lt IE 9]>
            <script src="//cdnjs.cloudflare.com/ajax/libs/html5shiv/3.6.2/html5shiv.js"></script>
            <script src="//cdnjs.cloudflare.com/ajax/libs/respond.js/1.2.0/respond.js"></script>
        <![endif]-->

        <script type="text/javascript">
            var _gaq = _gaq || [];
            _gaq.push(['_setAccount', 'UA-42989282-1']);
            _gaq.push(['_trackPageview']);

            (function() {
                var ga = document.createElement('script');
                ga.type = 'text/javascript';
                ga.async = true;
                ga.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'stats.g.doubleclick.net/dc.js';
                var s = document.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(ga, s);
            })();

        </script>
        <script type="text/javascript">
        $(document).ready(function() {
            $('.summernote').summernote({
                height: 700,
                focus: true,
                tabsize: 2
            });
        });
        </script>
        <style>
            /*****************
             * EKO-LIGHTBOX
             * custom styling of the directional arrows *
             */

            .ekko-lightbox-nav-overlay {
                z-index:100;
                position: absolute;
                overflow: hidden;
            }
            .ekko-lightbox-nav-overlay a {
                opacity: 0;
                -webkit-transition: opacity 0.5s;
                -moz-transition: opacity 0.5s;
                -o-transition: opacity 0.5s;
                transition: opacity 0.5s;
                color:#fff;
                font-size:30px;
                height: 100%;
                width:49%;
                display:block;
                padding-top:45%;
                text-shadow: 2px 2px 4px #000;
                filter: dropshadow(color=#000, offx=2, offy=2);
            }
            .ekko-lightbox-nav-overlay a:empty {
                width:49%; /* removes glyphicons :empty { width:1em } */
            }
            .ekko-lightbox a:hover {
                opacity: 1;
                text-decoration: none;
            }
            .ekko-lightbox .glyphicon-chevron-left {
                float: left;
                text-align: left;
                padding-left:15px;
            }
            .ekko-lightbox .glyphicon-chevron-right {
                text-align: right;
                float: right;
                padding-right:15px;
            }

            /* use this to get your footer text left aligned - bootstraps modal default aligns them right */
            .ekko-lightbox .modal-footer {
                text-align: left;
            }
            .ekko-lightbox .modal-header {
                padding-bottom: 5px;
            }
            .ekko-lightbox .modal-header .close {
                margin: 0;
            }
            .ekko-lightbox-container {
                padding-bottom: 15px;
            }
            .progress .progress-bar.six-sec-ease-in-out {
                -webkit-transition: width 2s ease-in-out;
                -moz-transition: width 2s ease-in-out;
                -ms-transition: width 2s ease-in-out;
                -o-transition: width 2s ease-in-out;
                transition: width 2s ease-in-out;
            }

        </style>
        <meta name="NOTER2013" content="YES">
    </head>
    <body itemscope itemtype="http://schema.org/WebPage" id="toTopLink">

        <div class="xlg-load-main" style="width: 800px; margin: 25% auto;">
            <div class="wrapper">
                <div class="inner">
                    <span>З</span>
                    <span>а</span>
                    <span>р</span>
                    <span>е</span>
                    <span>ж</span>
                    <span>д</span>
                    <span>а</span>
                </div>
            </div>
        </div>
        <div class="xlg-root-page">
        <header role="banner">
            <div id="headerFlake" class="tm-global-hide">
                <div class="container">
                    <div class="row">
                        <hgroup>
                            <h1<?= $itempropH1Name ?>>"Защо трябва да купим <strong>Acer от www.Notebook.bg</strong>?"</h1>
                            <h2 itemprop="alternativeHeadline"><strong>Acer</strong> - иновативен лидер, <strong>Notebook.bg</strong> - качество с гаранция!</h2>
                        </hgroup>
                    </div>
                    <div class="row">
                        <strong>
                            <a href="<?= APP_URI ?>" title="<?= APP_NAME ?>"><?= APP_NAME ?></a>
                        </strong>
                        <p>
                            Блог за SEO и първоначално за SEO състезанието Acer от www.Notebook.bg? Главният въпрос в България през
                            последните няколко месеца. Битките стават все по-ужесточени в <?= APP_ACERSEO_KW ?>
                            пък ще видим. Има по-малко от месец до финала!
                        </p>
<?php
if ($templateData['isArticle'] == 'yes') {
    echo '';
} else {
    ?>
                            <span itemprop="primaryImageOfPage" itemscope itemtype="http://schema.org/ImageObject">
                                <meta itemprop="url" content="<?= APP_SITE_IMG ?>">
                                <meta itemprop="name" content="<?= @end(explode("/", APP_SITE_IMG)) ?>">
                            </span>
                            <?php
                        }
                        ?>
                    </div>
                </div>
            </div>
            <div class="xlg-navbar-charlike navbar navbar-default navbar-inverse">
                <nav class="navbar-header-mast" role="navigation">
                    <ul class="nav navbar-nav">
                        <li><a href="<?= APP_URI ?>" class="navbar-brand" rel="home">Acer SEO Блог</a></li>
                        <li><a href="<?= APP_URI.APP_SITEMAP ?>" class="navbar-brand">Карта на сайта</a></li>
                        <li><a href="<?= APP_URI ?>?uri=atom" class="navbar-brand">Atom Feed</a></li>
                        <li><a href="https://www.facebook.com/zashtotryabvadakupimacerotwwwnotebookbg" class="navbar-brand">FB</a></li>
                        <li><a href="https://www.twitter.com/AcerOtNotebook_" class="navbar-brand">Twitter</a></li>
                        <li><a href="http://acer-notebookbg.com" class="navbar-brand"><?= APP_ACERSEO_KW ?></a></li>
                        <?php
                        if ($templateData['isArticle'] != 'yes') {
                            echo '<li style="margin-left: 20px;"><iframe src="http://www.facebook.com/widgets/like.php?href='.APP_URI .'&amp;postcount=1&amp;layout=button_count&amp;show_faces=false" scrolling="no" frameborder="0" style="border:none; width:75px; height:20px; margin-top: 5px; margin-right: 5px; overflow: hidden;"></iframe></li>
                                <li style="overflow: hidden; padding-top: 5px;"><span id="xlg-plusone-div"></span></li>';
                        }
                        ?>
                    </ul>
                </nav>
            </div>
        </header>
        <div class="xlg-header-ex">
            <div class="xlg-left" style="margin-top: 1px;">
                <div data-rel="author" data-width="200" data-href="//plus.google.com/101032319194415059995" class="g-person"></div>
            </div>
            <a class="xlg-left" href="<?= APP_URI ?>" style="width: 50%;padding-top: 290px;" title='Начало - <?= APP_ACERSEO_KW ?>'>
            <div class="tm-global-hide" itemscope itemtype="http://schema.org/Article">
                <h1><?= APP_NAME ?> за състезанието <?= APP_ACERSEO_KW ?></h1>
                <p itemprop="articleBody">
                <?php

                echo $templateData['data']['entry'][0]['title'] . ': ' . simpleCut(strip_tags($templateData['data']['entry'][0]['content']), 150)

                ?>
                </p>
            </div>
                <span class="tm-global-hide">Начало - <?= APP_ACERSEO_KW ?></span>
            </a>
            <div class="xlg-right" style="margin-top: .8px;">
                <div data-rel="publisher" data-width="218" data-href="//plus.google.com/115616546915058526028" class="g-page"></div>
            </div>
        </div>
        <?php
        if ($templateData['isArticle'] == 'yes') {
            ?>
        <div class="tm-global-hide" itemprop="breadcrumb">
            <a href="<?=APP_URI?>">Acer SEO Blog</a> >
            <a href="<?=$templateData['data']['entry'][0]['id']?>"><?=$templateData['data']['entry'][0]['title']?></a>
        </div>
            <?php
        }

        echo $significantLink;

