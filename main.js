
// setup a new canvas for drawing wait for device init
$(document).ready(function() {
    // Stop scroll
    $(document).delegate(".ui-content", "scrollstart", false);

    // Get elements
    var $header = $("#header");
    var $content = $("#content");

    // Set the height of content
    var screen_height = $.mobile.getScreenHeight();
    var header_height = $header.outerHeight();
    var content_height = screen_height - header_height;
    $content.height(content_height);

    // Create a canvas as large as the content
    var canvas = '<canvas id="canvas" width="'+$(window).width()+'" height="'+content_height+'"></canvas>';
    $content.html(canvas);
    
    // Set the event listener
    drawTouch();

});

// prototype to start drawing on touch using canvas moveTo and lineTo
var drawTouch = function() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var start_x, start_y;
    var header_height = $("#header").outerHeight();
    ctx.lineWidth = 2;

    var start = function(e) {
        e.preventDefault();
        console.log('start event', e);
        start_x = e.changedTouches[0].pageX;
        start_y = e.changedTouches[0].pageY - header_height;
        console.log('start:', start_x, start_y);
    };
    var move = function(e) {
        e.preventDefault();
        var x = e.changedTouches[0].pageX;
        var y = e.changedTouches[0].pageY - header_height;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.moveTo(start_x,start_y);
        ctx.lineTo(x,y);
        ctx.stroke();
    };
    document.getElementById("canvas").addEventListener("touchstart", start, false);
    document.getElementById("canvas").addEventListener("touchmove", move, false);
};

