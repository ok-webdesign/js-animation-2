const TOTAL_DOTS = 100;
const MAX_DOT_DIAMETER = 10;
const CLIENT_HEIGHT = document.documentElement.clientHeight;
const CLIENT_WIDTH = document.documentElement.clientWidth;

const FIREFLY_PATH_1 = 'M 350 350 C 350 450 450 450 450 400 C 450 300 250 400 250 300 C 250 200 400 350 400 250 C 400 200 300 250 300 200 C 300 150 350 200 350 150';
const FIREFLY_PATH_2 = 'M 350 350 C 350 425 400 450 400 400 C 400 350 350 400 350 350 C 350 300 400 300 400 250 C 400 200 350 250 350 200 C 350 200 350 200 350 150';
const FIREFLY_PATH_3 = 'M 350 450 C 400 450 450 400 350 400 C 300 400 200 350 350 350 C 500 350 300 450 150 300 C 50 200 250 150 350 250 C 400 300 450 300 350 200';

function generateDots (numDots) {
    for (var i = 0; i < numDots; i++) {
        $('.container').append(`<div id="firefly-${i}" class="firefly"></div>`);
        var dotDiameter = Math.random() * MAX_DOT_DIAMETER;
        $(`#firefly-${i}`).css({
            top: Math.random() * CLIENT_HEIGHT,
            bottom: Math.random() * CLIENT_HEIGHT,
            left: Math.random() * CLIENT_WIDTH,
            right: Math.random() * CLIENT_WIDTH,
            width: dotDiameter,
            height: dotDiameter,
            opacity: 0,
        });
    }
}

function getPath () {
    var randomThreshold = Math.random();
    if (randomThreshold <= 0.33) {
        return FIREFLY_PATH_1;
    } else if (randomThreshold <= 0.90) {
        return FIREFLY_PATH_2;
    }
    return FIREFLY_PATH_3;
}

function fadeOut () {
    gsap.to(`#firefly-${i}`, {opacity: 0});
}

$(document).ready(function() {

    generateDots(TOTAL_DOTS);

    gsap.registerPlugin(MotionPathPlugin);
    // var tl = gsap.timeline({repeat: -1});
    gsap.to('h1', {
        duration: 30,
        opacity: 0.9
    });

    for (var i = 0; i < TOTAL_DOTS; i++) {
        gsap.to(`#firefly-${i}`, {
            duration: Math.max(15, Math.random() * 30),
            stagger: Math.random(),
            opacity: Math.max(0.1, Math.random()),
            delay: Math.random() * 3,
            motionPath: getPath(),
            height: 0,
            width: 0 
        }).repeat(-1);
    }
});