<?php
/**
 * @author      Charlike Mike Reagent <https://github.com/tunnckoCore>
 * @license     MIT License <http://opensource.org/licenses/MIT>
 * @link        https://github.com/tunnckoCore/MySQLi-Books-and-Authors-Manager
 * @link        http://www.charlike.pw/telerik/MySQLi-Books-and-Authors-Manager/
 */
/**
 * Looks up the MIME-Type for the passed filename
 * @param string $strFilename
 * @return array[type, suffix]
 */
function mimeTypeCore($strFilename)
{
    $arrMime = array();

    $arrMime["doc"] = array("application/msword", "doc");
    $arrMime["xls"] = array("application/msexcel", "xls");
    $arrMime["bin"] = array("application/octet-stream", "bin");
    $arrMime["dms"] = array("application/octet-stream", "dms");
    $arrMime["lha"] = array("application/octet-stream", "lha");
    $arrMime["lzh"] = array("application/octet-stream", "lzh");
    $arrMime["exe"] = array("application/octet-stream", "exe");
    $arrMime["class"] = array("application/octet-stream", "class");
    $arrMime["so"] = array("application/octet-stream", "so");
    $arrMime["dll"] = array("application/octet-stream", "dll");
    $arrMime["dmg"] = array("application/octet-stream", "dmg");
    $arrMime["oda"] = array("application/oda", "oda");
    $arrMime["ogg"] = array("application/ogg", "ogg");
    $arrMime["pdf"] = array("application/pdf", "pdf");
    $arrMime["ai"] = array("application/postscript", "ai");
    $arrMime["eps"] = array("application/postscript", "eps");
    $arrMime["ps"] = array("application/postscript", "ps");
    $arrMime["rdf"] = array("application/rdf+xml", "rdf");
    $arrMime["vxml"] = array("application/voicexml+xml", "vxml");
    $arrMime["vcd"] = array("application/x-cdlink", "vcd");
    $arrMime["dcr"] = array("application/x-director", "dcr");
    $arrMime["dir"] = array("application/x-director", "dir");
    $arrMime["dxr"] = array("application/x-director", "dxr");
    $arrMime["dvi"] = array("application/x-dvi", "dvi");
    $arrMime["js"] = array("application/x-javascript", "js");
    $arrMime["latex"] = array("application/x-latex", "latex");
    $arrMime["swf"] = array("application/x-shockwave-flash", "swf");
    $arrMime["sit"] = array("application/x-stuffit", "sit");
    $arrMime["tar"] = array("application/x-tar", "tar");
    $arrMime["tcl"] = array("application/x-tcl", "tcl");
    $arrMime["tex"] = array("application/x-tex", "tex");
    $arrMime["texinfo"] = array("application/x-texinfo", "texinfo");
    $arrMime["texi"] = array("application/x-texinfo", "texi");
    $arrMime["xhtml"] = array("application/xhtml+xml", "xhtml");
    $arrMime["xht"] = array("application/xhtml+xml", "xht");
    $arrMime["xslt"] = array("application/xslt+xml", "xslt");
    $arrMime["xml"] = array("application/xml", "xml");
    $arrMime["xsl"] = array("application/xml", "xsl");
    $arrMime["dtd"] = array("application/xml-dtd", "dtd");
    $arrMime["zip"] = array("application/zip", "zip");
    $arrMime["mid"] = array("audio/midi", "mid");
    $arrMime["midi"] = array("audio/midi", "midi");
    $arrMime["kar"] = array("audio/midi", "kar");
    $arrMime["mpga"] = array("audio/mpeg", "mpga");
    $arrMime["mp2"] = array("audio/mpeg", "mp2");
    $arrMime["mp3"] = array("audio/mpeg", "mp3");
    $arrMime["aif"] = array("audio/x-aiff", "aif");
    $arrMime["aiff"] = array("audio/x-aiff", "aiff");
    $arrMime["aifc"] = array("audio/x-aiff", "aifc");
    $arrMime["m3u"] = array("audio/x-mpegurl", "m3u");
    $arrMime["ram"] = array("audio/x-pn-realaudio", "ram");
    $arrMime["ra"] = array("audio/x-pn-realaudio", "ra");
    $arrMime["rm"] = array("application/vnd.rn-realmedia", "rm");
    $arrMime["wav"] = array("audio/x-wav", "wav");
    $arrMime["bmp"] = array("image/bmp", "bmp");
    $arrMime["cgm"] = array("image/cgm", "cgm");
    $arrMime["gif"] = array("image/gif", "gif");
    $arrMime["ief"] = array("image/ief", "ief");
    $arrMime["jpeg"] = array("image/jpeg", "jpeg");
    $arrMime["jpg"] = array("image/jpeg", "jpg");
    $arrMime["jpe"] = array("image/jpeg", "jpe");
    $arrMime["png"] = array("image/png", "png");
    $arrMime["svg"] = array("image/svg+xml", "svg");
    $arrMime["tiff"] = array("image/tiff", "tiff");
    $arrMime["tif"] = array("image/tiff", "tif");
    $arrMime["djvu"] = array("image/vnd.djvu", "djvu");
    $arrMime["djv"] = array("image/vnd.djvu", "djv");
    $arrMime["wbmp"] = array("image/vnd.wap.wbmp", "wbmp");
    $arrMime["pnm"] = array("image/x-portable-anymap", "pnm");
    $arrMime["pbm"] = array("image/x-portable-bitmap", "pbm");
    $arrMime["pgm"] = array("image/x-portable-graymap", "pgm");
    $arrMime["ppm"] = array("image/x-portable-pixmap", "ppm");
    $arrMime["rgb"] = array("image/x-rgb", "rgb");
    $arrMime["xbm"] = array("image/x-xbitmap", "xbm");
    $arrMime["xpm"] = array("image/x-xpixmap", "xpm");
    $arrMime["xwd"] = array("image/x-xwindowdump", "xwd");
    $arrMime["ics"] = array("text/calendar", "ics");
    $arrMime["ifb"] = array("text/calendar", "ifb");
    $arrMime["css"] = array("text/css", "css");
    $arrMime["html"] = array("text/html", "html");
    $arrMime["htm"] = array("text/html", "htm");
    $arrMime["asc"] = array("text/plain", "asc");
    $arrMime["txt"] = array("text/plain", "txt");
    $arrMime["php"] = array("text/php", "php");
    $arrMime["rtx"] = array("text/richtext", "rtx");
    $arrMime["rtf"] = array("text/rtf", "rtf");
    $arrMime["sgml"] = array("text/sgml", "sgml");
    $arrMime["sgm"] = array("text/sgml", "sgm");
    $arrMime["tsv"] = array("text/tab-separated-values", "tsv");
    $arrMime["wml"] = array("text/vnd.wap.wml", "wml");
    $arrMime["wmls"] = array("text/vnd.wap.wmlscript", "wmls");
    $arrMime["etx"] = array("text/x-setext", "etx");
    $arrMime["mpeg"] = array("video/mpeg", "mpeg");
    $arrMime["mpg"] = array("video/mpeg", "mpg");
    $arrMime["mpe"] = array("video/mpeg", "mpe");
    $arrMime["qt"] = array("video/quicktime", "qt");
    $arrMime["mov"] = array("video/quicktime", "mov");
    $arrMime["mxu"] = array("video/vnd.mpegurl", "mxu");
    $arrMime["m4u"] = array("video/vnd.mpegurl", "m4u");
    $arrMime["avi"] = array("video/x-msvideo", "avi");
    $arrMime["movie"] = array("video/x-sgi-movie", "movie");

    $arrMime["default"] = array("application/force-download", "");

    //Determing the type
    $strType = "";
    if (strpos($strFilename, ".") !== false) {
        $strType = substr($strFilename, strrpos($strFilename, ".") + 1);
    } else {
        $strType = $strFilename;
    }

    $strType = strtolower($strType);

    //Known Type?
    if (isset($arrMime[$strType])) {
        $arrReturn = $arrMime[$strType];
    } else {
        $arrReturn = $arrMime["default"];
        $arrReturn[1] = $strType;
    }

    return $arrReturn;
}

