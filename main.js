
// setup a new canvas for drawing wait for device init
$(document).ready(function() {
    // Set the height of canvas
    var content_height = $.mobile.getScreenHeight() - $("#header").outerHeight();
    $("#content").height(content_height);
    $("#canvas").height(content_height);

    // Stop scroll
    $(document).delegate(".ui-content", "scrollstart", false);
});

var ctx, color = "#000";

// function to setup a new canvas for drawing
function newCanvas(){
    //define and resize canvas
    document.getElementById("content").style.height = window.innerHeight-90;
    document.getElementById("canvas").style.height = window.innerHeight-90;

    // setup canvas
    ctx=document.getElementById("canvas").getContext("2d");
    ctx.strokeStyle = color;
    ctx.lineWidth = 5;

    // setup to trigger drawing on mouse or touch
//    drawTouch();
    drawMouse();
}

// // prototype to start drawing on touch using canvas moveTo and lineTo
// var drawTouch = function() {
//     var start = function(e) {
//         ctx.beginPath();
//         x = e.changedTouches[0].pageX;
//         y = e.changedTouches[0].pageY-44;
//         ctx.moveTo(x,y);
//     };
//     var move = function(e) {
//         e.preventDefault();
//         x = e.changedTouches[0].pageX;
//         y = e.changedTouches[0].pageY-44;
//         ctx.lineTo(x,y);
//         ctx.stroke();
//     };
//     document.getElementById("canvas").addEventListener("touchstart", start, false);
//     document.getElementById("canvas").addEventListener("touchmove", move, false);
// };

// prototype to start drawing on mouse using canvas moveTo and lineTo
var drawMouse = function() {
    var clicked = 0;
    var start = function(e) {
        clicked = 1;
        ctx.beginPath();
        x = e.pageX;
        y = e.pageY-44;
        ctx.moveTo(x,y);
    };
    var move = function(e) {
        if(clicked){
            x = e.pageX;
            y = e.pageY-44;
            ctx.lineTo(x,y);
            ctx.stroke();
        }
    };
    var stop = function(e) {
        clicked = 0;
    };
    document.getElementById("canvas").addEventListener("mousedown", start, false);
    document.getElementById("canvas").addEventListener("mousemove", move, false);
    document.addEventListener("mouseup", stop, false);
};

