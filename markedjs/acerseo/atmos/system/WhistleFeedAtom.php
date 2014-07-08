<?php

/**
 * @author      George Yanev (http://github.com/tunnckoCore)
 * 
 * @license     MIT License (http://opensource.org/licenses/MIT)
 * @copyright   2013, WAF Development
 */
/*
 * $atomLink, 
 * $siteTitle, 
 * $siteDesc, 
 * $siteLastBuild, 
 * $siteLang, 
 * $siteUpdatePeriod, 
 * $siteUpdateFreq, 
 * $siteGenerator
 */
class WhistleFeedAtom
{

    private $config = array();
    public $items = array();
    private $channels = array();

    public function __construct($config = array())
    {
        if (is_array($config)) {
            $this->config = $config;
            //$config['atomlink'] - atom feed link
            $this->setFeedTitle($config['title']);
            $this->setFeedLink($config['link']); // site url link
            $this->setFeedDescription($config['description']);
            $this->setFeedLanguage($config['language']);
            $this->setFeedGenerator($config['generator']);
            $this->setFeedLastBuildDate($config['lastBuildDate']);
            $this->setFeedUpdatePeriod($config['updatePeriod']);
            $this->setFeedUpdateFrequency($config['updateFrequency']);
        }
    }

    /**
     * Превръща масиви в тагове
     * private function       
     * */
    private function metaData($array)
    {
        $output = '';
        foreach ($array as $key => $value) {
            if (is_array($value)) {
                $output .= PHP_EOL . "<$key>" . $this->metaData($value) . "</$key>" . PHP_EOL;
            } else {
                $output .= PHP_EOL . "<$key>$value</$key>" . PHP_EOL;
            }
        }
        return $output;
    }

    /*
     * Добавя произволен елемент към канала с име tag_name и стойност value
     */
    public function setChannelElement($tagName, $value)
    {
        $this->channels[$tagName] = $value;
    }

    private function setFeedLink($link)
    {
        $this->setChannelElement('link', ownUrlEncode($link));
    }

    private function setFeedTitle($title)
    {
        $this->setChannelElement('title', $title);
    }

    private function setFeedDescription($description)
    {
        $this->setChannelElement('description', $description);
    }

    private function setFeedLastBuildDate($lastBuildDate)
    {
        $this->setChannelElement('lastBuildDate', $lastBuildDate);
    }

    private function setFeedLanguage($language)
    {
        $this->setChannelElement('language', $language);
    }

    private function setFeedUpdatePeriod($updatePeriod)
    {
        $this->setChannelElement('sy:updatePeriod', $updatePeriod);
    }

    private function setFeedUpdateFrequency($updateFrequency)
    {
        $this->setChannelElement('sy:updateFrequency', $updateFrequency);
    }

    private function setFeedGenerator($generator)
    {
        $this->setChannelElement('generator', $generator);
    }

    private function setChannel()
    {
        echo '<rss xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:wfw="http://wellformedweb.org/CommentAPI/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:sy="http://purl.org/rss/1.0/modules/syndication/" xmlns:slash="http://purl.org/rss/1.0/modules/slash/" version="2.0">';
        echo '<channel><atom:link href="' . $this->config['atomlink'] . '" rel="self" type="application/rss+xml" />';
        echo $this->metaData($this->channels);
    }

    public function setItems()
    {
        foreach ($this->items as $item) {
            $item->parseItem();
        }
    }

    /*
     * Добавя всеки обект към масив, за да се обработи по-късно
     */
    public function addItem($item)
    {
        if (is_array($item)) {
            foreach ($item as $obj) {
                $this->addItem($obj);
            }
        }
        array_push($this->items, $item);
    }

    public function generateFeed($return = false)
    {
        if ($return) {
            ob_start();
            $this->setChannel();
            $this->setItems();
            echo '</channel>' . PHP_EOL . '</rss>';
            $contents = ob_get_clean();
            return $contents;
        }
        header("Content-Type: text/xml; charset=UTF-8");
        $this->setChannel();
        $this->setItems();
        echo '</channel>' . PHP_EOL . '</rss>';
    }

}
