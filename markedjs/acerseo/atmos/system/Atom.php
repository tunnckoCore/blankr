<?php
/*
 *    author:           Kyle Gadd
 *    documentation:    http://www.php-ease.com/classes/atom-feed.html
 *
 *    This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation, either version 3 of the License, or
 *    (at your option) any later version.
 *
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *    You should have received a copy of the GNU General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

class Atom
{
    public $encoding = 'utf-8';
    private $feed = array();
    private $entries = array();
    private $links = array();

    public function __construct($title, $id, $updated, $links, $custom)
    {
        $this->feed['title'] = $title;
        $this->feed['id'] = $id;
        $this->feed['updated'] = $updated;
        foreach ($custom as $key => $value) {
            $this->feed[$key] = $value;
        }
        foreach ($links as $key => $value) {
            $this->links[$key] = $value;
        }
    }

    public function feed($elements)
    {
        foreach ($elements as $key => $value) {
            $this->feed[$key] = $value;
        }
    }

    public function entry($elements, $title=false, $id=false, $updated=false)
    {
        $entries = array();
        foreach ($elements as $key => $value) {
            $entries[$key] = $value;
        }
        $this->entries[] = $entries;
    }

    public function display($return = false)
    {
        $xml = '<?xml version="1.0" encoding="' . $this->encoding . '"?>' . "\n";
        $xml .= '<feed xmlns="http://www.w3.org/2005/Atom"' . "\n"
                . '      xmlns:foaf="http://xmlns.com/foaf/0.1"' . "\n";
        foreach ($this->feed as $key => $value) {
            $xml .= '  ' . $this->tag($key, $value) . "\n";
        }
        foreach ($this->links as $key => $value) {
            $xml .=  '  <' . $value . ' />'."\n";
        }
        foreach ($this->entries as $entry) {
            $xml .= "  <entry>\n";
            foreach ($entry as $key => $value) {
                $xml .= '    ' . $this->tag($key, $value) . "\n";
            }
            $xml .= "  </entry>\n";
        }
        $xml .= '</feed>';
        if ($return) {
            return $xml;
        }
        header("Content-Type: application/atom+xml");
        echo $xml;
        exit;
    }

    private function tag($key, $values)
    {
        $tag = '';
        list($value, $attributes) = $this->values($values);
        if (in_array($key, array('updated', 'published'))) {
            $value = $this->date($value);
        }
        if ($key == 'author' || $key == 'contributor') {
            $tag .= '<' . $key . '>'."\n";
            //$tag .= '    <name>'.$values['name'] . '</name>'."\n"; // either the feed, or all of the entries mush have an author element
            
            foreach ($values as $kk => $vv) {
                if (stripos($kk, 'link rel="alternate"') !== false) {
                    $tag .= '    <'.$kk.' '.$vv.'/>'."\n";
                } else {
                    $tag .= '    <'.$kk.'>'.$vv.'</'.$kk.'>'."\n";
                }
            }
            $tag .= '  </' . $key . '>';
        } elseif ($key == 'category') {
            $tag .= '<' . $key . ' term="';
            $tag .= (isset($values['term'])) ? $values['term'] : $value;
            $tag .= '"';
            if (isset($values['scheme'])) {
                $tag .= ' scheme="' . $values['scheme'] . '"';
            }
            if (isset($values['label'])) {
                $tag .= ' label="' . $values['label'] . '"';
            }
            $tag .= ' />';
        } elseif ($key == 'source') {
            $tag .= '<' . $key . '>';
            $tag .= '<id>' . $values['id'] . '</id>';
            $tag .= '<title>' . $values['email'] . '</title>';
            $tag .= '<updated>' . $values['uri'] . '</updated>';
            $tag .= '<rights>' . $values['rights'] . '</rights>';
            $tag .= '</' . $key . '>';
        } else {
            //if (!empty($value)) {
                $tag .= '<' . $key . $attributes . '>' . $value . '</' . $key . '>';
            //} else {
            //    $tag .= '<' . $key . $attributes . ' />';
            //}
        }
        return $tag;
    }

    private function values($array)
    {
        if (!is_array($array)) {
            return array($array, '');
        }
        $value = (isset($array['value'])) ? $array['value'] : '';
        unset($array['value']);
        $attributes = '';
        foreach ($array as $k => $v) {
            $attributes .= " {$k}=\"" . addslashes($v) . '"';
        }
        return array($value, $attributes);
    }

    private function date($date)
    {
        return date(DATE_ATOM, strtotime($date));
    }

}