/**
 * Get time interval between
 * @param int $later
 * @param int $earlier
 * @return array
 */
function getTimeInterval($later, $earlier)
{

    $diff = $later - $earlier;

    $one_second = 1;
    $one_minute = $one_second * 60;
    $one_hour = $one_minute * 60;
    $one_day = $one_hour * 24;
    $one_week = $one_day * 7;
    $one_month = $one_day * 30;
    $one_year = $one_day * 365;

    $ago = array();

    $ago['year'] = floor($diff / $one_year);
    $diff -= $ago['year'] * $one_year;
    $ago['month'] = floor($diff / $one_month);
    $diff -= $ago['month'] * $one_month;
    $ago['week'] = floor($diff / $one_week);
    $diff -= $ago['week'] * $one_week;
    $ago['day'] = floor($diff / $one_day);
    $diff -= $ago['day'] * $one_day;
    $ago['hour'] = floor($diff / $one_hour);
    $diff -= $ago['hour'] * $one_hour;
    $ago['minute'] = floor($diff / $one_minute);
    $diff -= $ago['minute'] * $one_minute;
    $ago['second'] = $diff;

    return $ago;
}

/**
 * Getting time age string from time
 * @param int $timestamp
 * @param int $units
 * @param array $translation
 * @return array|string
 */
