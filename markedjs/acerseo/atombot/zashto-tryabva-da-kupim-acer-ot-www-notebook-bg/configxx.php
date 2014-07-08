<?php
/**
 * @author      George Yanev (http://github.com/tunnckoCore)
 * 
 * @license     MIT License (http://opensource.org/licenses/MIT)
 * @copyright   2013, WAF Development
 */
ini_set('display_errors', true);
error_reporting(true);
date_default_timezone_set('Europe/London'); //all is set to +2 hours / +7200 secs
mb_internal_encoding("UTF-8");
mb_http_output("UTF-8");
/**
 * Define project constants
 */
define('DS', DIRECTORY_SEPARATOR);
define('APP_EXT', '.php');
define('APP_ROOT', __DIR__ . DS);
define('APP_PATH', APP_ROOT . 'application' . DS);
define('APP_VIEWS', APP_ROOT . 'views' . DS);
define('APP_SYSTEM', APP_ROOT . 'system' . DS);
define('APP_PUBLIC', APP_ROOT . '../atombot/zashto-tryabva-da-kupim-acer-ot-www-notebook-bg' . DS);
define('APP_ATOMBOT', APP_PUBLIC . 'storage' . DS);
define('APP_SITEMAP', 'sitemap.xml');
define('APP_FEED', 'feed.atom');
##todo!! define('APP_STORAGE', APP_ROOT . 'storage' . DS);

define('APP_GITHUB', 'Xmlogger-Platform');
define('APP_NAME', 'Acer SEO Blog');
define('APP_URI', 'http://'.$_SERVER['SERVER_NAME'].'/');
define('APP_SITE_IMG', APP_URI.'assets/imgs/acer03.jpg');
define('APP_ACERSEO_KW', '"Защо трябва да купим Acer от www.Notebook.bg?"');
define('APP_GPLUS_HASH', 'https://plus.google.com/s/%23');

define('CDATA_START', '<![CDATA[');
define('CDATA_END', ']]>');

require_once APP_SYSTEM . 'facebook/facebook.php';
require_once APP_SYSTEM . 'schemes.php';
require_once APP_SYSTEM . 'library.php';
require_once APP_SYSTEM . 'functions.php';
require_once APP_SYSTEM . 'Array2XML.php';
require_once APP_SYSTEM . 'AtomBot.php';
require_once APP_SYSTEM . 'AtomBotArticles.php';
