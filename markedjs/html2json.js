/*!
 * html2json
 * 
 * @author welefen
 * @lincense MIT
 * @version 1.0 - 2012.03.02
 */
this.html2json = (function() {
	var div = null;
	var defaultBlankAttrs = "id,name,style,src,href,width,height,title,alt";
	var config = {
		"tag" : "tag",
		"text" : "text",
		"attr" : "attribute",
		"child" : "$"
	}
	var getJson = function(childNodes, attrs) {
		var result = [];
		for ( var i = 0, len = childNodes.length; i < len; i++) {
			var item = childNodes[i];
			if (item.nodeType == 3) {
				var obj = {};
				var text = item.nodeValue;
				text = text.replace(/ +/g, ' ');
				obj[config.text] = text;
				result.push(obj);
			} else if (item.nodeType == 1) {
				var obj = {};
				obj[config.tag] = item.nodeName.toLowerCase();
				obj[config.attr] = {};
				var flag = false;
				// for ie6
				if (attrs) {
					var length = attrs.length;
					for ( var j = 0; j < length; j++) {
						if (attrs[j] == 'style') {
							var sStyle = item.getAttribute('style').cssText;
							if (sStyle) {
								obj[config.attr]['style'] = sStyle;
								flag = true;
							}
						} else {
							var attrNode = item.attributes[attrs[j]];
							if (attrNode && attrNode.nodeType === 2) {
								var value = attrNode.value;
								if (value && value != 'null') {
									obj[config.attr][attrs[j]] = value;
									flag = true;
								}
							}
						}
					}
				} else {
					if (item.attributes.length) {
						for ( var n = 0, l = item.attributes.length; n < l; n++) {
							var value = item.attributes[n].value;
							if (value) {
								flag = true;
								obj[config.attr][item.attributes[n].name] = value;
							}
						}
					}
				}
				if (!flag) {
					delete obj[config.attr];
				}
				if (item.childNodes.length < 1) {
					var text = item.innerText;
					if (text) {
						obj[config.text] = item.innerText;
					}
				} else {
					obj[config.child] = getJson(item.childNodes, attrs);
				}
				result.push(obj);
			}
		}
		return result;
	}
	/**
	 * [html2json]
	 * 
	 * @param {[text]}
	 *            text
	 * @param {[function]}
	 *            stringify
	 * @return {[text]}
	 */
	var html2json = function(text, attrs) {
		div = document.createElement('div');
		div.innerHTML = text;
		attrs = attrs || defaultBlankAttrs;
		var ie6 = /MSIE 6/.test(navigator.userAgent), allAttrs, len;
		if (!ie6) {
			attrs = null;
		}
		var result = getJson(div.childNodes, attrs);
		div = null;
		return JSON.stringify(result);
	};
	return html2json;
})();