<?php
/**
 * @author      George Yanev (http://github.com/tunnckoCore)
 *
 * @license     MIT License (http://opensource.org/licenses/MIT)
 * @copyright   2013, WAF Development
 */
require '../../atmos/config.php';
echo APP_NAME.'<hr>';

if (isset($_GET['oldUri']) && filter_var($_GET['oldUri'], FILTER_VALIDATE_URL)) {
    if (isset($_GET['atomFile'])) {
        $atomFile = $_GET['atomFile'];
    } else {
        $atomFile = APP_FEED;
    }

    $realFile = realpath(APP_PUBLIC . $atomFile);
    if ($realFile) {
        $atomFeed = file_get_contents($realFile);
    }
    $atomReplace = (string) str_replace($_GET['oldUri'], APP_URI, $atomFeed);
    $finish = file_put_contents($realFile, $atomReplace);
    if ($finish) {
        echo file_get_contents($realFile);
    }
}

