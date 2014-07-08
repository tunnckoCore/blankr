<?php
/**
 * @author      George Yanev (http://github.com/tunnckoCore)
 * 
 * @license     MIT License (http://opensource.org/licenses/MIT)
 * @copyright   2013, WAF Development
 */


function requestUri() {
    //apache 2.4+ BUG !!
    //$uri = str_replace($_SERVER['SCRIPT_NAME'], '', $_SERVER['REQUEST_URI']);
    
    $uri = trim($_GET['uri'], '/');
    return explode("/", $uri);
}
/**
 * Check isset and counting results in array
 * @param array $method - $_POST, $_GET, $_SESSION or etc.
 * @param int $num number of parameters
 * @return boolean true|false
 */
function issetMethod($method, $num = false)
{
    if (is_array($method) && $num && $num >= 1) {
        if (isset($method) && count($method) == $num) {
            return true;
        }
    }
    if (!$num) {
        if (isset($method)) {
            return true;
        }
    }
    return false;
}
function array2xml($array, $xml = false){
    if($xml === false){
        $xml = new SimpleXMLElement('<root/>');
    }
    foreach($array as $key => $value){
        if(is_array($value)){
            array2xml($value, $xml->addChild($key));
        }else{
            $xml->addChild($key, $value);
        }
    }
    return $xml->asXML();
}
/**
 * Redirect to root Uri if $relative not passed, else to full uri + $relative
 * @param string|null $relative (optional) Relative path to redirect to
 */
function redirect($relative, $isRemote = false)
{
    if ($isRemote) {
        header("Location: " . $relative);
        exit;
    } else {
        header("Location: " . siteUrl() . $relative);
        exit;
    }
}
function siteUrl() {
    $https = empty($_SERVER["HTTPS"]) ? '' : ($_SERVER["HTTPS"] == "on") ? "s" : "";
    $serverName = 'http' . $https . '://' . $_SERVER['SERVER_NAME'];
    $directory = str_replace($_SERVER['PHP_SELF'], '', $_SERVER['REQUEST_URI']);
    return $serverName . $directory;
}
/**
 * Shortcut to response redirects
 * @param string $text
 * @param string $action
 * @param string $response
 * @return void
 */
function sendProcessResponse($text, $action = 'signin', $response = 'error', $custom = 'page=add')
{
    //@since: Library „Re-fact-o-ring“
    if ($custom) {
        $custom = '&' . $custom;
    }
    redirect(APP_URI . 'index.php?action=' . $action
            . '&response=' . $response
            . '&msg=' . urlencode($text) . $custom, true);
}

/**
 * Rendering default layout structure
 * @param string $template Required. Template to render
 * @param array $templateData (otional) - template data array - ex. templateData['title']
 * @param boolean $single (optional) true - single preview of template. false - with header and footer
 * @param boolean $return (optional) true - return as string, false - echo to browser
 * @return string
 */
function display($template, $single = false, $templateData = false, $return = false)
{
    if (!$template) {
        exit(__FUNCTION__ . ' - first argument is required.');
    }
    // Here we have template 100%;
    ob_start();
    if (!$single) {
        require_once APP_VIEWS . 'header' . APP_EXT;
        require APP_VIEWS . strtolower($template);
        require_once APP_VIEWS . 'footer' . APP_EXT;
    } else {
        require APP_VIEWS . strtolower($template);
    }
    $content = ob_get_clean();

    // Template for email or ... ?
    if ($return) {
        return normalize($content, 'trim|string');
    }
    echo normalize($content, 'trim|string');
}

function runPage($page, $global = false)
{
    if (!$page) {
        exit(__FUNCTION__ . ' - first argument is required.');
    }

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        global $_POST;
        $_MASTER_POST = array();
        $_MASTER_POST = $_POST;
    }

    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        global $_GET;
        $_MASTER_GET = array();
        $_MASTER_GET = $_GET;
    }


    $pageModel = APP_MODELS . ucfirst($page) . 'Model' . APP_EXT;
    $pageController = APP_PAGES . strtolower($page) . APP_EXT;

    $realModel = realpath($pageModel);
    $realController = realpath($pageController);

    if ($realModel && $realController) {
        require_once $realModel;
        require_once $realController;
    } else {
        exit(__FUNCTION__ . ' - <b>' . $page . '</b> page / controller / model / file / directory not exist');
    }
}

/**
 * Functional Singleton - connection to server
 * @return object - if connected return existing, else create connection
 */
function dbInit()
{
    if ($GLOBALS['DB_INIT']) {
        return $GLOBALS['DB_INIT'];
    }
    $GLOBALS['DB_INIT'] = mysqli_connect(APP_DB_HOST, APP_DB_USER, APP_DB_PASS, APP_DB_NAME, APP_DB_PORT);
    mysqli_set_charset($GLOBALS['DB_INIT'], 'utf8');

    return $GLOBALS['DB_INIT'];
}

