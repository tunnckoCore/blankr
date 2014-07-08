'use strict';

var prodown = {
    regex: {
        //links:         /!?\[([^\]<>]+)\]\(([^ \)<>]+)( "[^\(\)\"]+")?\)/g,
        //mail:          /<(([a-z0-9_\-\.])+\@([a-z0-9_\-\.])+\.([a-z]{2,7}))>/gmi,
        newline:       /(?:[\r\n]| {2,})/gm,
        headings:      /^(\#{1,6})([^\#\n]+)$/gm,
        blockcode:     /`{3}(?:(.*$)\n)?([\s\S]*?)`{3}/gm,
        inlinecode:    /`{1}([\s\S]*?)`{1}/gm,
        horizontal:    /^( *[*-_~]){3,} *(?:\n+|$)/gm,
        lists:         /^((\s*((\*|\-|\+)|\d(\.|\))) [^\n]+)\n)+/gm,
        strong:        /(?:([\**]{2}))([^\**\n]+[^\**\s])\1/gm,
        bold:          /(?:([\*]{1}))([^\*\n]+[^\*\s])\1/gm,
        italic_i:      /(?:([\__]{2}))([^\__\n]+[^\__\s])\1/gm,
        italic_em:     /(?:([\_]{1}))([^\_\n]+[^\_\s])\1/gm,

        link_full:     /!?\[([^\]]+)\]\(([^)"]+)(?: \"([^\"]+)\")?\)/g,
        link_mention:  /\@([a-z0-9]{3,})\@(t|gh|fb|gp)/gi,
        link_auto:     /([a-zA-Z0-9@:%-_\+.~#?&\/\/=]{2,256}\.[a-zA-Z]{2,4}\b(\/[\-a-zA-Z0-9@:%-_\+.~#?&\/\/=]*)?)/gi,
        link_ref:      /\[([^\]]+)\]\[([^\]]+)\]/g,
        tables:        /\n(([^|\n]+ *\| *)+([^|\n]+\n))((:?\-+:?\|)+(:?\-+:?)*\n)((([^|\n]+ *\| *)+([^|\n]+)\n)+)/g
    },
    regexCheck: function (str, rulename) {
        var ret = prodown.regex[rulename].exec(str);
        return ret;
    },
    toHTML: function (str) {
        var line, nstatus = 0, fine, sitename = 'null', lisn = 0,
              status, cel, calign, indent, helper, helper1, helper2, count, repstr, trashgc = [],
              casca = 0,
              i = 0,
              j = 0;

        var _newline = prodown.regexCheck(str, 'newline');
        var _headings, _blockcode, _inlinecode, _horizontal, _strong,
        _bold, _italic_i, _italic_em,
         _link_mention, _link_full, _link_auto, _link_ref, _lists;


        str = '\n' + str + '\n';

        //while (_newline !== null) {
        //    str = str.replace(_newline[0], '<br>');
        //}

        /**
         * Headings h1 - h6
         *
         * # Heading one
         * ## Heading two
         * ### Heading tree
         *
         * <h1>Heading one</h1>
         * <h2>Heading two</h2>
         * <h3>Heading tree</h3>
         * etc ...
         **/
        while ((_headings = prodown.regexCheck(str, 'headings')) !== null) {
            count = _headings[1].length;
            str = str.replace(_headings[0], '<h' + count + ' class="prodown headings h' + count + '">' + _headings[2] + '</h' + count + '>' + '\n');
        }

        /**
         * Block Code with pre
         *
         * ```javascript
         * var some = 'thing';
         * alert(some);
         * ```
         *
         * <code><pre>
         *   var some = 'thing';
         *   alert(some);
         * </pre></code>
         **/
        while ((_blockcode = prodown.regexCheck(str, 'blockcode')) !== null) {
            str = str.replace(_blockcode[0], '<code class="prodown blockcode ' + _blockcode[1] + '">\n<pre>' + _blockcode[2] + '</pre></code>\n');
        }

        /**
         * In-line Code
         * 
         * some `inline code` here
         * 
         * some <code>inline code</code> here
         **/
        while ((_inlinecode = prodown.regexCheck(str, 'inlinecode')) !== null) {
            str = str.replace(_inlinecode[0], '<code class="prodown inlinecode">' + _inlinecode[1] + '</code>');
        }

        /**
         * Horizontal (line) Rule
         * 
         * tree times and above of
         *     ~, -, _, * 
         * 
         * <hr>
         **/
        while ((_horizontal = prodown.regexCheck(str, 'horizontal')) !== null) {
            str = str.replace(_horizontal[0], '\n<hr class="prodown horizontal">\n');
        }

        /**
         * Strong Tag
         * 
         * some **strong** word
         *
         * some <strong>strong</strong> word
         **/
        while ((_strong = prodown.regexCheck(str, 'strong')) !== null) {
            str = str.replace(_strong[0], '<strong class="prodown strong">' + _strong[2].trim() + '</strong>');
        }

        /**
         * Bold Tag
         * 
         * some *bold* word
         *
         * some <b>strong</b> word
         **/
        while ((_bold = prodown.regexCheck(str, 'bold')) !== null) {
            str = str.replace(_bold[0], '<b class="prodown bold">' + _bold[2].trim() + '</b>');
        }

        /**
         * <i> Tag
         * 
         * some __italic__ word
         *
         * some <i>italic</i> word
         **/
        while ((_italic_i = prodown.regexCheck(str, 'italic_i')) !== null) {
            str = str.replace(_italic_i[0], '<i class="prodown italic_i">' + _italic_i[2].trim() + '</i>');
        }

        /**
         * Em Tag
         * 
         * some _italic em_ word
         *
         * some <em>italic em</em> word
         **/
        while ((_italic_em = prodown.regexCheck(str, 'italic_em')) !== null) {
            str = str.replace(_italic_em[0], '<em class="prodown italic_em">' + _italic_em[2].trim() + '</em>');
        }

        /**
         * Here some custom Media Extras
         * youtube, vimeo, dailymotion, viddler
         * etc ...
         */


        /**
         * Social mentions
         *
         * @userName@fb - facebook
         * @userName@gh - github
         * @userName@t - twitter
         * @userName@gp - google plus
         *
         * @todo  optional target _blank
         */
        while ((_link_mention = prodown.regexCheck(str, 'link_mention')) !== null) {
            switch (_link_mention[2]) {
                case 't':
                    repstr = 'https://twitter.com/' + _link_mention[1];
                    break;
                case 'gh':
                    repstr = 'https://github.com/' + _link_mention[1];
                    break;
                case 'fb':
                    repstr = 'https://www.facebook.com/' + _link_mention[1];
                    break;
                case 'gp':
                    repstr = 'https://plus.google.com/+' + _link_mention[1];
                    break;
            }
            //sitename = prodown.getSitenameFromLink(repstr);
            str = str.replace(_link_mention[0], '<a class="prodown mention" href="' + repstr + '">' + _link_mention[1] + '</a>');
        }

        /* Image or Link 
         * @todo  optional target _blank for links
         **/
        while ((_link_full = prodown.regexCheck(str, 'link_full')) !== null) {
            //sitename = prodown.getSitenameFromLink(_link_full[2]);
            if (_link_full[0].substr(0, 1) === '!') {
              str = str.replace(_link_full[0], '<img class="prodown image" src="' + _link_full[2] + '">');
            }
        }
        //str = str.replace(_link_full[0], '<a class="prodown link" href="' + _link_full[2] + '">' + _link_full[1] + '</a>');
        /**
         * Autolinks / Automails
         * example.com
         * http://example.com
         * example@email.com
         */
        while ((_link_auto = prodown.regexCheck(str, 'link_auto')) !== null) {
            if ((_link_auto[1].indexOf('@') !== -1)) {
                str = str.replace(_link_auto[0], '<a class="prodown email" href="mailto:' + _link_auto[1] + '">' + _link_auto[1] + '</a>');
            } else {
                //sitename = prodown.getSitenameFromLink(_link_auto[1]);
                str = str.replace(_link_auto[0], '<a class="prodown auto" href="' + _link_auto[1] + '">' + _link_auto[1] + '</a>');
            }
        }

        /**
         * Link Reference
         * [wiki][1]
         * [ref][2]
         * 
         * [1]: wikipedia.org
         * [2]:http://example.com
         */
        while ((_link_ref = prodown.regexCheck(str, 'link_ref')) !== null) {
            helper1 = new RegExp('\\[' + _link_ref[2] + '\\]: ?([^ \n]+)', 'gi');
            if ((helper = helper1.exec(str)) !== null) {
                //sitename = prodown.getSitenameFromLink(helper[1]);
                str = str.replace(_link_ref[0], '<a class="prodown ref" href="' + helper[1] + '">' + _link_ref[1] + '</a>');
                trashgc.push(helper[0]);
            }
        }
        for (i = 0; i < trashgc.length; i++) {
            str = str.replace(trashgc[i], '');
        }


        /* lists (nested) */
        while ((_lists = prodown.regexCheck(str, 'lists')) !== null) {
            casca = 0;
            if ((_lists[0].trim().substr(0, 1) === '*') || (_lists[0].trim().substr(0, 1) === '-') || (_lists[0].trim().substr(0, 1) === '+')) {
                repstr = '<ul>';
            } else {
                repstr = '<ol>';
            }
            helper = _lists[0].split('\n');
            helper1 = [];
            status = 0;
            indent = false;
            for (i = 0; i < helper.length; i++) {
                if ((line = /^((\s*)((\*|\-\+)|\d(\.|\))) ([^\n]+))/.exec(helper[i])) !== null) {
                    if ((line[2] === undefined) || (line[2].length === 0)) {
                        nstatus = 0;
                    } else {
                        if (indent === false) {
                          indent = line[2].replace(/\t/, '    ').length;
                        }
                        nstatus = Math.round(line[2].replace(/\t/, '    ').length / indent);
                    }
                    while (status > nstatus) {
                        repstr += helper1.pop();
                        status--;
                        casca--;
                    }
                    while (status < nstatus) {
                        if ((line[0].trim().substr(0, 1) === '*') || (line[0].trim().substr(0, 1) === '-') || (line[0].trim().substr(0, 1) === '+')) {
                            repstr += '<ul>';
                            helper1.push('</ul>');
                        } else {
                            repstr += '<ol>';
                            helper1.push('</ol>');
                        }
                        status++;
                        casca++;
                    }
                    repstr += '<li>' + line[6] + '</li>' + '\n';
                }
            }
            while (casca > 0) {
                repstr += '</ul>';
                casca--;
            }
            if ((_lists[0].trim().substr(0, 1) === '*') || (_lists[0].trim().substr(0, 1) === '-') || (_lists[0].trim().substr(0, 1) === '+')) {
                repstr += '</ul>';
            } else {
                repstr += '</ol>';
            }
            str = str.replace(_lists[0], repstr + '\n');
        }

        str = str.replace(/ {2,}[\n]{1,}/gmi, '<br><br>');
        return str;
    },
    getSitenameFromLink: function (str) {
        var urlTemp;
        if ((str.indexOf('/') !== -1)) {
            urlTemp = str.split('/');
            if (urlTemp[1].length === 0) {
                urlTemp = urlTemp[2].split('.');
            } else {
                urlTemp = urlTemp[0].split('.');
            }
            return urlTemp[urlTemp.length - 2].replace(/[^\w\d]/g, '');
        }
        return '';
    }
    
};






/*function parseMD() {
  var plainMD = document.getElementById('plainMD').value;
  document.getElementById('resultMD').innerHTML = prodown.toHTML(plainMD);
}*/


module.exports.prodown = prodown;