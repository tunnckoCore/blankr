<?php
/**
 * @author      George Yanev (http://github.com/tunnckoCore)
 * 
 * @license     MIT License (http://opensource.org/licenses/MIT)
 * @copyright   2013, WAF Development
 */

$atomFeed = [
    'feed' => [
        'attrs' => ['xmlns' => 'http://www.w3.org/2005/Atom'],
        'body' => [
            'title' => [
                'attrs' => [
                    'type' => 'text',
                    'xml:lang' => 'bg'
                ],
                'body' => APP_ACERSEO_KW . ' | ' . APP_NAME,
            ],
            'id' => ['body' => APP_URI],
            'updated' => ['body' => $nowTime],
            'author' => [
                'body' => [
                    'name' => [
                        'attrs' => [
                            'xml:lang' => 'bg'
                        ],
                        'body' => 'Георги Янев'
                    ],
                    'uri' => [
                        'body' => 'http://www.charlike.pw'
                    ]
                ]
            ],
            'link:alternate' => ['body' => 'link href="' . APP_URI . '" rel="alternate" type="text/html" hreflang="bg"'],
            'link:self' => ['body' => 'link href="' . APP_URI . $postUrl . '/atom/" rel="self" type="application/atom+xml"'],
        ]
    ],
];
$atomEntries = [
    0 => [
        'body' => [
            'entry' => [
                'body' => [
                    'title' => [
                        'attrs' => [
                            'type' => 'text',
                            'xml:lang' => 'bg'
                        ],
                        'body' => CDATA_START . $postTitle . CDATA_END,
                    ],
                    'id' => ['body' => APP_URI . $postUrl . '/article/'],
                    'link:alternate' => ['body' => 'link href="' . APP_URI . $postUrl . '/article/" rel="alternate" type="text/html" hreflang="bg"'],
                    'updated' => ['body' => $nowTime],
                    'published' => ['body' => $nowTime],
                    'author' => [
                        'body' => [
                            'name' => [
                                'attrs' => [
                                    'xml:lang' => 'bg'
                                ],
                                'body' => CDATA_START . 'Георги Янев' . CDATA_END
                            ],
                            'uri' => [
                                'body' => 'https://plus.google.com/101032319194415059995'
                            ]
                        ]
                    ],
                    'content' => [
                        'attrs' => [
                            'type' => 'html',
                        ],
                        'body' => CDATA_START . 'Ето защо трябва да купим Acer от www.Notebook.bg. Седмица от тестове на първият ултра лаптоп с активен дисплей и Windows 8. Освен стандартното използване и тестване на мощността, се провел експеримент с рязане на ябълки – разбивачи на митове.
 
На YouTube можете да видите видео, на коeто някой си реже ябълка на капака на Acer Aspire S7. Логично е, че закаленото стъкло ще издържи на рязането на повърхността, а за да устои лаптопа и на удар, между керамичната рамка и закаленото стъкло има пласт материал, който служи  като „airbag“.' . CDATA_END,
                    ],
                ]
            ]
        ]
    ]
];

$sitemalUrls = [
    [
        'loc' => 'testloc',
        'lastmod' => 'last mod date',
        'changefreq' => 'daily',
        'priority' => '0.6'
    ]
];