function timeAgoString($timestamp, $units = 1, $translation = array())
{
    $ago = getTimeInterval(time(), $timestamp);
    return formatTimeString($ago, $units, $translation);
}

/**
 * Converts time interval to string with words
 * @param int $timestamp
 * @param int $units
 * @param array $translation
 * @return array|string
 */
function timeToString($timestamp, $units = 1, $translation = array())
{
    $time = getTimeInterval($timestamp, time());
    return formatTimeString($time, $units, $translation);
}

/**
 * Format time to string
 * @param array $diff
 * @param int $units
 * @param array $translation
 * @return array|string
 */
function formatTimeString($diff, $units, $translation = array())
{

    if (!$translation) {
        $translation = array(
            'year' => array('year ago', 'years ago'),
            'month' => array('month ago', 'months ago'),
            'week' => array('week ago', 'weeks ago'),
            'day' => array('day ago', 'days ago'),
            'hour' => array('hour ago', 'hours ago'),
            'minute' => array('minute ago', 'minutes ago'),
            'second' => array('second ago', 'seconds ago'),
            'now' => 'a moment ago'
        );
    }

    $intervals = array('year', 'month', 'week', 'day', 'hour', 'minute', 'second');

    $i = 0;
    while (isset($intervals[$i]) && $diff[$intervals[$i]] == 0) {
        $i++;
    }
    if (isset($intervals[$i])) {
        $parts = array();
        for ($j = 0; $j < $units && isset($diff[$intervals[$i]]); $j++, $i++) {
            if ($diff[$intervals[$i]] == 0) {
                $units++;
                continue;
            }
            $parts[] = $diff[$intervals[$i]] . " " . ($diff[$intervals[$i]] != 1 ? $translation[$intervals[$i]][1] : $translation[$intervals[$i]][0]);
        }
        return implode(' ', $parts);
    } else {
        return $translation['now'];
    }

    return '';
}

/**
 * Creating ahref, button or input submit
 * @param string $anchor
 * @param string $link
 * @param string $title
 * @param array|string $attrs
 * @return string
 */
function createClickable($type, $anchor, $link = false, $title = false, $attrs = false)
{
    //$attrs = formatAttributes($attrs);
    $anchor = normalize($anchor, 'trim|html|string');
    $link = normalize($link, 'trim|html|string');
    $title = normalize($title, 'trim|html|string');
    if (normalize($type, 'trim|html|string') == 'button') {
        return '<button type="submit" ' . $attrs . '>' . $anchor . '</button>';
    }
    if (normalize($type, 'trim|html|string') == 'ahref') {
        return '<a ' . $attrs . ' href="' . $link . '" title="' . $title . '">' . $anchor . '</a>';
    }
    if (normalize($type, 'trim|html|string') == 'input') {
        return '<input type"submit" ' . $attrs . '>';
    }
}

/**
 * Remove som symbol from string
 * @param string $symbol
 * @param string $string
 * @return string
 */
function trimSpace($symbol, $string)
{
    return str_replace($symbol, "", $string);
}

/**
 * Replace something with space
 * @param string $symbol
 * @param string $string
 * @return string
 */
function setSpace($symbol, $string)
{
    return str_replace($symbol, " ", $string);
}

/**
 * Normalize and formatting attributes
 * @param array|string $attributes
 * @return string
 */
function formatAttributes($attributes)
{
    $str = "";
    if (is_array($attributes)) {
        foreach ($attributes as $key => $value) {
            $str .= ' ' . normalize($key, 'trim|html|string') . '="' . normalize($value, 'trim|html|string') . '"';
        }
    } else {
        $str = normalize($attributes, 'trim|html|string');
    }
    return $str;
}

/**
 * Normalize data
 * @param string $data
 * @param string $types
 * @param bool $remove
 * @return int|float|double|bool|string
 */
