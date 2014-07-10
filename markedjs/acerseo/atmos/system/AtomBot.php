<?php

/**
 * @author      George Yanev (http://github.com/tunnckoCore)
 * 
 * @license     MIT License (http://opensource.org/licenses/MIT)
 * @copyright   2013, WAF Development
 */
class AtomBot
{

    private $atomXML;
    private $xmlStart = '<?xml version="1.0" encoding="utf-8"?>';
    private $entries = array();
    
    public function build($config = array())
    {
        $fourSpace = '    ';
        $eightSpace = '        ';
        if (is_array($config)) {
            foreach ($config as $key => $value) {
                if (is_array($value)) {

                    if (stripos($key, 'link:') !== false) {
                        $this->atomXML .= $fourSpace.'<' . $value['body'] . ' />' . "\n";
                    } else {
                        $xmlAttrs = '';
                        if (is_array($value['attrs'])) {
                            foreach ($value['attrs'] as $attrKey => $attrValue) {
                                $xmlAttrs .= ' ' . $attrKey . '="' . $attrValue . '"';
                            }
                        }
                        
                        if ($key == 'feed' || $key == 'author' || $key == 'contributor' || $key == 'entry') {
                            if ($key == 'entry') {
                                $this->atomXML .= "\n".'<' . $key . $xmlAttrs . '>'."\n";
                            } else {
                                $this->atomXML .= '<' . $key . $xmlAttrs . '>'."\n";
                            }
                        } else {
                            $this->atomXML .= $fourSpace.'<' . $key . $xmlAttrs . '>';
                        }
                        
                        if (is_array($value['body'])) {
                            $this->atomXML .= $this->build($value['body']);
                        } else {
                            $this->atomXML .= $value['body'];
                        }
                        if ($key == 'feed') {
                            $endKey = '';
                        } else {
                            $endKey = '</'.$key . '>' . "\n";
                        }
                        $this->atomXML .= $endKey;
                    }
                }
            }
        }
    }

    public function entry($elements)
    {
        $entrys = array();
        foreach ($elements as $value) {
            $this->build($value['body']);
        }
    }
    
    public function display($return = false)
    {
        $xmlns = $this->xmlStart . "\n";
        $feedEnd = '</feed>';
        if ($return) {
            $xmlns .= $this->atomXML.$feedEnd;
            return $xmlns;
        }
        header("Content-Type: application/atom+xml");
        echo $xmlns;
        echo $this->atomXML.$feedEnd;
        exit;
    }
    
    public function date($date)
    {
        return date(DATE_ATOM, strtotime($date));
    }

}
