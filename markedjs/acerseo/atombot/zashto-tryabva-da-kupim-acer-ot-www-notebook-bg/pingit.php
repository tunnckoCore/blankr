<?php
/**
 * @author      George Yanev (http://github.com/tunnckoCore)
 * 
 * @license     MIT License (http://opensource.org/licenses/MIT)
 * @copyright   2013, WAF Development
 */
require '../../atmos/config.php';

$configurePing = array(
    'site_title' => 'Acer Aspire V5-122P СПАМ ЗА ФИНАЛА НА ACER SEO',
    'site_url' => 'http://www.zashto-tryabva-da-kupim-acer-ot-www-notebook-bg.charlike.pw/',
    'site_email' => 'sdasdasdy@dreadstone.com',
    'feed_url' => 'http://www.zashto-tryabva-da-kupim-acer-ot-www-notebook-bg.charlike.pw/atom',
    /* PubSubHubbub
     * If you're not sure, just use this one (it's run by Google) */
    'hub_endpoint' => 'http://pubsubhubbub.appspot.com/publish'
);

if (pingOMatic($configurePing)) {
    echo "<pre>Pinged ping-o-matic! Yay!</pre>";
} else {
    echo "<pre>Ping-O-Matic failed. You've probably pinged already (rate limiting.)</pre>";
}
if (googlePingDotCom($configurePing)) {
    echo "<pre>Pinged GooglePing.com! Yay!</pre>";
} else {
    echo "<pre>GooglePing.com failed. You've probably pinged already (rate limiting.)</pre>";
}
if (pubSubHubbub($configurePing)) {
  echo "<pre>Pinged {$configurePing['hub_endpoint']} &mdash; Woot!</pre>";
} else {
    echo "<p><b>Error:</b> Could not ping {$configurePing['hub_endpoint']}</pre>";
}