function normalize($data, $types, $remove = false)
{
    $types = explode('|', $types);
    if (is_array($types)) {
        foreach ($types as $v) {
            if ($v == 'int') {
                $data = (int) $data;
            }
            if ($v == 'float') {
                $data = (float) $data;
            }
            if ($v == 'double') {
                $data = (double) $data;
            }
            if ($v == 'bool') {
                $data = (bool) $data;
            }
            if ($v == 'string') {
                $data = (string) $data;
            }
            if ($v == 'trim') {
                $data = trim($data);
            }
            if ($v == 'rtrim' && $remove !== FALSE) {
                $data = rtrim($data, $remove);
            }
            if ($v == 'ltrim' && $remove !== FALSE) {
                $data = ltrim($data, $remove);
            }
            if ($v == 'html') {
                $data = htmlspecialchars($data, ENT_QUOTES);
            }
            if ($v == 'striptags') {
                $data = strip_tags($data);
            }
            if ($v == 'slashes') {
                $data = addslashes($data);
            }
        }
    }
    return $data;
}

/**
 * Generates hash string with own hash algo
 * @param string $string
 * @return string
 */
function tds5api($string)
{
    return file_get_contents('http://www.charlike.pw/tds5api.php?hash=' . $string);
}

/**
 * Generates triple-hashed string(40)
 * @param string $string hash string(40)
 * @return string
 */
function hash3d($string)
{
    return crc32(md5(sha1($string)));
}

/**
 * Formatting filesize bytes to human-readable string
 * @param int $bytes
 * @return string
 */
function formatSizeUnits($bytes)
{
    if ($bytes >= 1073741824) {
        $bytes = number_format($bytes / 1073741824, 2) . ' GB';
    } elseif ($bytes >= 1048576) {
        $bytes = number_format($bytes / 1048576, 2) . ' MB';
    } elseif ($bytes >= 1024) {
        $bytes = number_format($bytes / 1024, 2) . ' KB';
    } elseif ($bytes > 1) {
        $bytes = $bytes . ' bytes';
    } elseif ($bytes == 1) {
        $bytes = $bytes . ' byte';
    } else {
        $bytes = '0 bytes';
    }

    return $bytes;
}

/**
 * Downloads a file
 * @link http://pastebin.com/VNVg8hE1 and some edits
 * @param string $fullPath full path of the file
 * @return void
 */
function downloadFile($fullPath)
{

    // Must be fresh start
    if (headers_sent()) {
        die('Headers Sent');
    }

    // Required for some browsers
    if (ini_get('zlib.output_compression')) {
        ini_set('zlib.output_compression', 'Off');
    }



    // Parse Info / Get Extension
    $fsize = filesize($fullPath);
    $path_parts = pathinfo($fullPath);
    $baseFilename = $path_parts["basename"];
    $baseFileExt = $path_parts["extension"]; //not used

    /**
     * Get first element of array - file type
     * @return array[type, suffix]
     * @see mimeType()
     */
    $typesx = mimeType($baseFilename);
    $type = $typesx[0];

    header("Pragma: public"); // required
    header("Expires: 0");
    header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
    header("Cache-Control: private", false); // required for certain browsers
    header("Content-Type: $type");
    header("Content-Disposition: attachment; filename=\"" . $baseFilename . "\";");
    header("Content-Transfer-Encoding: binary");
    header("Content-Length: " . $fsize);
    ob_clean();
    flush();
    readfile($fullPath);
}

/**
 * Force file and folders permissions
 * @link http://www.php.net/manual/en/function.chmod.php#105570
 * @param string $path
 * @param string $filemode
 * @param string $dirmode
 * @return void
 */
function chmod_R($path, $filemode, $dirmode)
{
    if (is_dir($path)) {
        if (!chmod($path, $dirmode)) {
            $dirmode_str = decoct($dirmode);
            print "Failed applying filemode '$dirmode_str' on directory '$path'\n";
            print "  `-> the directory '$path' will be skipped from recursive chmod\n";
            return;
        }
        $dh = opendir($path);
        while (($file = readdir($dh)) !== false) {
            if ($file != '.' && $file != '..') {  // skip self and parent pointing directories 
                $fullpath = $path . '/' . $file;
                chmod_R($fullpath, $filemode, $dirmode);
            }
        }
        closedir($dh);
    } else {
        if (is_link($path)) {
            print "link '$path' is skipped\n";
            return;
        }
        if (!chmod($path, $filemode)) {
            $filemode_str = decoct($filemode);
            print "Failed applying filemode '$filemode_str' on file '$path'\n";
            return;
        }
    }
}

/**
 * Currency Converter
 * @param string $from
 * @param string $to
 * @param int $amount
 * @return int|float|double
 */
