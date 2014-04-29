//Random positioning at page load

if (window.attachEvent) {
    window.attachEvent('onload', yourFunctionName);
} else {
    if(window.onload) {
        var curronload = window.onload;
        var newonload = function() {
            curronload();
            yourFunctionName();
        };
        window.onload = newonload;
    } else {
        window.onload = scramble;
    }
}

function randomFromTo(from, to){
    return Math.floor(Math.random() * (to - from + 1) + from);
}

function scramble() {
    var children = $('#box').children();
    var child = $('#box div:first-child');

    for (i=0; i<children.length; i++) {
        $("#"+child.attr('id')).css("position", "absolute");
        moveRandom(child.attr('id'));
        child = child.next();
    }
}

function moveRandom(id) {
    /* get box position and size
     * -- access method : cPos.top and cPos.left */
    var cPos = $('#box').offset();
    var cHeight = $('#box').height();
    var cWidth = $('#box').width();

    // get box padding (assume all padding have same value)

    var pad = parseInt($('#box').css('padding-top').replace('px', ''));

    // get movable box size
    var bHeight = $('#'+id).height();
    var bWidth = $('#'+id).width();

    // set maximum position
    maxY = cPos.top + cHeight - bHeight - pad;
    maxX = cPos.left + cWidth - bWidth - pad;

    // set minimum position
    minY = cPos.top + pad;
    minX = cPos.left + pad;

    // set new position
    newY = randomFromTo(minY, maxY);
    newX = randomFromTo(minX, maxX);

    $('#' + id).animate({
        top: newY,
        left: newX
        }, 'slow', function() {
    });
}

