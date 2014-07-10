<?php
/**
 * @author      George Yanev (http://github.com/tunnckoCore)
 * 
 * @license     MIT License (http://opensource.org/licenses/MIT)
 * @copyright   2013, WAF Development
 */
require dirname(__DIR__) . DIRECTORY_SEPARATOR . 'config.php';
//echo "<pre>" . print_r($templateData, true) . "</pre>";


$explodeTags = explode("_", $templateData['data']['entry']['id'])[1];
$entryTitleStrlen = strlen(explode('=', $templateData['data']['entry']['id'])[0]);
$entryTagsStrlen = strlen($explodeTags);
$entryTitler = substr($templateData['data']['entry']['id'], $entryTitleStrlen+1, -$entryTagsStrlen-1);
$metaParts = explode('-', $entryTitler);
$readTimeWords = 'Четене '.$metaParts[0].':'.$metaParts[1].' минути, '.$metaParts[2].' думи, '.$metaParts[3].' символа.';
$metaDatePublished = date("Y-m-d", strtotime($templateData['data']['entry']['published']));
$mainArticleImageTitle = @end(explode('/',$templateData['data']['logo']));
?>


<article class="xlg-article" itemscope itemtype="http://schema.org/Article">
    <header class="xlg-article-metadata">
        <div class="xlg-left xlg-article-metadata-author-pic">
            <a href="<?= $templateData['data']['entry']['author']['uri'] ?>" title="Сайт / Профил в Google+">
                <img src="<?= APP_URI ?>assets/authors/charlike.jpg" alt="Author Picture" class="img-circle"
                     width="60px" height="60px">
            </a>
        </div>
        <div class="xlg-left xlg-article-metadata-author-meta">
            <div class="xlg-article-metadata-author-name">
                <span itemprop="author" itemscope itemtype="http://schema.org/Person">
                    <meta content="<?= $templateData['data']['entry']['author']['uri'] ?>" itemprop="url">
                    <a href="<?= $templateData['data']['entry']['author']['uri'] ?>" title="Автор на публикацията" rel="author">
                        <span itemprop="name"><?= $templateData['data']['entry']['author']['name'] ?></span>
                    </a>
                </span>
                <span class="xlg-article-metadata-author-date">
                    <meta itemprop="datePublished" content="<?= $metaDatePublished ?>">
                    <a href="#" title="<?= date("d.m.Y, H:i:s", strtotime($templateData['data']['entry']['updated'])) ?>"><time datetime="<?= $metaDatePublished ?>"><?= date("d.m.Y", strtotime($templateData['data']['entry']['updated'])) ?></time></a>
                </span>
            </div>

            <div class="xlg-article-metadata-info">
                <a href="#" title="Мета информация"><?=$readTimeWords?></a>
            </div>
        </div>
        <div class="xlg-right xlg-article-title">
            <h1 class="text-right" itemprop="name headline"><?= simpleCut($templateData['data']['entry']['title'], 49) ?></h1>
            <div class="xlg-article-hash-cloud text-right">
                <div class="xlg-share-apis">
                    <div class="xlg-share-apis-facebook-like">
                        <iframe src="http://www.facebook.com/widgets/like.php?href=<?= $templateData['data']['entry']['id'] ?>&amp;postcount=1&amp;layout=button_count&amp;show_faces=false" scrolling="no" frameborder="0" style="border:none; width:76px; height:20px;overflow: hidden;"></iframe>
                    </div>
                    <div class="xlg-share-apis-google-plusone">
                        <div id="xlg-plusone-div"></div>
                    </div>
                </div>

                <i class="fa fa-tags"></i> 
                <?php
                
                $parseTags = explode("_", $templateData['data']['entry']['id'])[1];
                $parseTags = explode("-", str_replace('/article/', '', $parseTags));
                $cntTags = count($parseTags);
                foreach ($parseTags as $key => $tag) {
                    if ($key == ($cntTags-1)) {
                        echo '<a href="'.APP_GPLUS_HASH.$tag.'" title="#'.$tag.'" target="_blank">#'.$tag.'</a>';
                    } else {
                        echo '<a href="'.APP_GPLUS_HASH.$tag.'" title="#'.$tag.'" target="_blank">#'.$tag.'</a>, ';
                    }
                }
                ?>
            </div>
        </div>
        <div class="xlg-clear"></div>
    </header>
    <div class="xlg-article-content" itemprop="articleBody">
        <div class="thumbnail"><center>
            <img src="<?= $templateData['data']['logo'] ?>" class="img-responsive" alt='<?= $cleanTitle ?>' title="<?= $mainArticleImageTitle ?>" itemprop="image">
            </center>
        </div>
        <h2 class="text-center"><?= $templateData['data']['entry']['title'] ?></h2>
        <br>
        <?= $templateData['data']['entry']['content'] ?>
    </div>
    <footer class="xlg-article-footer">
        <div class="xlg-article-share-mask xlg-left">
            <script>$(function() {
                    AssocialsApi('associals-block-article1');
                });</script>
            <div class="xlg-article-share associals-block-article1"
                 data-associals-item-id="article1"
                 data-associals-item-url="<?= urlencode($templateData['data']['entry']['id']) ?>"
                 data-associals-item-title='<?= $templateData['data']['entry']['title'] ?> via @AcerOtNotebook_'
                 data-associals-item-image="<?= $templateData['data']['logo'] ?>">
                <a title="Google+" class="associals-item-article1-googleplus">
                    <i class="fa fa-google-plus-square"></i> Google+
                </a>
                <a title="Facebook" class="associals-item-article1-facebook">
                    <i class="fa fa-facebook-square"></i> Facebook
                </a>
                <a title="Pinterest" class="associals-item-article1-pinterest">
                    <i class="fa fa-pinterest-square"></i> Pinterest
                </a>
                <a title="Twitter" class="associals-item-article1-twitter">
                    <i class="fa fa-twitter-square"></i> Twitter
                </a>
                <a title="Atom Feed" href="<?= str_replace('/article/', '/atom/', $templateData['data']['entry']['id']) ?>">
                    <i class="fa fa-rss-square"></i> Atom Feed
                </a>
                <a href="#toTopLink" class="toTopLink"><i class="fa fa-chevron-up"></i></a>
            </div>
        </div>
        <div class="xlg-article-permalink xlg-right">
            <a title="Permalink to <?= $templateData['data']['entry']['title'] ?>" href="<?= $templateData['data']['entry']['id'] ?>">
                <i class="fa fa-link"></i> Permalink
            </a>
        </div>
        <div class="xlg-clear"></div>
    </footer>
</article>
<br>