<?php

/**
 * @author      George Yanev (http://github.com/tunnckoCore)
 * 
 * @license     MIT License (http://opensource.org/licenses/MIT)
 * @copyright   2013, WAF Development
 */
class WhistleFeedItem
{

    public $elements = array(); // private
    public $guid;
    /*
     * Създава елемент на публикация с подадените име tag_name, съдържание body и атрибути attributes
     */
    public function setItemElement($tag_name, $body, $attributes = '')
    {
        $this->elements[$tag_name] = array($tag_name, $body, $attributes);
    }

    /*
     * Заглавие на публикация
     */
    public function setItemTitle($title)
    {
        $this->setItemElement('title', $title);
    }

    /*
     * Постоянен линк до публикация
     */
    public function setItemLink($link, $guid=false)
    {
        $this->setItemElement('link', ownUrlEncode($link));
        $this->setItemElement('guid', ownUrlEncode($link));
    }

    /*
     * Текст на публикация
     */
    public function setItemDesc($description)
    {
        $this->setItemElement('description', CDATA_START . htmlwrap($description, 1000) . CDATA_END);
    }

    /*
     * Автор на публикация
     */
    public function setItemAuthor($author)
    {
        $this->setItemElement('dc:creator', CDATA_START . $author . CDATA_END);
    }

    /*
     * Категория за публикация
     */
    public function setItemCat($category, $link = '')
    {
        if (!empty($link))
            $link = ' ' . $link;
        $this->setItemElement('category', CDATA_START . $category . CDATA_END, $link);
    }

    /*
     * Коментари към публикация
     */
    public function setItemComments($comments)
    {
        $this->setItemElement('comments', $comments);
    }

    /*
     * Дата на публикация по RFC 822 (формат: Sun, 19 May 2002 15:21:36 GMT)
     * Може също да се подаде във формат YYYY-MM-DD HH:MM:SS или само YYYY-MM-DD, или дори като число, създадена с time()
     * Ако датата е в такъв формат тази функция ще я форматира до RFC 822
     */
    public function setItemDate($date)
    {
        $this->setItemElement('pubDate', $date);
    }

    /*
     * Източник на публикация
     */
    public function setItemSource($source)
    {
        $this->setItemElement('source', $source);
    }

    /*
     * Мултимедиен елемент (прикачен файл)
     * Ако се ползва enclosure tag се изисква PHP версия 4.3.0 или по-нова
     */
    public function setItemEnclosure($link, $length = 0, $type = 0)
    {
        if (0 == $length) { // дължина в байтове (препоръчително е да се подава, за да не се изчислява тук)
            if (function_exists('curl_init')) {
                $ch = curl_init($link);
                curl_setopt($ch, CURLOPT_NOBODY, true);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($ch, CURLOPT_HEADER, true);
                curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
                $data = curl_exec($ch);
                curl_close($ch);
                if (preg_match('/Content-Length: (\d+)/', $data, $matches)) {
                    $length = (int) $matches[1];
                }
            } else {
                $length = strlen(file_get_contents($link)); // лошо е ако се стигне до това, особено при големи файлове
            }
        }
        if (0 == $type) { // тип на файла
            $type = mimeType($link);
            if (empty($type)) {
                $aImg = @getimagesize($link); // за картинки
                $type = array_key_exists($aImg['mime']) ? $aImg['mime'] : '';
            }
        }
        $attributes = ' url="' . $link . '" length="' . $length . '" type="' . $type . '"';
        $this->setItemElement('enclosure', '', $attributes);
    }

    /*
     * Парсва елементите на публикация и ги отпечатва
     */
    public function parseItem()
    {
        echo '<item>' . PHP_EOL;
        foreach ($this->elements as $element) {
            echo '<' . $element[0] . $element[2] . '>' . $element[1] . '</' . $element[0] . '>' . PHP_EOL;
            
        }
        echo '</item>' . PHP_EOL;
    }

}
