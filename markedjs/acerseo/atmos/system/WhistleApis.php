<?php
/**
 * @author      George Yanev (http://github.com/tunnckoCore)
 * '511956138886922', '6ce16e5dfc522664f2d29d3d8a1a32f9'
 * @license     MIT License (http://opensource.org/licenses/MIT)
 * @copyright   2013, WAF Development
 */

class WhistleApis
{

    private $config = array();
    public $facebook;

    public function start($appId, $appKey, $options = null)
    {
        if (!$appId || !$appKey) {
            throw new Exception('Facebook AppId & AppSecret is required.', 500);
        }
        $this->config['facebook']['appId'] = $appId;
        $this->config['facebook']['appSecret'] = $appKey;

        $this->bitlyInit($this->customOptions($options));
    }

    private function customOptions($options)
    {
        if (!is_array($options)) {
            return false;
        }
        foreach ($options as $api => $opt) {
            foreach ($opt as $k => $v) {
                $this->config[$api][$k] = $v;
                return true;
            }
            return false;
        }
    }

    private function bitlyInit($default = false)
    {
        if (!$default) {
            $this->config['bitly']['main']['login'] = 'o_7lhtle464r';
            $this->config['bitly']['main']['apiKey'] = 'R_fb96aa701e990e7d6098a55cb4a9e335';
            $this->config['bitly']['main']['format'] = 'json';
            $this->config['bitly']['main']['version'] = '2.0.1';
            $this->config['bitly']['apiLink'] = 'http://api.bit.ly/shorten?';
        }
        return $this;
    }

    public function bitlyCreateLink($key, $url)
    {
        if (!$key || !$url) {
            throw new Exception('To use short bitly service must provide $key and $url.', 500);
        }
        if (!isset($this->config['bitly']['links'][$key])) {
            $this->config['bitly']['main']['longUrl'] = $url;
            $response = file_get_contents($this->bitlyBuildQuery());
            $json = json_decode($response, true);

            $this->bitlySetLink($key, $json);
        }
    }

    private function bitlySetLink($key, $json)
    {
        $longUrl = $this->config['bitly']['main']['longUrl'];
        $shorten = $json['results'][$longUrl]['shortUrl'];

        $this->config['bitly']['links'][$key]['original'] = $longUrl;
        $this->config['bitly']['links'][$key]['shorten'] = $shorten;
    }

    public function bitlyGetLink($key, $type = 'shorten')
    {
        if (!$key) {
            throw new Exception('Must provide url`s $key', 500);
        }
        return $this->config['bitly']['links'][$key][$type];
    }

    private function bitlyBuildQuery()
    {
        $bitlyLink = $this->config['bitly']['apiLink'];
        $bitlyLink .= http_build_query($this->config['bitly']['main']);
        return $bitlyLink;
    }

    public function facebook()
    {
        return new Facebook($this->config['facebook']);
    }

}

/*
 * Usage
 *
$whistle = new WhistleApis();
$whistle->start('511956138886922', '6ce16e5dfc522664f2d29d3d8a1a32f9');

echo '<h1>apis.cdnm.whistle.bg</h1><hr>';
$whistle->bitlyCreateLink('cs1bg', 'http://www.cs-bg.info/');

echo 'Original link of <b>'.$whistle->bitlyGetLink('cs1bg').'</b>';
echo ' ===> <b>' . $whistle->bitlyGetLink('cs1bg', 'original') . '</b>';
 * 
 */