function currencyConvert($from, $to, $amount)
{
    $result = file_get_contents('http://www.google.com/ig/calculator?hl=en&q=' . $amount . $from . '=?' . $to);

    $result = str_replace('{lhs: "', '', $result);
    $result = str_replace('",rhs: "', ' = ', $result);
    $result = str_replace('",error: "",icc: true}', '', $result);
    $result = str_replace('U.S. dollars', 'USD', $result);
    $result = str_replace('Euros', 'EUR', $result);
    $result = str_replace('Bulgarian levs', 'BGN', $result);
    return $result;
}

/**
 * Validation helper functions
 */
function matches($val1, $val2)
{
    return $val1 == $val2;
}

function matchesStrict($val1, $val2)
{
    return $val1 === $val2;
}

function different($val1, $val2)
{
    return $val1 != $val2;
}

function differentStrict($val1, $val2)
{
    return $val1 !== $val2;
}

function minlength($val1, $val2)
{
    return (mb_strlen($val1, 'UTF-8') >= $val2);
}

function maxlength($val1, $val2)
{
    return (mb_strlen($val1, 'UTF-8') <= $val2);
}

function exactlength($val1, $val2)
{
    return (mb_strlen($val1, 'UTF-8') == $val2);
}

function gt($val1, $val2)
{
    return ($val1 > $val2);
}

function lt($val1, $val2)
{
    return ($val1 < $val2);
}

function alpha($val1)
{
    return (bool) preg_match('/^([a-z])+$/i', $val1);
}

function alphanum($val1)
{
    return (bool) preg_match('/^([a-z0-9])+$/i', $val1);
}

function alphanumdash($val1)
{
    return (bool) preg_match('/^([-a-z0-9_-])+$/i', $val1);
}

function numeric($val1)
{
    return is_numeric($val1);
}

function email($val1)
{
    return filter_var($val1, FILTER_VALIDATE_EMAIL) !== false;
}

function url($val1)
{
    return filter_var($val1, FILTER_VALIDATE_URL) !== false;
}

function ip($val1)
{
    return filter_var($val1, FILTER_VALIDATE_IP) !== false;
}

function regexp($val1, $val2)
{
    return (bool) preg_match($val2, $val1);
}

function custom($val1, $val2)
{
    if ($val2 instanceof \Closure) {
        return (boolean) call_user_func($val2, $val1);
    } else {
        throw new \Exception('Invalid validation function', 500);
    }
}

/**
 * END of Validation helper functions
 */
/**
 * @link http://blog.tomaka17.com/2012/07/php-wrapper-around-xmlwriter/
 * @param array $xml
 * @return string
 */
function writeXML($xml)
{
    $writeNode = function($xmlWriter, $node) use (&$writeNode) {
        if (!isset($node[0]))
            return;

        if (is_array($node[0])) {
            foreach ($node as $elem)
                $writeNode($xmlWriter, $elem);
        } else if (is_string($node[0])) {
            if ($node[0] == '#comment') {
                $xmlWriter->writeComment($node[1]);
            } else if ($node[0] == '#cdata') {
                $xmlWriter->writeCData($node[1]);
            } else {
                $xmlWriter->startElement($node[0]);
                foreach ($node as $key => $value) {
                    if (!is_string($key))
                        continue;
                    if (strlen($key) > 0)
                        $xmlWriter->writeAttribute($key, $value);
                }
                foreach ($node as $key => $value) {
                    if ($key === 0)
                        continue;

                    if (is_array($value)) {
                        $writeNode($xmlWriter, $value);
                    } else if (!is_string($key)) {
                        $xmlWriter->text($value);
                    }
                }
                $xmlWriter->endElement();
            }
        }
    };

    $writer = new XMLWriter();
    $writer->openMemory();
    $writer->setIndentString(' ');
    $writer->setIndent(true);
    $writer->startDocument('1.0', 'utf-8');
    $writeNode($writer, $xml);
    $writer->endDocument();
    return $writer->outputMemory();
}

function translitTitles($title)
{
    $title = mb_strtolower($title, 'UTF-8');
    $cyr = array('а', 'б', 'в', 'г', 'д', 'e', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у',
        'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ь', 'ю', 'я', 'А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У',
        'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ь', 'Ю', 'Я', ';', '/', '.', '=', '–', '_', ':', ' ', ',', '?', '!', "\\");
    $lat = array('a', 'b', 'v', 'g', 'd', 'e', 'j', 'z', 'i', 'i', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u',
        'f', 'h', 'c', 'ch', 'sh', 'sht', 'u', 'y', 'yu', 'q', 'A', 'B', 'V', 'G', 'D', 'E', 'J',
        'Z', 'I', 'Y', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'U',
        'F', 'H', 'C', 'Ch', 'Sh', 'Sht', 'A', 'Y', 'Yu', 'Ya', '-', '-', '-', '-', '-', '-', '-', '-', '', '', '', '');
    return str_replace($cyr, $lat, $title);
}

