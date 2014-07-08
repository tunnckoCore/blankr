<?php

/**
 * @author      George Yanev (http://github.com/tunnckoCore)
 * 
 * @license     MIT License (http://opensource.org/licenses/MIT)
 * @copyright   2013, WAF Development
 */
class AtomBotArticles
{

    private $validPost = array();
    private $noErrors = false;
    private $atomFeed = array();
    private $atomEntries = array();
    private $articleUri;
    private $articleURL;
    private $articleFilename = null;

    public function __construct($atomFeed, $atomEntries)
    {
        if (is_array($this->atomFeed) && is_array($this->atomEntries)) {
            $this->atomFeed = $atomFeed;
            $this->atomEntries = $atomEntries;
        }
    }

    public function publish($array = array())
    {
        if (is_array($array) && $_SERVER['REQUEST_METHOD'] == 'POST') {
            $this->validateInput($_POST);
        }
        if ($this->noErrors && $this->validPost) {
            
            $abot = new AtomBot();
            $nowTime = date(DATE_W3C, time()+7200);
            

            $this->buildPost($this->validPost['xlg_article_title'], $this->validPost['xlg_article_tags'], $this->validPost['xlg_article_image'], $this->validPost['xlg_article_author_name'], $this->validPost['xlg_article_author_uri'], $this->validPost['xlg_article_content'], $nowTime);
            $postBuildedName = $this->buildFilename(); // or $this->articleFilename;

            $abot->build($this->atomFeed);
            $abot->entry($this->atomEntries);
            $xmlArticleData = $abot->display(true);


            $saveArticleFile = file_put_contents(APP_ATOMBOT . $postBuildedName . '.atom', $xmlArticleData);
            if (!$saveArticleFile) {
                sendProcessResponse('Грешка при създаването на ArticleFeedFile.', 'createArticle');
            }
            chmod(APP_ATOMBOT . $postBuildedName . '.atom', 0777);
            
            /**
             * Create CoreFeedFile
             */
            if (!realpath(APP_PUBLIC . APP_FEED)) {

                $xmlContent = simplexml_load_string(file_get_contents(APP_ATOMBOT . $postBuildedName . '.atom'), 'SimpleXMLElement', LIBXML_NOCDATA);
                $array = json_decode(json_encode((array) $xmlContent), true);

                $array['title'] = [
                    '@attributes' => [
                        'type' => 'text',
                        'xml:lang' => 'bg'
                    ],
                    '@value' => $this->atomFeed['feed']['body']['title']['body']
                ];
                $array['author'] = [
                    'name' => [
                        '@attributes' => [
                            'xml:lang' => 'bg'
                        ],
                        '@value' => $this->atomFeed['feed']['body']['author']['body']['name']['body']
                    ],
                    'uri' => $this->atomFeed['feed']['body']['author']['body']['uri']['body']
                ];
                $array['link'][1]['@attributes']['href'] = APP_URI . 'atom/';
                $array['logo'] = APP_SITE_IMG;
                $array['@attributes'] = ['xmlns' => $this->atomFeed['feed']['attrs']['xmlns']];
                $array['entry']['content'] = [
                    '@attributes' => ['type' => 'html'],
                    '@cdata' => str_replace('<![CDATA[', '', str_replace(']]>', '', $this->validPost['xlg_article_content']))
                ];
                $xmlExtra = Array2XML::createXML('feed', $array);
            } else {
                $xmlContent = simplexml_load_string(file_get_contents(APP_PUBLIC . APP_FEED), 'SimpleXMLElement', LIBXML_NOCDATA);
                $arrayCoreFeed = json_decode(json_encode((array) $xmlContent), true);
                $arrayCoreFeed['author'] = [
                    'name' => [
                        '@attributes' => [
                            'xml:lang' => 'bg'
                        ],
                        '@value' => $this->atomFeed['feed']['body']['author']['body']['name']['body']
                    ],
                    'uri' => $this->atomFeed['feed']['body']['author']['body']['uri']['body']
                ];
                $arrayCoreFeed['updated'] = $this->atomEntries[0]['body']['entry']['body']['updated']['body'];
                $arrayCoreFeed['title'] = [
                    '@attributes' => [
                        'type' => 'text',
                        'xml:lang' => 'bg'
                    ],
                    '@value' => $this->atomFeed['feed']['body']['title']['body']
                ];
                $arrayCoreFeed['@attributes'] = ['xmlns' => $this->atomFeed['feed']['attrs']['xmlns']];
                
                foreach ($arrayCoreFeed['entry'] as $key2Entry => $value) {
                    $newKey2Entry = $key2Entry+1;
                    //echo "<pre>" . print_r($value, true) . "</pre>";
                    $arrayCoreFeed['entry'][$newKey2Entry]['title'] = [
                        '@attributes' => [
                            'type' => 'text',
                            'xml:lang' => 'bg'
                        ],
                        '@value' => $value['title']
                    ];
                    $arrayCoreFeed['entry'][$newKey2Entry]['id'] = $value['id'];
                    $arrayCoreFeed['entry'][$newKey2Entry]['updated'] =$value['updated']; // now time
                    $arrayCoreFeed['entry'][$newKey2Entry]['published'] = $value['published']; // now time
                    $arrayCoreFeed['entry'][$newKey2Entry]['link'] = [
                        '@attributes' => [
                            'href' => $this->articleUri,
                            'rel' => 'alternate',
                            'type' => 'text/html',
                            'hreflang' => 'bg'
                        ]
                    ];
                    $arrayCoreFeed['entry'][$newKey2Entry]['author'] = [
                        'name' => [
                            '@attributes' => [
                                'xml:lang' => 'bg'
                            ],
                            '@value' => $value['author']['name']
                        ],
                        'uri' => $value['author']['uri']
                    ];
                    $arrayCoreFeed['entry'][$newKey2Entry]['content'] = [
                        '@attributes' => [
                            'type' => 'html',
                        ],
                        '@cdata' => str_replace('<![CDATA[', '', str_replace(']]>', '', $value['content']))
                    ];
                }
                    
                    $arrayCoreFeed['entry'][0]['title'] = [
                        '@attributes' => [
                            'type' => 'text',
                            'xml:lang' => 'bg'
                        ],
                        '@value' => $this->atomEntries[0]['body']['entry']['body']['title']['body']
                    ];
                    $arrayCoreFeed['entry'][0]['id'] = $this->atomEntries[0]['body']['entry']['body']['id']['body'];
                    $arrayCoreFeed['entry'][0]['updated'] = $this->atomEntries[0]['body']['entry']['body']['updated']['body']; // now time
                    $arrayCoreFeed['entry'][0]['published'] = $this->atomEntries[0]['body']['entry']['body']['published']['body']; // now time
                    $arrayCoreFeed['entry'][0]['link'] = [
                        '@attributes' => [
                            'href' => $this->articleUri,
                            'rel' => 'alternate',
                            'type' => 'text/html',
                            'hreflang' => 'bg'
                        ]
                    ];
                    $arrayCoreFeed['entry'][0]['author'] = [
                        'name' => [
                            '@attributes' => [
                                'xml:lang' => 'bg'
                            ],
                            '@value' => $this->atomEntries[0]['body']['entry']['body']['author']['body']['name']['body']
                        ],
                        'uri' => $this->atomEntries[0]['body']['entry']['body']['author']['body']['uri']['body']
                    ];
                    $arrayCoreFeed['entry'][0]['content'] = [
                        '@attributes' => [
                            'type' => 'html',
                        ],
                        '@cdata' => str_replace('<![CDATA[', '', str_replace(']]>', '', $this->atomEntries[0]['body']['entry']['body']['content']['body']))
                    ];
                    

                $xmlExtra = Array2XML::createXML('feed', $arrayCoreFeed);
            }
            
            /**
             * GENERATE SITEMAP
             */
            $DOM = new DOMDocument();
            $DOM->load(APP_PUBLIC.APP_SITEMAP);
            $DOM->formatOutput = true;
            $DOM->preserveWhiteSpace = false;
            
            foreach ($DOM->getElementsByTagName('url') as $kk => $urlEntry) {
                if ($kk == 0 || $kk == 1) {
                    if ($kk == 0) {
                        $lastModer = $DOM->getElementsByTagName('lastmod');
                        $textNode = $DOM->createElement('lastmod', $nowTime);
                        foreach ($lastModer as $team) {
                            $team->parentNode->replaceChild($textNode, $team);
                            break;
                        }
                    } else {
                        $url = $DOM->createElement('url');

                        $url->appendChild($DOM->createElement('loc', $this->articleUri));
                        $url->appendChild($DOM->createElement('lastmod', $nowTime));
                        $url->appendChild($DOM->createElement('changefreq', 'daily'));
                        $url->appendChild($DOM->createElement('priority', '0.6'));

                        $urlEntry->parentNode->insertBefore($url, $urlEntry);
                        //break;
                    }
                }
            }
            $saveCoreFeedFile = file_put_contents(APP_PUBLIC . APP_FEED, $xmlExtra->saveXML());
            $saveSitemap = file_put_contents(APP_PUBLIC.APP_SITEMAP, $DOM->saveXML());
            if (!$saveSitemap || !$saveCoreFeedFile) {
                sendProcessResponse('Грешка при ъпдейт на '.APP_SITEMAP.' или '.APP_FEED, 'createArticle');
            }
            header('Location: ' . $this->articleUri);
            exit;
        }
    }

