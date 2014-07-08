<?php
/**
 * @author      George Yanev (http://github.com/tunnckoCore)
 * 
 * @license     MIT License (http://opensource.org/licenses/MIT)
 * @copyright   2013, WAF Development
 */
require dirname(__DIR__) . DIRECTORY_SEPARATOR . 'config.php';
?>

<article class="xlg-article">
    <form action="<?= APP_URI ?>article/publish" method="post">
        <header class="xlg-article-metadata">
            <div class="xlg-left xlg-article-metadata-author-pic">
                <a href="#" title="Сайт / Профил в Google+">
                    <img src="<?= APP_URI ?>assets/authors/no-avatar.png" alt="Author Picture" class="img-circle"
                         width="60px" height="60px">
                </a>
            </div>
            <div class="xlg-left xlg-article-create-metadata-author-meta">
                <div class="xlg-article-metadata-author-name">
                    <input type="text" name="xlg_article_author_name" class="form-control" placeholder="Име на автора">
                </div>

                <div class="xlg-article-metadata-author-date">
                    <input type="text" name="xlg_article_author_uri" class="form-control" placeholder="Google+ профил или сайт">
                </div>
            </div>
            <div class="xlg-right xlg-article-title">
                <input type="text" name="xlg_article_title" class="form-control" placeholder="Заглавие на статията">
                <div class="xlg-article-hash-cloud text-left">
                    <input type="text" name="xlg_article_tags" class="form-control" placeholder="Тагове, разделени със запетайка">
                </div>
            </div>
            <div class="xlg-clear"></div>
        </header>
        <div class="xlg-article-content">
            <input type="text" name="xlg_article_image" class="form-control" placeholder="Линк към изображение за статията"><br>
            <textarea class="form-control summernote" rows="10" name="xlg_article_content" placeholder="Съдържание на статията ..."></textarea>
        </div>
        <footer class="xlg-article-footer">
            <div class="xlg-article-share-mask xlg-left">
                <div class="xlg-article-share ">
                    <a href="#">Статията ще бъде публикувана с дата и час на създаването й.</a>
                </div>
            </div>
            <div class="xlg-article-permalink xlg-right">
                <button type="submit">
                    <i class="fa fa-pencil"></i> Публикувай
                </button>
            </div>
            <div class="xlg-clear"></div>
        </footer>
    </form>
</article>
<br>