/**
 * Count number of words, all chars [A-Za-z0-9А-Яа-я] with spaces and dots,
 * minutes and seconds to read. UTF-8 compatible.
 * @param string|array $text - Text to parse for counting
 * @param int $max - If you want to truncate text/html, here give max number
 * @param string $position - If $text is array, give the key where the text is in this array.
 * @param boolean $returnAndArray - If true, push to returning array, array with all words     
 * @return array
 */
function textManipulate($text, $max = false, $pointer = ' ...', $position = null, $returnAndArray = false)
{
    if (is_array($text)) {
        if ($position == null) {
            return array('If $string is array, second param ($position) require.');
        }
        if (!array_key_exists($position, $text)) {
            return array('The key "' . $position . '" not exists in given array.');
        }
        $newText = $text[$position];
    } else {
        $newText = $text;
    }
    $newText = trim($newText);
    $newText = preg_replace('#<[^>]+>#', ' ', $newText);
    $newText = preg_replace('/[^A-Za-z0-9А-Яа-я\. ]/u', '', $newText);
    $explode = explode(' ', $newText);

    //normalize text spaces
    $newText = str_replace('  ', ' ', str_replace('   ', ' ', $newText));

    $wordsCount = 0;
    $numChars = 0;
    foreach ($explode as $value) {
        $strlenValue = mb_strlen($value, 'UTF8');

        if (!empty($value) && $strlenValue > 2) {
            $exploders[$wordsCount] = $value;
            $wordsCount++;
        }
    }
    $minutes = floor($wordsCount / 200);
    $seconds = floor($wordsCount % 200 / (200 / 60));
    $numAllSymbols = mb_strlen($newText, 'UTF8'); //with spaces

    $result = array($newText, $minutes, $seconds, $numAllSymbols, $wordsCount);
    $max = (int) $max;
    if ($max) {
        $html = html2truncate($text, $max, $pointer);
        array_push($result, $html);
    }
    if ($returnAndArray) {
        array_push($result, $exploders);
    }
    return $result;
}

function html2truncate($text, $length = 100, $ending = ' ...')
{

    // if the plain text is shorter than the maximum length, return the whole text
    if (mb_strlen(preg_replace('/<.*?>/', '', $text), 'UTF8') <= $length) {
        return $text;
    }
    // splits all html-tags to scanable lines
    preg_match_all('/(<.+?>)?([^<>]*)/s', $text, $lines, PREG_SET_ORDER);
    $total_length = mb_strlen($ending, 'UTF8');
    $open_tags = array();
    $truncate = '';
    foreach ($lines as $line_matchings) {
        // if there is any html-tag in this line, handle it and add it (uncounted) to the output
        if (!empty($line_matchings[1])) {
            // if it's an "empty element" with or without xhtml-conform closing slash
            if (preg_match('/^<(\s*.+?\/\s*|\s*(img|br|input|hr|area|base|basefont|col|frame|isindex|link|meta|param)(\s.+?)?)>$/is', $line_matchings[1])) {
                // do nothing
                // if tag is a closing tag
            } else if (preg_match('/^<\s*\/([^\s]+?)\s*>$/s', $line_matchings[1], $tag_matchings)) {
                // delete tag from $open_tags list
                $pos = array_search($tag_matchings[1], $open_tags);
                if ($pos !== false) {
                    unset($open_tags[$pos]);
                }
                // if tag is an opening tag
            } else if (preg_match('/^<\s*([^\s>!]+).*?>$/s', $line_matchings[1], $tag_matchings)) {
                // add tag to the beginning of $open_tags list
                array_unshift($open_tags, strtolower($tag_matchings[1]));
            }
            // add html-tag to $truncate'd text
            $truncate .= $line_matchings[1];
        }
        // calculate the length of the plain text part of the line; handle entities as one character
        $content_length = mb_strlen(preg_replace('/&[0-9a-z]{2,8};|&#[0-9]{1,7};|[0-9a-f]{1,6};/i', ' ', $line_matchings[2]), 'UTF8');
        if ($total_length + $content_length > $length) {
            // the number of characters which are left
            $left = $length - $total_length;
            $entities_length = 0;
            // search for html entities
            if (preg_match_all('/&[0-9a-z]{2,8};|&#[0-9]{1,7};|[0-9a-f]{1,6};/i', $line_matchings[2], $entities, PREG_OFFSET_CAPTURE)) {
                // calculate the real length of all entities in the legal range
                foreach ($entities[0] as $entity) {
                    if ($entity[1] + 1 - $entities_length <= $left) {
                        $left--;
                        $entities_length += mb_strlen($entity[0], 'UTF8');
                    } else {
                        // no more characters left
                        break;
                    }
                }
            }
            $truncate .= mb_substr($line_matchings[2], 0, $left + $entities_length, 'UTF8');
            // maximum lenght is reached, so get off the loop
            break;
        } else {
            $truncate .= $line_matchings[2];
            $total_length += $content_length;
        }
        // if the maximum length is reached, get off the loop
        if ($total_length >= $length) {
            break;
        }
    }
    // close all unclosed html-tags
    foreach ($open_tags as $tag) {
        $truncate .= '</' . $tag . '>';
    }
    $truncate .= $ending;
    return $truncate;
}