    private function buildPost($title, $tags, $image, $authorName, $authorLink, $content, $nowTime)
    {
        
        $postFilename = $this->buildFilename($title, $content, $tags);
        
        $this->atomFeed['feed']['body']['updated']['body'] = $nowTime; // now time
        $this->atomFeed['feed']['body']['author']['body']['name']['body'] = $authorName;
        $this->atomFeed['feed']['body']['author']['body']['uri']['body'] = $authorLink;
        $this->atomFeed['feed']['body']['link:alternate']['body'] = 'link href="' . APP_URI . '" rel="alternate" type="text/html" hreflang="bg"';
        $this->atomFeed['feed']['body']['link:self']['body'] = 'link href="' . APP_URI . $postFilename . '/atom/" rel="self" type="application/atom+xml"';
        $this->atomFeed['feed']['body']['logo']['body'] = $image;

        $this->atomEntries[0]['body']['entry']['body']['title']['body'] = $title;
        $this->atomEntries[0]['body']['entry']['body']['id']['body'] = APP_URI . $postFilename . '/article/';
        $this->atomEntries[0]['body']['entry']['body']['link:alternate']['body'] = 'link href="' . APP_URI . $postFilename . '/article/" rel="alternate" type="text/html" hreflang="bg"';
        $this->atomEntries[0]['body']['entry']['body']['updated']['body'] = $nowTime; // now time
        $this->atomEntries[0]['body']['entry']['body']['published']['body'] = $nowTime; // now time
        $this->atomEntries[0]['body']['entry']['body']['author']['body']['name']['body'] = $authorName;
        $this->atomEntries[0]['body']['entry']['body']['author']['body']['uri']['body'] = $authorLink;
        $this->atomEntries[0]['body']['entry']['body']['content']['body'] = CDATA_START . "\n" . $content . "\n" . CDATA_END;

        $this->articleURL = $postFilename;
        $this->articleUri = APP_URI . $postFilename . '/article/';
    }