function ownUrlEncode($string)
{
    $entities = array('%21', '%2A', '%27', '%28', '%29', '%3B', '%3A', '%40', '%26', '%3D', '%2B', '%24', '%2C', '%2F', '%3F', '%25', '%23', '%5B', '%5D');
    $replacements = array('!', '*', "'", "(", ")", ";", ":", "@", "&", "=", "+", "$", ",", "/", "?", "%", "#", "[", "]");
    return str_replace($entities, $replacements, urlencode($string));
}
function htmlwrap(&$str, $maxLength, $char=' ...'){
    $count = 0;
    $newStr = '';
    $openTag = false;
    $lenstr = strlen($str);
    for($i=0; $i<$lenstr; $i++){
        $newStr .= $str{$i};
        if($str{$i} == '<'){
            $openTag = true;
            continue;
        }
        if(($openTag) && ($str{$i} == '>')){
            $openTag = false;
            continue;
        }
        if(!$openTag){
            if($str{$i} == ' '){
                if ($count == 0) {
                    $newStr = substr($newStr,0, -1);
                    continue;
                } else {
                    $lastspace = $count + 1;
                }
            }
            $count++;
            if($count==$maxLength){
                $newStr .= ' ... '.$char;
                break;
//                if ($str{$i+1} != ' ' && $lastspace && ($lastspace < $count)) {
//                    $tmp = ($count - $lastspace)* -1;
//                    $newStr = substr($newStr,0, $tmp) . $char . substr($newStr,$tmp);
//                    $count = $tmp * -1;
//                } else {
//                    $newStr .= ' ... '.$char;
//                    $count = 0;
//                }
//                $lastspace = 0;
//                break;
            }
        }
    }
    return $newStr;
}

function simpleCut($string, $maxLen)
{
    if (mb_strlen($string, 'UTF-8') > $maxLen) {

        // truncate string
        $stringCut = mb_substr($string, 0, $maxLen, 'UTF-8');

        // make sure it ends in a word so assassinate doesn't become ass...
        $string = substr($stringCut, 0, strrpos($stringCut, ' ')) . ' ...';
        //$string = $stringCut . '...';
    }
    return $string;
}

function mimeType($filename)
{

    $mimeTypes = array(
        'txt' => 'text/plain',
        'htm' => 'text/html',
        'html' => 'text/html',
        'php' => 'text/html',
        'css' => 'text/css',
        'js' => 'application/javascript',
        'json' => 'application/json',
        'xml' => 'application/xml',
        'swf' => 'application/x-shockwave-flash',
        'flv' => 'video/x-flv',
        // images
        'png' => 'image/png',
        'jpe' => 'image/jpeg',
        'jpeg' => 'image/jpeg',
        'jpg' => 'image/jpeg',
        'gif' => 'image/gif',
        'bmp' => 'image/bmp',
        'ico' => 'image/vnd.microsoft.icon',
        'tiff' => 'image/tiff',
        'tif' => 'image/tiff',
        'svg' => 'image/svg+xml',
        'svgz' => 'image/svg+xml',
        // archives
        'zip' => 'application/zip',
        'rar' => 'application/x-rar-compressed',
        'exe' => 'application/x-msdownload',
        'msi' => 'application/x-msdownload',
        'cab' => 'application/vnd.ms-cab-compressed',
        // audio/video
        'mp3' => 'audio/mpeg',
        'qt' => 'video/quicktime',
        'mov' => 'video/quicktime',
        // adobe
        'pdf' => 'application/pdf',
        'psd' => 'image/vnd.adobe.photoshop',
        'ai' => 'application/postscript',
        'eps' => 'application/postscript',
        'ps' => 'application/postscript',
        // ms office
        'doc' => 'application/msword',
        'rtf' => 'application/rtf',
        'xls' => 'application/vnd.ms-excel',
        'ppt' => 'application/vnd.ms-powerpoint',
        // open office
        'odt' => 'application/vnd.oasis.opendocument.text',
        'ods' => 'application/vnd.oasis.opendocument.spreadsheet',
    );

    $ext = strtolower(array_pop(explode('.', $filename)));
    if (function_exists('finfo_open')) { // (PHP >= 5.3.0, PECL fileinfo >= 0.1.0)
        $finfo = finfo_open(FILEINFO_MIME);
        $mimetype = finfo_file($finfo, $filename);
        finfo_close($finfo);
        return $mimetype;
    } elseif (array_key_exists($ext, $mimeTypes)) { // по разширението
        return $mimeTypes[$ext];
    } else {    // ако нищо не помогне питаме shell-а
        if (strstr($_SERVER['HTTP_USER_AGENT'], "Windows")) { // Windows не става за нищо
            return ''; //
        }
        if (strstr($_SERVER['HTTP_USER_AGENT'], "Macintosh")) { // Mac OS
            $m = trim(exec('file -b --mime ' . escapeshellarg($filename)));
        } else {    // повечето Unix системи
            $m = trim(exec('file -bi ' . escapeshellarg($filename)));
        }
    }
    return '';
}