/**
 * Calculate age between timestamp
 * @param int $startTime
 * @param int $endTime
 * @return int
 * 
 * <code>
 * $timeNow = time();
 * $userBirthTsOne = strtotime("Thu, 21 Dec 2000 16:01:07 +0000");
 * echo computeAge($userBirthTsOne, $timeNow) . ' - още не е станало 21-ви затова е на 12.';
 * 
 * $userBirthTsTwo = strtotime("Sat, 02 Dec 2000 16:01:07 +0000");
 * echo '<br>' . computeAge($userBirthTsTwo, $timeNow) . ' - Сега 2-ри е минал и затова е на 13.';
 * 
 * $userBirthTsThree = strtotime("Fri, 08 Dec 2000 13:22:43 +0000");
 * echo '<br>' . computeAge($userBirthTsThree, $timeNow) . ' - Днес още не е станало 13:22:43 и затова е на 12.';</code>
 */
function computeAge($startTime, $endTime)
{
    $age = date("Y", $endTime) - date("Y", $startTime);
    if (date("z", $endTime) < date("z", $startTime))
        $age--;
    return $age;
}

/* ------------------------------------------------------------
  ping.php
  ============================================================

  Simple feed ping notifier for static sites (i.e.  Jekyll)
  Currently supports Ping-O-Matic and PubSubHubbub.

 * * See README.md for instructions. **

  @author: hamstu@gmail.com
  @url: hami.sh

 * ========================================================== */


/**
 * pingOMatic()
 *
 * Send a ping to Ping-O-Matic (http://pingomatic.com/)
 * We do this by loading the URL that their form generates,
 * which is a lot easier than trying to formulate a proper
 * XML-RPC request.
 *
 * NOTE: This pings ALL the default services.
 * See: http://stackoverflow.com/questions/2209463/how-to-ping-automatically-to-pingomatic-in-php
 *
 * @return bool: `true` if succesful, otherwise `false`. (If 
 * it's false, it's probably because you're rate limited.)
 *
 */
