<?php
/**
 * @author      George Yanev (http://github.com/tunnckoCore)
 * 
 * @license     MIT License (http://opensource.org/licenses/MIT)
 * @copyright   2013, WAF Development
 */
/**
 * Iterates individual characters (Unicode codepoints) of DOM text and CDATA nodes
 * while keeping track of their position in the document.
 *
 * Example:
 *
 *  $doc = new DOMDocument();
 *  $doc->load('example.xml');
 *  foreach(new DOMLettersIterator($doc) as $letter) echo $letter;
 *
 * NB: If you only need characters without their position
 *     in the document, use DOMNode->textContent instead.
 *
 * @author porneL http://pornel.net
 * @license Public Domain
 *
 */
class TruncateHTML
{
    public static function truncateChars($html, $limit, $ellipsis = '...')
    {
        $ecsUtf8 = '<meta http-equiv="content-type" content="text/html; charset=utf-8">';
        if ($limit <= 0 || $limit >= mb_strlen(strip_tags($html))) {
            return $ecsUtf8.$html;
        }

        $dom = new DOMDocument();
        $dom->loadHTML($ecsUtf8.htmlspecialchars($html));
        $dom->recover = true;
        $dom->strictErrorChecking = false;
        $dom->encoding = 'UTF-8';
        $body = $dom->getElementsByTagName("body")->item(0);

        $it = new DOMLettersIterator($body);

        foreach ($it as $letter) {
            if ($it->key() >= $limit) {
                $currentText = $it->currentTextPosition();
                $currentText[0]->nodeValue = mb_substr($currentText[0]->nodeValue, 0, $currentText[1] + 1, 'UTF-8');
                self::removeProceedingNodes($currentText[0], $body);
                self::insertEllipsis($currentText[0], $ellipsis);
                break;
            }
        }

        return preg_replace('~<(?:!DOCTYPE|/?(?:html|head|body))[^>]*>\s*~i', '', html_entity_decode($dom->saveHTML()));
    }

    public static function truncateWords($html, $limit, $ellipsis = '...')
    {
        $ecsUtf8 = '<meta http-equiv="content-type" content="text/html; charset=utf-8">';
        if ($limit <= 0 || $limit >= self::countWords(strip_tags($html))) {
            return $ecsUtf8.$html;
        }
        
        $dom = new DOMDocument();
        $dom->loadHTML($ecsUtf8.htmlspecialchars($html));
        //$dom->recover = true;
        //$dom->strictErrorChecking = false;
        $body = $dom->getElementsByTagName("body")->item(0);
        $it = new DOMWordsIterator($body);

        foreach ($it as $word) {
            if ($it->key() >= $limit) {
                $currentWordPosition = $it->currentWordPosition();
                $curNode = $currentWordPosition[0];
                $offset = $currentWordPosition[1];
                $words = $currentWordPosition[2];

                $curNode->nodeValue = mb_substr($curNode->nodeValue, 0, $words[$offset][1] + strlen($words[$offset][0]));

                self::removeProceedingNodes($curNode, $body);
                self::insertEllipsis($curNode, $ellipsis);
                break;
            }
        }

        return preg_replace('~<(?:!DOCTYPE|/?(?:html|head|body))[^>]*>\s*~i', '', html_entity_decode($dom->saveHTML()));
    }

    private static function removeProceedingNodes(DOMNode $domNode, DOMNode $topNode)
    {
        $nextNode = $domNode->nextSibling;

        if ($nextNode !== NULL) {
            self::removeProceedingNodes($nextNode, $topNode);
            $domNode->parentNode->removeChild($nextNode);
        } else {
            //scan upwards till we find a sibling
            $curNode = $domNode->parentNode;
            while ($curNode !== $topNode) {
                if ($curNode->nextSibling !== NULL) {
                    $curNode = $curNode->nextSibling;
                    self::removeProceedingNodes($curNode, $topNode);
                    $curNode->parentNode->removeChild($curNode);
                    break;
                }
                $curNode = $curNode->parentNode;
            }
        }
    }

    private static function insertEllipsis(DOMNode $domNode, $ellipsis)
    {
        $avoid = array('a', 'strong', 'em', 'h1', 'h2', 'h3', 'h4', 'h5'); //html tags to avoid appending the ellipsis to

        if (in_array($domNode->parentNode->nodeName, $avoid) && $domNode->parentNode->parentNode !== NULL) {
            // Append as text node to parent instead
            $textNode = new DOMText($ellipsis);

            if ($domNode->parentNode->parentNode->nextSibling)
                $domNode->parentNode->parentNode->insertBefore($textNode, $domNode->parentNode->parentNode->nextSibling);
            else
                $domNode->parentNode->parentNode->appendChild($textNode);
        } else {
            // Append to current node
            $domNode->nodeValue = rtrim($domNode->nodeValue) . $ellipsis;
        }
    }

    private static function countWords($text)
    {
        $words = preg_split("/[\n\r\t ]+/", $text, -1, PREG_SPLIT_NO_EMPTY);
        return count($words);
    }

}