var canvas, ctx, image;
var scale, offset_x, offset_y;

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
    var canvas_html = '<canvas id="canvas" width="'+$(window).width()+'" height="'+content_height+'"></canvas>';
    $content.html(canvas_html);
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    image = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // Draw the volley field
    drawField();

    // Set the event listener
    drawTouch();

    setupButton();

});

// prototype to start drawing on touch using canvas moveTo and lineTo
var drawTouch = function() {
    var start_point;
    var header_height = $("#header").outerHeight();
    ctx.lineWidth = 1;

    var start = function(e) {
        e.preventDefault();
        console.log('start event', e);
        start_point = {
            x: e.changedTouches[0].pageX,
            y: e.changedTouches[0].pageY - header_height};
        console.log('start:', start_point);
    };
    var move = function(e) {
        e.preventDefault();
        var point = {
            x : e.changedTouches[0].pageX,
            y : e.changedTouches[0].pageY - header_height};
        loadImage();
        drawLine(start_point, point);
    };
    var end = function(e) {
        e.preventDefault();
        saveImage();
    }
    document.getElementById("canvas").addEventListener("touchstart", start, false);
    document.getElementById("canvas").addEventListener("touchmove", move, false);
    document.getElementById("canvas").addEventListener("touchend", end, false);
};

function loadImage() {
    ctx.putImageData(image, 0, 0);
}
function saveImage() {
    image = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function drawLine(p1, p2) {
    console.log('drawLine', p1, p2);
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
}

function drawField() {
    // Calculate the scale and the offset of the field
    scale = Math.min(canvas.width / 11, canvas.height / 20);
    offset_x = (canvas.width - 9 * scale) / 2;
    offset_y = (canvas.height - 18 * scale) / 2;
    console.log(scale, offset_x, offset_y);
    function canvas2field(point) {
        return {
            x: (point - offset_x) / scale,
            y: (point - offset_y) / scale};
    }
    function field2canvas(point) {
        return {
            x: point.x * scale + offset_x,
            y: point.y * scale + offset_y};
    }

    // Plot the line
    function drawFieldLine(p1, p2) {
        console.log('drawFieldLine', p1, p2);
        drawLine(field2canvas(p1), field2canvas(p2));
    }

    // green color inside
    ctx.fillStyle = '#1B3';
    ctx.lineWidth = 2;
    ctx.fillRect(offset_x, offset_y, scale * 9, scale * 18);

    // Horizontal line
    ctx.strokeStyle = '#FFF';
    var y_arr = [0, 6, 9, 12, 18];
    for (var i = 0; i < y_arr.length; i++) {
        drawFieldLine({x:0, y:y_arr[i]}, {x:9, y:y_arr[i]});
    }
    // Vertical line
    var x_arr = [0, 9];
    for (var i = 0; i < x_arr.length; i++) {
        drawFieldLine({x:x_arr[i], y:0}, {x:x_arr[i], y:18});
    }
    saveImage();
}

var Player = function (number, isSetter) {
    this.number = number;
    this.isSetter = isSetter;
}

function setupButton() {
    var positions = [{x:1,y:1},{x:1,y:5},{x:4,y:5},{x:7,y:5},{x:7,y:1},{x:4,y:1}];
    var players = new Array(6);
    for (var i = 0; i < 6; i++) {
        players[i] = new Player(i + 1, i == 0);
        var left = positions[i].x * scale + offset_x,
            top = positions[i].y * scale + offset_y;
        var button_html = '<button id="player' + i + '" style="left:' + left +'px; top:' + top + 'px;">' + (i+1) + '</button>';
        console.log(button_html)
        $("#content").append(button_html);
    }

}