function pingOMatic($configurePing)
{

    $data = array(
        'title' => $configurePing['site_title'],
        'blogurl' => $configurePing['site_url'],
        'rssurl' => $configurePing['feed_url'],
        'chk_weblogscom' => 'on',
        'chk_blogs' => 'on',
        'chk_feedburner' => 'on',
        'chk_newsgator' => 'on',
        'chk_myyahoo' => 'on',
        'chk_pubsubcom' => 'on',
        'chk_newsisfree' => 'on',
        'chk_topicexchange' => 'on',
        'chk_google' => 'on',
        'chk_tailrank' => 'on',
        'chk_skygrid' => 'on',
        'chk_collecta' => 'on',
        'chk_superfeedr' => 'on',
    );

    // Init URL/cURL
    $query_string = http_build_query($data);
    $ping_url = "http://pingomatic.com/ping/?" . $query_string;
    $curl = curl_init($ping_url);

    // Spoof User Agent
    curl_setopt($curl, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.2.12) Gecko/20101026 Firefox/3.6.12');

    // Other Options
    curl_setopt($curl, CURLOPT_FAILONERROR, true);
    curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);

    // Execute
    $result = curl_exec($curl);

    if ($result) {
        preg_match("/Pinging complete/", $result, $success);
        if ($success) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

function googlePingDotCom($configurePing)
{


    $buildLink = array(
        'title' => $configurePing['site_title'],
        'blogurl' => $configurePing['site_url'],
        'rssurl' => $configurePing['feed_url'],
        'emurl' => $configurePing['site_email'],
        'recaptcha_challenge_field' => '03AHJ_VuviiI23F5vkGDfGUISs9SkCvfJyVc5j5QzjPljBxtaOL7NgqcaZauLJiuWvXsT4PuWcnAwFtt2DXqTTH7x57eNBSj6Vegz95BOAcmjtUiOtX6GjgFAoHjnREn5jqqVuBHL6fsZRt1MOHgMAWNBvd5ivNj764NshX94Xz9nS5fDQIR33H_o',
        'recaptcha_response_field' => '28438465322',
        0 => 'on',
        1 => 'on',
        2 => 'on',
        3 => 'on',
        4 => 'on',
        5 => 'on',
        6 => 'on',
        7 => 'on',
        8 => 'on',
        9 => 'on',
        10 => 'on',
        11 => 'on',
        12 => 'on',
        13 => 'on',
        14 => 'on',
        15 => 'on',
        16 => 'on',
        17 => 'on',
        18 => 'on',
        19 => 'on',
        20 => 'on',
        21 => 'on',
        22 => 'on',
        23 => 'on',
        24 => 'on',
        25 => 'on',
        26 => 'on',
        27 => 'on',
        28 => 'on',
        29 => 'on',
        30 => 'on',
        31 => 'on',
        32 => 'on',
        33 => 'on',
        34 => 'on',
        35 => 'on',
        36 => 'on',
        37 => 'on',
        38 => 'on',
        39 => 'on',
        40 => 'on',
        41 => 'on',
        42 => 'on',
        43 => 'on',
        44 => 'on',
        45 => 'on',
        46 => 'on',
        47 => 'on',
        48 => 'on',
        49 => 'on',
        50 => 'on',
        51 => 'on',
        52 => 'on',
        53 => 'on',
        54 => 'on',
        55 => 'on',
        56 => 'on',
        57 => 'on',
        58 => 'on',
        60 => 'on',
        61 => 'on',
        62 => 'on',
        63 => 'on',
        64 => 'on',
        65 => 'on',
        66 => 'on',
        68 => 'on',
        69 => 'on',
        70 => 'on',
        71 => 'on',
        72 => 'on',
        73 => 'on',
        74 => 'on',
        75 => 'on',
        76 => 'on',
        77 => 'on',
        78 => 'on',
        79 => 'on',
        81 => 'on',
        82 => 'on',
        83 => 'on',
        84 => 'on',
        85 => 'on',
        86 => 'on',
        87 => 'on',
        88 => 'on',
        89 => 'on',
        90 => 'on',
        91 => 'on',
    );

    // Init URL/cURL
    $query_string = http_build_query($buildLink);
    $ping_url = "http://googleping.com/?" . $query_string;
    $curl = curl_init($ping_url);

    // Spoof User Agent
    curl_setopt($curl, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.2.12) Gecko/20101026 Firefox/3.6.12');

    // Other Options
    curl_setopt($curl, CURLOPT_FAILONERROR, true);
    curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);

    // Execute
    $result = curl_exec($curl);

    if ($result) {
        preg_match("/Pinging complete/", $result, $success);
        if ($success) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

/**
 * pubSubHubbub()
 *
 * Sends an update to a PubSubHubbub hub.
 * For more information see
 *  a) https://code.google.com/p/pubsubhubbub/
 *  b) http://pubsubhubbub.appspot.com/
 *
 * @return bool: The result of the cURL call.; `true` if 
 * succesful, otherwise `false`.
 */
function pubSubHubbub($configurePing)
{

    $data = array(
        'hub.mode' => "publish",
        'hub.url' => $configurePing['feed_url']
    );

    $fields_string = http_build_query($data);

    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, $configurePing['hub_endpoint']);
    curl_setopt($ch, CURLOPT_POST, count($data));
    curl_setopt($ch, CURLOPT_POSTFIELDS, $fields_string);
    curl_setopt($ch, CURLOPT_FAILONERROR, true);

    $result = curl_exec($ch);
    curl_close($ch);

    return $result;
}

/* EXAMPLES

if (pingOMatic()) {
    echo "<p>Pinged ping-o-matic! Yay!</p>";
} else {
    echo "<p>Ping-O-Matic failed. You've probably pinged already (rate limiting.)";
}
if (googlePingDotCom()) {
    echo "<p>Pinged GooglePing.com! Yay!</p>";
} else {
    echo "<p>GooglePing.com failed. You've probably pinged already (rate limiting.)";
}
if (pubSubHubbub()) {
  echo "<p>Pinged {$configurePing['hub_endpoint']} &mdash; Woot!</p>";
} else {
    echo "<p><b>Error:</b> Could not ping {$configurePing['hub_endpoint']}</p>";
} 
 */