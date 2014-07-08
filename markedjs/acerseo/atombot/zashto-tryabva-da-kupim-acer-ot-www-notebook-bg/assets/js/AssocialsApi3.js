/**
 * AssocialsApi.js v3.0 by @tunnckoCore
 * @link <http://www.charlike.pw/>
 * @license <http://opensource.org/licenses/MIT>
 */


function AssocialsApi(blockHolder) {
    //assocObject.each(function(i) {
    associalsBlock = $('.' + blockHolder);
    var postItemID = associalsBlock.attr("data-associals-item-id");
    var postItemURL = associalsBlock.attr("data-associals-item-url");
    var postItemTITLE = associalsBlock.attr("data-associals-item-title");
    var postItemIMAGE = associalsBlock.attr("data-associals-item-image");

    associalsBlock.on('click', '.associals-item-' + postItemID + '-facebook', function() {
        myWindow = window.open('http://www.facebook.com/sharer/sharer.php?u=' + postItemURL, '', 'width=500,height=500');
    });
    associalsBlock.on('click', '.associals-item-' + postItemID + '-twitter', function() {
        myWindow = window.open('https://twitter.com/intent/tweet?original_referer='
                + postItemURL + '&text=' + postItemTITLE
                + '&url=' + postItemURL, '', 'width=500,height=500');
    });
    associalsBlock.on('click', '.associals-item-' + postItemID + '-googleplus', function() {
        myWindow = window.open('https://plus.google.com/share?url=' + postItemURL, '', 'width=500,height=500');
    });
    associalsBlock.on('click', '.associals-item-' + postItemID + '-pinterest', function() {
        myWindow = window.open('http://pinterest.com/pin/create/button/?url='
                + postItemURL + '&media='
                + postItemIMAGE + '&description='
                + postItemTITLE, '', 'width=500,height=500');
    });
    //});
}