    private function buildFilename($title=false, $content=false, $tags=false)
    {
        if (!$title && !$content && !$tags) {
            return $this->articleFilename;
        }
        if ($title && $content && $tags) {
            $find = array('/\r/', '/\n/', '/\s\s+/');
            $replace = array(' ', ' ', ' ');
            $work = strip_tags($content);
            $work = strtolower($work);
            $work = preg_replace($find, $replace, $work);
            $work = trim($work);
            $numSymbols = mb_strlen($work, 'UTF-8');
            $work = explode(' ', $work);
            $numWords = count($work);
            $minutes = floor($numWords / 200);
            $seconds = floor($numWords % 200 / (200 / 60));

            //$est = $minutes . ' minute' . ($minutes == 1 ? '' : 's') . ', ' . $seconds . ' second' . ($seconds == 1 ? '' : 's');

            $appendTags = str_replace(' ', '', str_replace(',', '-', translitTitles($tags)));
            $this->articleFilename = translitTitles($title) .'=' . $minutes.'-'. $seconds . '-'.$numWords.'-'.$numSymbols.'_' . $appendTags;

            return $this->articleFilename;
        }
        return 'articleFilename_is_empty';
    }
    
    private function validateInput($array)
    {

        foreach ($array as $key => $value) {
            if (!minlength($array[$key], 3)) {
                sendProcessResponse('Полето `' . $key . '` трябва да бъде >= 3 символа.', 'createArticle');
            }
        }
        if (!maxlength($array['xlg_article_author_name'], 50)) {
            sendProcessResponse('Името на автора трябва да бъде <= 50 символа.', 'createArticle');
        }
        if (!maxlength($array['xlg_article_title'], 170)) {
            sendProcessResponse('Заглавието на статията трябва да бъде <= 100 символа.', 'createArticle');
        }
        if (!url($array['xlg_article_author_uri'])) {
            sendProcessResponse('Полето `xlg_article_author_uri` трябва да бъде уеб адрес.', 'createArticle');
        }
        if (!url($array['xlg_article_image'])) {
            sendProcessResponse('Полето `xlg_article_image` трябва да бъде уеб адрес.', 'createArticle');
        }
        $this->noErrors = true;
        $this->validPost = $array;
    }

}
