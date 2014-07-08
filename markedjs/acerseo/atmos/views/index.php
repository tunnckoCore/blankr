<?php
/**
 * @author      George Yanev (http://github.com/tunnckoCore)
 * 
 * @license     MIT License (http://opensource.org/licenses/MIT)
 * @copyright   2013, WAF Development
 */
require dirname(__DIR__) . DIRECTORY_SEPARATOR . 'config.php';
?>

<main itemscope itemtype="http://schema.org/Blog">
<?php

foreach ($templateData['data']['entry'] as $entryKey => $value) {
    
    $explodeTags = explode("_", $value['id'])[1];
    $entryTitleStrlen = strlen(explode('=', $value['id'])[0]);
    $entryTagsStrlen = strlen($explodeTags);
    $entryTitler = substr($value['id'], $entryTitleStrlen+1, -$entryTagsStrlen-1);
    $metaParts = explode('-', $entryTitler);
    $readTimeWords = 'Четене '.$metaParts[0].':'.$metaParts[1].' минути, '.$metaParts[2].' думи, '.$metaParts[3].' символа.';
    $metaDatePublished = date("Y-m-d", strtotime($value['published']));
    $contenter = '<span class="tm-global-hide">'.$value['title'].': </span>';
    if ($entryKey == 0) {
        $excert = 6000;
    } elseif ($entryKey == 1) {
        $excert = 3000;
    } else {
        $excert = 1000;
    }
    
    $textInfo = textManipulate($value['content'], $excert, '... <br><br><a href="'.$value['id'].'">Прочети повече</a>');
    //$contenter .= TruncateHTML::truncateChars($value['content'], $excert, ' ...').' <a href="'.$value['id'].'">Прочети повече</a>';
    $contenter .= $textInfo[5];
    ?>
<article class="xlg-article" itemprop="blogPosts" itemscope itemtype="http://schema.org/BlogPosting">
    <header class="xlg-article-metadata">
        <div class="xlg-left xlg-article-metadata-author-pic">
            <a href="<?= $value['author']['uri'] ?>" title="Сайт / Профил в Google+">
                <img src="<?= APP_URI ?>assets/authors/charlike.jpg" alt="Снимка на автора <?= $value['author']['name'] ?>" class="img-circle"
                     width="60px" height="60px">
            </a>
        </div>
        <div class="xlg-left xlg-article-metadata-author-meta">
            <div class="xlg-article-metadata-author-name">
                <span itemprop="author" itemscope itemtype="http://schema.org/Person">
                    <meta content="<?= $value['author']['uri'] ?>" itemprop="url">
                    <a href="<?= $value['author']['uri'] ?>" title="Автор на публикацията" rel="author">
                        <span itemprop="name"><?= $value['author']['name'] ?></span>
                    </a>
                </span>
                <span class="xlg-article-metadata-author-date">
                    <meta itemprop="datePublished" content="<?= $metaDatePublished ?>">
                    <a href="#" title="<?= date("d.m.Y, H:i:s", strtotime($value['updated'])) ?>"><time datetime="<?= $metaDatePublished ?>"><?= date("d.m.Y", strtotime($value['updated'])) ?></time></a>
                </span>
            </div>

            <div class="xlg-article-metadata-info">
                <a href="#" title="Мета информация"><?=$readTimeWords?></a>
            </div>
        </div>
        <div class="xlg-right xlg-article-title">
            <h1 class="text-right" itemprop="name"><a rel="bookmark" itemprop="url" href="<?= $value['id'] ?>"><?= simpleCut($value['title'], 49) ?></a></h1>
            <div class="xlg-article-hash-cloud text-right">
                <i class="fa fa-tags"></i> 
                <?php
                
                $parseTags = explode("-", str_replace('/article/', '', $explodeTags));
                $cntTags = count($parseTags);
                foreach ($parseTags as $kk => $tag) {
                    if ($kk == ($cntTags-1)) {
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
    <div class="xlg-article-content" itemprop="description">
        <?php
            echo $contenter;
        ?>
    </div>
    <footer class="xlg-article-footer">
        <div class="xlg-article-share-mask xlg-left">
            <script>$(function() {
                    AssocialsApi('associals-block-<?php echo $entryKey;?>');
                });</script>
            <div class="xlg-article-share associals-block-<?php echo $entryKey;?>"
                 data-associals-item-id="<?php echo $entryKey;?>"
                 data-associals-item-url="<?= urlencode($value['id']) ?>"
                 data-associals-item-title="<?= $value['title'] ?> via @AcerOtNotebook_"
                 data-associals-item-image="<?= $templateData['data']['logo'] ?>">
                <a title="Google+" class="associals-item-<?php echo $entryKey;?>-googleplus">
                    <i class="fa fa-google-plus-square"></i> Google+
                </a>
                <a title="Facebook" class="associals-item-<?php echo $entryKey;?>-facebook">
                    <i class="fa fa-facebook-square"></i> Facebook
                </a>
                <a title="Pinterest" class="associals-item-<?php echo $entryKey;?>-pinterest">
                    <i class="fa fa-pinterest-square"></i> Pinterest
                </a>
                <a title="Twitter" class="associals-item-<?php echo $entryKey;?>-twitter">
                    <i class="fa fa-twitter-square"></i> Twitter
                </a>
                <a title="Atom Feed" href="<?= str_replace('/article/', '/atom/', $value['id']) ?>">
                    <i class="fa fa-rss-square"></i> Atom Feed
                </a>
                <a href="#toTopLink" class="toTopLink"><i class="fa fa-chevron-up"></i></a>
            </div>
        </div>
        <div class="xlg-article-permalink xlg-right">
            <a title="Permalink to <?= $value['title'] ?>" href="<?= $value['id'] ?>">
                <i class="fa fa-link"></i> Permalink
            </a>
        </div>
        <div class="xlg-clear"></div>
    </footer>
</article>
    <?php
}
?>
</main>
<br>