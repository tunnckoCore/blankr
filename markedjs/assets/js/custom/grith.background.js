/*
 * Laugh.me Javascript Background Animation
 **/
var krugovi = [{rejdius: 200, iks: 300, ipsilon: 50}, {rejdius: 500, iks: 350, ipsilon: 100}, {rejdius: 600, iks: 600, ipsilon: 400}, {rejdius: 500, iks: 350, ipsilon: 100}, {rejdius: 600, iks: 600, ipsilon: 400}];
var rejdius = 0;
var lasttime = Date.now();
var iks = 300;
var ipsilon = 300;

window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(callback) {
                window.setTimeout(callback, 40);
            };
})();

function animate() {

    var mnozilac = ((Date.now() - lasttime) / 40);
    var dilej = 16 - (Date.now() - lasttime);
    // console.log(mnozilac);
    lasttime = Date.now();
    var canvas = document.getElementById('grith_background');
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    var razlikasirine = canvas.width / 1000;
    var razlikavisine = canvas.height / 600;

    jQuery(krugovi).each(function(index)
    {

        this.rejdius += (8 * mnozilac);

        if (this.rejdius > 1000 || this.rejdius > 3000)
        {
            if (Math.random() > (2 - (Math.pow(1.005, mnozilac))))
            {
                this.rejdius = 0;
                this.iks = Math.random() * 1000 * razlikasirine;
                this.ipsilon = Math.random() * 600 * razlikavisine;
            }
            //else console.log((2-(Math.pow(1.005,mnozilac))));
        }
        // update

        // clear

        //context.fill();

        // draw stuff
        context.lineWidth = 60 * (1 - this.rejdius / (1000)) * razlikasirine;
        if (context.lineWidth < 0)
            context.lineWidth = 0;
        //var stil=(0.2-(this.rejdius/(1000)*0.3))*canvas.width/2000;
        //var stil=(0.2-(this.rejdius/(1000)*0.3))*canvas.width/2000;
        if (this.rejdius < 1000)
        {

            context.strokeStyle = "rgba(255,255,255,0.4)";
            context.beginPath()
            context.arc(this.iks, this.ipsilon, this.rejdius, 0, Math.PI * 2, true);
            context.stroke();
        }




    });//each


    requestAnimFrame(function() {
        setTimeout(function() {
            animate()
        }, dilej);
    });


}

function risajz()
{
    jQuery('#grith_background:eq(0)').attr("width", jQuery(document).width()); // in pixels
    jQuery('#grith_background:eq(0)').attr("height", jQuery(document).height()); // in pixels


}

risajz();
jQuery(window).resize(function() {
    risajz()
});

animate();